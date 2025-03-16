<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    protected $table = 'roles';

    protected $fillable = [
        'role_type'
    ];

    use HasFactory;

    public function permission_per_role()
    {
        return $this->hasMany(PermissionPerRole::class, 'role_id');
    }
}