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
    private FormularioService: FormularioService,
    private CadastroService: CadastroService,
    private router: Router
  ){}

  register(){
    const formCadastro = this.FormularioService.getProfileDataUserLogged();

    if(formCadastro?.valid){
      const novoCadastro = formCadastro.getRawValue() as User;
      this.CadastroService.register(novoCadastro).subscribe({
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
