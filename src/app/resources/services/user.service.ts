import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IUser } from '../models/User';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  doLogOff() {
    throw new Error('Method not implemented.');
  }

  private user = new ReplaySubject<IUser>(1);
  readonly user$ = this.user.asObservable();

  constructor(
    private _http: HttpClient
  ) {}

  public setUser(user: IUser): void {
    localStorage.setItem('user.token', user.id);
  }

  public getUser(): void {
    this._http.get<any>(
      'http://localhost:3000/users/' + localStorage.getItem('user.token'),
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
    ).subscribe((user: IUser) => {
      this.user.next(user);
    });
  }

  public doUpdate(user: IUser): Observable<IUser> {
    return this._http.patch<any>(
      'http://localhost:3000/users/' + user.id,
      user,
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
    );
  }
}