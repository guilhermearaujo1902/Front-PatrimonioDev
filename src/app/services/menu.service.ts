import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  constructor() { }

  public obterMenu(): Array<any> {
    const menu = [
      { name: 'home', path: './home', children: [] },
      {
        name: 'dashboard',
        path: './dashboard',
        children: [
          {
            name: 'setor',
            path: './setor',
          },
          {
            name: 'empresa',
            path: './empresa',
          }
          ,
          {
            name: 'permissao',
            path: './permissao',
          }
        ]
      },
    ];

    return menu;
  }
}
