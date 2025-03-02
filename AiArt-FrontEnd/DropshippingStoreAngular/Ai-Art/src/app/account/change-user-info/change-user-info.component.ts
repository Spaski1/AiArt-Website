import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../../types/user-info.interface';

@Component({
  selector: 'app-change-user-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.css'],
})
export class ChangeUserInfoComponent implements OnInit {
  userInfo = signal<UserInfo | null>(null);
  userInfoForm: FormGroup;
  successMessage: string | null = null;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private readonly accountService: AccountService
  ) {
    this.userInfoForm = this.fb.group(
      {
        firstName: ['', [Validators.maxLength(50)]],
        lastName: ['', [Validators.maxLength(50)]],
        userName: ['', [Validators.minLength(3)]],
        password: ['', [Validators.minLength(8)]],
        confirmPassword: ['', [Validators.minLength(8)]],
        email: [
          '',
          [
            Validators.email,
            Validators.pattern(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/),
          ],
        ],
        cardNo: [
          '',
          [
            Validators.minLength(16),
            Validators.maxLength(16),
            Validators.pattern(/^[0-9]\d*$/),
          ],
        ],
        expireDate: [
          '',
          [Validators.pattern(/^(0[1-9]|1[0-9])\/?([0-9]{2})$/)],
        ],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit(): void {
    this.accountService.getUserInfo().subscribe({
      next: (data) => {
        console.log('User info response:', data);
        this.userInfo.set(data.userInfo);
        this.userInfoForm.patchValue(data.userInfo);
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
      },
      complete: () => {
        console.log('User info fetch complete');
      },
    });
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    } else {
      return null;
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit() {
    if (this.userInfoForm.valid) {
      const updatedUserInfo = this.userInfoForm.value;

      this.accountService.updateUserInfo(updatedUserInfo).subscribe({
        next: () => {
          console.log('User info updated successfully');
          this.successMessage = 'User info updated successfully!';
          setTimeout(() => (this.successMessage = null), 3000);
        },
        error: (error) => {
          console.error('Error updating user info:', error);
          this.successMessage = null;
        },
      });
    } else {
      console.error('Form is invalid');
      this.successMessage = null;
    }
  }
}
