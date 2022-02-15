import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { AuthGuard } from './auth.guard';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(private auth: AuthGuard, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const permissaoEsperada = route.data.permissaoEsperada;

    const token = localStorage.getItem('jwt');
    const tokenPayload: any = decode(token);
    debugger;
    if (
      !this.auth.usuarioEstaAutenticado() ||
      +tokenPayload.permissao !== permissaoEsperada
    ) {
      this.router.navigate(['403']);
      return false;
    }
    return true;
  }
}
