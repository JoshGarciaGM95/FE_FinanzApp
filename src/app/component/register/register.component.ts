import { Component } from '@angular/core';
import {
  FormControl,  
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserRegister } from '../../interface/User/UserRegister';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  token: string | null = null;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  
  userRegister: UserRegister = {} as UserRegister;
  
  constructor(private route: Router, private registerService: RegisterService) {}

  ngOnInit(): void {
    
  }

  redirectToLogin() {
    this.route.navigate(['/login']);
  }

  onSubmit(){   
    this.registerService.register(this.userRegister).subscribe(response => {
      this.route.navigate(['/plan']);
    });
    
  }

}
