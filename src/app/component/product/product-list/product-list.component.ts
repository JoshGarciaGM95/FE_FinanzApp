import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { CategoryPipe } from '../../../services/pipes/category.pipe';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, CategoryPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['product_id', 'company_id', 'category_id', 'product_code', 'product_name', 'cost_price', 'sale_price', 'actions'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.delete(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => alert('Error eliminando producto: ' + err.message)
      });
    }
  }
}
