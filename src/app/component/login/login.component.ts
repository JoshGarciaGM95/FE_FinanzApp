import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,  
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {RouterModule} from '@angular/router';
import { BranchSelectComponent } from '../branch-select/branch-select.component';
import { LoginData } from '../../interface/User/LoginData';
import { SubscriptionsService } from '../../services/subscriptions.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, BranchSelectComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData: LoginData = {} as LoginData;
  isLoggedIn$: any;
  
  constructor(
    private authService: AuthService, 
    private subscriptionsService: SubscriptionsService,
    private route: Router
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  branches: any[] = [];
  showBranchSelect: boolean = false;
  loginMessage: string = '';

  onSubmit() {
    this.authService.login(this.loginData).subscribe(LoginResponse => {

      sessionStorage.setItem('token', LoginResponse.token);
      this.authService.setLoggedIn(true);
      sessionStorage.setItem('userId', LoginResponse.userId);
      sessionStorage.setItem('username', LoginResponse.username);
      sessionStorage.setItem('companyId', LoginResponse.companyId);
      // Lógica para interpretar el campo nextStep y mostrar mensaje
      if (LoginResponse.nextStep === 'subscription') {
        this.loginMessage = LoginResponse.message || 'Debe adquirir una suscripción antes de continuar.';
        this.route.navigate(['/plan']);
        return;
      } else if (LoginResponse.nextStep === 'company') {
        this.loginMessage = LoginResponse.message || 'Debe crear una empresa antes de continuar.';
        setTimeout(() => {
          this.route.navigate(['/company-create']);
        }, 1500);
        return;
      } else if (LoginResponse.nextStep === 'branch') {
        this.loginMessage = LoginResponse.message || 'Debe crear una sucursal antes de continuar.';
        setTimeout(() => {
          this.route.navigate(['/branch-create']);
        }, 1500);
        return;
      }

      if (LoginResponse.branches && LoginResponse.branches.length > 0) {
        this.branches = LoginResponse.branches;
        sessionStorage.setItem('branches', JSON.stringify(LoginResponse.branches));
        if (LoginResponse.branches.length === 1) {
          sessionStorage.setItem('branchId', LoginResponse.branches[0].branch_id.toString());
          sessionStorage.setItem('branchName', LoginResponse.branches[0].branch_name);
          this.navigateAfterLogin(LoginResponse.userId);
        } else {
          this.route.navigate(['/branch-select']);
        }
      } else {
        this.navigateAfterLogin(LoginResponse.userId);
      }
    });
  }

  onBranchSelected(branch: any) {
    sessionStorage.setItem('branchId', branch.branch_id.toString());
    sessionStorage.setItem('branchName', branch.branch_name);
    this.showBranchSelect = false;
    this.navigateAfterLogin(sessionStorage.getItem('userId'));
  }

  navigateAfterLogin(userId: any) {
    this.subscriptionsService.getSubscriptionByUser(userId).subscribe(subscriptionResponse => {
      if (subscriptionResponse.statusCode === 200) {
        this.route.navigate(['/home']);
      }
      else if (subscriptionResponse.statusCode === 204 && !subscriptionResponse.data) {
        this.route.navigate(['/plan']);
      }
    }, error => {
      console.error('Error al obtener los planes del usuario:', error);
    });
  }

  redirectToRegister() {
    this.route.navigate(['/register']);
  }

}