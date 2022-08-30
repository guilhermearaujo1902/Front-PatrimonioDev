import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private token: TokenService,
    private router: Router) {
  }

  canActivate(): boolean{
    if(!this.token.usuarioEstaAutenticado()){
      this.router.navigate(['login']);
      return false
    }

    return true;
  }

}
