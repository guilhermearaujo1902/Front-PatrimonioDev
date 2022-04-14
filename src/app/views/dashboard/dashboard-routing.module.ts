import { AuthGuard } from './../../services/auth/auth.guard';
import { ListagemCategoriaComponent } from './../categoria/listagem-categoria/listagem-categoria.component';
import { CategoriaComponent } from './../categoria/categoria.component';
import { UsuarioRoutingModule } from './../usuario/usuario-routing.module';
import { SetorRoutingModule } from './../setor/setor-routing.module';
import { ListagemequipamentoComponent } from './../equipamento/listagem-equipamento/listagem-equipamento.component';
import { MovimentacaoComponent } from './../movimentacao/movimentacao.component';
import { EquipamentoComponent } from './../equipamento/equipamento.component';
import { WidgetsComponent } from './../widgets/widgets.component';
import { PatrimonioComponent } from './../patrimonio/patrimonio.component';
import { PermissaoComponent } from './../permissao/permissao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarpermissaoComponent } from '../permissao/listagem-permissao/listagem-permissao.component';
import { ListarpatrimonioComponent } from '../patrimonio/listagem-patrimonio/listagem-patrimonio.component';
import { ListagemMovimentacaoComponent } from '../movimentacao/listagem-movimentacao/listagem-movimentacao.component';
import { EmpresaRoutingModule } from '../empresa/empresa-routing.module';
import { FabricanteRoutingModule } from '../fabricante/fabricante-routing.module';
import { FuncionarioRoutingModule } from '../funcionario/funcionario-routing.module';
import { RoleGuardService } from '../../services/auth/role-guard.service';
import { Permissao } from '../../models/enums/permissao.enum';
import { PerdaComponent } from '../perda/perda.component';
import { RelatorioPerdaComponent } from '../relatorio/relatorio-perda/relatorio-perda/relatorio-perda.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'patrimonio',
    component: PatrimonioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'patrimonio',
    }
  },
  {
    path: 'patrimonio/:codigoPatrimonio',
    component: PatrimonioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'patrimonio',
    }
  },
  {
    path: 'listar-patrimonio',
    component: ListarpatrimonioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'listar-patrimonio',
    }
  },
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
  {
    path: 'perda',
    component: PerdaComponent,
    data: {
      title: 'perda'
    }
  },
  {
    path: 'relatorio-de-perda',
    component: RelatorioPerdaComponent,
    data: {
      title: 'relatorio-de-perda'
    }
  },
  {
    path: 'equipamento',
    component: EquipamentoComponent,
    data: {
      title: 'equipamento'
    }
  },
  {
    path: 'equipamento/:codigoEquipamento',
    component: EquipamentoComponent,
    data: {
      title: 'equipamento'
    }
  },
  {
    path: 'listar-equipamento',
    component: ListagemequipamentoComponent,
    data: {
      title: 'listar-equipamento'
    }
  },
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
    path: 'listar-movimentacao',
    component: ListagemMovimentacaoComponent,
    data: {
      title: 'listar-movimentacao'
    }
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
    data: {
      title: 'categoria'
    }
  },
  {
    path: 'categoria/:codigoCategoria',
    component: CategoriaComponent,
    data: {
      title: 'categoria'
    }
  },
  {
    path: 'listar-categoria',
    component: ListagemCategoriaComponent,
    data: {
      title: 'listar-categoria'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    EmpresaRoutingModule,
    SetorRoutingModule,
    FabricanteRoutingModule,
    UsuarioRoutingModule,
    FuncionarioRoutingModule],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
