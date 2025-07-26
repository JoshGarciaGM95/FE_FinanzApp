import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    if (id) {
      this.productService.getById(id).subscribe({
        next: (data) => this.product = data,
        error: (err) => alert('No se pudo cargar el producto: ' + err.message)
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.delete(id).subscribe({
        next: () => this.router.navigate(['/home/products']),
        error: (err) => alert('Error eliminando producto: ' + err.message)
      });
    }
  }
}
