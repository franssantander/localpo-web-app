<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Companies extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_profile',
        'company_name',
        'industry_type',
        'company_description',
        'company_address',
        'company_phone',
        'company_email',
        'company_website',
        'year_establish',
        'company_socialmed',
        'registration_number'
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'company_id');
    }
}