import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { ToastService } from '../../../../shared/service/toast.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  ngOnInit() {
    //this.toastService.show('Registration successful! Please login.', 'success');
    // this.toastService.show('Something went wrong. Please try again.', 'error');
  }

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private toastService = inject(ToastService);
  private router = inject(Router);
  showPassword = false;

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        this.toastService.show('Registration successful! Please login.', 'success');
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration Failed:', error);
        this.toastService.show('Registration failed. Please try again.', 'error');
      },
    });
  }
}
