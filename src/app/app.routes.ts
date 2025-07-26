import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { PlanComponent } from './component/plan/plan.component';
import { HomeComponent } from './component/home/home.component';

import { InventoryListComponent } from './component/inventory/inventory-list/inventory-list.component';
import { InventoryDetailComponent } from './component/inventory/inventory-detail/inventory-detail.component';
import { InventoryCreateComponent } from './component/inventory/inventory-create/inventory-create.component';
import { InventoryEditComponent } from './component/inventory/inventory-edit/inventory-edit.component';
import { InventoryComponent } from './component/inventory/inventory.component';

import { ProductComponent } from './component/product/product.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';
import { ProductDetailComponent } from './component/product/product-detail/product-detail.component';
import { ProductCreateComponent } from './component/product/product-create/product-create.component';
import { ProductEditComponent } from './component/product/product-edit/product-edit.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'company-create', loadComponent: () => import('./component/company-create/company-create.component').then(m => m.CompanyCreateComponent), title: 'Crear Empresa' },
    { path: 'branch-create', loadComponent: () => import('./component/branch-create/branch-create.component').then(m => m.BranchCreateComponent), title: 'Crear Sucursal' },
    { path: 'branch-select', loadComponent: () => import('./component/branch-select/branch-select.component').then(m => m.BranchSelectComponent), title: 'Seleccionar Sucursal' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'plan', component: PlanComponent, title: 'Plans' },
    {
      path: 'home',
      component: HomeComponent,
      title: 'Home',
      children: [
        {
          path: 'inventory',
          component: InventoryComponent,
          children: [
            { path: '', redirectTo: '/home/inventory/list', pathMatch: 'full' },
            { path: 'list', component: InventoryListComponent, title: 'Lista de Inventario' },
            { path: 'create', component: InventoryCreateComponent, title: 'Crear Inventario' },
            { path: ':id', component: InventoryDetailComponent, title: 'Detalle Inventario' },
            { path: ':id/edit', component: InventoryEditComponent, title: 'Editar Inventario' }
          ]
        },
        {
          path: 'products',
          component: ProductComponent,
          children: [
            { path: '', redirectTo: '/home/products/list', pathMatch: 'full' },
            { path: 'list', component: ProductListComponent, title: 'Lista de Productos' },
            { path: 'create', component: ProductCreateComponent, title: 'Crear Producto' },
            { path: ':id', component: ProductDetailComponent, title: 'Detalle Producto' },
            { path: ':id/edit', component: ProductEditComponent, title: 'Editar Producto' }
          ]
        }
        // Puedes agregar aquí más hijos para ventas, compras, clientes, proveedores, etc.
      ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
