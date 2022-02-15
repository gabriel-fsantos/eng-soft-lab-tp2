import { GeralService } from '../../../geral.service';
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
              private toastr: ToastrService,
              private readonly geralService: GeralService) {
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

  ngOnInit() {
    this.geralService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .subscribe((user: any) => {
        console.log(user)
        localStorage.setItem('user', user.token);
        localStorage.setItem('id', user.user.id);
        this.toastr.success('Logado com Sucesso');
        // this.router.navigate(['/internal/home'])
      }, (error: { status: number; }) => {
         let messageErr;
         if (error.status === 401) {
          messageErr = 'Usuário e/ou senha incorretos.';
         } else {
          messageErr = 'Algo de errado aconteceu tente novamente mais tarde.';
         }
         this.toastr.error(messageErr, 'Error', {
          timeOut: 3000,
        });
      });
  }

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
