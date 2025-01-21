import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  jwtToken = signal<String>('');

  public setToken(token: String): void {
    this.jwtToken.set(token);
  }

  public getToken(): String {
    return this.jwtToken();
  }

  public isLoggedIn(): boolean {
    return this.jwtToken() !== '';
  }

  public logout(): void {
    this.jwtToken.set('');
  }
}
