<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\PostedJobs;
use App\helpers\AuthHelper;
use App\helpers\CardDataHelper;
use App\helpers\TableHelper;
use Illuminate\Http\Request;
use App\helpers\ResponseHelper;
use App\Models\PermissionPerRole;
use PhpParser\Node\Stmt\TryCatch;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UsersManagementController extends Controller
{
    public function getUsersManagement(Request $request)
    {
        DB::beginTransaction();

        try {

            $user = AuthHelper::jwtHandler("parseToken");

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $perPage = $request->input('per_page', 10);
            $users = User::withTrashed()
                ->where('company_id', $user->company_id)
                ->paginate($perPage);

            $usersData = $users->items();

            $permissions = PermissionPerRole::where('title', 'Users Management')->get();

            $usersTableData = array_map(function ($user) use ($permissions) {
                $tableActions = [];


                foreach ($permissions as $permission) {
                    if ($permission->retrieve) {
                        $viewLink = '/app/users-management/' . $user->employment_id . '/view';
                        $tableActions[] = TableHelper::tableActions("View", null, $viewLink, NULL, "new_page", "radix-icons:eye-open");
                    }
                    if ($permission->update) {
                        $viewLink = '/app/users-management/' . $user->employment_id . '/edit';
                        $tableActions[] = TableHelper::tableActions("Edit", null, $viewLink, NULL, "new_page", "radix-icons:pencil-1");

                        if ($user->status === "Inactive") {
                            $url = "/app-usersmanagement/activate-user/";
                            $tableActions[] = TableHelper::tableActions("Activate", null, null, $url,  "modal", "radix-icons:check-circled");
                        }
                    }

                    if ($permission->delete) {
                        if ($user->status !== "Deleted") {
                            $url = "/app-usersmanagement/delete-user/";
                            $tableActions[] = TableHelper::tableActions("Delete", "red", null, $url, "modal", "radix-icons:trash");
                        }

                        if ($user->status === "Active") {
                            $url = "/app-usersmanagement/deactivate-user/";
                            $tableActions[] = TableHelper::tableActions("Deactivate", "red", null, $url, "modal", "radix-icons:exclamation-triangle");
                        }

                        if ($user->status === "Deleted") {
                            $url =  "/app-usersmanagement/restore-user/";
                            $tableActions[] = TableHelper::tableActions("Restore", null, null, $url, "modal", "radix-icons:reload");
                        }
                    }
                }

                return [
                    'id' => $user->id,
                    'employment_id' => $user->employment_id,
                    'company_name' => $user->company_name,
                    'office_location' => $user->company->company_address,
                    'company_id' => $user->company_id,
                    'profile_picture' => $user->profile_picture,
                    'name' => $user->name,
                    'address_1' => $user->address_1,
                    'address_2' => $user->address_2,
                    'barangay' => $user->barangay,
                    'city_municipalities' => $user->city_municipalities,
                    'date_birth' => $user->date_birth,
                    'province' => $user->province,
                    'region' => $user->region,
                    'email' => $user->email,
                    'role' => $user->role,
                    'status' => $user->status,
                    'department' => $user->department,
                    'phone_number' => $user->phone_number,
                    'reports_to' => $user->reports_to,
                    'date_join' => $user->created_at,
                    'actions' => $tableActions,
                ];
            }, $usersData);

            $overview = [];

            $overview[] = CardDataHelper::getCardData("Total Users", "All Users", 'mdi:users-group-outline', $user, NULL, User::class);
            $overview[] = CardDataHelper::getCardData("Total Active Users", "Active Users", 'mdi:user-check-outline', $user, 'Active', User::class);
            $overview[] = CardDataHelper::getCardData("Total Inactive Users", "Inactive Users", 'mdi:account-alert-outline', $user, 'Inactive', User::class);
            $overview[] = CardDataHelper::getCardData("Total Deleted Users", "Deleted Users", 'mdi:user-remove-outline', $user, 'Deleted', User::class);


            DB::commit();
            return response()->json(['message' => 'Successfully fetched users management data', 'data' => ['users' => $usersTableData, 'overview' => $overview], 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function editUserProfile(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = AuthHelper::jwtHandler('parseToken');
            if (!$user) {
                return response()->json([
                    'error' => 'Invalid token.',
                    'status' => 401,
                ], 401);
            }

            // Define validation rules
            $validationRules = [
                'profile_picture' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
                'department' => 'nullable|string|max:255',
                'position' => 'nullable|string|max:255',
                'name' => 'required_with:name|string|max:255',
                'email' => 'required_with:email|email|unique:users,email,' . $user->id,
                'phone_number' => 'required_with:phone_number|unique:users,phone_number,' . $user->id . '|regex:/^9\d{9}$/',
                'date_birth' => 'nullable|date_format:d/m/Y',
                'address_1' => 'nullable|string|max:255',
                'address_2' => 'nullable|string|max:255',
                'region' => 'nullable|string|max:255',
                'region_code' => 'nullable|string|max:255',
                'province' => 'nullable|string|max:255',
                'province_code' => 'nullable|string|max:255',
                'city_municipalities' => 'nullable|string|max:255',
                'municipalities_code' => 'nullable|string|max:255',
                'barangay' => 'nullable|string|max:255',
                'barangay_code' => 'nullable|string|max:255',
            ];

            // Validate the request payload
            $validator = Validator::make($request->all(), $validationRules);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors(),
                    'status' => 422,
                ], 422);
            }

            // Prepare data to update
            $dataToUpdate = [];
            foreach ($validationRules as $field => $rule) {
                if ($request->has($field)) {
                    $dataToUpdate[$field] = $request->$field;
                }
            }

            // Handle `date_birth`
            if ($request->filled('date_birth')) {
                $dataToUpdate['date_birth'] = Carbon::createFromFormat('d/m/Y', $request->date_birth)->format('Y-m-d');
            }

            // Handle `profile_picture`
            if ($request->hasFile('profile_picture')) {
                $dataToUpdate['profile_picture'] = $request->file('profile_picture')->store('user_profiles', 'public');
            }

            // Update user data
            $user->update($dataToUpdate);

            $title = "Profile Updated Successfully!";
            $message = "Your profile information has been successfully updated. All changes have been saved and will be reflected across your account.";

            $notification = ResponseHelper::notificationResponse($title, $message);

            DB::commit();
            return response()->json(['message' => 'User profile successfully updated', 'notification' => $notification, 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }


    public function viewUser(Request $request)
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

            $userData = User::with('company')->withTrashed()->where('id', $request->id)->first();

            $users = [
                'id' => $userData->id,
                'employment_id' => $userData->employment_id,
                'company_name' => $userData->company_name,
                'profile_picture' => $userData->profile_picture ? url('storage/' . $userData->profile_picture) : null,
                'user_profiles' => $userData->company_name,
                'name' => $userData->name,
                'phone_number' => $userData->phone_number,
                'office_location' => $userData->company->company_address,
                'address_1' => $userData->address_1,
                'address_2' => $userData->address_2,
                'barangay' => $userData->barangay,
                'barangay_code' => $userData->barangay_code,
                'city_municipalities' => $userData->city_municipalities,
                'municipalities_code' => $userData->municipalities_code,
                'date_birth' => $userData->date_birth,
                'province' => $userData->province,
                'province_code' => $userData->province_code,
                'region' => $userData->region,
                'region_code' => $userData->region_code,
                'email' => $userData->email,
                'role' => $userData->role,
                'department' => $userData->department,
                'status' => $userData->status,
                'reports_to' => $userData->reports_to,
            ];

            return response()->json(['data' => $users, 'message' => 'Successfully view user data', 'status' => 200], 200);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function deleteUser(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:users,id'
            ]);

            if ($validator->fails()) {
                $error = $validator->errors()->first();
                return response()->json([
                    'message' => $error,
                    'status' => 422
                ], 422);
            }

            $authenticateUser = AuthHelper::jwtHandler('parseToken');

            if (!$authenticateUser) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $title = "User Deleted Successfully";
            $message = "The selected user has been removed from the system.";

            $notification = ResponseHelper::notificationResponse($title, $message);

            $user = User::find($request->id);
            $user->status = "Deleted";
            $user->save();
            $user->delete();

            DB::commit();

            return response()->json(['message' => 'Successfully delete user data', 'notification' => $notification, 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function deactivateUser(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:users,id'
            ]);

            if ($validator->fails()) {
                $error = $validator->errors()->first();
                return response()->json([
                    'message' => $error,
                    'status' => 422
                ], 422);
            }

            $authenticateUser = AuthHelper::jwtHandler('parseToken');

            if (!$authenticateUser) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $title = "User Deactivate Successfully";
            $message = "The selected user has been deactivated from the system.";

            $notification = ResponseHelper::notificationResponse($title, $message);

            $user = User::find($request->id);
            $user->status = "Inactive";
            $user->save();

            DB::commit();

            return response()->json(['message' => 'Successfully deactivate user data', 'notification' => $notification, 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function restoreUser(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:users,id'
            ]);

            if ($validator->fails()) {
                $error = $validator->errors()->first();
                return response()->json([
                    'message' => $error,
                    'status' => 422
                ], 422);
            }

            $authenticateUser = AuthHelper::jwtHandler('parseToken');

            if (!$authenticateUser) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $title = "User Restore Successfully";
            $message = "The selected user has been restored in the system.";
            $notification = ResponseHelper::notificationResponse($title, $message);

            $user = User::withTrashed()->find($request->id);

            if (!$user) {
                return response()->json(['message' => 'User not found', 'status' => 404], 404);
            }

            $user->restore();
            $user->status = "Active";
            $user->save();

            DB::commit();

            return response()->json(['message' => 'Successfully restore user data', 'notification' => $notification, 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }

    public function activateUser(Request $request)
    {
        DB::beginTransaction();
        try {

            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:users,id'
            ]);

            if ($validator->fails()) {
                $error = $validator->errors()->first();
                return response()->json([
                    'message' => $error,
                    'status' => 422
                ], 422);
            }

            $authenticateUser = AuthHelper::jwtHandler('parseToken');

            if (!$authenticateUser) {
                return response()->json([
                    'message' => 'Invalid token.',
                    'status' => 401
                ], 401);
            }

            $title = "User Activate Successfully";
            $message = "The selected user has been activate in the system.";
            $notification = ResponseHelper::notificationResponse($title, $message);

            $user = User::withTrashed()->find($request->id);

            if (!$user) {
                return response()->json(['message' => 'User not found', 'status' => 404], 404);
            }

            $user->status = "Active";
            $user->save();

            DB::commit();

            return response()->json(['message' => 'Successfully activate user data', 'notification' => $notification, 'status' => 200], 200);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json(['message' => 'Something went wrong', 'errors' => $e->getMessage(), 'status' => 500], 500);
        }
    }
}