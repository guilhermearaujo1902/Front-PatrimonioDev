import { RoleGuardService } from './../../services/auth/role-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';
import { UsuarioComponent } from './usuario.component';
import { AuthGuard } from '../../services/auth/auth.guard';
import { Permissao } from '../../models/enums/permissao.enum';

const routes: Routes = [
  {
    path: 'usuarioPerfil',
    component: UsuarioPerfilComponent,
    canActivate: [AuthGuard,RoleGuardService],
    data: {
      title: 'usuario-perfil',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    canActivate: [AuthGuard,RoleGuardService],
    data: {
      title: 'usuario',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'usuario/:codigoUsuario',
    component: UsuarioComponent,
    canActivate: [AuthGuard,RoleGuardService],
    data: {
      title: 'usuario',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'listarUsuario',
    component: ListagemUsuarioComponent,
    canActivate: [AuthGuard,RoleGuardService],
    data: {
      title: 'listarUsuario',
      permissaoEsperada: [Permissao.Administrador]

    }
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule]
})
export class UsuarioRoutingModule { }
