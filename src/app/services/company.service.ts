import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  private apiUrl = `${environment.apiUrl}/api/companies`;

   constructor(private http: HttpClient) { }

  getCompanyByUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/getByUser`, { user_id: userId});
  }

  createCompany(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
}