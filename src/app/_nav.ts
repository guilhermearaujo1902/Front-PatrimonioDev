import { INavData } from '@coreui/angular';
import { Permissao } from './models/enums/permissao.enum';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-chart',
    attributes: [{permissaoUsuarioEsperada: Permissao.Usuario}],
  },
  {
    name: 'Setor',
    url: '/s',
    icon: 'fa fa-users',
    attributes: [
      {permissaoUsuarioEsperada: Permissao.Administrador,}
    ],
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
    name: 'Permissão',
    url: '/se',
    icon: 'fa fa-address-card',
    attributes: [
    {permissaoUsuarioEsperada: Permissao.Gestor}],
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
    name: 'Empresa',
    url: '/sem',
    icon: 'fa fa-building',
    attributes: [
      {permissaoUsuarioEsperada: Permissao.Administrador}],
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
    name: 'Fabricante',
    url: '/semu',
    icon: 'fa fa-archive',
    attributes: [
      {permissaoUsuarioEsperada: Permissao.Usuario}],
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
    attributes: [
      {permissaoUsuarioEsperada: Permissao.Usuario}],
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
    attributes: [
      {permissaoUsuarioEsperada: Permissao.Usuario}],
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
    name: 'Usuário',
    url: '/semurl',
    icon: 'fa fa-user',
    attributes: [
      {permissaoUsuarioEsperada: Permissao.Administrador}],
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
    attributes: [
      {permissaoUsuarioEsperada: Permissao.Usuario}],
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
    name: 'Categoria Equipamento',
    url: '/semurl',
    icon: "fa fa-cubes",
    attributes: [
      {permissaoUsuarioEsperada: Permissao.Usuario}],
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
