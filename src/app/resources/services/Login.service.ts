import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ILogin } from '../models/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  /**
   * 
   */
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {}

  public doLogin(body: ILogin): Observable<any> {
    return this._http.post<any>(
      'http://localhost:3000/auth/login',
      body,
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
    );
  }

  public doLogOff(): void {
    localStorage.removeItem('user.token');
    this._router.navigate(['/login']);
  }
}