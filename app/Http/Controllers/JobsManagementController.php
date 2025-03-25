<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\PostedJobs;
use App\helpers\AuthHelper;
use App\helpers\TableHelper;
use App\Models\AppliedJobs;
use App\Models\PermissionPerRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class JobsManagementController extends Controller
{
    public function getJobsManagement(Request $request)
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

            $postedJobs = PostedJobs::withTrashed()
                ->withCount('applied_jobs')
                ->where('company_id', $user->company_id)
                ->paginate($perPage);

            $appliedJobs = AppliedJobs::where('company_id', $user->company_id)->get();
            $postedJobsData = $postedJobs->items();

            // dd($postedJobs);

            $permissions = PermissionPerRole::where('title', 'Jobs Management')->get();

            $jobsData = array_map(function ($job) use ($permissions) {
                $tableActions = [];

                foreach ($permissions as $permissionPerRole) {
                    if ($permissionPerRole->retrieve) {
                        $viewLink = '/app/jobs-management/' . urlencode($job->job_title) . '/' . $job->id . '/view-job';
                        $tableActions[] = TableHelper::tableActions("View", null, $viewLink, NULL, "new_page", "radix-icons:eye-open");
                    }

                    if ($permissionPerRole->update && $job->status === "Active") {
                        $viewLink = '/app/jobs-management/' . urlencode($job->job_title) . '/' . $job->id . '/edit-job';
                        $tableActions[] = TableHelper::tableActions("Edit", null, $viewLink, NULL, "new_page", "radix-icons:pencil-1");
                    }

                    if ($permissionPerRole->delete) {
                        $label = $job->status === "Active" ? "Close job" : "Reopen job";
                        $color = $job->status === "Active" ? "red" : "";
                        $icon = $job->status === "Active" ? "radix-icons:cross-1" : "radix-icons:backpack";
                        $tableActions[] = TableHelper::tableActions($label, $color, null, NULL, "modal", $icon);
                    }
                }

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
                    'job_expiry' => $job->job_expiry,
                    'status' => $job->status,
                    'applications' => $job->applied_jobs_count,
                    'date_posted' => $job->created_at ? $job->created_at->format('Y-m-d') : null,
                    'last_updated' => $job->updated_at ? $job->updated_at->format('Y-m-d') : null,
                    'actions' => $tableActions

                ];
            }, $postedJobsData);

            DB::commit();

            return response()->json(["message" => "Successfully fetched jobs management", "data" => $jobsData, "status" => 200], 200);
        } catch (Throwable $e) {

            DB::rollBack();
            return response()->json(["message" => "Something went wrong", "errors" => $e->getMessage(), "status" => 500], 500);
        }
    }

    public function viewJob(Request $request)
    {
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

            $user = AuthHelper::jwtHandler('parseToken');

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }



            $postedJobs = PostedJobs::withTrashed()->where('id', $request->id)->first();
            $applicants = AppliedJobs::with('user')->where('posted_job_id', $request->id)->get();

            // dd($applicants->resume);

            if (!$postedJobs) {
                return response()->json(["message" => "Job not found.", "status" => 404], 404);
            }

            $jobData = [
                'id' => $postedJobs->id,
                'job_title' => $postedJobs->job_title,
                'company_profile' => $postedJobs->company->company_profile ? url('storage/' . $postedJobs->company->company_profile) : null,
                'company' => $postedJobs->company->company_name ?? null,
                'background_img' => $postedJobs->background_img ? url('storage/' . $postedJobs->background_img) : null,
                'company_description' => $postedJobs->company->company_description ?? null,
                'location' => $postedJobs->location,
                'job_description' => $postedJobs->job_description,
                'type' => $postedJobs->type,
                'salary_range' => $postedJobs->salary_range,
                'job_function' => $postedJobs->job_function,
                'experience_level' => $postedJobs->experience_level,
                'industry' => $postedJobs->industry,
                'tags' => array_merge(
                    json_decode($postedJobs->type, true) ?? [],
                    json_decode($postedJobs->job_function, true) ?? [],
                    [$postedJobs->salary_range],
                    [$postedJobs->experience_level]
                ),
                'job_expiry' => $postedJobs->job_expiry,
                'posted_date' => $postedJobs->created_at->format('Y-m-d'),
                'status' => $postedJobs->status,
            ];

            $applicantsData = [];

            foreach ($applicants as $applicant) {
                $resumeFilename = $applicant->resume ? preg_replace('/^\d+_/', '', basename($applicant->resume)) : null;
                $coverLetterFilename = $applicant->cover_letter ? preg_replace('/^\d+_/', '', basename($applicant->cover_letter)) : null;
                $documents = [];

                if ($applicant->resume) {
                    $documents[] = [
                        "icon" => url("storage/assets/" . (str_ends_with($resumeFilename, '.pdf') ? "pdf-icon.svg" : "docx-icon.svg")),
                        "title" => $resumeFilename,
                        "file" => url('storage/' . $applicant->resume),
                        "uploaded_date" => $applicant->created_at->format('Y-m-d H:i:s'),
                    ];
                }

                if ($applicant->cover_letter) {
                    $documents[] = [
                        "icon" => url("storage/assets/" . (str_ends_with($coverLetterFilename, '.pdf') ? "pdf-icon.svg" : "docx-icon.svg")),
                        "title" => $coverLetterFilename,
                        "file" => url('storage/' . $applicant->cover_letter),
                        "uploaded_date" => $applicant->created_at->format('Y-m-d H:i:s'),
                    ];
                }


                $applicantsData[] = [
                    'profile_picture' => $applicant->user->profile_picture ? url('storage/' . $applicant->user->profile_picture) : '',
                    'bg_cover' => '',
                    'applicant_name' => $applicant->user->name,
                    'date_applied' => $applicant->created_at->format('Y-m-d'),
                    'applicant_email' => $applicant->user->email,
                    'description' => $applicant->user->description,
                    'contact_number' => $applicant->user->phone_number,
                    'location' => $applicant->user->municipalities . ', ' . $applicant->user->province,
                    'status' => $applicant->status,
                    'available_date' => $applicant->availability_days,
                    'available_time' => $applicant->availability_time_1 . ' - ' . $applicant->availability_time_2,
                    'availability_time_1' => $applicant->availability_time_1,
                    'availability_time_2' => $applicant->availability_time_2,
                    'experience' => $applicant->user->experience,
                    'skills' => $applicant->user->skills,
                    'documents' => $documents
                ];
            }


            return response()->json(["message" => "Successfully fetched job details", "data" => [
                'jobs_data' =>  $jobData,
                'applicants_data' => $applicantsData,
            ], "status" => 200], 200);
        } catch (Throwable $e) {

            return response()->json(["message" => "Something went wrong", "errors" => $e->getMessage(), "status" => 500], 500);
        }
    }
}