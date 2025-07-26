import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { PlanData } from '../interface/Plan/PlanData';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl = `${environment.apiUrl}/api/plans`;

    constructor(private http: HttpClient) { }

    register(): Observable<any> {
      return this.http.get(`${this.apiUrl}/list`);
    }

    getPlanById(id: number): Observable<PlanData> {
      return this.http.post<PlanData>(`${this.apiUrl}/ById`, { plan_id: id });
    }
}