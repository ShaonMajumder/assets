<?php

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

if (!function_exists('responseBuilder')) {

    /**
     * @param int|string $statusCode
     * @param string $message
     * @param array $responseDataOrError
     * @return array
     */
    function responseBuilder(int|string $statusCode, string $message, $responseDataOrError = []): array
    {
        $successCodes = range(200, 206);
        $response['status_code'] = $statusCode;
        $response['message'] = $message;

        if (in_array($statusCode, $successCodes))
        {
            if (!empty($responseDataOrError['current_page']))
            {
                $response['current_page'] = $responseDataOrError['current_page'];
                $response['per_page'] = $responseDataOrError['per_page'];
                $response['total'] = $responseDataOrError['total'];
                $response['last_page'] = $responseDataOrError['last_page'];
            }
            $response['data'] = $responseDataOrError['data'] ?? $responseDataOrError;
        }
        else
        {
            $response['errors'] = $responseDataOrError;
        }
        return $response;
    }

    function curlrequest($url,$headers,$method,$params=null){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        if($method=='POST'){
            curl_setopt($ch, CURLOPT_POST, true);
        }
        else{
            curl_setopt($ch, CURLOPT_POST, false);
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        if(!is_null($params)){
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
        }
        $response['result'] = curl_exec($ch);
        $response['error_status'] = curl_errno($ch);
        curl_close($ch);
        return $response;
    }

    function customPaginate($items, $perPage = 10, $page = null, $options = []): LengthAwarePaginator
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }
}

// $status   = false;
// $message  = "Error";
// $access_token;
// $data;

// if (!function_exists('apiResponse')) {
//     //int|string $status_code 
//     function apiResponse(int $status_code = 0, string $message, $responseDataOrError = []): array
//     {
//         if($status_code == 0 ){
//             $status_code = Response::HTTP_INTERNAL_SERVER_ERROR;
//         }
        
//         $response['status'] = $status;
//         $response['message'] = $message;
                        
//         $success_codes = range(200, 206);
//         if(!empty($this->access_token)){
//             if(!is_null($this->data)){
//                 $this->data = array_merge(
//                     [
//                         "access_token" => $this->access_token,
//                         "token_type"  => "Bearer"
//                     ],
//                     $this->data
//                 );
//             }else{
//                 $this->data = [
//                         "access_token" => $this->access_token,
//                         "token_type"  => "Bearer"
//                     ];
//             }
            
//         }

//         if (in_array($status_code, $success_codes)) {
//             $response['data'] = $this->data;
//         } else {
//             $response['errors'] = $responseDataOrError;
//         }
//         return $response;
//     }
// }