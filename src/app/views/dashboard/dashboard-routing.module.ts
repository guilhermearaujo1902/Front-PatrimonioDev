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
import { PercaComponent } from '../perda/perca.component';

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
    canActivate: [AuthGuard, RoleGuardService],
    data: {
      title: 'patrimonio',
      permissaoEsperada: [Permissao.Administrador]
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
    path: 'listarPermissao',
    component: ListarpermissaoComponent,
    canActivate: [AuthGuard, RoleGuardService],
    data: {
      title: 'listarPermissao',
      permissaoEsperada: [Permissao.Administrador, Permissao.Gestor]

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
  {
    path: 'categoria',
    component: CategoriaComponent,
    data: {
      title: 'categoria'
    }
  },
  {
    path: 'listarCategoria',
    component: ListagemCategoriaComponent,
    data: {
      title: 'listarCategoria'
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
