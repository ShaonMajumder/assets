#!/bin/sh

gnome-terminal -- sh -c "cd inventory-api; ./cache-clean.sh; php artisan serve --host=127.0.0.1 --port=8000; bash"

gnome-terminal -- sh -c "cd frontend; HOST=127.0.0.1 yarn start; bash"
