// ...existing code...
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PlanData } from '../../interface/Plan/PlanData';
import { PlanService } from '../../services/plan.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesData } from '../../interface/Features/FeaturesData';
import { SubscriptionsService } from '../../services/subscriptions.service';

@Component({
  selector: 'app-plan',
  imports: [CommonModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {
  selectPlan(plan: PlanData) {
    if (!this.userId) {
      alert('Usuario no identificado');
      return;
    }
    const subscriptionData = {
      user_id: this.userId,
      plan_id: plan.plan_id
    };
    this.subscriptionsService.createSubscription(subscriptionData).subscribe({
      next: (res) => {
        this.route.navigate(['/company-create']);
      },
      error: (err) => {
        alert('Error al crear suscripción: ' + err.message);
      }
    });
  }


  token: string | null = null;
  plans: PlanData[] = [];
  subscriptions: any = {};
  haveSubscription: boolean = false;
  features: FeaturesData = {
    RRHHH: [],
    Finance: []
  };
  userId: number | null = null;

  constructor(
    private route: Router, 
    private authService: AuthService, 
    private planService: PlanService, 
    private subscriptionsService: SubscriptionsService
  ) {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId')!, 10) : null;
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.route.navigate(['/login']);
      }
    });
    this.getPlans();
  }

  convertToObject(value: string): FeaturesData {
    try {
      return JSON.parse(value) as FeaturesData;
    } catch (error) {
      console.error('Error parsing string to object:', error);
      return { RRHHH: [], Finance: [] };
    }
  }

  getPlans() {
    this.planService.register().subscribe(response => {
          this.plans = response;
        });
  }
  
}
