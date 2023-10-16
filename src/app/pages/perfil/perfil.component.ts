import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/types/type';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit{
  title = 'Olá, ';
  btnText = 'ATUALIZAR';
  profileComponent = true;

  cadastro!: User;
  token: string = '';
  nome: string = '';
  form!: FormGroup<any> | null;

  constructor(
    private registerService: CadastroService,
    private tokenService: TokenService,
    private formProfileService: FormularioService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = this.tokenService.getToken();
    this.registerService.searchRegister().subscribe(cadastro => {
      this.cadastro = cadastro;
      this.nome = cadastro.nome;
      this.retrieveDataProfileForm();
    })
  }

  retrieveDataProfileForm() {
    this.form = this.formProfileService.getProfileDataUserLogged();
    this.form?.patchValue({
      nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      cidade: this.cadastro.cidade,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      genero: this.cadastro.genero,
      telefone: this.cadastro.telefone,
      estado: this.cadastro.estado,
    });
  }

  updateUserProfileData() {
    const refreshedData = {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      cpf: this.form?.value.cpf,
      telefone: this.form?.value.telefone,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
      genero: this.form?.value.genero,
      cidade: this.form?.value.cidade,
      estado: this.form?.value.estado
    }

    this.registerService.editRegister(refreshedData).subscribe({
      next: () => {
        alert('Cadastro editado com sucesso')
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
