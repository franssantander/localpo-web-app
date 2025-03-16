<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PostedJobs extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'id',
        'company_id',
        'user_id',
        'background_img',
        'job_title',
        'job_description',
        'type',
        'location',
        'salary_range',
        'experience_level',
        'job_function',
        'industry',
        'job_expiry',
        'status',
    ];

    public function company()
    {
        return $this->belongsTo(Companies::class, 'company_id');
    }

    public function saved_jobs()
    {
        return $this->hasMany(SavedJobs::class, 'posted_job_id', 'id');
    }

    public function applied_jobs()
    {
        return $this->hasMany(AppliedJobs::class, 'posted_job_id', 'id');
    }
}
