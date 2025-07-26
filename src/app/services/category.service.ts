import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private apiUrl = `${environment.apiUrl}/api/categories`;

   constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll?company_id=${sessionStorage.getItem('companyId') || ''}`);
  }
}