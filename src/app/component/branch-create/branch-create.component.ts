import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-branch-create',
  standalone: true,
  imports: [FormsModule],
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

  constructor(private branchService: BranchService, private router: Router) {}

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
        this.router.navigate(['/home']);
      },
      error: (err) => alert('Error al crear sucursal: ' + err.message)
    });
  }
}
