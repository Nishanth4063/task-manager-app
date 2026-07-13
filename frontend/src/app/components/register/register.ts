import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  userData = { username: '', email: '', password: '' };
  errorMessage = '';
  successMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onRegister() {
    this.apiService.register(this.userData).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Registration failed.';
      }
    });
  }
}