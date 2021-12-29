import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister } from '../models/Register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private _http: HttpClient) {}

  public doRegister(body: IRegister): Observable<any> {
    return this._http.post<any>(
      'http://localhost:3000/users/create',
      body,
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
    );
  }
}