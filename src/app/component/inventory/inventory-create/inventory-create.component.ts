import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { InventoryService, Inventory } from '../../../services/inventory.service';
import { ProductService, Product } from '../../../services/product.service';


@Component({
  selector: 'app-inventory-create',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inventory-create.component.html',
  styleUrl: './inventory-create.component.css'
})
export class InventoryCreateComponent implements OnInit {
  inventory: Partial<Inventory> = {
    product_id: 0,
    quantity: 0
  };
  products: Product[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private inventoryService: InventoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (err) => this.errorMessage = 'Error cargando productos: ' + err.message
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    const companyId = Number(sessionStorage.getItem('companyId'));
    const branchId = Number(sessionStorage.getItem('branchId'));
    const inventoryData = {
      ...this.inventory,
      company_id: companyId,
      branch_id: branchId
    };
    this.inventoryService.create(inventoryData).subscribe({
      next: () => {
        this.successMessage = 'Inventario creado exitosamente.';
        setTimeout(() => this.router.navigate(['/home/inventory']), 1200);
      },
      error: (err) => this.errorMessage = 'Error al crear inventario: ' + err.message
    });
  }
}
