import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { InventoryService, Inventory } from '../../../services/inventory.service';

@Component({
  selector: 'app-inventory-detail',
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './inventory-detail.component.html',
  styleUrl: './inventory-detail.component.css'
})
export class InventoryDetailComponent implements OnInit {
  inventory?: Inventory;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.inventoryService.getById(id).subscribe({
        next: (data) => this.inventory = data,
        error: (err) => alert('No se pudo cargar el inventario: ' + err.message)
      });
    }
  }

  deleteInventory(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este inventario?')) {
      this.inventoryService.delete(id).subscribe({
        next: () => this.router.navigate(['/home/inventory']),
        error: (err) => alert('Error eliminando inventario: ' + err.message)
      });
    }
  }
}
