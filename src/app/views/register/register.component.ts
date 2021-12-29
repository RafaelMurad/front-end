import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegister, Register } from 'src/app/resources/models/Register';
import { RegisterService } from 'src/app/resources/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form!: FormGroup;

  /**
   * 
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _service: RegisterService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
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
      const register = new Register({
        name: this.form.get('name')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      } as IRegister);

      this._service.doRegister(register).subscribe(
        (value) => this._router.navigate(['/login'])
      );
    }
  }

}
