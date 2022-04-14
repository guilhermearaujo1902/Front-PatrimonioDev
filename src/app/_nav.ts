import { Permissao } from './models/enums/permissao.enum';
import { INewNavData } from './models/interfaces/INewNavData';

export const navItems: INewNavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-chart',
    permissaoDoUsuario: Permissao.Usuario,
  },
  {
    name: 'Usuário',
    title: true,
    permissaoDoUsuario: Permissao.Usuario,

  },
  {
    name: 'Permissão',
    url: '/se',
    icon: 'fa fa-address-card',
    permissaoDoUsuario: Permissao.Gestor,
    children: [
      {
        name: 'Cadastrar',
        url: '/dashboard/permissao',
        icon: 'fa fa-plus',
      },
      {
        name: 'Listar',
        url: '/dashboard/listarPermissao',
        icon: 'fa fa-list'
      }
    ]
  },
  {
    name: 'Usuário',
    url: '/semurl',
    icon: 'fa fa-user',
    permissaoDoUsuario: Permissao.Administrador,
    children: [
      {
        name: 'Cadastrar',
        url: '/dashboard/usuario',
        icon: 'fa fa-plus',
      },
      {
        name: 'Listar',
        url: '/dashboard/listar-usuario',
        icon: 'fa fa-list'
      }
   ]
  },
  {
    name: 'Funcionário',
    url: '/semurl',
    icon: 'fa fa-users',
    permissaoDoUsuario: Permissao.Usuario,
    children: [
      {
        name: 'Cadastrar',
        url: '/dashboard/funcionario',
        icon: 'fa fa-plus',
      },
      {
        name: 'Listar',
        url: '/dashboard/listarFuncionario',
        icon: 'fa fa-list'
      }
   ]
  },
  {
    name: 'Empresa',
    url: '/sem',
    icon: 'fa fa-building',
    permissaoDoUsuario: Permissao.Administrador,
    children: [
      {
        name: 'Cadastrar',
        url: '/dashboard/empresa',
        icon: 'fa fa-plus',
      },
      {
        name: 'Listar',
        url: '/dashboard/listar-empresa',
        icon: 'fa fa-list'
      }
    ]
  },
  {
    name: 'Equipamento',
    title: true,
    permissaoDoUsuario: Permissao.Usuario,

  },
  {
    name: 'Setor',
    url: '/s',
    icon: 'fa fa-users',
    permissaoDoUsuario: Permissao.Administrador,
    children: [
      {
        name: 'Cadastrar',
        url: '/dashboard/setor',
        icon: 'fa fa-plus'
      },
      {
        name: 'Listar',
        url: '/dashboard/listarSetor',
        icon: 'fa fa-list'
      }
    ]
  },
  {
    name: 'Fabricante',
    url: '/semu',
    icon: 'fa fa-archive',
    permissaoDoUsuario: Permissao.Usuario,
    children: [
      {
        name: 'Cadastrar',
        url: '/dashboard/fabricante',
        icon: 'fa fa-plus',
      },
      {
        name: 'Listar',
        url: '/dashboard/listarFabricante',
        icon: 'fa fa-list'
      }
   ]
  },
  {
    name: 'Patrimônio',
    url: '/semur',
    icon: 'fa fa-th',
    permissaoDoUsuario: Permissao.Usuario,
    children: [
      {
        name: 'Cadastrar',
        url: '/dashboard/patrimonio',
        icon: 'fa fa-plus',
      },
      {
        name: 'Listar',
        url: '/dashboard/listarPatrimonio',
        icon: 'fa fa-list'
      }
   ]
  },
  {
    name: 'Equipamento',
    url: '/semurl',
    icon: 'fa fa-desktop',
    permissaoDoUsuario: Permissao.Usuario,
    children: [
      {
        name: 'Cadastrar',
        url: '/dashboard/equipamento',
        icon: 'fa fa-plus',
      },
      {
        name: 'Listar',
        url: '/dashboard/listar-equipamento',
        icon: 'fa fa-list'
      }
   ]
  },
  {
    name: 'Categoria Equipamento',
    url: '/semurl',
    icon: "fa fa-cubes",
    permissaoDoUsuario: Permissao.Usuario,
    children: [
      {
        name: 'Cadastrar',
        url: '/dashboard/categoria',
        icon: 'fa fa-plus',
      },
      {
        name: 'Listar',
        url: '/dashboard/listar-categoria',
        icon: 'fa fa-list'
      }
     ]
  },
  {
    name: 'Relatório',
    title: true,
    permissaoDoUsuario: Permissao.Usuario,

  },
  {
    name: 'Relatório de perdas',
    url: '/dashboard/relatorio-de-perda',
    icon: "fa fa-files-o",
    permissaoDoUsuario: Permissao.Usuario
  }
];
