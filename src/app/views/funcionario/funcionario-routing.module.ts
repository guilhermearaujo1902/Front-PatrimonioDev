import { ListagemFuncionarioComponent } from './listagem-funcionario/listagem-funcionario.component';
import { FuncionarioComponent } from './funcionario.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [

  {
    path: 'funcionario',
    component: FuncionarioComponent,
    data: {
      title: 'Funcionário'
    }
  },
  {
    path: 'funcionario/:codigoFuncionario',
    component: FuncionarioComponent,
    data: {
      title: 'Funcionário'
    }
  },
  {
    path: 'listarFuncionario',
    component: ListagemFuncionarioComponent,
    data: {
      title: 'listarFuncionario'
    }
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
