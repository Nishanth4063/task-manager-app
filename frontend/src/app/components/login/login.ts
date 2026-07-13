import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin(): void {
    sessionStorage.clear();
    this.errorMessage = '';

    this.apiService.login(this.credentials).subscribe({
      next: (res: any) => {
        if (res && res.token) {
          sessionStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Authentication invalid: Missing authorization token.';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Login failed. Please check your credentials.';
      }
    });
  }
}