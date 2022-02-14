import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    public jwtHelper: JwtHelperService,
    private router: Router) {
  }

  public usuarioEstaAutenticado(){
    const token: string = localStorage.getItem("jwt");
    return !this.jwtHelper.isTokenExpired(token);
  }

  canActivate(): boolean{

    if(!this.usuarioEstaAutenticado()){
      this.router.navigate(['login']);
      return false
    }

    return true;
  }

}
