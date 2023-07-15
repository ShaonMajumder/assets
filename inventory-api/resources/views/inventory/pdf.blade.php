<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <style>
        .wrapper, body, html {
            min-height: 100%;
        }
        body {
            margin: 0;
            font-family: "Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
            font-size: 0.95rem;
            font-weight: 400;
            line-height: 1.45;
            color: #212529;
            text-align: left;
            background-color: #fff;
        }
        *, ::after, ::before {
            box-sizing: border-box;
        }

        h5{
            font-weight: 400 !important;
            font-size: 14px;
            margin-top: 0;
            margin-bottom: 0.5rem;
        }
        .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
            margin-bottom: 0.5rem;
            font-family: inherit;
            line-height: 1.2;
            color: inherit;
        }

        .col-12 {
            -ms-flex: 0 0 100%;
            flex: 0 0 100%;
            max-width: 100%;
        }

        .col-8, .col-2, .col-12{
            position: relative;
            width: 100%;
            padding-right: 7.5px;
            padding-left: 7.5px;
        }
        .table-bordered {
            border: 1px solid #dee2e6;
        }
        .table {
            width: 100%;
            margin-bottom: 1rem;
            color: #212529;
            background-color: transparent;
        }
        table {
            border-collapse: collapse;
        }
        .table-bordered td, .table-bordered th {
            border: 1px solid #dee2e6;
        }
        .table td, .table th {
            padding: 0.75rem;
            vertical-align: top;
            border-top: 1px solid #dee2e6;
            font-size: 12px;
        }
        .footer {
            width: 100%;
            text-align: center;
            position: fixed;
            bottom: 0;
        }
    </style>
</head>
<body>
    @php
        $row_count = 0;
    @endphp
    <div>
        <div class="row" style="text-align: center;">
            <div class="col-12">
                <h4>Example Website</h4>
                <h5>Inventory</h5>
            </div>
        </div>
        
        {{-- <table class="table table-bordered mt-3">
            <tr>
                <td style="text-align: left; width: 50%;">
                    Work Order Name: <strong>{{ $work_order->work_order_title }}</strong>
                </td>
                <td style="text-align: left; width: 50%;">
                    Category: <strong>{{ $work_order->product_category_name }}</strong>
                </td>
                <td style="text-align: left; width: 50%;">
                    Brand: <strong>{{ $work_order->brand_name }}</strong>
                </td>
            </tr>
            <tr>
                <td style="text-align: left; width: 50%;">
                    Season: <strong>{{ $work_order->season }}</strong>
                </td>
                <td style="text-align: left; width: 50%;">
                    Factory: <strong>{{ $work_order->factoryData->name }}</strong>
                </td>
                <td style="text-align: left; width: 50%;">
                    Supplier Representative Name: <strong>{{ $work_order->supplier_representative }}</strong>
                </td>
            </tr>
            <tr>
                <td style="text-align: left; width: 50%;">
                    Payment Term: <strong>{{ $work_order->payment_term }}</strong>
                </td>
                <td style="text-align: left; width: 50%;">
                    Shipment Date: <strong>{{ $work_order->shipment_date }}</strong>
                </td>
                <td style="text-align: left; width: 50%;">
                    Description: <strong>{{ $work_order->description }}</strong>
                </td>
            </tr>
            <tr>
                <td style="text-align: left; width: 50%;">
                    Remarks: <strong>{{ $work_order->remarks }}</strong>
                </td>
                <td style="text-align: left; width: 50%;">Ref:
                    <strong>{{ wordwrap($work_order->cn_reference,18,"\n",true) }}</strong>
                </td>
                <td style="text-align: left; width: 50%;">Remarks:
                    <strong>{{ $work_order->cn_remarks }}</strong>
                </td>
            </tr>
        </table> --}}
        

        <h4>INVENTORY TABLE:</h4>

        <table class="table" style="margin-top: 10px;">
            <thead style="background-color: #efefef;">
                <tr>
                    <th style="border: .1px solid black; width: 33.33%">ID</th>
                    <th style="border: .1px solid black; width: 33.33%">Name</th>
                    <th style="border: .1px solid black; width: 33.33%">Quantity</th>
                    <th style="border: .1px solid black; width: 33.33%">Images</th>
                </tr>
            </thead>
            
            <tbody>
                @foreach($inventories as $data)
                    @php
                        $files = $data->files;
                    @endphp
                    <tr>
                        <td style="border: .1px solid black;">
                            {{ $data->inventory_id ?? $data->id }}
                        </td>
                        <td style="border: .1px solid black;">
                            {{ $data->name }}
                        </td>
                        <td style="border: .1px solid black;">
                            {{ $data->quantity }}
                        </td>
                        <td style="border: .1px solid black;">
                            @if($files)
                                @foreach($files as $file)    
                                    {{-- <img style="height:100px; margin:2px;" src="{{  storage_path('app/public/' . $file->file_path)  }}" alt="KX Logo"> --}}
                                    <img style="height:100px; margin:2px;" src="{{  storage_path('app/' . $file->file_path)  }}" alt="KX Logo">
                                @endforeach                            
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        
        
        @if(($row_count > 6 && $row_count <= 8) || ($row_count > 18 && $row_count <= 20))
            <div style="page-break-after: always;"></div>
        @endif

        <div class="footer" style="text-align: center; color: #bfbfbf; padding: 0; margin: 0;">
            <hr>
            <h5 style="color: #999999; margin: 5px;">Example Website</h5>
            <span style="margin: 5px; font-size: 10px; line-height: 1;">
                        <i><strong>Developer Office:</strong></i> ##/#, Gulshan, Dhaka ####, Bangladesh
                    </span><br>
            <span style="margin: 5px; font-size: 10px; line-height: 1;">
                        <i><strong>Corporate Office:</strong></i> ##/#, Gulshan, Dhaka ####, Bangladesh
                    </span><br>
            <span style="margin: 5px; font-size: 10px; line-height: 1;">
                        <i><strong>Email:</strong></i> <u>admin@example.com</u> |
                        <i><strong>Phone:</strong></i> +8809######### |
                        <i><strong>Web:</strong></i> <u>www.example.com</u>
                    </span><br>
        </div>
    </div>
</body>
</html>
