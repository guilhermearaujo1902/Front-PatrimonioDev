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
            name: 'Listagem de Setores',
            path: './listarSetor',
          },
          {
            name: 'Empresa',
            path: './empresa',
          },
          {
            name: 'Listagem de Empresas',
            path: './listarEmpresa',
          },
          {
            name: 'Permissão',
            path: './permissao',
          },
          {
            name: 'Listagem de Permissões',
            path: './listarPermissao',
          },
          {
            name: 'Fabricante',
            path: './fabricante',
          },
          {
            name: 'Listagem de Fabricantes',
            path: './listarFabricante',
          },
          {
            name: 'Patrimônio',
            path: './patrimonio',
          },
          {
            name: 'Listagem de Patrimônios',
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
            name: 'Listagem de Equipamentos',
            path: './listarEquipamento',
          },
          {
            name: 'Usuário',
            path: './usuario',
          },
          {
            name: 'Listagem de Usuários',
            path: './listarUsuario',
          },
          {
            name: 'Movimentação',
            path: './movimentacao',
          },
          {
            name: 'Listagem de Movimentações',
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
            name: 'Listagem de Funcionários',
            path: './listarFuncionario',
          },
          {
            name: 'Categoria',
            path: './categoria',
          },
          {
            name: 'Listagem de Categorias',
            path: './listarCategoria',
          }
        ]
      },
    ];

    return menu;
  }
}
