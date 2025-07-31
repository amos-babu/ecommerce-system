<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    // public function profileUpdate(ProfileUpdateRequest $request, User $user)
    // {

    //     $data = $request->validated();

    //     // $image = $data['profile_image'] ?? null;

    //     // if ($image) {
    //     //     if ($user->profile_image) {
    //     //         Storage::delete('public/profile_images/' . $user->profile_image);
    //     //     }
    //     //     $imagePath = $request->file('profile_image')->store('profile_images', 'public');
    //     //     $data['profile_image'] = basename($imagePath);
    //     // }
    //     $user->update($data);

    //     return response()->json([
    //         'message' => 'User profile updated.',
    //         'user' => $user
    //     ], 200);
    // }

    public function profileUpdate(ProfileUpdateRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('profile_images', 'public');
            $data['profile_image'] = $path;
        }

        $user->update($data);

        return response()->json([
            'message' => 'User profile updated.',
            'user' => $user
        ], 200);
    }
}
