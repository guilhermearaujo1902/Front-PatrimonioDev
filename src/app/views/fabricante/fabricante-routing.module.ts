import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FabricanteComponent } from './fabricante.component';
import { ListagemfabricanteComponent } from './listagem-fabricante/listagem-fabricante.component';

const routes: Routes = [
  {
    path: 'fabricante',
    component: FabricanteComponent,
    data: {
      title: 'Fabricante'
    }
  },
  {
    path: 'fabricante/:codigoFabricante',
    component: FabricanteComponent,
    data: {
      title: 'Fabricante'
    }
  },
  {
    path: 'listar-fabricante',
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
