import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  newTask = { title: '', description: '', status: 'Pending' };

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.apiService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }

  onCreateTask() {
    this.apiService.createTask(this.newTask).subscribe({
      next: () => {
        this.loadTasks();
        this.newTask = { title: '', description: '', status: 'Pending' };
      },
      error: (err) => console.error('Error creating task:', err)
    });
  }

  updateStatus(id: string, status: string) {
    this.apiService.updateTask(id, { status }).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Error updating task:', err)
    });
  }

  deleteTask(id: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.apiService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Error deleting task:', err)
      });
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}