import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  categories: any[] = [];
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  product: Partial<Product> = {
    category_id: 0,
    product_code: 0,
    product_name: '',
    description: '',
    cost_price: undefined,
    sale_price: undefined,
    status: '',
    creation_date: ''
  };

  constructor(
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

  onSubmit(): void {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    if (!this.product.category_id || !this.product.product_code || !this.product.product_name || this.product.cost_price === undefined || this.product.sale_price === undefined) {
      this.isLoading = false;
      this.errorMessage = 'Todos los campos obligatorios deben estar completos.';
      return;
    }
    const company_id = Number(sessionStorage.getItem('companyId')) || 0;
    const productData = {
      ...this.product,
      company_id: company_id
    } as Omit<Product, 'product_id'>;
    this.productService.create(productData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Producto creado exitosamente.';
        setTimeout(() => this.router.navigate(['/home/products']), 1200);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Error al crear producto: ' + err.message;
      }
    });
  }
}
