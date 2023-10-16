import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router
  ){}

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required]
    })
  }

  login(){
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    this.authService.validateUserCredential(email, senha).subscribe({
     next: (value) => {
      console.log('Logion relizado com sucesso', value),
      this.router.navigateByUrl('/')

     },
     error: (err) => {
       console.log('Error no login', err)
     },
    })
  }

}
