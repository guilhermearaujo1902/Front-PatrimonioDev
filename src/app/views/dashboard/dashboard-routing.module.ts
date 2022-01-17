import { EquipamentoComponent } from './../equipamento/equipamento.component';
import { WidgetsComponent } from './../widgets/widgets.component';
import { PatrimonioComponent } from './../patrimonio/patrimonio.component';
import { ListarsetorComponent } from './../setor/listarsetor/listarsetor.component';
import { PermissaoComponent } from './../permissao/permissao.component';
import { FabricanteComponent } from './../fabricante/fabricante.component';
import { EmpresaComponent } from './../empresa/empresa.component';
import { SetorComponent } from './../setor/setor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ListarpermissaoComponent } from '../permissao/listarpermissao/listarpermissao.component';
import { ListarempresaComponent } from '../empresa/listarempresa/listarempresa.component';
import { ListarfabricanteComponent } from '../fabricante/listarfabricante/listarfabricante.component';
import { ListarpatrimonioComponent } from '../patrimonio/listarpatrimonio/listarpatrimonio.component';
import { PercaComponent } from '../perca/perca.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetsComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'setor',
    component: SetorComponent,
    data: {
      title: 'Setor'
    }
  },
  {
    path: 'patrimonio',
    component: PatrimonioComponent,
    data: {
      title: 'patrimonio'
    }
  },
  {
    path: 'listarPatrimonio',
    component: ListarpatrimonioComponent,
    data: {
      title: 'listarPatrimonio'
    }
  },
  {
    path: 'listarSetor',
    component: ListarsetorComponent,
    data: {
      title: 'listarSetor'
    }
  },
  {
    path: 'empresa',
    component: EmpresaComponent,
    data: {
      title: 'Empresa'
    }
  },
  {
    path: 'fabricante',
    component: FabricanteComponent,
    data: {
      title: 'Fabricante'
    }
  },
  {
    path: 'listarFabricante',
    component: ListarfabricanteComponent,
    data: {
      title: 'listarFabricante'
    }
  },
  {
    path: 'permissao',
    component: PermissaoComponent,
    data: {
      title: 'Permissao'
    }
  },
  {
    path: 'listarPermissao',
    component: ListarpermissaoComponent,
    data: {
      title: 'listarPermissao'
    }
  },
  {
    path: 'listarEmpresa',
    component: ListarempresaComponent,
    data: {
      title: 'listarEmpresa'
    }
  },
  {
    path: 'perca',
    component: PercaComponent,
    data: {
      title: 'perca'
    }
  }
  ,
  {
    path: 'equipamento',
    component: EquipamentoComponent,
    data: {
      title: 'equipamento'
    }
  }
  ,
  {
    path: 'widget',
    component: WidgetsComponent,
    data: {
      title: 'widget'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
