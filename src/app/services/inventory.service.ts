import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Inventory {
  inventory_id: number;
  company_id: number;
  branch_id: number;
  product_id: number;
  quantity: number;
  last_updated: string;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private apiUrl = 'http://localhost:8300/api/inventory';

  constructor(private http: HttpClient) {}

  private getFilters() {
    return {
      company_id: Number(sessionStorage.getItem('companyId')),
      branch_id: Number(sessionStorage.getItem('branchId'))
    };
  }

  getAll(): Observable<Inventory[]> {
    const filters = this.getFilters();
    return this.http.get<Inventory[]>(this.apiUrl, { params: filters });
  }

  getById(id: number): Observable<Inventory> {
    const filters = this.getFilters();
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`, { params: filters });
  }

  create(data: Partial<Inventory>): Observable<Inventory> {
    const filters = this.getFilters();
    return this.http.post<Inventory>(this.apiUrl, { ...data, ...filters });
  }

  update(id: number, data: Partial<Inventory>): Observable<Inventory> {
    const filters = this.getFilters();
    return this.http.put<Inventory>(`${this.apiUrl}/${id}`, { ...data, ...filters });
  }

  delete(id: number): Observable<any> {
    const filters = this.getFilters();
    return this.http.delete(`${this.apiUrl}/${id}`, { params: filters });
  }
}
