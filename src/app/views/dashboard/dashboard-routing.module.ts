import { ListarsetorComponent } from './../setor/listarsetor/listarsetor.component';
import { PermissaoComponent } from './../permissao/permissao.component';
import { FabricanteComponent } from './../fabricante/fabricante.component';
import { EmpresaComponent } from './../empresa/empresa.component';
import { SetorComponent } from './../setor/setor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ListarpermissaoComponent } from '../permissao/listarpermissao/listarpermissao.component';
import { ListarempresaComponent } from '../empresa/listarempresa/listarempresa.component';
import { ListarfabricanteComponent } from '../fabricante/listarfabricante/listarfabricante.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'setor',
    component: SetorComponent,
    data: {
      title: 'Setor'
    }
  },
  {
    path: 'listarSetor',
    component: ListarsetorComponent,
    data: {
      title: 'listarSetor'
    }
  },
  {
    path: 'empresa',
    component: EmpresaComponent,
    data: {
      title: 'Empresa'
    }
  },
  {
    path: 'fabricante',
    component: FabricanteComponent,
    data: {
      title: 'Fabricante'
    }
  },
  {
    path: 'listarFabricante',
    component: ListarfabricanteComponent,
    data: {
      title: 'listarFabricante'
    }
  },
  {
    path: 'permissao',
    component: PermissaoComponent,
    data: {
      title: 'Permissao'
    }
  },
  {
    path: 'listarPermissao',
    component: ListarpermissaoComponent,
    data: {
      title: 'listarPermissao'
    }
  },
  {
    path: 'listarEmpresa',
    component: ListarempresaComponent,
    data: {
      title: 'listarEmpresa'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
