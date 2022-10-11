import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  alert!: { text: string, show: boolean, class: string };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })
  }

  login(event: any): void {
    event.preventDefault();

    if (this.form.valid) {
      this.userService
        .findByEmail(this.form.value.email)
        .subscribe(
          (data: any) => {
            const user = data[0];

            if (user) {
              if (this.form.value.senha === user.senha) {
                localStorage.setItem('_user_', JSON.stringify(user));
                return this.router.navigate(['lista-livros']);
              }

              return this.onAlert('Senha inválida.', 'alert-danger', 2000);
            }

            return this.onAlert('Usuário não encontrado.', 'alert-danger', 2000);
          },
          () => {
            return this.onAlert('Usuário não encontrado.', 'alert-danger', 5000);
          }
        )
      return;
    }


    return this.onAlert('Informe email e senha', 'alert-danger', 2000);
  }

  onAlert(text: string, className: string, timeout: number): void {
    this.alert = { text, show: true, class: className }

    setTimeout(() => {
      this.alert = {
        text: '',
        show: false,
        class: ''
      }
    }, timeout);
  }
}
