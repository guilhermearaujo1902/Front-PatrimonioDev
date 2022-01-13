import { MenuService } from './services/menu.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { ChartsModule } from 'ng2-charts';
import { SetorComponent } from './views/setor/setor.component';
import { EmpresaComponent } from './views/empresa/empresa.component';
import { FabricanteComponent } from './views/fabricante/fabricante.component';
import { PermissaoComponent } from './views/permissao/permissao.component';
import { ListarsetorComponent } from './views/setor/listarsetor/listarsetor.component';
import { ListarpermissaoComponent } from './views/permissao/listarpermissao/listarpermissao.component';
import { ListarempresaComponent } from './views/empresa/listarempresa/listarempresa.component';
import { ListarfabricanteComponent } from './views/fabricante/listarfabricante/listarfabricante.component';
import { PatrimonioComponent } from './views/patrimonio/patrimonio.component';
import { ListarpatrimonioComponent } from './views/patrimonio/listarpatrimonio/listarpatrimonio.component';
import { PercaComponent } from './views/perca/perca.component';
import { SetorService } from './services/setor.service';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    SetorComponent,
    EmpresaComponent,
    FabricanteComponent,
    PermissaoComponent,
    ListarsetorComponent,
    ListarpermissaoComponent,
    ListarempresaComponent,
    ListarfabricanteComponent,
    PatrimonioComponent,
    ListarpatrimonioComponent,
    PercaComponent
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
  bootstrap: [ AppComponent ]
})
export class AppModule { }
