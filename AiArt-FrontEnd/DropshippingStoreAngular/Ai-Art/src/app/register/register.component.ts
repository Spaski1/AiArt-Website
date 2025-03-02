import { Component, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatFormFieldModule,MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordMissMatch: boolean = false;
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  errorMessage = signal('')

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }
  //da se proverat validatorite
  initForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/), Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/), Validators.minLength(2)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      cardNo: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16),Validators.pattern(/^[0-9]\d*$/)]),
      expireDate: new FormControl('', [Validators.required, Validators.pattern(/^(11|12)\/24$|^(0[1-9]|10|11|12)\/2[5-9]$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if(this.registerForm.invalid){
      return
    }
    
    //proverka na password-ot pred da se pusti request do backend
    const registerPassword = this.registerForm.get('password')?.value;
    const confirmedPassword = this.registerForm.get('confirmPassword')?.value;

    if (registerPassword !== confirmedPassword) {
      console.log('Passwords do not match');
      this.passwordMissMatch = true;
      return;
    } else {
      this.passwordMissMatch = false;
    }

    // ako e vo red se registrira i prakja register do backend

    console.log(this.registerForm.value);
    const {
      firstName,
      lastName,
      userName,
      email,
      cardNo,
      expireDate,
      password,
    } = this.registerForm.value;
    this.authService
      .register(
        firstName,
        lastName,
        userName,
        email,
        cardNo,
        expireDate,
        password
      )
      .subscribe((response) => {
        console.log('Response from register', response);
        this.errorMessage.set('')
        if (response) {
          console.log(response)
          this.router.navigate(['/login']);
        }else{
          this.errorMessage.set('User with same user name or email already exist.')
          
        }
      });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible; // Toggle visibility
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible; // Toggle visibility
  }
}
