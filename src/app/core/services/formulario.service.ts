import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  cadastroForm: FormGroup | null = null

  getProfileDataUserLogged(): FormGroup | null{
    return this.cadastroForm
  }
  setProfileDataUserLogged(form: FormGroup){
    this.cadastroForm = form;
  }
}
