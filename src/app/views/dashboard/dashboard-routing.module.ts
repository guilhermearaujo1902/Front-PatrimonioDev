import { ListagemequipamentoComponent } from './../equipamento/listagem-equipamento/listagem-equipamento.component';
import { ListagemUsuarioComponent } from './../usuario/listagem-usuario/listagem-usuario.component';
import { MovimentacaoComponent } from './../movimentacao/movimentacao.component';
import { UsuarioComponent } from './../usuario/usuario.component';
import { EquipamentoComponent } from './../equipamento/equipamento.component';
import { WidgetsComponent } from './../widgets/widgets.component';
import { PatrimonioComponent } from './../patrimonio/patrimonio.component';
import { ListarsetorComponent } from '../setor/listagem-setor/listagem-setor.component';
import { PermissaoComponent } from './../permissao/permissao.component';
import { FabricanteComponent } from './../fabricante/fabricante.component';
import { SetorComponent } from './../setor/setor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarpermissaoComponent } from '../permissao/listagem-permissao/listagem-permissao.component';
import { ListagemfabricanteComponent } from '../fabricante/listagem-fabricante/listagem-fabricante.component';
import { ListarpatrimonioComponent } from '../patrimonio/listagem-patrimonio/listagem-patrimonio.component';
import { PercaComponent } from '../perca/perca.component';
import { ListagemMovimentacaoComponent } from '../movimentacao/listagem-movimentacao/listagem-movimentacao.component';
import { EmpresaRoutingModule } from '../empresa/empresa-routing.module';

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
    path: 'setor/:codigoSetor',
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
    path: 'fabricante',
    component: FabricanteComponent,
    data: {
      title: 'Fabricante'
    }
  },
  {
    path: 'listarFabricante',
    component: ListagemfabricanteComponent,
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
  },
  {
    path: 'listarEquipamento',
    component: ListagemequipamentoComponent,
    data: {
      title: 'listarEquipamento'
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
    path: 'listarUsuario',
    component: ListagemUsuarioComponent,
    data: {
      title: 'listarUsuario'
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

  {
    path: 'movimentacao',
    component: MovimentacaoComponent,
    data: {
      title: 'movimentacao'
    }
  },
  {
    path: 'listarMovimentacao',
    component: ListagemMovimentacaoComponent,
    data: {
      title: 'listarMovimentacao'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),EmpresaRoutingModule],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
