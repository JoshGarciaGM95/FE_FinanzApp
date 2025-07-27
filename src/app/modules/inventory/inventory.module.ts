import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from '../../component/inventory/inventory.component';
import { InventoryListComponent } from '../../component/inventory/inventory-list/inventory-list.component';
import { InventoryCreateComponent } from '../../component/inventory/inventory-create/inventory-create.component';
import { InventoryDetailComponent } from '../../component/inventory/inventory-detail/inventory-detail.component';
import { InventoryEditComponent } from '../../component/inventory/inventory-edit/inventory-edit.component';

@NgModule({
  declarations: [
    InventoryComponent,
    InventoryListComponent,
    InventoryCreateComponent,
    InventoryDetailComponent,
    InventoryEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: InventoryListComponent },
      { path: 'create', component: InventoryCreateComponent },
      { path: ':id', component: InventoryDetailComponent },
      { path: ':id/edit', component: InventoryEditComponent }
    ])
  ]
})
export class InventoryModule {}
