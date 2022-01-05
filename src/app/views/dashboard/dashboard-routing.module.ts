import { PermissaoComponent } from './../permissao/permissao.component';
import { FabricanteComponent } from './../fabricante/fabricante.component';
import { EmpresaComponent } from './../empresa/empresa.component';
import { SetorComponent } from './../setor/setor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

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
    path: 'permissao',
    component: PermissaoComponent,
    data: {
      title: 'Permissao'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
