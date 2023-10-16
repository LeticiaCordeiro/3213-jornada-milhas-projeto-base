import { FormularioService } from './../../core/services/formulario.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UnidadeFederativa } from 'src/app/core/types/type';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit {
  cadastroForm!: FormGroup;
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required);

  @Input() title: string = 'Crie sua conta';
  @Input() btnText: string = 'CADASTRAR';
  @Input() profileComponent: boolean = false;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>()
  @Output() sair: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private FormBuilder: FormBuilder,
    private FormularioService: FormularioService
  ){}

  ngOnInit(): void {
    this.cadastroForm = this.FormBuilder.group({
      nome: [null, Validators.required],
      nascimento: [null, Validators.required],
      cpf:[null, Validators.required],
      cidade:[null, Validators.required],
      email:[null, [Validators.required, Validators.email]],
      senha:[null, [Validators.required,Validators.minLength(3)]],
      genero:['outro'],
      telefone:[null, Validators.required],
      confirmarEmail: [null,[Validators.required, Validators.email, FormValidations.equalTo('email')]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3), FormValidations.equalTo('senha')]],
      aceitarTermos: [null, [Validators.requiredTrue]],
      estado: this.estadoControl,
    });

    if(this.profileComponent){
      this.cadastroForm.get('aceitarTermos')?.setValidators(null)
    }
    else{
      this.cadastroForm.get('aceitarTermos')?.setValidators( [Validators.requiredTrue])
    }

    this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity();
    this.FormularioService.setProfileDataUserLogged(this.cadastroForm)

  }
  executarAcao(){
    this.acaoClique.emit();
  }

  logout(){
    this.sair.emit();
  }
}
