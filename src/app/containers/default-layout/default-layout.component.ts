import { TokenService } from './../../services/token/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu/menu.service';
import { navItems } from '../../_nav';
import { Permissao } from '../../models/enums/permissao.enum';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./default-layout.component.scss'],
  templateUrl: './default-layout.component.html'
})

export class DefaultLayoutComponent implements OnInit{

  public sidebarMinimized = false;
  public navItems = [];
  public navItemsPermissao = [];
  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];
  public estaLogadoAuth: boolean;

  constructor(
    private _router: Router,
    private menuService: MenuService,
    private token: TokenService,
    private authService: SocialAuthService){
      this.authService.authState.subscribe((user) => {
        this.estaLogadoAuth = (user != null);
      });

    }

  ngOnInit(): void {
    this.menu = this.menuService.obterMenu();
    this.ouvirRota();
    this.obterMenusPermissaoUsuario();
  }

  private obterMenusPermissaoUsuario(): void {
    const permissao = this.token.obterPermissaoToken();

    switch (permissao) {

      case Permissao.Gestor:

        navItems.forEach(rota => {
          // if(rota.permissaoEsperada !== 1){
          //   this.navItemsPermissao.push(rota)
          // }
        });

        this.navItems = this.navItemsPermissao;

        break;

      case Permissao.Usuario:

        navItems.forEach(rota => {

          // if(rota.permissaoEsperada == 3){
          //   this.navItemsPermissao.push(rota)
          // }

        });

        this.navItems = this.navItemsPermissao;

        break;

      default:
        this.navItems = navItems;
      break;
    }
  }

  private signOutAuth(): void {
    debugger;

    if(this.estaLogadoAuth)
      this.authService.signOut(true);

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  public logOut(){

    this.signOutAuth();
    //TODO: JOGAR PARA CLASSE DE TOKEN
    localStorage.removeItem('valor');
    this._router.navigate(["login"]);
  }

  ouvirRota(): void {
    let routerUrl: string, routerList: Array<any>, target: any;

    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {

        target = this.menu;

        this.breadcrumbList.length = 0;
        routerList = routerUrl.slice(1).split('/');
        routerList.forEach((router, index) => {

          target = target.find(page => page.path.slice(2) === router);

          this.breadcrumbList.push({
            name: target?.name ,
            path: (index === 0) ? target?.path : `${this.breadcrumbList[index - 1]?.path}/${target?.path.slice(2)}`
          });

          if (index + 1 !== routerList.length) {
            target = target.children;
          }
        });
      }
    });
  }
}
