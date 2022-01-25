import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu/menu.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./default-layout.component.scss'],
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItems = navItems;
  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];

  constructor(private _router: Router, private menuService: MenuService){}

  ngOnInit(): void {
    this.menu = this.menuService.obterMenu();
    this.ouvirRota();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
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

        if (target === undefined){
            target.name = 'dashboard';
            target.path = '/dashboard';
        }

          target = target.find(page => page.path.slice(2) === router);

          this.breadcrumbList.push({
            name: target.name,
            path: (index === 0) ? target.path : `${this.breadcrumbList[index - 1].path}/${target.path.slice(2)}`
          });

          if (index + 1 !== routerList.length) {
            target = target.children;
          }
        });
      }
    });
  }
}
