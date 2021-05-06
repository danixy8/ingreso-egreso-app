import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
.form-control{
  height: calc(2em + .75rem + 2px);
}
`]
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
      this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.formularioLogin.invalid){ return; }
    const {correo, password} = this.formularioLogin.value;
    this.auth.loginUsuario(correo, password)
    .then(login => {
      console.log(login);
      this.router.navigate(['/']);
    })
    .catch(err => {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
        this.formularioLogin.reset();
        this.formularioLogin.markAllAsTouched();
    });
  }
}
