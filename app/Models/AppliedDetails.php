<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppliedDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'applied_job_id',
        'user_id',
        'hire_status',
        'interview_date',
        'interview_type',
        'interview_location',
        'assigned_interviewer',
        'interview_status',
        'shortlisted_date',
        'shortlisted_by',
        'shortlisted_status',
        'assigned_review',
        'date_hired',
        'offer_accepted',
        'offer_status',
        'notes'
    ];

    public function applied_job()
    {
        return $this->belongsTo(AppliedJobs::class, 'applied_job_id');
    }

    public function posted_job()
    {
        return $this->hasOneThrough(
            PostedJobs::class,
            AppliedJobs::class,
            'id',
            'id',
            'applied_job_id',
            'posted_job_id'
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}