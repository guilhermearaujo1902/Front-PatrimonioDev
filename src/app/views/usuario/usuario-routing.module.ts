import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {
    path: 'usuarioPerfil',
    component: UsuarioPerfilComponent,
    data: {
      title: 'usuario-perfil'
    }
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    data: {
      title: 'usuario'
    }
  },
  {
    path: 'usuario/:codigoUsuario',
    component: UsuarioComponent,
    data: {
      title: 'usuario'
    }
  },
  {
    path: 'listarUsuario',
    component: ListagemUsuarioComponent,
    data: {
      title: 'listarUsuario'
    }
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule]
})
export class UsuarioRoutingModule { }
