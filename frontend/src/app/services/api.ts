import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) { }

  // FIXED: Changed localStorage to sessionStorage to align with login storage layers
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // --- AUTHENTICATION ENDPOINTS ---
  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  // --- TASK MANAGEMENT ENDPOINTS (PROTECTED) ---
  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks`, { headers: this.getAuthHeaders() });
  }

  createTask(taskData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, taskData, { headers: this.getAuthHeaders() });
  }

  updateTask(taskId: string, taskData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${taskId}`, taskData, { headers: this.getAuthHeaders() });
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${taskId}`, { headers: this.getAuthHeaders() });
  }
}