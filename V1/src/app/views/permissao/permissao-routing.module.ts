import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Permissao } from '../../models/enums/permissao.enum';
import { AuthGuard } from '../../services/auth/auth.guard';
import { RoleGuardService } from '../../services/auth/role-guard.service';
import { ListarpermissaoComponent } from './listagem-permissao/listagem-permissao.component';
import { PermissaoComponent } from './permissao.component';

const routes: Routes = [
  {
    path: 'permissao',
    component: PermissaoComponent,
    canActivate: [AuthGuard, RoleGuardService],
    data: {
      title: 'Permissao',
      permissaoEsperada: [Permissao.Administrador, Permissao.Gestor]

    }
  },
  {
    path: 'permissao/:codigoPermissao',
    component: PermissaoComponent,
    canActivate: [AuthGuard, RoleGuardService],
    data: {
      title: 'Permissao',
      permissaoEsperada: [Permissao.Administrador, Permissao.Gestor]

    }
  },
  {
    path: 'listar-permissao',
    component: ListarpermissaoComponent,
    canActivate: [AuthGuard, RoleGuardService],
    data: {
      title: 'listar-permissao',
      permissaoEsperada: [Permissao.Administrador, Permissao.Gestor]

    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PermissaoRoutingModule { }
