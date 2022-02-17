import { TokenService } from './../token/token.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthGuard } from './auth.guard';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(private auth: AuthGuard, private router: Router, private token: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const permissaoEsperada: number[] = route.data.permissaoEsperada;
    const permissaoToken = this.token.obterPermissaoToken()

    const permissaoEncontrada = permissaoEsperada.find(x => x == permissaoToken);

    debugger;
    if (!this.auth.usuarioEstaAutenticado() || permissaoEncontrada == undefined)
    {
      this.router.navigate(['403']);
      return false;
    }

    return true;

  }
}
