import { TokenService } from './../token/token.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(
    private router: Router,
    private token: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const permissaoEsperada: number[] = route.data.permissaoEsperada;
    debugger;
    const permissaoToken = this.token.obterPermissaoToken()

    const permissaoEncontrada = permissaoEsperada.find(x => x == permissaoToken);

    debugger;
    if (!this.token.usuarioEstaAutenticado() || permissaoEncontrada == undefined)
    {
      this.router.navigate(['403']);
      return false;
    }

    return true;

  }
}
