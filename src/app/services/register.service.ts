import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { UserRegister } from '../interface/User/UserRegister';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
    private apiUrl = `${environment.apiUrl}/api/users`;

    constructor(private http: HttpClient, private router: Router) { }

    register(userData: UserRegister): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }
}