import { TokenService } from './../../services/token/token.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu/menu.service';
import { navItems } from '../../_nav';
import { Permissao } from '../../models/enums/permissao.enum';
import { SocialAuthService } from 'angularx-social-login';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./default-layout.component.scss'],
  templateUrl: './default-layout.component.html'
})

export class DefaultLayoutComponent implements OnInit {

  @ViewChild('template')
  private template: TemplateRef<any>;
  public mensagem: string;

  public sidebarMinimized = false;
  public navItemsLayout = [];
  public navItemsPermissao = [];
  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];
  public estaLogadoAuth: boolean;
  private modalRef?: BsModalRef;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private token: TokenService,
    private _idle: Idle,
    private modalService: BsModalService,
    private authService: SocialAuthService) {
    this.authService.authState.subscribe((user) => {
      this.estaLogadoAuth = (user != null);
    });

  }

  ngOnInit(): void {
    this.menu = this.menuService.obterMenu();
    this.ouvirRota();
    this.obterMenusPermissaoUsuario();

    this._idle.setIdle(5);
    this._idle.setTimeout(10);
    this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this._idle.onIdleStart.subscribe(() => {
      this.modalRef = this.modalService.show(this.template)
    });

    this._idle.onIdleEnd.subscribe(() => {
      this.modalRef.hide();
    });

    this._idle.onTimeoutWarning.subscribe((secondsLeft: number) => {
      this.mensagem = `Fecharemos em ${secondsLeft}`;
    });

    this._idle.onTimeout.subscribe(() => {
     this.modalRef.hide();
     this.token.removerToken();
     this.router.navigate(['login']);
    });

    this._idle.watch()
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
