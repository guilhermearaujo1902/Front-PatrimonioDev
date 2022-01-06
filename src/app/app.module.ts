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

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    HttpClientModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
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
    ListarfabricanteComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
    MenuService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
