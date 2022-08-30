import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetorComponent } from './setor.component';
import { ListarsetorComponent } from './listagem-setor/listagem-setor.component';
import { Permissao } from '../../models/enums/permissao.enum';
import { AuthGuard } from '../../services/auth/auth.guard';
import { RoleGuardService } from '../../services/auth/role-guard.service';

const routes: Routes = [
  {
    path: 'setor',
    component: SetorComponent,
    canActivate: [AuthGuard,RoleGuardService],
    data: {
      title: 'Setor',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'setor/:codigoSetor',
    component: SetorComponent,
    canActivate: [AuthGuard,RoleGuardService],
    data: {
      title: 'Setor',
      permissaoEsperada: [Permissao.Administrador]
    }
  },
  {
    path: 'listar-setor',
    component: ListarsetorComponent,
    canActivate: [AuthGuard,RoleGuardService],
    data: {
      title: 'listar-setor',
      permissaoEsperada: [Permissao.Administrador]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetorRoutingModule { }
