import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { CategoryPipe } from '../../../services/pipes/category.pipe';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, FormsModule, RouterModule, CategoryPipe],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  categories: any[] = [];
  product: Partial<Product> = {};
  id: number = 0;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = Array.isArray(data) ? data : (data.categories || []);
      },
      error: (err) => {
        this.categories = [];
      }
    });
  }
  
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    if (this.id) {
      this.productService.getById(this.id).subscribe({
        next: (data) => this.product = data,
        error: (err) => this.errorMessage = 'No se pudo cargar el producto: ' + err.message
      });
    }
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    const productData = {
      ...this.product,
      company_id: Number(sessionStorage.getItem('companyId')) || 0
    } as Omit<Product, 'product_id'>;
    this.productService.update(this.id, productData).subscribe({
      next: () => {
        this.successMessage = 'Producto actualizado exitosamente.';
        setTimeout(() => this.router.navigate(['/home/products']), 1200);
      },
      error: (err) => this.errorMessage = 'Error al actualizar producto: ' + err.message
    });
  }
}
