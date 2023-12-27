import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";
import {env} from "../env";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = `${env.baseUrl}/auth`;
  loggedIn: WritableSignal<boolean> = signal(localStorage.getItem('token') != null);

  constructor(private http: HttpClient) {
  }

  login(user: User) {
    return this.http.post(`${this._baseUrl}/login`, {
      'email': user.email,
      'password': user.password,
    });
  }

  register(user: User) {
    return this.http.post(`${this._baseUrl}/register`, {
      'email': user.email,
      'password': user.password,
    });
  }

  logout() {
    this.loggedIn.set(false);
    localStorage.removeItem('token');
  }
}
