import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { GeralService } from '../../../geral.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

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

  handleLogin() {
    this.geralService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .subscribe((user: any) => {
        if (user.user.crm) {
          localStorage.setItem('eMedico', 'true');
        }
        this.geralService.loginEventEmitter(true);
        localStorage.setItem('userName', user.user.nome);
        this.toastr.success('Logado com Sucesso');
        this.router.navigate(['/funcionarios']);
      }, (error: { status: number; }) => {
        let messageErr;
        if (error.status === 401) {
          messageErr = 'Usuário e/ou senha incorretos.';
        } else {
          messageErr = 'Algo de errado aconteceu tente novamente mais tarde.';
        }
        this.toastr.error(messageErr, 'Error');
      });
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
