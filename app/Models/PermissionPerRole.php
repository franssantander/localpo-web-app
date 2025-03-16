<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermissionPerRole extends Model
{
    protected $table = 'permission_per_role';
    protected $fillable = [
        'role_id',
        'title',
        'path',
        'component',
        'table',
        'create',
        'retrieve',
        'update',
        'delete',
    ];

    use HasFactory;
}