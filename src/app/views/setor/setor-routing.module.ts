import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetorComponent } from './setor.component';
import { ListarsetorComponent } from './listagem-setor/listagem-setor.component';

const routes: Routes = [
  {
    path: 'setor',
    component: SetorComponent,
    data: {
      title: 'Setor'
    }
  },
  {
    path: 'setor/:codigoSetor',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetorRoutingModule { }
