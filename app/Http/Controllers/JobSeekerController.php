<?php

namespace App\Http\Controllers;

use App\Models\Companies;
use App\Models\SavedJobs;
use App\Models\PostedJobs;
use App\helpers\AuthHelper;
use Illuminate\Http\Request;
use App\helpers\ResponseHelper;
use App\Models\AppliedDetails;
use App\Models\AppliedJobs;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class JobSeekerController extends Controller
{

    public function getAllJobs(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = AuthHelper::jwtHandler('parseToken');
            if (!$user) {
                return response()->json(['message' => 'Invalid token.', 'status' => 401], 401);
            }

            $perPage = $request->input('per_page', 10);
            $postedJobs = PostedJobs::with(['company', 'saved_jobs', 'applied_jobs'])->paginate($perPage);

            if ($postedJobs->isEmpty()) {
                return response()->json(['message' => 'No jobs found', 'status' => 404], 404);
            }

            $jobsData = $postedJobs->map(function ($job) use ($user) {
                return [
                    'id' => $job->id,
                    'img' => $job->company->company_profile ? url('storage/' . $job->company->company_profile) : null,
                    'bg_img' => $job->background_img ? url('storage/' . $job->background_img) : null,
                    'title' => $job->job_title,
                    'company' => optional($job->company)->company_name,
                    'company_id' => $job->company_id,
                    'location' => $job->location,
                    'tags' => array_filter(array_merge(
                        json_decode($job->type, true) ?? [],
                        json_decode($job->job_function, true) ?? [],
                        [$job->salary_range],
                        [$job->experience_level]
                    )),
                    'job_description' => $job->job_description,
                    'status' => $job->status,
                    'posted_date' => $job->created_at->format('Y-m-d H:i:s'),
                    'is_applied' => $user->id ? $job->applied_jobs->where('posted_job_id', $job->id)->isNotEmpty() : false,
                    'is_saved' => $user->id ? $job->saved_jobs->where('user_id', $user->id)->isNotEmpty() : false,
                ];
            });

            DB::commit();
            return response()->json([
                'message' => 'All Jobs retrieved successfully',
                'data' => $jobsData,
                'pagination' => [
                    'current_page' => $postedJobs->currentPage(),
                    'total_pages' => $postedJobs->lastPage(),
                    'total_items' => $postedJobs->total(),
                    'per_page' => $postedJobs->perPage(),
                ],
                'status' => 200
            ], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function viewJob($job_id)
    {

        DB::beginTransaction();
        try {

            $user = AuthHelper::jwtHandler('parseToken');
            if (!$user) {
                return response()->json(['message' => 'Invalid token.', 'status' => 401], 401);
            }

            $job = PostedJobs::withTrashed()->with('company')->where('id', $job_id)->first();

            if (!$job) {
                return response()->json(["message" => "Job not found.", "status" => 404], 404);
            }

            $jobTags = json_decode($job->type, true) ?? [];

            $similarJobs = PostedJobs::with(['company', 'saved_jobs', 'applied_jobs'])
                ->where('id', '!=', $job->id)
                ->where(function ($query) use ($jobTags) {
                    foreach ($jobTags as $tag) {
                        $query->orWhereJsonContains('type', $tag);
                    }
                })
                ->limit(5)
                ->get();

            $job = PostedJobs::withTrashed()->with('company', 'applied_jobs')->where('id', $job_id)->first();

            if (!$job) {
                return response()->json(["message" => "Job not found.", "status" => 404], 404);
            }

            $jobsData = [
                "id" => $job->id,
                "company_name" => $job->company->company_name ?? "Unknown",
                "job_title" => $job->job_title,
                "location" => $job->location,
                "status" => $job->status,
                "job_description" => $job->job_description,
                "posted" => $job->created_at->format('Y-m-d'),
                "company_profile" => $job->company->company_profile
                    ? url('storage/' . $job->company->company_profile)
                    : null,
                'bg_img' => $job->background_img ? url('storage/' . $job->background_img) : null,
                "tags" => array_filter(array_merge(
                    json_decode($job->type, true) ?? [],
                    json_decode($job->job_function, true) ?? [],
                    [$job->salary_range],
                    [$job->experience_level]
                )),
                'is_applied' => $user->id ? $job->applied_jobs->where('user_id', $user->id)->isNotEmpty() : false,
                'is_saved' => $user->id ? $job->saved_jobs->where('user_id', $user->id)->isNotEmpty() : false,
                "company_industry" => $job->company->industry_type ?? "N/A",
                "company_phone" => $job->company->company_phone ?? "N/A",
                "company_email" => $job->company->company_email ?? "N/A",
                "company_website" => $job->company->company_website ?? "N/A",
                "year_establish" => $job->company->year_establish ?? "N/A",
            ];

            $similarJobsData = $similarJobs->map(function ($similarJob) use ($user) {
                return [
                    "id" => $similarJob->id,
                    "company_name" => $similarJob->company->company_name ?? "Unknown",
                    'job_title' => $similarJob->job_title,
                    'location' => $similarJob->location,
                    'posted' => $similarJob->created_at,
                    'company_profile' => $similarJob->company->company_profile ? url('storage/' . $similarJob->company->company_profile) : null,
                    'tags' => array_filter(array_merge(
                        json_decode($similarJob->type, true) ?? [],
                        json_decode($similarJob->job_function, true) ?? [],
                        [$similarJob->salary_range],
                        [$similarJob->experience_level]
                    )),
                    "status" => $similarJob->status,
                    'is_saved' => $user->id ? $similarJob->saved_jobs->where('user_id', $user->id)->isNotEmpty() : false,
                    'is_applied' => $user->id ? $similarJob->applied_jobs->where('user_id', $user->id)->isNotEmpty() : false,
                    'company_industry' => $similarJob->company->industry_type,
                    'company_phone' => $similarJob->company->company_phone,
                    'company_email' => $similarJob->company->company_email,
                    'company_website' => $similarJob->company->company_website,
                    'year_establish' => $similarJob->company->year_establish,
                ];
            });


            DB::commit();

            return response()->json([
                "message" => "Successfully fetched job details",
                "data" => [
                    "job" => $jobsData,
                    "similar_jobs" => $similarJobsData,
                ],
                "status" => 200
            ], 200);
        } catch (\Throwable $e) {

            DB::rollBack();
            return response()->json(["message" => "Something went wrong", "errors" => $e->getMessage(), "status" => 500], 500);
        }
    }

    public function getSavedJobs()
    {
        try {
            DB::beginTransaction();
            $user = AuthHelper::jwtHandler('parseToken');

            if (!$user) {
                return response()->json(['message' => 'Invalid token.', 'status' => 401], 401);
            }

            $savedJobs = SavedJobs::where('user_id', $user->id)->with('posted_job.company')->get();

            $savedJobsList = [];
            foreach ($savedJobs as $job) {
                if (!$job->posted_job) {
                    continue;
                }

                $savedJobsList[] = [
                    'id' => $job->posted_job_id,
                    'company_id' => $job->posted_job->company_id ?? null,
                    'img' => $job->posted_job->company->company_profile ? url('storage/' . $job->posted_job->company->company_profile) : null,
                    'company' => optional($job->posted_job->company)->company_name ?? "Unknown",
                    'bg_img' => $job->posted_job->background_img ? url('storage/' . $job->posted_job->background_img) : null,
                    'title' => $job->posted_job->job_title,
                    'location' => $job->posted_job->location,
                    'job_description' => $job->posted_job->job_description,
                    'tags' => array_filter(array_merge(
                        json_decode($job->posted_job->type, true) ?? [],
                        json_decode($job->posted_job->job_function, true) ?? [],
                        [$job->posted_job->salary_range],
                        [$job->posted_job->experience_level]
                    )),
                    'is_jobsaved' => $job->posted_job_id ? true : false,
                    'status' => $job->posted_job->status,
                    'posted_date' => $job->posted_job->created_at->format('Y-m-d H:i:s'),
                ];
            }

            return response()->json(['message' => 'Successfully retrieve all saved jobs', 'data' => $savedJobsList, 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to retrieve all saved jobs', 'error' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function saveJob(Request $request)
    {
        try {
            DB::beginTransaction();
            $user = AuthHelper::jwtHandler('parseToken');

            if (!$user) {
                return response()->json(['message' => 'Invalid token.', 'status' => 401], 401);
            }

            $id = $request->input('id');

            if (!$id) {
                return response()->json(['message' => 'Invalid ID', 'status' => 422], 422);
            }

            $postedJobsData = PostedJobs::where('id', $id)->first();

            if (!$postedJobsData) {
                return response()->json(['message' => 'Job not found', 'status' => 404], 404);
            }

            $existingSavedJob = SavedJobs::where('posted_job_id', $postedJobsData->id)
                ->where('user_id', $user->id)
                ->exists();

            if ($existingSavedJob) {
                $savedJob = SavedJobs::where('posted_job_id', $id);
                if (!$savedJob->exists()) {
                    return response()->json(['message' => 'Job not found in saved jobs list.', 'status' => 404], 404);
                }
                $savedJob->delete();

                $title = "Job Unsaved Successfully";
                $message = "This job has been removed from your saved jobs list. You can explore more opportunities anytime.";

                $notification = ResponseHelper::notificationResponse($title, $message);
            } else {
                SavedJobs::create(['posted_job_id' => $postedJobsData->id, 'user_id' => $user->id]);

                $title = "Job Saved Successfully!";
                $message = "You have successfully saved this job to your list. You can review it anytime in your saved jobs section.";

                $notification = ResponseHelper::notificationResponse($title, $message);
            }


            DB::commit();
            return response()->json(['message' => 'Successfully saved selected job.', 'notification' => $notification, 'data' => ""], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to save selected job', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function unsaveJob(Request $request)
    {
        DB::beginTransaction();
        try {

            $user = AuthHelper::jwtHandler('parseToken');
            if (!$user) {
                return response()->json(['message' => 'Invalid token.', 'status' => 401], 401);
            }

            $id = $request->input('id');
            if (!$id) {
                return response()->json(['message' => 'Invalid ID', 'status' => 422], 422);
            }

            $savedJob = SavedJobs::where('posted_job_id', $id);
            if (!$savedJob->exists()) {
                return response()->json(['message' => 'Job not found in saved jobs list.', 'status' => 404], 404);
            }
            $savedJob->delete();

            $title = "Job Unsaved Successfully";
            $message = "This job has been removed from your saved jobs list. You can explore more opportunities anytime.";

            $notification = ResponseHelper::notificationResponse($title, $message);


            DB::commit();

            return response()->json(['message' => 'Successfully unsave job', 'notification' => $notification, 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json(['message' => 'Failed to unsave job, please try again.', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function applyJob(Request $request)
    {
        DB::beginTransaction();
        try {

            $user = AuthHelper::jwtHandler('parseToken');

            if (!$user) {
                return response()->json(['message' => 'Invalid token.', 'status' => 401], 401);
            }

            $jobData = PostedJobs::where('id', $request->input('posted_job_id'))->first();

            if (!$jobData) {
                return response()->json(['message' => 'Job not found.', 'status' => 404], 404);
            }

            if ($jobData->status === 'Closed') {
                return response()->json(['message' => 'This job is closed and cannot be applied for.', 'status' => 400], 400);
            }

            $alreadyApplied = AppliedJobs::where('user_id', $user->id)
                ->where('posted_job_id',  $request->input('posted_job_id'))
                ->exists();

            if ($alreadyApplied) {
                return response()->json(['message' => 'You have already applied for this job.', 'status' => 400], 400);
            }

            $validator = Validator::make($request->all(), [
                'posted_job_id' => 'required',
                'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
                'cover_letter' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
                'contact_number' => 'required_with:contact_number|regex:/^9\d{9}$/',
                'availability_time_1' => 'required',
                'availability_time_2' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['message' => $validator->errors()->getMessages()], 422);
            }

            $resume = $request->file('resume');
            $resumeName = time() . '_' . $resume->getClientOriginalName();
            $resumePath = $resume->storeAs('resumes', $resumeName, 'public');

            $coverLetterPath = null;
            if ($request->hasFile('cover_letter')) {
                $coverLetter = $request->file('cover_letter');
                $coverLetterName = time() . '_' . $coverLetter->getClientOriginalName();
                $coverLetterPath = $coverLetter->storeAs('cover_letters', $coverLetterName, 'public');
            }

            $appliedJob =  AppliedJobs::create([
                'user_id' => $user->id,
                'company_id' => $jobData->company_id,
                'posted_job_id' => $request->input('posted_job_id'),
                "resume" => $resumePath,
                "cover_letter" => $coverLetterPath,
                "contact_number" => $request->input('contact_number'),
                "availability_time_1" => $request->input('availability_time_1'),
                "availability_time_2" => $request->input('availability_time_2'),
            ]);

            AppliedDetails::create([
                'applied_job_id' => $appliedJob->id,
                'user_id' => $user->id,
            ]);

            DB::commit();
            return response()->json(['message' => 'Applied Job Successfully', 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to apply job', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function withdrawApplication(Request $request)
    {
        DB::beginTransaction();
        try {

            $user = AuthHelper::jwtHandler('parseToken');

            if (!$user) {
                return response()->json(['message' => 'Invalid token.', 'status' => 401], 401);
            }

            $validator = Validator::make($request->all(), [
                'applied_job_id' => 'required|exists:applied_jobs,posted_job_id',
            ], [
                'applied_job_id.exists' => "No posted job found.",
            ]);

            if ($validator->fails()) {
                return response()->json(['message' => $validator->errors()->getMessages(), 'status' => 422], 422);
            }

            AppliedJobs::where('user_id', $user->id)->where('posted_job_id', $request->input('applied_job_id'))->delete();

            $title = "Application Withdrawn";
            $message = "Your job application has been successfully withdrawn. We hope you find the right opportunity soon!";
            $notification = ResponseHelper::notificationResponse($title, $message);

            DB::commit();

            return response()->json(['message' => 'Job has been successfully cancelled.', 'notification' => $notification, 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to cancel applied job.', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function getAppliedJobs()
    {
        try {
            $user = AuthHelper::jwtHandler('parseToken');

            if (!$user) {
                return response()->json(['message' => 'Invalid token.', 'status' => 401], 401);
            }

            $appliedJobs = AppliedJobs::where('user_id', $user->id)->with('posted_job')->get();

            $appliedJobsData = [];
            foreach ($appliedJobs as $appliedJob) {
                $resumeFilename = $appliedJob->resume ? preg_replace('/^\d+_/', '', basename($appliedJob->resume)) : null;
                $coverLetterFilename = $appliedJob->cover_letter ? preg_replace('/^\d+_/', '', basename($appliedJob->cover_letter)) : null;

                $documents = [];

                if ($appliedJob->resume) {
                    $documents[] = [
                        "icon" => url("storage/assets/" . (str_ends_with($resumeFilename, '.pdf') ? "pdf-icon.svg" : "docx-icon.svg")),
                        "title" => $resumeFilename,
                        "file" => url('storage/' . $appliedJob->resume),
                        "uploaded_date" => $appliedJob->created_at->format('Y-m-d H:i:s'),
                    ];
                }

                if ($appliedJob->cover_letter) {
                    $documents[] = [
                        "icon" => url("storage/assets/" . (str_ends_with($coverLetterFilename, '.pdf') ? "pdf-icon.svg" : "docx-icon.svg")),
                        "title" => $coverLetterFilename,
                        "file" => url('storage/' . $appliedJob->cover_letter),
                        "uploaded_date" => $appliedJob->created_at->format('Y-m-d H:i:s'),
                    ];
                }

                $appliedJobsData[] = [
                    'posted_job_id' => $appliedJob->posted_job_id,
                    'company_id' => $appliedJob->posted_job->company_id ?? null,
                    'company_profile' => $appliedJob->posted_job->company->company_profile ? url('storage/' . $appliedJob->posted_job->company->company_profile) : null,
                    'company' => optional($appliedJob->posted_job->company)->company_name ?? "Unknown",
                    'company_overview' => $appliedJob->posted_job->company->company_description ?? null,
                    'bg_img' => $appliedJob->posted_job->background_img ? url('storage/' . $appliedJob->posted_job->background_img) : null,
                    'title' => $appliedJob->posted_job->job_title,
                    'location' => $appliedJob->posted_job->location,
                    'job_description' => $appliedJob->posted_job->job_description,
                    'tags' => array_filter(array_merge(
                        json_decode($appliedJob->posted_job->type, true) ?? [],
                        json_decode($appliedJob->posted_job->job_function, true) ?? [],
                        [$appliedJob->posted_job->salary_range],
                        [$appliedJob->posted_job->experience_level]
                    )),
                    'is_jobsaved' => $appliedJob->posted_job_id ? true : false,
                    'status' => $appliedJob->posted_job->status,
                    'applicant_status' => $appliedJob->status,
                    'posted_date' => $appliedJob->posted_job->created_at->format('Y-m-d H:i:s'),
                    'date_applied' => $appliedJob->created_at->format('Y-m-d H:i:s'),
                    'uploaded_resume' => $appliedJob->resume
                        ? url('storage/' . $appliedJob->resume)
                        : null,
                    'uploaded_cover_letter' => $appliedJob->cover_letter
                        ? url('storage/' . $appliedJob->cover_letter)
                        : null,
                    'documents' => $documents,
                ];
            }

            // dd($appliedJobsData);

            return response()->json(['message' => 'Successfuly get applied jobs', 'data' => $appliedJobsData, 'status' => 200], 200);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Failed to get applied jobs.', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }
}
