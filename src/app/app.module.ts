import { WidgetsModule } from './views/widgets/widgets.module';
import { MenuService } from './services/menu/menu.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { ChartsModule } from 'ng2-charts';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SetorComponent } from './views/setor/setor.component';
import { EmpresaComponent } from './views/empresa/empresa.component';
import { FabricanteComponent } from './views/fabricante/fabricante.component';
import { PermissaoComponent } from './views/permissao/permissao.component';
import { ListarsetorComponent } from './views/setor/listagem-setor/listagem-setor.component';
import { ListarpermissaoComponent } from './views/permissao/listagem-permissao/listagem-permissao.component';
import { ListagemEmpresaComponent } from './views/empresa/listagem-empresa/listagem-empresa.component';
import { ListagemfabricanteComponent } from './views/fabricante/listagem-fabricante/listagem-fabricante.component';
import { PatrimonioComponent } from './views/patrimonio/patrimonio.component';
import { ListarpatrimonioComponent } from './views/patrimonio/listagem-patrimonio/listagem-patrimonio.component';
import { SetorService } from './services/setor/setor.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EquipamentoComponent } from './views/equipamento/equipamento.component';
import { ListagemequipamentoComponent } from './views/equipamento/listagem-equipamento/listagem-equipamento.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { MovimentacaoComponent } from './views/movimentacao/movimentacao.component';
import { PercaComponent } from './views/perca/perca.component';
import { ListagemMovimentacaoComponent } from './views/movimentacao/listagem-movimentacao/listagem-movimentacao.component';
import { ListagemUsuarioComponent } from './views/usuario/listagem-usuario/listagem-usuario.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    HttpClientModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    ModalModule.forRoot(),
    AppHeaderModule,
    ChartsModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    IconModule,
    WidgetsModule,
    NgxSpinnerModule,
    IconSetModule.forRoot(),
    ToastrModule.forRoot(
      { timeOut: 1700,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        progressBar: true
      }
    )
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    EquipamentoComponent,
    SetorComponent,
    UsuarioComponent,
    PercaComponent,
    MovimentacaoComponent,
    EmpresaComponent,
    PatrimonioComponent,
    FabricanteComponent,
    PermissaoComponent,
    ListarsetorComponent,
    ListarpermissaoComponent,
    ListagemEmpresaComponent,
    ListagemfabricanteComponent,
    ListarpatrimonioComponent,
    ListagemMovimentacaoComponent,
    ListagemUsuarioComponent,
    ListagemequipamentoComponent

  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    MenuService,
    SetorService

  ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
