<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AppliedJobs extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'posted_job_id',
        'company_id',
        'user_id',
        'resume',
        'cover_letter',
        'contact_number',
        'availability_days',
        'availability_time_1',
        'availability_time_2',
        'status',
    ];

    public function posted_job()
    {
        return $this->belongsTo(PostedJobs::class, 'posted_job_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}