<?php

namespace App\Http\Controllers;

use App\helpers\AuthHelper;
use App\helpers\TableHelper;
use App\Models\AppliedDetails;
use App\Models\AppliedJobs;
use App\Models\PermissionPerRole;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ApplicationsManagementController extends Controller
{
    public function  getApplicationsManagement()
    {
        try {
            DB::beginTransaction();

            $user = AuthHelper::jwtHandler("parseToken");
            $permissions = PermissionPerRole::where('title', 'Applications')->get();

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $applications = AppliedJobs::with('user')->where('company_id', $user->company_id)->get();

            $applicationsData = $applications->map(function ($application) use ($permissions) {
                $tableActions = [];

                foreach ($permissions as $permission) {
                    if ($permission->retrieve) {
                        $viewLink = '/app/applications/' . $application->id;
                        $tableActions[] = TableHelper::tableActions("View", null, $viewLink, NULL, "new_page", "radix-icons:eye-open");
                    }

                    if ($permission->update) {
                        $tableActions[] = TableHelper::tableActions('Reject', 'red', null, null, null, 'radix-icons:cross-1');
                    }
                }

                return [
                    'id' => $application->id,
                    'applicant_name' => $application->user->name,
                    'job_applied' => $application->posted_job->job_title,
                    'status' => $application->status,
                    'date_applied' => $application->created_at->format('d/m/y'),
                    'actions' => $tableActions
                ];
            });



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

    public function viewApplication(Request $request)
    {
        try {

            $user = AuthHelper::jwtHandler("parseToken");

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                'application_id' => 'required|integer|exists:applied_jobs,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $appliedDetails = AppliedDetails::with('applied_job', 'posted_jobs', 'user')
                ->where('applied_job_id', $request->application_id)
                ->get();

            if (!$appliedDetails) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Application details not found',
                ], 404);
            }

            $appliedDetailsData = $appliedDetails->map(function ($applied) {
                return [
                    'applicant_name' => $applied->user->name,
                    'job_title' => '',
                    'applied_job' => $applied->posted_jobs->job_title,
                    'date_applied' => $applied->applied_job->created_at->format('d/m/y'),
                    'status' => $applied->applied_job->status,
                    'hire_stage' => '',
                    'applicant_email' => $applied->user->email,
                    'applicant_phone' => $applied->user->phone_number,
                    'img_profile' => $applied->user->profile_picture,
                    'description' => $applied->user->description,
                    'skills' => $applied->user->skills,
                    'work_experience' => $applied->user->experience,
                    'availability_time' => [$applied->applied_job->availability_time_1, $applied->applied_job->availability_time_2],
                    'notes' => $applied->notes,
                    'interview_details' =>
                    [
                        ['title_head' => 'Interview Date', 'value' => $applied->interview_date],
                        ['title_head' => 'Interview Type', 'value' => $applied->interview_type],
                        ['title_head' => 'Interview Location', 'value' => $applied->interview_location],
                        ['title_head' => 'Interview Status', 'value' => $applied->interview_status],
                    ],
                    'assigned_interview' => $applied->assigned_interviewer,
                    'shortlisted_details' =>
                    [
                        ['title_head' => 'Shortlisted Date', 'value' => $applied->shortlisted_date],
                        ['title_head' => 'Shortlisted By', 'value' => $applied->shortlisted_by],
                        ['title_head' => 'Shortlisted Status', 'value' => $applied->shortlisted_status],
                    ],
                    'assigned_review' => $applied->assigned_review,
                    'finalstage_details' =>
                    [
                        ['title_head' => 'Date Hired', 'value' => $applied->date_hired],
                        ['title_head' => 'Offer Accepted', 'value' => $applied->offer_accepted],
                    ],
                    'finalstage_status' => $applied->offer_status,
                    'notes' => $applied->notes,
                ];
            });

            // dd($appliedDetails);

            return response()->json([
                'status' => 'success',
                'message' => 'Application details fetched successfully',
                'data' => $appliedDetailsData,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while fetching application details',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
