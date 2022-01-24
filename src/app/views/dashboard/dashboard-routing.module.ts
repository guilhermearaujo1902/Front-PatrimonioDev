import { MovimentacaoComponent } from './../movimentacao/movimentacao.component';
import { UsuarioComponent } from './../usuario/usuario.component';
import { EquipamentoComponent } from './../equipamento/equipamento.component';
import { WidgetsComponent } from './../widgets/widgets.component';
import { PatrimonioComponent } from './../patrimonio/patrimonio.component';
import { ListarsetorComponent } from '../setor/listagem-setor/listagem-setor.component';
import { PermissaoComponent } from './../permissao/permissao.component';
import { FabricanteComponent } from './../fabricante/fabricante.component';
import { EmpresaComponent } from './../empresa/empresa.component';
import { SetorComponent } from './../setor/setor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarpermissaoComponent } from '../permissao/listagem-permissao/listagem-permissao.component';
import { ListarempresaComponent } from '../empresa/listarempresa/listarempresa.component';
import { ListarfabricanteComponent } from '../fabricante/listarFabricante/listarFabricante.component';
import { ListarpatrimonioComponent } from '../patrimonio/listagem-patrimonio/listagem-patrimonio.component';
import { PercaComponent } from '../perca/perca.component';
import { ListagemMovimentacaoComponent } from '../movimentacao/listagem-movimentacao/listagem-movimentacao.component';

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
    path: 'usuario',
    component: UsuarioComponent,
    data: {
      title: 'usuario'
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
