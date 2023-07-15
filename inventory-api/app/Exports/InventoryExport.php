<?php

namespace App\Exports;

use App\Traits\SpreadsheetTrait;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Border;

class InventoryExport
{

    use SpreadsheetTrait;

    public $data;
    public $result;
    public $request;
    public $inventories;
    public $styleBorderedArray;

    public function __construct($inventories)
    {
        $this->inventories = $inventories;
        $this->styleBorderedArray = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000']
                ]
            ]
        ];
    }

    public function modifyExcel()
    {
        $file           = public_path("Inventory-example.xlsx");
        $spreadsheet    = IOFactory::load($file);
        $sheet          = $spreadsheet->getActiveSheet();
        
        $sl = 6;
        list($sheet, $sl) = $this->setInventoryTable($sheet, $sl);
        

        return $spreadsheet;
    }
    
    public function setInventoryTable($sheet, $sl){
        $sheet->mergeCells('A'.$sl.':D'.$sl);
        $sheet->getStyle('A'.$sl)
                        ->getAlignment()
                        ->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet->getStyle("A".$sl)
                        ->getFont()
                        ->setBold(true);
        $sheet->setCellValue("A".$sl, "Inventory Table");

        $sl_begining = $sl++;
        $sheet->setCellValue("A".$sl, "ID");
        $sheet->setCellValue("B".$sl, "Name");
        $sheet->setCellValue("C".$sl, "Quantity");
        $sheet->setCellValue("D".$sl, "Images");
        
        $sl++;

        foreach($this->inventories as $data){
            $sheet->setCellValue("A".$sl, $data->inventory_id ?? $data->id);
            $sheet->setCellValue("B".$sl, $data->name);
            $sheet->setCellValue("C".$sl, $data->quantity);
            // $sheet->setCellValue("D".$sl, $data->files);
            $sl++;
        }

        $sheet->getStyle('A'.$sl_begining.':D'.$sl-1)->applyFromArray($this->styleBorderedArray);

        return [$sheet,$sl];
    }
}
