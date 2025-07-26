import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'http://localhost:8300/api/branches';

  constructor(private http: HttpClient) {}

  createBranch(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
}
