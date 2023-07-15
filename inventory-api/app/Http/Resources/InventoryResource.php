<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
{
    protected $without_fields = [];
    protected $accept_fields = [];
    protected $rename_fields = [];
    protected $field_items = [];

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    public static function collection($resource)
    {
        return tap(new InventoryResourceCollection($resource), function ($collection) {
            $collection->collects = __CLASS__;
        });
    }

    public function rename($rename_fields){
        if( !is_array($rename_fields) ){
            $rename_fields = (array)$rename_fields;
        }
        $this->rename_fields = $rename_fields;
        return $this;
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

    public function accept($accept_fields){
        if( !is_array($accept_fields) ){
            $accept_fields = (array)$accept_fields;
        }
        $this->accept_fields = $accept_fields;
        $all_fields = array_keys( $this->fieldItems() );
        $this->without_fields = array_diff($all_fields,$this->accept_fields);
        return $this;
    }

    /**
     * Filter the response And Hide Unwanted Properties
     */
    protected function filterArray($array = []){
        $items = collect($array)->forget($this->without_fields)->toArray();
        return $items;
    }

    public function fieldItems(){
        $this->field_items = parent::toArray(request());
        $this->field_items["files"] = $this->inventoryAttachment;
        $this->field_items["id"] = $this->inventory_id;
        $this->field_items["revision"] = $this->batch_id > 1 ? $this->batch_id - 1 : '';
        $this->hide(["batch_id", "created_at", "updated_at", "deleted_at","inventory_id"]);

        if($this->rename_fields != [] ){
            foreach($this->rename_fields as $key => $value){
                $this->field_items[$value] = $this->field_items[$key];
                unset($this->field_items[$key]);
            }
        }

        return $this->field_items;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request); // if we need all parameters
        return $this->filterArray($this->fieldItems());
    }
}
