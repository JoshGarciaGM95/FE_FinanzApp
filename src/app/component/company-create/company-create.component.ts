import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.css'
})
export class CompanyCreateComponent {
  company: any = {
    company_name: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    registration_date: '',
    status: 'activo'
  };

  constructor(private companyService: CompanyService, private router: Router) {}

  onSubmit() {
    const userId = sessionStorage.getItem('userId');
    const companyData = {
      user_id: userId,
      company_name: this.company.company_name,
      contact_email: this.company.contact_email,
      contact_phone: this.company.contact_phone,
      address: this.company.address,
      registration_date: this.company.registration_date || new Date().toISOString(),
      status: 'active'
    };
    this.companyService.createCompany(companyData).subscribe({
      next: (res) => {
        sessionStorage.setItem('companyId', res.company_id);
        this.router.navigate(['/branch-create']);
      },
      error: (err) => alert('Error al crear empresa: ' + err.message)
    });
  }
}
