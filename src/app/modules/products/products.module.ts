import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../component/product/product.component';
import { ProductListComponent } from '../../component/product/product-list/product-list.component';
import { ProductCreateComponent } from '../../component/product/product-create/product-create.component';
import { ProductDetailComponent } from '../../component/product/product-detail/product-detail.component';
import { ProductEditComponent } from '../../component/product/product-edit/product-edit.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ProductListComponent },
      { path: 'create', component: ProductCreateComponent },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
    ])
  ]
})
export class ProductsModule {}
