import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Permissao } from '../../models/enums/permissao.enum';
import { EmpresaComponent } from './empresa.component';
import { ListagemEmpresaComponent } from './listagem-empresa/listagem-empresa.component';

const routes: Routes = [
  {
    path: 'empresa',
    component: EmpresaComponent,
    data: {
      title: 'Empresa',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'listarEmpresa',
    component: ListagemEmpresaComponent,
    data: {
      title: 'listarEmpresa',
      permissaoEsperada: [Permissao.Administrador]

    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmpresaRoutingModule { }
