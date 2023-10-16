import { User } from 'src/app/core/types/type';
import { CadastroService } from './../../core/services/cadastro.service';
import { FormularioService } from './../../core/services/formulario.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  perfilComponent = false;

  constructor(
    private formRegisterService: FormularioService,
    private RegisterService: CadastroService,
    private router: Router
  ){}

  register(){
    const formRegister = this.formRegisterService.getProfileDataUserLogged();

    if(formRegister?.valid){
      const newRegister = formRegister.getRawValue() as User;
      this.RegisterService.register(newRegister).subscribe({
        next: (value) =>{
          console.log(value);
          this.router.navigate(['/login'])
        },
        error:(err) => {
          console.log(err);
        }
      })
    }
  }
}
