import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(loginRequest: any) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest);
  }

  register(registerRequest: any) {
    return this.http.post(`${this.apiUrl}/register`, registerRequest, { responseType: 'text' });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
