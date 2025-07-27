import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';

export interface Branch {
  branch_id: number;
  company_id: number;
  branch_name: string;
  address: string;
  phone: string;
  status: string;
  creation_date: string;
}

@Component({
  selector: 'app-branch-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-select.component.html',
  styleUrl: './branch-select.component.css'
})
export class BranchSelectComponent {
  @Input() branches: Branch[] = [];
  @Output() branchSelected = new EventEmitter<Branch>();

  constructor(public route: Router) {
    this.branches = sessionStorage.getItem('branches') ? JSON.parse(sessionStorage.getItem('branches') || '[]') : [];
  }

  selectBranch(branch: Branch) {
    this.branchSelected.emit(branch);
    sessionStorage.setItem('branchId', branch.branch_id.toString());
    sessionStorage.setItem('branchName', branch.branch_name);
    this.route.navigate(['/home']);
  }
}
