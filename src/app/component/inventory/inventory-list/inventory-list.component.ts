import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventoryService, Inventory } from '../../../services/inventory.service';
import { ProductNamePipe } from '../../../services/pipes/product-name.pipe';

@Component({
  selector: 'app-inventory-list',
  imports: [CommonModule, RouterModule, ProductNamePipe],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent implements OnInit {
  inventories: Inventory[] = [];
  displayedColumns: string[] = ['inventory_id', 'company_id', 'branch_id', 'product_id', 'quantity', 'actions'];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventories();
  }

  loadInventories(): void {
    this.inventoryService.getAll().subscribe({
      next: (data) => this.inventories = data,
      error: (err) => console.error('Error cargando inventarios', err)
    });
  }

  deleteInventory(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este inventario?')) {
      this.inventoryService.delete(id).subscribe({
        next: () => this.loadInventories(),
        error: (err) => alert('Error eliminando inventario: ' + err.message)
      });
    }
  }
}
