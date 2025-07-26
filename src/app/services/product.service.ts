import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface Product {
  product_id: number;
  company_id: number;
  category_id: number;
  product_code: number;
  product_name: string;
  description: string;
  cost_price: number;
  sale_price: number;
  status: string;
  creation_date: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    const company_id = sessionStorage.getItem('companyId') || '';
    return this.http.get<Product[]>(`${this.apiUrl}/list?company_id=${company_id}`);
  }

  getById(product_id: number): Observable<Product> {
    const company_id = sessionStorage.getItem('companyId') || '';
    return this.http.get<Product>(`${this.apiUrl}/get/${product_id}?company_id=${company_id}`);
  }

  create(data: Omit<Product, 'product_id'>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/new`, data);
  }

  update(product_id: number, data: Omit<Product, 'product_id'>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${product_id}`, data);
  }

  delete(product_id: number): Observable<any> {
    const company_id = sessionStorage.getItem('companyId') || '';
    return this.http.delete(`${this.apiUrl}/delete/${product_id}?company_id=${company_id}`);
  }
}