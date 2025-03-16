<?php

use App\Http\Controllers\AuthUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\JobSeekerController;
use App\Http\Controllers\JobsManagementController;
use App\Http\Controllers\UserRegistrationController;
use App\Http\Controllers\UsersManagementController;
use App\Mail\EmailVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//* Auth User
Route::controller(AuthUserController::class)->group(function () {
    Route::group([
        "middleware" => "api",
        "prefix" => "auth-user"
    ], function () {
        Route::post('login', 'login');
        Route::get('sidebar', 'sidebar');
        Route::post('logout', 'logout');
        Route::post('refresh-token', 'refreshToken');
    });
});

//* User Registration
Route::controller(UserRegistrationController::class)->group(function () {
    Route::group([
        "middleware" => "api",
        "prefix" => "user-registration"
    ], function () {
        Route::post('register-user', 'userRegister');
        Route::post('email-verification', 'verifyEmail');
        Route::get('resend-code', 'resendCode');
        Route::post('company-profile', 'companyProfile');
        Route::post('user-profile', 'userProfile');
    });
});


//* App features
Route::controller(DashboardController::class)->group(function () {
    Route::group([
        "middleware" => "api",
        "prefix" => "app-dashboard"
    ], function () {
        Route::post('create-job', 'createJob');
        Route::post('edit-job', 'editJob');
        Route::post('close-job', 'closeJob');
        Route::post('reopen-job', 'reopenJob');
        Route::get('get-all-postedjob', 'getAllPostedJob');
        Route::get('get-all-recent-application', 'getAllRecentApplication');
    });
});


Route::controller(JobsManagementController::class)->group(function () {
    Route::group([
        "middleware" => "api",
        "prefix" => "app-jobsmanagement"
    ], function () {
        Route::get('get-all-jobsmanagement', 'getJobsManagement');
        Route::get('view-job', 'viewJob');
    });
});

Route::controller(UsersManagementController::class)->group(function () {
    Route::group([
        "middleware" => "api",
        "prefix" => "app-usersmanagement"
    ], function () {
        Route::get('get-all-users', 'getUsersManagement');
        Route::post('edit-user', 'editUserProfile');
        Route::get('view-user', 'viewUser');
        Route::post('delete-user', 'deleteUser');
        Route::post('deactivate-user', 'deactivateUser');
        Route::post('restore-user', 'restoreUser');
        Route::post('activate-user', 'activateUser');
    });
});

//* Job seeker features
Route::controller(JobSeekerController::class)->group(function () {
    Route::group([
        "middleware" => "api",
        "prefix" => "app-jobseeker"
    ], function () {
        //* Auth get all jobs
        Route::get('get-all-jobs', 'getAllJobs');
        Route::get('view-job/{job_id}', 'viewJob');
        // Route::post('view-job', 'viewJob');
        
        //* save jobs section
        Route::get('get-all-savedjob', 'getSavedJobs');
        Route::post('save-job', 'saveJob');
        Route::post('unsave-job', 'unsaveJob');

        //* apply jobs section
        Route::post('apply-job', 'applyJob');
        Route::post('withdraw-application', 'withdrawApplication');

        //* job application section
        Route::get('get-applied-jobs', 'getAppliedJobs');
    });
});

//* Home page
Route::controller(HomeController::class)->group(function () {
    Route::group([
        "middleware" => "api",
        "prefix" => "app-home"
    ], function () {
        Route::get('get-all-jobs', 'getAllJobs');
        Route::post('view-job', 'viewJob');
    });
});