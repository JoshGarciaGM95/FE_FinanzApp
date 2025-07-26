// Angular Core
import {ChangeDetectionStrategy, Component, viewChild} from '@angular/core';
import { CommonModule, AsyncPipe, NgIf, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

// Application-specific
import { PlanData } from '../../interface/Plan/PlanData';
import { FeaturesData } from '../../interface/Features/FeaturesData';
import { featuredata } from '../../interface/Features/FeaturesData';
import { PlanService } from '../../services/plan.service';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { AuthService } from '../../services/auth.service';
import { InventoryComponent } from "../inventory/inventory.component";
import { SaleComponent } from "../sale/sale.component";
import { IncomeComponent } from "../income/income.component";
import { ClientComponent } from "../client/client.component";
import { ProviderComponent } from "../provider/provider.component";
import { ProductComponent } from "../product/product.component";
import { CompanyService } from '../../services/company.service';
import { InventoryListComponent } from '../inventory/inventory-list/inventory-list.component';
import { ProductListComponent } from '../product/product-list/product-list.component';

@Component({
  selector: 'app-home',
  imports: [FormsModule,
    ReactiveFormsModule, RouterModule, CommonModule,
    InventoryListComponent, ProductListComponent, SaleComponent, IncomeComponent, ClientComponent, ProviderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  showFiller = false;
  SelectedFeature: string = '';
  showFeature: boolean = false;
  isLoggedIn$: Observable<boolean>;
  isNotLoggedIn$: Boolean = true;
  username: string | null = null;
  userId: number | null = null;
  companyId: number | null = null;
  companyName: string | null = null;
  token: string | null = null;
  plan: PlanData | null = null;
  features: any = { RRHHH: [], Finance: [] };

  constructor(
    private authService: AuthService,
    private subscriptionsService: SubscriptionsService,
    private companyService: CompanyService,
    private plansService: PlanService,
    private route: Router,
    
  ) {
    this.userId = sessionStorage.getItem('userId') ? parseInt(sessionStorage.getItem('userId')!, 10) : null;
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.username = sessionStorage.getItem('username');
  }
  
  ngOnInit(): void {

    if (sessionStorage.getItem('token')) {
      this.authService.setLoggedIn(true);
    }

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.route.navigate(['/login']);
        this.isNotLoggedIn$ = true;
      }
      else {
        this.isNotLoggedIn$ = false;
      }
    });
    this.getCompanyUser();
    this.getSubscriptionsByUser();

    // Validación de empresa y sucursal
    setTimeout(() => {
      const companyId = sessionStorage.getItem('companyId');
      if (!companyId) {
        this.route.navigate(['/company-create']);
        return;
      }
      const branchId = sessionStorage.getItem('branchId');
      if (!branchId) {
        this.route.navigate(['/branch-create']);
        return;
      }
    }, 500);
  }

  getCompanyUser(){
    if(this.userId){
      this.companyService.getCompanyByUser(this.userId).subscribe(companyUser => {
        if(companyUser){
          sessionStorage.setItem('companyId', companyUser.company_id.toString());
          sessionStorage.setItem('companyName', companyUser.company_name);
          this.companyName = companyUser.company_name;
          this.companyId = companyUser.company_id;
        }
      });
    }
  }

  getSubscriptionsByUser(){
    if (this.userId) {
      this.subscriptionsService.getSubscriptionByUser(this.userId).subscribe(SubscriptionResponse => {
        
        if(SubscriptionResponse.statusCode === 200 && SubscriptionResponse.data) {

          this.plansService.getPlanById(SubscriptionResponse.data.plan_id).subscribe(plan => {
            let plans: PlanData = plan;
            this.features = plans.features;
            console.log('Plan Features:', this.features);             
          });

        };

      }, error => {
        console.error('Error al obtener los planes del usuario:', error);
      });
    } else {
      console.warn('User ID is not available');
    }
  }

  
  convertToObject(value: string): FeaturesData {
    try {
      return JSON.parse(value) as FeaturesData;
    } catch (error) {
      console.error('Error parsing string to object:', error);
      return { RRHHH: [], Finance: [] };
    }
  }

  convertToObjectFeature(value: string): featuredata {
    try {
      return JSON.parse(value) as featuredata;
    } catch (error) {
      console.error('Error parsing string to object:', error);
      return { id: 0, name: '', description: '', icon: '' };
    }
  }


  redirectTo(path: string) {
    this.route.navigate(['/'+ path]);
  }

  Logout(){
    this.authService.setLoggedIn(false);
    this.route.navigate(['/login']);
  }

  showSelectedFeatre(feature: string) {
    this.showFeature = true;
    this.SelectedFeature = feature;
  }


}
