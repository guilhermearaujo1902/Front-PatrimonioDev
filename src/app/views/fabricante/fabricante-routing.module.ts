import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';
import { FabricanteComponent } from './fabricante.component';
import { ListagemfabricanteComponent } from './listagem-fabricante/listagem-fabricante.component';

const routes: Routes = [
  {
    path: 'fabricante',
    canActivate: [AuthGuard],
    component: FabricanteComponent,
    data: {
      title: 'Fabricante'
    }
  },
  {
    path: 'fabricante/:codigoFabricante',
    canActivate: [AuthGuard],
    component: FabricanteComponent,
    data: {
      title: 'Fabricante'
    }
  },
  {
    path: 'listar-fabricante',
    canActivate: [AuthGuard],
    component: ListagemfabricanteComponent,
    data: {
      title: 'listar-fabricante'
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricanteRoutingModule { }
