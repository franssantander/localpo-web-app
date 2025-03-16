<?php

namespace App\Http\Controllers;

use App\Helpers\AuthHelper;
use App\Mail\EmailVerification;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthUserController extends Controller
{

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors(),
                "status" => 422,
            ], 422);
        }

        try {
            if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    "message" => "Invalid email or password",
                    "status" => 422,
                ], 422);
            }

            $user = JWTAuth::user();
            $token = JWTAuth::claims(['role' => $user->role])->fromUser($user);
            $verificationCode = AuthHelper::generateVerificationCode();

            //*Check status for pending email verification
            if ($user->status === "pending email verification") {
                $user->verification_code = $verificationCode;
                $user->save();

                Mail::to($user->email)->send(new EmailVerification($user, $verificationCode));

                return response()->json([
                    "message" => "Please verify your email address to complete the login process.",
                    "url" => "/sign-up/employer/email-verification?email={$user->email}",
                    "status" => 403,
                ], 403);
            }

            if ($user->status === "complete company profile") {
                $user->verification_code = $verificationCode;
                $user->save();

                Mail::to($user->email)->send(new EmailVerification($user, $verificationCode));

                return response()->json([
                    "message" => "Please complete the company profile before use it features",
                    "url" => "/app/company-profile",
                    "status" => 403
                ], 403);
            }


            $user->token = $token;
            $user->save();

            return response()->json([
                "message" => "Login successfully",
                "access_token" => $token,
                "user_role" => $user->role,
                "status" => 200,
            ], 200);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                "message" => "Failed to login. Please try again.",
                "error" => $e->getMessage(),
                "status" => 500,
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {

            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'message' => 'Successfully logged out.',
                'status' => 200
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json([
                'message' => 'Failed to logout, please try again.',
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    public function sidebar()
    {
        try {

            $user = AuthHelper::jwtHandler("parseToken");

            if (!$user) {
                return response()->json([
                    'message' => 'Unauthenticated user.',
                    'status' => 401
                ], 401);
            }

            $role = Role::where('role_type', $user->role)->with('permission_per_role')->first();

            if (!$role) {
                return response()->json(['message' => 'This role is not existing', 'status' => 404], 404);
            }

            $sidebar = $role->permission_per_role->map(function ($permission) {
                return [
                    "title" => $permission->title,
                    "component" => $permission->component,
                    "path" => $permission->path,
                    "key" => $permission->key,
                    "table" => $permission->table,
                    "icon" => $permission->icon,
                ];
            });

            return response()->json([
                "message" => "Sidebar retrieved successfully.",
                "sidebar" => $sidebar,
                "user" => [
                    "name" => $user->name,
                    "company" => $user->company_name,
                    "email" => $user->email,
                    "role" => $user->role,
                    "status" => $user->status,
                    "profile_picture" => $user->profile_picture,
                ],
                "status" => 200,
            ], 200);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json([
                'message' => 'Token has expired.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json([
                'message' => 'Token is invalid.',
                'status' => 401
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'message' => 'Token not provided.',
                'status' => 401
            ], 401);
        }
    }


    public function refreshToken(Request $request)
    {
        try {
            $oldToken = $request->bearerToken();

            if (JWTAuth::parseToken()->check()) {
                return response()->json([
                    "message" => "Token is still valid.",
                    "status" => 200,
                ], 200);
            }

            // If the token is expired, generate a new one
            $newToken = AuthHelper::jwtHandler("refresh", $oldToken);

            // Get the user associated with the token
            $user = AuthHelper::jwtHandler("setToken", $newToken);

            // Store the new token in the database
            $user->token = $newToken;
            $user->save();

            return response()->json([
                "message" => "Token refreshed successfully.",
                "access_token" => $newToken,
                "status" => 200,
            ], 200);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json([
                "message" => "Token has expired. Please login again.",
                "status" => 401,
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                "message" => "Failed to refresh token. Please try again.",
                "error" => $e->getMessage(),
                "status" => 500,
            ], 500);
        }
    }
}