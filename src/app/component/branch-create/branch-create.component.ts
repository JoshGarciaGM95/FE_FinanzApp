import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../../services/branch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branch-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './branch-create.component.html',
  styleUrl: './branch-create.component.css'
})
export class BranchCreateComponent {
  branch: any = {
    branch_name: '',
    address: '',
    phone: '',
    status: 'active',
    creation_date: ''
  };

  branches: any[] = [];

  constructor(private branchService: BranchService, public router: Router) {
    this.loadBranches();
  }

  loadBranches() {
    const companyId = Number(sessionStorage.getItem('companyId'));
    if (companyId) {
      this.branchService.getBranchesByCompany(companyId).subscribe({
        next: (res) => {
          this.branches = res;
        },
        error: (err) => {
          this.branches = [];

        }
      });
    }
  }

  onSubmit() {
    const companyId = Number(sessionStorage.getItem('companyId'));
    const branchData = {
      company_id: companyId,
      branch_name: this.branch.branch_name,
      address: this.branch.address,
      phone: this.branch.phone,
      status: this.branch.status,
      creation_date: this.branch.creation_date || new Date().toISOString(),
      id_User : sessionStorage.getItem('userId')
    };
    this.branchService.createBranch(branchData).subscribe({
      next: (res) => {
        this.loadBranches();
        this.branch = { branch_name: '', address: '', phone: '', status: 'active', creation_date: '' };
      },
      error: (err) => alert('Error al crear sucursal: ' + err.message)
    });
  }
}
