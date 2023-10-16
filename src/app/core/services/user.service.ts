import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { PessoaUsuaria } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);

  constructor(private tokenService: TokenService) {
    if(this.tokenService.userHasToken ()) {
      this.decodificarJWT();
    }
  }

  private decodificarJWT() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as PessoaUsuaria;
    this.userSubject.next(user);
  }

  returnUserData() {
    return this.userSubject.asObservable();
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  verifyUserIsLogged() {
    return this.tokenService.userHasToken ();
  }
}
