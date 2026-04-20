import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private api = 'http://localhost:8080/api/auth';

  register(data: { username: string; password: string }) {
    return this.http.post<{ message: string; username: string }>(`${this.api}/register`, data).pipe(
      tap((res) => {
        localStorage.setItem('username', res.username);
      }),
    );
  }

  login(data: { username: string; password: string }) {
    return this.http.post<{ message: string; username: string }>(`${this.api}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('username', res.username);
        localStorage.setItem('loggedIn', 'true');
      }),
    );
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }
}
