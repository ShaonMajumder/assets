<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login',[LoginController::class,'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function(){
    Route::any('logout', [LoginController::class, "logout"]);

    Route::prefix('inventory')->group(function () {
        Route::get('/get-image',[InventoryController::class, 'serveImage']);
    
        Route::get('/', [InventoryController::class, 'index']);
        Route::post('/', [InventoryController::class, 'store']);
        Route::get('/{id}', [InventoryController::class, 'show']);
        Route::get('history/{id}', [InventoryController::class, 'history']);
        Route::put('/{id}', [InventoryController::class, 'update']);
        Route::delete('/{id}', [InventoryController::class, 'destroy']);
    });


    /**
     * Download Routes
     */
    Route::prefix('inventory/download')->group(function () {

        Route::prefix('pdf')->group(function () {
            Route::get("/bulk", [InventoryController::class, 'downloadPDFBulk']);
            Route::get("/{id}", [InventoryController::class, 'downloadPDFFiltered']);
        });

        Route::prefix('excel')->group(function () {
            Route::get("/bulk", [InventoryController::class, 'downloadExcelBulk']);
            Route::get("/{id}", [InventoryController::class, 'downloadExcelFiltered']);
        });

        Route::prefix('history')->group(function () {
            Route::get("/pdf/{id}", [InventoryController::class, 'downloadHistoryPDFFiltered']);
            Route::get("/excel/{id}", [InventoryController::class, 'downloadHistoryExcelFiltered']);
        });
    });

    Route::prefix('logs')->group(function () {
        Route::get("/", [LogController::class, 'index']);
        Route::get("/excel/bulk", [InventoryController::class, 'downloadExcelBulk']);
        Route::get("/pdf/{id}", [InventoryController::class, 'downloadPDFFiltered']);
        Route::get("/excel/{id}", [InventoryController::class, 'downloadExcelFiltered']);
    });

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


