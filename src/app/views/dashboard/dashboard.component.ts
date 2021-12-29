import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/resources/services/user.service';
import { IUser } from 'src/app/resources/models/User';
import { LoginService } from 'src/app/resources/services/Login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user!: IUser;
  public form!: FormGroup;

  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string | undefined;

  /**
   * 
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _loginService: LoginService,
  ) {
    this._userService.getUser();
  }

  ngOnInit() { 
    this._userService.user$.subscribe((user: IUser) => {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.password = user?.password;
      this.user = user;
    });

    this.form = this._formBuilder.group({
      name: new FormControl(this.user?.name),
      email: new FormControl(this.user?.email),
      password: new FormControl('')
    });
  }

  submit(): void {
    if (this.form.valid) {
      let user = {
        id: this.user?.id || this.id,
        name: this.form.get('name')?.value || this.name,
        email: this.form.get('email')?.value || this.email,
        password: this.form.get('password')?.value || this.password
      } as IUser;

      this._userService.doUpdate(user).subscribe((user: IUser) => {
        this._userService.getUser();
      });
    }
  }

  logOff(): void {
    this._loginService.doLogOff();
  }  
}
