import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { InventoryService, Inventory } from '../../../services/inventory.service';
import { ProductService, Product } from '../../../services/product.service';


@Component({
  selector: 'app-inventory-edit',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inventory-edit.component.html',
  styleUrl: './inventory-edit.component.css'
})
export class InventoryEditComponent implements OnInit {
  inventory: Partial<Inventory> = {};
  products: Product[] = [];
  id: number = 0;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (err) => this.errorMessage = 'Error cargando productos: ' + err.message
    });
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.inventoryService.getById(this.id).subscribe({
        next: (data) => this.inventory = data,
        error: (err) => this.errorMessage = 'No se pudo cargar el inventario: ' + err.message
      });
    }
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
    this.inventoryService.update(this.id, inventoryData).subscribe({
      next: () => {
        this.successMessage = 'Inventario actualizado exitosamente.';
        setTimeout(() => this.router.navigate(['/home/inventory']), 1200);
      },
      error: (err) => this.errorMessage = 'Error al actualizar inventario: ' + err.message
    });
  }
}
