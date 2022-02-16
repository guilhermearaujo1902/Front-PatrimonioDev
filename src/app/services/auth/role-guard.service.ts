import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { AuthGuard } from './auth.guard';

@Injectable()
export class RoleGuardService implements CanActivate {
  private readonly nomeCampoPermissao = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  constructor(private auth: AuthGuard, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const permissaoEsperada: number[] = route.data.permissaoEsperada;

    const token: string = localStorage.getItem('jwt');
    const tokenPayload: any = decode(token);

    const permissaoEncontrada = permissaoEsperada.find(x => x == +tokenPayload[this.nomeCampoPermissao]);

    debugger;
    if (!this.auth.usuarioEstaAutenticado() || permissaoEncontrada == undefined)
    {
      this.router.navigate(['403']);
      return false;
    }

    return true;

  }
}
