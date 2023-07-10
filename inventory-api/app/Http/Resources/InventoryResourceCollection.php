<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class InventoryResourceCollection extends ResourceCollection
{
    protected $without_fields = [];
    protected $accept_fields = [];
    protected $rename_fields = [];
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->processCollection($request);
    }

    /**
     * Hide Properties From Resoonse
     */
    public function hide($hide_fields){
        if( !is_array($hide_fields) ){
            $hide_fields = (array)$hide_fields;
        }
        $this->without_fields = $hide_fields;
        return $this;
    }

    /**
     * Hide Properties From Resoonse
     */
    public function accept($accept_fields){
        if( !is_array($accept_fields) ){
            $accept_fields = (array)$accept_fields;
        }
        $this->accept_fields = $accept_fields;
        return $this;
    }

    public function rename($rename_fields){
        if( !is_array($rename_fields) ){
            $rename_fields = (array)$rename_fields;
        }
        $this->rename_fields = $rename_fields;
        return $this;
    }

    /**
     * Send fields to hide to UsersResource while processing the collection.
     * 
     * @param $request
     * @return array
     */
    protected function processCollection($request)
    {
        return $this->collection->map(function (InventoryResource $resource) use ($request) {
            if($this->accept_fields){
                return $resource->accept($this->accept_fields )->rename($this->rename_fields )->toArray($request);
            }else{
                return $resource->hide($this->without_fields)->rename($this->rename_fields )->toArray($request);
            }
        })->all();
    }
}
