<?php

namespace App\Http\Controllers;

use App\helpers\AuthHelper;
use App\Models\AppliedJobs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApplicationsManagementController extends Controller
{
    public function  getApplicationsManagement()
    {
        try {
            DB::beginTransaction();

            $user = AuthHelper::jwtHandler("parseToken");

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $applications = AppliedJobs::with('user')->where('company_id', $user->company_id)->get();

            $applicationsData = [];

            foreach ($applications as $application) {
                $applicationsData[] = [
                    'id' => $application->id,
                    'applicant_name' => $application->user->name,
                    'job_applied' => $application->posted_job->job_title,
                    'status' => $application->status,
                    'experience_level' => 3,
                    'date_applied' => $application->created_at,
                ];
            }



            DB::commit();
            return response()->json([
                'status' => 'success',
                'message' => 'Applications fetched successfully',
                'data' => $applicationsData
            ], 200);
        } catch (\Throwable $e) {

            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while fetching applications',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}