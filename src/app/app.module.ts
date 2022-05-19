//Outros
import { GoogleLoginProvider, SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { Idle } from '@ng-idle/core';
import localePt from '@angular/common/locales/pt';
import { environment } from '../environments/environment.prod';

//Services
import { FabricanteService } from './services/fabricante/fabricante.service';
import { ApiService } from './services/api/api.service';
import { MenuService } from './services/menu/menu.service';
import { SetorService } from './services/setor/setor.service';
import { RoleGuardService } from './services/auth/role-guard.service';

//Módulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'ngx-easy-table';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { QRCodeModule } from 'angularx-qrcode';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgSelectModule } from '@ng-select/ng-select';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];


//Rotas
import { AppRoutingModule } from './app.routing';

//Pipes
import { BooleanoPipe } from './pipe/booleano.pipe';

//Módulos de Componentes
import { WidgetsModule } from './views/widgets/widgets.module';

//Componentes
import { SetorComponent } from './views/setor/setor.component';
import { ListarsetorComponent } from './views/setor/listagem-setor/listagem-setor.component';
import { EmpresaComponent } from './views/empresa/empresa.component';
import { ListagemEmpresaComponent } from './views/empresa/listagem-empresa/listagem-empresa.component';
import { FabricanteComponent } from './views/fabricante/fabricante.component';
import { ListagemfabricanteComponent } from './views/fabricante/listagem-fabricante/listagem-fabricante.component';
import { PermissaoComponent } from './views/permissao/permissao.component';
import { ListarpermissaoComponent } from './views/permissao/listagem-permissao/listagem-permissao.component';
import { PatrimonioComponent } from './views/patrimonio/patrimonio.component';
import { ListarpatrimonioComponent } from './views/patrimonio/listagem-patrimonio/listagem-patrimonio.component';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P403Component } from './views/error/403.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CategoriaComponent } from './views/categoria/categoria.component';
import { ListagemCategoriaComponent } from './views/categoria/listagem-categoria/listagem-categoria.component';
import { EquipamentoComponent } from './views/equipamento/equipamento.component';
import { ListagemequipamentoComponent } from './views/equipamento/listagem-equipamento/listagem-equipamento.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { ListagemUsuarioComponent } from './views/usuario/listagem-usuario/listagem-usuario.component';
import { MovimentacaoComponent } from './views/movimentacao/movimentacao.component';
import { PerdaComponent } from './views/perda/perda.component';
import { ListagemMovimentacaoComponent } from './views/movimentacao/listagem-movimentacao/listagem-movimentacao.component';
import { UsuarioPerfilComponent } from './views/usuario/usuario-perfil/usuario-perfil.component';
import { FuncionarioComponent } from './views/funcionario/funcionario.component';
import { ListagemFuncionarioComponent } from './views/funcionario/listagem-funcionario/listagem-funcionario.component';
import { CanvasTagComponent } from './views/etiqueta-canvas/etiqueta-canvas.component';
import { RelatorioPerdaComponent } from './views/relatorio/relatorio-perda/relatorio-perda/relatorio-perda.component';
import { ModalTempoComponent } from './views/modal-tempo/modal-tempo.component';
import { QrCodeComponent } from './views/qr-code/qr-code.component';
import { ButtonDarkModeComponent } from './views/shareds/button-dark-mode/button-dark-mode.component';
import { HttpCodeMensagemComponent } from './views/shareds/http-code-mensagem/http-code-mensagem.component';

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
    ZXingScannerModule,
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
    ...APP_CONTAINERS,
    BooleanoPipe,
    AppComponent,
    P404Component,
    P403Component,
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
    ModalTempoComponent,
    QrCodeComponent,
    ButtonDarkModeComponent,
    HttpCodeMensagemComponent

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
              environment.googleProvider
            )
          },
          ,
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookProvider)
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
