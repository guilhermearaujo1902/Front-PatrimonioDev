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
            name: 'Setor',
            path: './setor',
          },
          {
            name: 'Listar Setor',
            path: './listarSetor',
          },
          {
            name: 'Empresa',
            path: './empresa',
          },
          {
            name: 'Listar Empresa',
            path: './listarEmpresa',
          },
          {
            name: 'Permissão',
            path: './permissao',
          },
          {
            name: 'Listar Permissões',
            path: './listarPermissao',
          },
          {
            name: 'Fabricante',
            path: './fabricante',
          },
          {
            name: 'Listar Fabricante',
            path: './listarFabricante',
          },
          {
            name: 'Patrimônio',
            path: './patrimonio',
          },
          {
            name: 'Listar Patrimônio',
            path: './listarPatrimonio',
          },
          {
            name: 'Perca',
            path: './perca',
          },
          {
            name: 'Equipamento',
            path: './equipamento',
          },
          {
            name: 'Listar Equipamento',
            path: './listarEquipamento',
          },
          {
            name: 'Usuário',
            path: './usuario',
          },
          {
            name: 'Listar Usuário',
            path: './listarUsuario',
          },
          {
            name: 'Movimentação',
            path: './movimentacao',
          },
          {
            name: 'Listar Movimentação',
            path: './listarMovimentacao',
          },
          {
            name: 'Perfil',
            path: './usuarioPerfil',
          },
          {
            name: 'Funcionário',
            path: './funcionario',
          },
          {
            name: 'Listar Funcionário',
            path: './listarFuncionario',
          }
        ]
      },
    ];

    return menu;
  }
}
