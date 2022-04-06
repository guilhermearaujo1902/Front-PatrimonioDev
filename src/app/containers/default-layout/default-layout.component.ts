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

export class DefaultLayoutComponent implements OnInit {

  public sidebarMinimized = false;
  public navItemsLayout = [];
  public navItemsPermissao = [];
  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];
  public estaLogadoAuth: boolean;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private token: TokenService,
    private authService: SocialAuthService) {
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
          if (rota.permissaoDoUsuario !== 1) {
            this.navItemsPermissao.push(rota)
          }
        });

        this.navItemsLayout = this.navItemsPermissao;
        break;

      case Permissao.Usuario:

        navItems.forEach(rota => {

          if (rota.permissaoDoUsuario == 3) {
            this.navItemsPermissao.push(rota)
          }

        });

        this.navItemsLayout = this.navItemsPermissao;
        break;

      default:
        this.navItemsLayout = navItems;
        break;
    }
  }

  private signOutAuth(): void {

    if (this.estaLogadoAuth)
      this.authService.signOut(true);

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  public logOut() {

    this.signOutAuth();
    this.token.removerToken();
    this.router.navigate(['login']);
  }

  private ouvirRota(): void {
    let routerUrl: string, routerList: Array<any>, target: any;
    routerUrl = this.router.url;

    this.router.events.subscribe(
      (router: any) => {
        routerUrl = router.url;

        if (routerUrl && typeof routerUrl === 'string') {

          target = this.menu;

          this.breadcrumbList.length = 0;

          routerList = routerUrl.slice(1).replaceAll('?', '$').replaceAll('/', '$').split('$');

          this.percorrerMenus(routerList, target);
        }
        return;
      });

      this.percorrerMenus(this.router.url.slice(1).replaceAll('?', '$').replaceAll('/', '$').split('$'), this.menu)
  }

  private percorrerMenus(url: any[], menus: any): void {

    url.forEach((router, index) => {

      if (index > 1)
        return;

      if (typeof menus !== 'undefined' || menus !== null) {
        menus = menus?.find(page => page.path.slice(2) === router);
      }

      this.breadcrumbList.push({
        name: menus?.name,
        path: (index === 0) ? menus?.path : `${this.breadcrumbList[index - 1]?.path}/${menus?.path.slice(2)}`
      });

      if (index + 1 !== url.length) {
        menus = menus.children;
      }
    });

  }
}
