<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Companies;
use App\Helpers\AuthHelper;
use App\helpers\ResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Mail\EmailVerification;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class UserRegistrationController extends Controller
{
    public function userRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'required|unique:users,phone_number|regex:/^9\d{9}$/',
            'password' => [
                'required',
                'confirmed',
                'min:8',
                'regex:/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/'
            ],
        ], [
            'password.regex' => 'The password must contain at least 8 characters, including a number and a special character.',
        ]);

        //* validate input data before creating user in database
        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors(),
                "status" => 422,
            ], 422);
        }

        DB::beginTransaction();

        try {
            //* generate verification code for user email verification
            $verificationCode =  AuthHelper::generateVerificationCode();
            $user_role = $request->role;
            $user = null;
            $token = null;
            $verificationUrl = null;

            switch ($user_role) {
                case "job_seeker":
                    $user = User::create([
                        'profile_picture' => $request->profile_picture,
                        'name' => $request->name,
                        'email' => $request->email,
                        'phone_number' => $request->phone_number,
                        'role' => "Job Seeker",
                        'department' => NULL,
                        'password' => Hash::make($request->password),
                        'verification_code' => $verificationCode,
                    ]);


                    $token = AuthHelper::jwtHandler("fromUser", $user);
                    $user->update(['token' => $token]);

                    $verificationUrl = "/sign-up/user/email-verification?email={$user->email}";

                    //* send verification email to user
                    Mail::to($user->email)->send(new EmailVerification($user, $verificationCode));

                    $user->status = "pending email verification";
                    $user->save();

                    break;
                case "employeer":
                    $user = User::create([
                        'profile_picture' => $request->profile_picture,
                        'name' => $request->name,
                        'email' => $request->email,
                        'phone_number' => $request->phone_number,
                        'password' => Hash::make($request->password),
                        'verification_code' => $verificationCode,
                    ]);

                    $token = AuthHelper::jwtHandler("fromUser", $user);
                    $user->update(['token' => $token]);

                    $verificationUrl = "/sign-up/employer/email-verification?email={$user->email}";

                    //* send verification email to user
                    Mail::to($user->email)->send(new EmailVerification($user, $verificationCode));

                    $user->role = "HR Manager";
                    $user->department = "Human Resources";
                    $user->status = "pending email verification";
                    $user->save();

                default:
                    break;
            }

            DB::commit();
            return response()->json([
                "message" => "User registered successfully. Please check your email to verify your account.",
                "access_token" => $token,
                "verification_url" => $verificationUrl,
                "status" => 200
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                "message" => "Registration failed. Please try again.",
                "error" => $e->getMessage(),
                "status" => 500
            ], 500);
        }
    }

    public function verifyEmail(Request $request)
    {
        $request->validate([
            'verification_code' => 'required|numeric',
        ]);

        DB::beginTransaction();

        try {
            $user = AuthHelper::jwtHandler("parseToken");

            if (!$user) {
                return response()->json([
                    "message" => "Invalid token.",
                    "status" => 401
                ], 401);
            }

            // Validate the verification code
            if ($user->verification_code !== $request->verification_code) {
                return response()->json([
                    "message" => "Invalid verification code.",
                    "status" => 400
                ], 400);
            }

            // Invalidate old token and generate a new one
            JWTAuth::invalidate(JWTAuth::getToken());
            $newToken = AuthHelper::jwtHandler("fromUser", $user);
            $url = null;

            switch ($user->role) {
                case 'Job Seeker':
                    $url = "/user-profile";
                    $user->status = "complete user profile";
                    break;

                case 'HR Manager':
                    $url = "/app/company-profile";
                    $user->status = "complete company profile";
                    break;

                default:
                    return response()->json([
                        "message" => "Invalid user role.",
                        "status" => 400
                    ], 400);
            }

            $user->token = $newToken;
            $user->email_verified_at = now();
            $user->verification_code = null;
            $user->is_verified = true;
            $user->save();

            DB::commit();

            return response()->json([
                "message" => "Email verified successfully.",
                "access_token" => $newToken,
                "url" => $url,
                "status" => 200
            ], 200);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            DB::rollBack();
            return response()->json([
                "message" => "Token has expired.",
                "status" => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            DB::rollBack();
            return response()->json([
                "message" => "Invalid token.",
                "status" => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            DB::rollBack();
            return response()->json([
                "message" => "Token not provided.",
                "status" => 401
            ], 401);
        } catch (\Exception $errors) {
            DB::rollBack();
            return response()->json([
                "errors" => $errors->getMessage(),
                "message" => "Something went wrong.",
                "status" => 500
            ], 500);
        }
    }



    public function resendCode()
    {
        DB::beginTransaction();
        try {

            // $user = JWTAuth::parseToken()->authenticate();
            $user = AuthHelper::jwtHandler("parseToken");

            if (!$user) {
                return response()->json([
                    'message' => 'User not found.',
                    'status' => 404
                ], 404);
            }

            if ($user->status === "Active") {
                return response()->json([
                    "message" => "User is already active.",
                    "status" => 400
                ], 400);
            }

            // Generate a new verification code
            $verificationCode = AuthHelper::generateVerificationCode();
            $user->update(['verification_code' => $verificationCode]);
            DB::commit();

            Mail::to($user->email)->send(new EmailVerification($user, $verificationCode));

            return response()->json([
                "message" => "A new verification code has been sent to your email address. Please check your inbox or spam folder to verify your account.",
                "notification" => true,
                "status" => 200
            ], 200);
        } catch (\Exception $errors) {
            DB::rollBack();
            return response()->json([
                "errors" => $errors->getMessage(),
                "message" => "Something went wrong.",
                "status" => 500
            ], 500);
        }
    }

    public function userProfile(Request $request)
    {

        DB::beginTransaction();
        try {
            $user = AuthHelper::jwtHandler("parseToken");

            if (!$user) {
                return response()->json([
                    'error' => 'Invalid token.',
                    'status' => 401,
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                'profile_picture' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
                'date_birth' => 'nullable|date_format:d/m/Y',
                'address_1' => 'nullable|required|string|max:255',
                'address_2' => 'nullable|string|max:255',
                'skills' => 'nullable',
                'description' => 'required',
                'experience' => 'nullable',
                'region' => 'nullable|required|string|max:255',
                'region_code' => 'nullable|string|max:255',
                'province' => 'nullable|required|string|max:255',
                'province_code' => 'nullable|string|max:255',
                'municipalities' => 'nullable|required|string|max:255',
                'municipalities_code' => 'nullable|string|max:255',
                'barangay' => 'nullable|required|string|max:255',
                'barangay_code' => 'nullable|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    "message" => $validator->errors(),
                    "status" => 422,
                ], 422);
            }


            // Prepare data to update
            $dataToUpdate = [];

            if ($request->filled('date_birth')) {
                $dataToUpdate['date_birth'] = Carbon::createFromFormat('d/m/Y', $request->date_birth)->format('Y-m-d');
            }

            if ($request->hasFile('profile_picture')) {
                $dataToUpdate['profile_picture'] = $request->file('profile_picture')->store('user_profiles', 'public');
            }

            $fields = [
                'address_1',
                'address_2',
                'skills',
                'description',
                'experience',
                'region',
                'region_code',
                'province',
                'province_code',
                'municipalities',
                'municipalities_code',
                'barangay',
                'barangay_code'
            ];

            foreach ($fields as $field) {
                if ($request->filled($field)) {
                    $dataToUpdate[$field] = $request->$field;
                }
            }

            // Update user record
            $user->update($dataToUpdate);
            $user->status = "Active";
            $user->save();

            DB::commit();

            return response()->json([
                "message" => "Your profile has been successfully updated. You can now access all features of your account.",
                "status" => 200,
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                "message" => "Something went wrong",
                "error" => $e->getMessage(),
                "status" => 500,
            ], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            DB::rollBack();

            return response()->json([
                "message" => "Token has expired.",
                "status" => 401,
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            DB::rollBack();
            return response()->json([
                "message" => "Invalid token.",
                "status" => 401,
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            DB::rollBack();
            return response()->json([
                "message" => "Token not provided.",
                "status" => 401,
            ], 401);
        }
    }


    public function companyProfile(Request $request)
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

            $validationRules = [
                'profile_picture' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
                'company_phone' => 'required|unique:companies,company_phone,' . $user->id . '|regex:/^9\d{9}$/',
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
}