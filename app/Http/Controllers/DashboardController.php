<?php

namespace App\Http\Controllers;

use Throwable;
use Carbon\Carbon;
use App\Models\PostedJobs;
use App\helpers\AuthHelper;
use App\helpers\CardDataHelper;
use Illuminate\Http\Request;
use App\helpers\ResponseHelper;
use App\Models\AppliedJobs;
use App\Models\Companies;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    //* post a job
    public function createJob(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(), [
                'background_img' => 'nullable|file|image|max:255',
                'job_title' => 'required|string|unique:posted_jobs,job_title',
                'job_description' => 'required|string',
                'type' => 'required|array',
                'location' => 'required|string',
                'salary_range' => 'nullable|string',
                'experience_level' => 'nullable|string',
                'job_function' => 'required|array',
                'industry' => 'required|array',
                'job_expiry' => 'nullable|date_format:d/m/Y',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors(),
                    'notification' => [
                        'title' => "Invalid Form Submission",
                        'message' => "Please review the highlighted fields and correct any errors before submitting the form again.",
                    ],
                    'status' => 422
                ], 422);
            }

            //* parse the token if whose user create a job
            $user = AuthHelper::jwtHandler("parseToken");

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            if ($request->hasFile('background_img')) {
                $file = $request->file('background_img')->store('background_images', 'public');
            }

            $jobExpiry = $request->job_expiry
                ? Carbon::createFromFormat('d/m/Y', $request->job_expiry)->format('Y-m-d')
                : null;

            //* save to database
            PostedJobs::create([
                'company_id' => $user->company_id,
                'user_id' => $user->id,
                'background_img' => $file ?? null,
                'job_title' => $request->job_title,
                'job_description' => $request->job_description,
                'type' => json_encode($request->type) ?? null,
                'location' => $request->location,
                'salary_range' => $request->salary_range,
                'experience_level' => $request->experience_level,
                'job_function' => json_encode($request->job_function) ?? null,
                'industry' => json_encode($request->industry) ?? null,
                'job_expiry' => $jobExpiry,
            ]);

            DB::commit();
            return response()->json([
                'title' => 'New Job Posted Successfully',
                'message' => 'Your job posting has been successfully submitted. Candidates can now view and apply for this job.',
                'status' => 200
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token has expired.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token is invalid.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token not provided.',
                'status' => 401
            ], 401);
        }
    }

    //* get all posted jobs
    public function getAllPostedJob(Request $request)
    {
        DB::beginTransaction();
        try {

            $user = AuthHelper::jwtHandler('parseToken');

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $perPage = $request->input('per_page', 10);

            $postedJobs = PostedJobs::withTrashed()->where('company_id', $user->company_id)->paginate($perPage);
            $postedJobsData = $postedJobs->items();

            //* return posted jobs
            $jobsData = array_map(function ($job) {
                return [
                    'id' => $job->id,
                    'job_title' => $job->job_title,
                    'company' => $job->company->company_name,
                    'background_img' => url('storage/' . $job->background_img),
                    'company_description' => $job->company->company_description,
                    'location' => $job->location,
                    'job_description' => $job->job_description,
                    'type' => $job->type,
                    'salary_range' => $job->salary_range,
                    'job_function' => $job->job_function,
                    'experience_level' => $job->experience_level,
                    'industry' => $job->industry,
                    'tags' => array_merge(
                        json_decode($job->type, true) ?? [],
                        json_decode($job->job_function, true) ?? [],
                        [$job->salary_range],
                        [$job->experience_level]
                    ),
                    'job_expiry' => $job->job_expiry,
                    'posted_date' => $job->created_at,
                    'status' => $job->status,
                ];
            }, $postedJobsData);

            //* return card overview
            $overview = [];
            $overview[] = CardDataHelper::getCardData("Total Job Postings", "Active Posting", 'mdi:briefcase-variant-outline', $user, 'total_job_postings', PostedJobs::class);
            $overview[] = CardDataHelper::getCardData("Total Applications", "Applications", 'mdi:file-document-box-multiple-outline', $user, 'total_applications', PostedJobs::class);
            $overview[] = CardDataHelper::getCardData("Interview Scheduled", "Upcoming Interviews", 'mdi:briefcase-variant-outline', $user, NULL, PostedJobs::class);
            $overview[] = CardDataHelper::getCardData("Offers Made", "Offers Pending", 'mdi:handshake-outline', $user, NULL, PostedJobs::class);


            db::commit();
            return response()->json([
                'message' => 'All posted jobs get successfully',
                'data' => [
                    'jobs' => $jobsData,
                    'overview' => $overview,
                ],
                'pagination' => [
                    'current_page' => $postedJobs->currentPage(),
                    'per_page' => $postedJobs->perPage(),
                    'total' => $postedJobs->total(),
                    'last_page' => $postedJobs->lastPage(),
                ],
                'status' => 200
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token has expired.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token is invalid.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token not provided.',
                'status' => 401
            ], 401);
        }
    }

    public function getAllRecentApplication(Request $request)
    {
        try {

            $user = AuthHelper::jwtHandler('parseToken');

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $perPage = $request->input('per_page', 10);
            $postedJobs = AppliedJobs::where('company_id', $user->company_id)->paginate($perPage);

            $postedJobsData = $postedJobs->items();

            //* return posted jobs
            $recentApplications = array_map(function ($job) {
                $resumeFilename = $job->resume ? preg_replace('/^\d+_/', '', basename($job->resume)) : null;
                $coverLetterFilename = $job->cover_letter ? preg_replace('/^\d+_/', '', basename($job->cover_letter)) : null;
                return [
                    'applicant_id' => $job->user->id ?? null,
                    'applicant_name' => $job->user->name ?? 'Unknown',
                    'description' => $job->user->description,
                    'applied_position' => $job->posted_job->job_title,
                    'applicant_email' => $job->user->email ?? 'No email',
                    'contact_number' => $job->contact_number ?? null,
                    'location' => $job->user->city_municipalities . ', ' . $job->user->province ?? null,
                    'skills' => $job->user->skills ?? null,
                    'experience' => $job->user->experience ?? null,
                    'availability_time_1' => $job->availability_time_1 ?? null,
                    'availability_time_2' => $job->availability_time_2 ?? null,
                    'status' => $job->status,
                    'documents' => [
                        [
                            "icon" => $job->resume
                                ? url("storage/assets/" . (str_ends_with($resumeFilename, '.pdf') ? "pdf-icon.svg" : "docx-icon.svg"))
                                : null,
                            "title" => $resumeFilename,
                            'file' => $job->resume ? url('storage/' . $job->resume) : null,
                            "file_size" => $job->resume && file_exists(storage_path('app/public/' . $job->resume))
                                ? round(filesize(storage_path('app/public/' . $job->resume)) / 1024, 2) . ' KB'
                                : null,
                            "uploaded_date" => $job->created_at->format('Y-m-d H:i:s'),
                        ],
                        [
                            "icon" => $job->cover_letter
                                ? url("storage/assets/" . (str_ends_with($coverLetterFilename, '.pdf') ? "pdf-icon.svg" : "docx-icon.svg"))
                                : null,
                            "title" => $coverLetterFilename,
                            'file' => $job->cover_letter ? url('storage/' . $job->cover_letter) : null,
                            "file_size" => $job->cover_letter && file_exists(storage_path('app/public/' . $job->cover_letter))
                                ? round(filesize(storage_path('app/public/' . $job->cover_letter)) / 1024, 2) . ' KB'
                                : null,
                            "uploaded_date" => $job->created_at->format('Y-m-d H:i:s')
                        ]
                    ],

                    // 'resume' => $job->resume ? url('storage/' . $job->resume) : null,
                    // 'cover_letter' => $job->cover_letter ? url('storage/' . $job->cover_letter) : null,
                    'date_applied' => $job->created_at->format('Y-m-d H:i:s'),
                ];
            }, $postedJobsData);

            return response()->json([
                'message' => 'All recent applications get successfully',
                'data' => ['recent_application' => $recentApplications],
                'pagination' => [
                    'current_page' => $postedJobs->currentPage(),
                    'per_page' => $postedJobs->perPage(),
                    'total' => $postedJobs->total(),
                    'last_page' => $postedJobs->lastPage(),
                ],
                'status' => 200
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token has expired.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token is invalid.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token not provided.',
                'status' => 401
            ], 401);
        }
    }

    //* edit posted job
    public function editJob(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'background_img' => 'nullable|file|image|max:255',
                'job_title' => 'required|string|unique:posted_jobs,job_title',
                'job_description' => 'required|string',
                'type' => 'required|array',
                'location' => 'required|string',
                'salary_range' => 'nullable|string',
                'experience_level' => 'nullable|string',
                'job_function' => 'required|array',
                'industry' => 'required|array',
                'job_expiry' => 'nullable|date_format:d/m/Y',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors(),
                    'notification' => [
                        'title' => "Invalid Form Submission",
                        'message' => "Please review the highlighted fields and correct any errors before submitting the form again.",
                    ],
                    'status' => 422
                ], 422);
            }

            //* parse the token if whose user create a job
            $user = AuthHelper::jwtHandler("parseToken");

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            if ($request->hasFile('background_img')) {
                $file = $request->file('background_img')->store('background_images', 'public');
            }

            $findJobId = PostedJobs::find($request->id);

            if (!$findJobId) {
                return response()->json([
                    'message' => 'Job not found.',
                    'status' => 404
                ], 404);
            }

            $jobExpiry = $request->job_expiry
                ? Carbon::createFromFormat('d/m/Y', $request->job_expiry)->format('Y-m-d')
                : null;

            //* save to database
            $findJobId->update([
                'company_id' => $user->company_id,
                'user_id' => $user->id,
                'background_img' => $file ?? null,
                'job_title' => $request->job_title,
                'job_description' => $request->job_description,
                'type' => json_encode($request->type) ?? null,
                'location' => $request->location,
                'salary_range' => $request->salary_range,
                'experience_level' => $request->experience_level,
                'job_function' => json_encode($request->job_function) ?? null,
                'industry' => json_encode($request->industry) ?? null,
                'job_expiry' => $jobExpiry,
            ]);

            DB::commit();
            return response()->json([
                'title' => 'Edit job Successfully',
                'message' => 'Your job details has been successfully modified. Candidates can now view and apply for this job.',
                'status' => 200
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token has expired.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token is invalid.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token not provided.',
                'status' => 401
            ], 401);
        }
    }

    //* close job
    public function closeJob(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer|exists:posted_jobs,id',
            ]);

            if ($validator->fails()) {
                $title = "Job Not Found";
                $message = "The job you're trying to close does not exist in our records. Please verify the job details and try again.";

                $notification = ResponseHelper::notificationResponse($title, $message);

                return response()->json([
                    'message' => $validator->errors(),
                    'notification' => $notification,
                    'status' => 422
                ], 422);
            }

            $user = AuthHelper::jwtHandler("parseToken");

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $title = "Job Successfully Closed";
            $message = "The job has been successfully closed. Candidates can no longer apply for this position.";
            $notification = ResponseHelper::notificationResponse($title, $message);

            $findJobId = PostedJobs::find($request->id);
            $findJobId->delete();
            $findJobId->user_id = $user->id;
            $findJobId->status = 'Closed';
            $findJobId->save();

            DB::commit();

            return response()->json([
                'notification' => $notification,
                'message' => "Job successfully closed.",
                'status' => 200
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token has expired.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token is invalid.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token not provided.',
                'status' => 401
            ], 401);
        }
    }

    //* close job
    public function reopenJob(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(), [
                'id' => 'required|integer|exists:posted_jobs,id',
            ]);

            if ($validator->fails()) {
                $title = "Job Not Found";
                $message = "The job you're trying to reopen does not exist in our records. Please verify the job details and try again.";

                $notification = ResponseHelper::notificationResponse($title, $message);

                return response()->json([
                    'message' => $validator->errors(),
                    'notification' => $notification,
                    'status' => 422
                ], 422);
            }

            $findJobId = PostedJobs::withTrashed()->find($request->id);

            if (!$findJobId) {
                $title = "Job Not Found";
                $message = "The job you're trying to reopen does not exist in our records. Please verify the job details and try again.";

                $notification = ResponseHelper::notificationResponse($title, $message);

                return response()->json([
                    'notification' => $notification,
                    'message' => "Job not found.",
                    'status' => 404,
                ], 404);
            }

            $findJobId->restore();
            $findJobId->user_id = AuthHelper::jwtHandler("parseToken")->id;
            $findJobId->status = 'Active';
            $findJobId->save();

            $title = "Job Successfully Reopened";
            $message = "The job has been successfully reopened. Candidates can now view and apply for this position.";
            $notification = ResponseHelper::notificationResponse($title, $message);

            DB::commit();
            return response()->json([
                'notification' => $notification,
                'message' => "Job Successfully Reopened.",
                'status' => 200,
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token has expired.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token is invalid.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Token not provided.',
                'status' => 401
            ], 401);
        }
    }

    //* view job card
    public function viewJobCard(Request $request)
    {

        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(), [
                'id' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()->getMessages(),
                    'status' => 422
                ], 422);
            }

            $appliedJob = AppliedJobs::where('posted_job_id', $request->id)
                ->count();

            $applicantStatus = [
                ['title' => 'Applied', 'count' => $appliedJob],
                ['title' => 'In Review', 'count' => 0],
                ['title' => 'Interviewed', 'count' => 0],
                ['title' => 'Short listed', 'count' => 0],
                ['title' => 'Offer Made', 'count' => 0],
                ['title' => 'Hired', 'count' => 0],
            ];

            DB::commit();
            return response()->json(['message' => 'Successfully View Job.', 'data' => $applicantStatus, 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }
}