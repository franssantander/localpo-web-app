<?php

namespace App\Http\Controllers;

use App\Models\PostedJobs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    public function getAllJobs(Request $request)
    {

        DB::beginTransaction();
        try {

            $perPage = $request->input('per_page', 10);
            $postedJobs = PostedJobs::with('company')->paginate($perPage);

            if ($postedJobs->isEmpty()) {
                return response()->json(['message' => 'No jobs found', 'status' => 404], 404);
            }

            $jobsData = $postedJobs->map(function ($job) {
                return [
                    'id' => $job->id,
                    'img' => $job->company->company_profile ? url('storage/' . $job->company->company_profile) : null,
                    'bg_img' => $job->background_img ? url('storage/' . $job->background_img) : null,
                    'title' => $job->job_title,
                    'company' => optional($job->company)->company_name,
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

    public function viewJob(Request $request)
    {

        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer|exists:posted_jobs,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()->getMessages(),
                    'status' => 422
                ], 422);
            }

            $job = PostedJobs::withTrashed()->with('company')->where('id', $request->id)->first();

            if (!$job) {
                return response()->json(["message" => "Job not found.", "status" => 404], 404);
            }

            $jobTags = json_decode($job->type, true) ?? [];

            $similarJobs = PostedJobs::with('company')
                ->where('id', '!=', $job->id)
                ->where(function ($query) use ($jobTags) {
                    foreach ($jobTags as $tag) {
                        $query->orWhereJsonContains('type', $tag);
                    }
                })
                ->limit(5)
                ->get();

            $job = PostedJobs::withTrashed()->with('company')->where('id', $request->id)->first();

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
                "company_industry" => $job->company->industry_type ?? "N/A",
                "company_phone" => $job->company->company_phone ?? "N/A",
                "company_email" => $job->company->company_email ?? "N/A",
                "company_website" => $job->company->company_website ?? "N/A",
                "year_establish" => $job->company->year_establish ?? "N/A",
            ];

            $similarJobsData = $similarJobs->map(function ($similarJob) {
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
}