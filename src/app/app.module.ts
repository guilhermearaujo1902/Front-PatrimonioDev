import { ApiService } from './services/api/api.service';
import { ListagemCategoriaComponent } from './views/categoria/listagem-categoria/listagem-categoria.component';
import { CategoriaComponent } from './views/categoria/categoria.component';
import { GoogleLoginProvider, SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';

import { FabricanteService } from './services/fabricante/fabricante.service';
import { MenuService } from './services/menu/menu.service';

import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'ngx-easy-table';

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
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './containers';
import { WidgetsModule } from './views/widgets/widgets.module';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SetorService } from './services/setor/setor.service';
import { RoleGuardService } from './services/auth/role-guard.service';

import { EquipamentoComponent } from './views/equipamento/equipamento.component';
import { ListagemequipamentoComponent } from './views/equipamento/listagem-equipamento/listagem-equipamento.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { MovimentacaoComponent } from './views/movimentacao/movimentacao.component';
import { PerdaComponent } from './views/perda/perda.component';
import { ListagemMovimentacaoComponent } from './views/movimentacao/listagem-movimentacao/listagem-movimentacao.component';
import { ListagemUsuarioComponent } from './views/usuario/listagem-usuario/listagem-usuario.component';
import { UsuarioPerfilComponent } from './views/usuario/usuario-perfil/usuario-perfil.component';
import { FuncionarioComponent } from './views/funcionario/funcionario.component';
import { ListagemFuncionarioComponent } from './views/funcionario/listagem-funcionario/listagem-funcionario.component';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { CanvasTagComponent } from './views/canvas-tag/canvas-tag.component';
import { QRCodeModule } from 'angularx-qrcode';
import { BooleanoPipe } from './pipe/booleano.pipe';
import { RelatorioPerdaComponent } from './views/relatorio/relatorio-perda/relatorio-perda/relatorio-perda.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { Idle } from '@ng-idle/core';
import { ModalTempoComponent } from './views/modal-tempo/modal-tempo.component';
import localePt from '@angular/common/locales/pt';
import { NgSelectModule } from '@ng-select/ng-select';

registerLocaleData(localePt);

const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  suffix: "",
  prefix: "R$ ",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  imports: [
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    SocialLoginModule,
    QRCodeModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgSelectModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    HttpClientModule,
    AppFooterModule,
    AppHeaderModule,
    ChartsModule,
    TableModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    IconModule,
    WidgetsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AppBreadcrumbModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    IconSetModule.forRoot(),
    ToastrModule.forRoot(
      {
        timeOut: 4000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        progressBar: true
      }
    )
  ],
  declarations: [
    BooleanoPipe,
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    CategoriaComponent,
    RegisterComponent,
    EquipamentoComponent,
    SetorComponent,
    UsuarioComponent,
    PerdaComponent,
    MovimentacaoComponent,
    EmpresaComponent,
    PatrimonioComponent,
    FabricanteComponent,
    PermissaoComponent,
    ListagemCategoriaComponent,
    ListarsetorComponent,
    ListarpermissaoComponent,
    ListagemEmpresaComponent,
    ListagemfabricanteComponent,
    ListarpatrimonioComponent,
    ListagemMovimentacaoComponent,
    ListagemUsuarioComponent,
    ListagemequipamentoComponent,
    UsuarioPerfilComponent,
    FuncionarioComponent,
    ListagemFuncionarioComponent,
    CanvasTagComponent,
    BooleanoPipe,
    RelatorioPerdaComponent,
    ModalTempoComponent

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '226014073143-ml8ufg6nmtjsph9o67j6t30rjjljv821.apps.googleusercontent.com'
            )
          },
          ,
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1110826919739685')
          }
        ]
      } as SocialAuthServiceConfig
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    RoleGuardService,
    IconSetService,
    MenuService,
    SetorService,
    ApiService,
    FabricanteService,
    FormBuilderTypeSafe,
    JwtHelperService,
    Idle,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: LOCALE_ID, useValue: 'pt-BR' }

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
