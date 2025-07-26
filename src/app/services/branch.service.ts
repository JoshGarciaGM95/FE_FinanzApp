import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
  
@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = `${environment.apiUrl}/api/branches`;

  constructor(private http: HttpClient) {}

  createBranch(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
}
