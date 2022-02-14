import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router,
              private toastr: ToastrService) {
      this.loginForm = this.formBuilder.group({
        email: [null, [
          Validators.required,
          Validators.email
        ]],
        password: [null, [
          Validators.required,
          Validators.minLength(6)
        ]]
      });
  }

  ngOnInit() { }

  handleLogin() {
  }

  getEmailErrorMessage(): string {
    return this.loginForm.get('email')?.hasError('required') ? 'Obrigatorio' :
           this.loginForm.get('email')?.hasError('email') ? 'Email invalido' : '';
  }

  getPasswordErrorMessage(): string {
    return this.loginForm.get('password')?.hasError('required') ? 'Obrigatorio' :
           !this.loginForm.get('password')?.hasError('minLength') ? 'Minimo 6 caracteres' : '';
  }

}
