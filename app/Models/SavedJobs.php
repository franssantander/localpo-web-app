<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SavedJobs extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ["posted_job_id", "user_id", 'deleted_at'];

    public function posted_job()
    {
        return $this->belongsTo(PostedJobs::class, 'posted_job_id', 'id');
    }

    public function company()
    {
        return $this->hasOneThrough(Companies::class, PostedJobs::class, 'id', 'id', 'posted_job_id', 'company_id');
    }
}