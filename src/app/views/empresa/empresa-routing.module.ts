import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Permissao } from '../../models/enums/permissao.enum';
import { AuthGuard } from '../../services/auth/auth.guard';
import { RoleGuardService } from '../../services/auth/role-guard.service';
import { EmpresaComponent } from './empresa.component';
import { ListagemEmpresaComponent } from './listagem-empresa/listagem-empresa.component';

const routes: Routes = [
  {
    path: 'empresa',
    component: EmpresaComponent,
    canActivate: [AuthGuard,RoleGuardService],
    data: {
      title: 'Empresa',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'empresa/:codigoEmpresa',
    component: EmpresaComponent,
    canActivate: [AuthGuard,RoleGuardService],
    data: {
      title: 'Empresa',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'listar-empresa',
    component: ListagemEmpresaComponent,
    canActivate: [AuthGuard,RoleGuardService],
    data: {
      title: 'listar-empresa',
      permissaoEsperada: [Permissao.Administrador]

    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class EmpresaRoutingModule { }
