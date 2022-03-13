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
    title: true
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
        url: '/dashboard/listarUsuario',
        icon: 'fa fa-list'
      }
   ]
  },
  {
    name: 'Funcionario',
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
        name: 'Empresa',
        url: '/dashboard/empresa',
        icon: 'fa fa-plus',
      },
      {
        name: 'Listar',
        url: '/dashboard/listarEmpresa',
        icon: 'fa fa-list'
      }
    ]
  },
  {
    name: 'Equipamento',
    title: true
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
        url: '/dashboard/listarEquipamento',
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
        url: '/dashboard/listarCategoria',
        icon: 'fa fa-list'
      }
     ]
  }
];
