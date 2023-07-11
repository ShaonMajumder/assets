# Assets

An asset management app template.

## Build With

- React
- Material UI
- Laravel 10

## Build Log

```bash
npx create-react-app inventory
cd inventory
yarn add react-bootstrap
yarn add @material-ui/core
yarn add react-router-dom
yarn add react-icons
yarn add react-toastify
yarn add convert-form-data
yarn add keycloak-js
yarn add axios
yarn add react-router

# Backend
composer create-project --prefer-dist laravel/laravel inventory-api
php artisan make:controller InventoryController --api
php artisan make:migration create_inventory_table --create=inventories
php artisan make:migration create_inventory_attachments_table --create=inventory_attachments
php artisan make:model Inventory
php artisan db:seed --class=InventorySeeder #error
php artisan make:resource InventoryResource
php artisan make:resource InventoryResourceCollection --collection
```

## Run

yarn start

## Demo

### Dashboard

![Last Progress](./dashboard.png)

### Login

![Last Progress](./login.png)

### Inventory

![Last Progress](./inventory.png)
