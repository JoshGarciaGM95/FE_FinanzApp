import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private apiUrl = `${environment.apiUrl}/api/subscriptions`;

  constructor(private http: HttpClient, private router: Router) { }

  createSubscription(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  getSubscriptionByUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/ByUser`, { user_id: userId});
  }
}
// ...existing code...
