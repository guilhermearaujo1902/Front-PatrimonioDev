import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetorComponent } from './setor.component';
import { ListarsetorComponent } from './listagem-setor/listagem-setor.component';
import { Permissao } from '../../models/enums/permissao.enum';

const routes: Routes = [
  {
    path: 'setor',
    component: SetorComponent,
    data: {
      title: 'Setor',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'setor/:codigoSetor',
    component: SetorComponent,
    data: {
      title: 'Setor',
      permissaoEsperada: [Permissao.Administrador]
    }
  },
  {
    path: 'listarSetor',
    component: ListarsetorComponent,
    data: {
      title: 'listarSetor',
      permissaoEsperada: [Permissao.Administrador]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetorRoutingModule { }
