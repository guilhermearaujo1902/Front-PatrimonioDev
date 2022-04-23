import { ListagemFuncionarioComponent } from './listagem-funcionario/listagem-funcionario.component';
import { FuncionarioComponent } from './funcionario.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../services/auth/auth.guard';

const routes: Routes = [

  {
    path: 'funcionario',
    canActivate: [AuthGuard],
    component: FuncionarioComponent,
    data: {
      title: 'Funcionário'
    }
  },
  {
    path: 'funcionario/:codigoFuncionario',
    canActivate: [AuthGuard],
    component: FuncionarioComponent,
    data: {
      title: 'Funcionário'
    }
  },
  {
    path: 'listar-funcionario',
    canActivate: [AuthGuard],
    component: ListagemFuncionarioComponent,
    data: {
      title: 'listar-funcionario'
    }
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
