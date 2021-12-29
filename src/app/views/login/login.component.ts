import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin, Login } from 'src/app/resources/models/Login';
import { IUser } from 'src/app/resources/models/User';
import { LoginService } from 'src/app/resources/services/Login.service';
import { UserService } from 'src/app/resources/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;

  /**
   * 
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  submit(): void {
    if (this.form.valid) {
      const login = new Login({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      } as ILogin);

      this._loginService.doLogin(login).subscribe(
        (user: IUser) => {
          this._userService.setUser(user);
          this._router.navigate(['/dashboard']);
        });
    }
  }

}
