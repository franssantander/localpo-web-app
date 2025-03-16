<?php

namespace App\helpers;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthHelper
{

    public static function generateVerificationCode()
    {

        return rand(100000, 999999);
    }


    public static function jwtHandler($jwtMethod, $data = null)
    {

        switch ($jwtMethod) {
            case 'fromUser':
                return JWTAuth::fromUser($data);

            case 'parseToken':

                return JWTAuth::parseToken()->authenticate();

            case 'refreshToken':
                return JWTAuth::refresh($data);

            case 'setToken':
                return JWTAuth::setToken($data)->toUser();


            default:
                # code...
                break;
        }
    }
}

class ResponseHelper
{
    public static function notificationResponse($title, $message)
    {
        return [
            'type' => 'notification',
            'title' => $title,
            'message' => $message,
        ];
    }
}

class TableHelper
{
    public static function tableActions($label = NULL, $color = NULL, $link = NULL, $url = NULL, $type = NULL, $icon = NULL)
    {
        return [
            'label' => $label,
            'color' => $color,
            'link' => $link,
            'url' => $url,
            'type' => $type,
            'icon' => $icon,
        ];
    }
}

class CardDataHelper
{
    public static function getCardData($title = "", $desc = "", $icon = "", $data = "", $status = "", $DB = "")

    {

        $total = self::filterStatus($data, $status, $DB);

        return [
            'title' => $title,
            'description' => $desc,
            'icon' => $icon,
            'total' => $total ?? 0,
        ];
    }

    private static function filterStatus($data = "", $status = "", $DB = "")
    {

        switch ($status) {
            case 'Deleted':
                return $DB::onlyTrashed()
                    ->where('company_id', $data->company_id)
                    ->count();
                break;

            case 'total_applications':
                $appliedJobs =  $DB::with('applied_jobs')->where('company_id', $data->company_id)->get();

                $totalApplied = 0;

                foreach ($appliedJobs as $appliedJob) {
                    $totalApplied += $appliedJob->applied_jobs->count();
                }

                return $totalApplied;
                break;


            case 'total_job_postings':
                return $DB::where('company_id', $data->company_id)
                    ->withTrashed()
                    ->count();
                break;

            default:
                // return $DB::withTrashed()
                //     ->where('company_id', $data->company_id)
                //     ->count();
                break;
        }

        // if ($status === 'Deleted') {
        //     return $DB::onlyTrashed()
        //         ->where('company_id', $data->company_id)
        //         ->count();
        // } elseif ($status) {
        //     return $DB::where('company_id', $data->company_id)
        //         ->where('status', $status)
        //         ->count();
        // } else {
        //     return $DB::withTrashed()
        //         ->where('company_id', $data->company_id)
        //         ->count();
        // }
    }
}
