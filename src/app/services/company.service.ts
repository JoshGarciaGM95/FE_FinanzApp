import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  private apiUrl = 'http://localhost:8300/api/companies';

   constructor(private http: HttpClient) { }

  getCompanyByUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/getByUser`, { user_id: userId});
  }

  createCompany(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
}