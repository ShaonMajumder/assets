<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\ApiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class LoginController extends Controller
{
    use ApiTrait;
    
    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => ['required', 'exists:users,email'],
            'password' => ['required']
        ]);

        if($validator->fails()){
            $this->data = $validator->errors(); //->first();
            return $this->apiOutput(Response::HTTP_UNPROCESSABLE_ENTITY,'');
        }

        $user = User::where('email',$request->email)
                    // ->where('is_active',true)
                    ->first();
        if(!$user){
            return $this->apiOutput(Response::HTTP_FORBIDDEN,'User was not found or active !!!');
        }
        $user = new UserResource($user);
        $user = $user->hide(['created_at','updated_at','email_verified_at']);

        $this->access_token = $user->createToken( $request->device_name ?? ($request->ip() ?? "Unknown") )->plainTextToken;
        $this->apiSuccess();
        $this->data = [
            'profile' => $user
        ];

        return $this->apiOutput(Response::HTTP_OK,'Login Successfully');
    }

    /**
     * Logout current user
     */
    public function logout(Request $request){
        $user = $request->user();
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        $this->apiSuccess();
        return $this->apiOutput(Response::HTTP_OK,'Logout Successfully');
    }
}
