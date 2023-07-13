<?php
namespace App\Traits;

use PhpOffice\PhpSpreadsheet\Cell\Coordinate;

trait SpreadsheetTrait{
    protected function getNextHorizontalCell($cellLetter){
        $nextColumnIndex = Coordinate::columnIndexFromString($cellLetter) + 1;
        $nextColumn = Coordinate::stringFromColumnIndex($nextColumnIndex);
        return $nextColumn;
    }

    protected function getPreviousHorizontalCell($cellLetter){
        $previousColumnIndex = Coordinate::columnIndexFromString($cellLetter) - 1;
        $previousColumn = Coordinate::stringFromColumnIndex($previousColumnIndex);
        return $previousColumn;
    }
}