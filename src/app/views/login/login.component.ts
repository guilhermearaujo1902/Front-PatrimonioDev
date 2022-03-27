import { EncryptDecryptService } from './../../services/encrypt-decrypt/encrypt-decrypt.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from './../../services/usuario/usuario.service';
import { Usuario } from '../../models/Usuario';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicao';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./login.component.scss','../../../scss/style-base.scss'],
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  usuario = {} as Usuario;
  form!: FormGroup
  public lembrarMe: boolean;

  public ehAutenticacaoAuth: boolean;
  public usuarioAuth: SocialUser | undefined;

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validarCamposFormulario();
    this.atribuirValorLembrarMe();
    this.autoLogin();
  }

  constructor(
    private usuarioService: UsuarioService,
    private fb:FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: SocialAuthService,
    private encriptar: EncryptDecryptService) {
  }

  private atribuirValorLembrarMe(): void{
    debugger;
    let valor: string = localStorage.getItem('lembrarme');
    this.lembrarMe = valor == 'sim';
  }

  private criarLocalStorageLembrarMe(valorLembrarMe: boolean): void {
    if(valorLembrarMe) {
      localStorage.setItem('lembrarme', 'sim');
    }else{
      debugger;
      localStorage.setItem('lembrarme', 'nao')
    }
  }

  private googleLogIn(){
    return from(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID))
  }

  private signInWithFB(){
    return from(this.authService.signIn(FacebookLoginProvider.PROVIDER_ID));
  }

  public logarComFacebook(){
    debugger;
    this.signInWithFB().subscribe(
      (result: any) => {
        this.usuarioAuth = result
      },
      (error: any) =>{
        debugger;

        if(error.error !== "popup_closed_by_user")
           this.toaster.error(`Houve um erro ao fazer login com a conta da Google. Mensagem : ${error.error}`)
      },
      () => {
        //TODO: Realizar tudo por post
        this.realizarRequisicaoObterUsuario(this.usuarioAuth.email,"1e9g63", true)
      }
    );
  }

  public logarComGoogle(){

    this.googleLogIn().subscribe(
      (result: any) => {
        this.usuarioAuth = result
      },
      (error: any) =>{
          debugger;
        if(error.error !== "popup_closed_by_user")
          this.toaster.error(`Houve um erro ao fazer login com a conta da Google. Mensagem : ${error.error}`)
        else if(error.include("Login providers not ready yet. Are there errors on your console?"))
          this.toaster.error(`Houve um erro ao fazer login com a conta da Google. Mensagem : Não foi possível carregar a tela de autenticação da GOOGLE`)

      },
      () => {
        //TODO: Realizar tudo por post
        this.realizarRequisicaoObterUsuario(this.usuarioAuth.email,"1e9g63", true)
      }
    );
  }

  public validarCredenciais(): void {

    this.removerToken();
    this.spinner.show();

    let credenciais = {...this.form.value}
    this.realizarRequisicaoObterUsuario(credenciais.email, credenciais.senha, false);

  }

  private realizarRequisicaoObterUsuario(email: string, senha: string, autenticacaoAuth: boolean): void{

    this.ehAutenticacaoAuth = autenticacaoAuth;
    this.spinner.show()

    this.usuarioService.obterUsuarioPorEmailESenha(email, senha, autenticacaoAuth).subscribe(
      (result: any) => {
        //TODO: Passar para o token service
        this.usuario = {...result};
        localStorage.setItem('valor', this.encriptar.encrypt(result.token));
        debugger;

        this.criarLocalStorageLembrarMe(this.lembrarMe)

        if(Object.keys(this.usuario).length !== 0 ){
          this.router.navigate(['dashboard']);
        }
      },
      (error: any) => {
        debugger;

        this.toaster.toastrConfig.timeOut = 5000;
        //TODO: criar classe para erros
        if(error.status == 400 && this.ehAutenticacaoAuth){
          this.router.navigate(["register"], {queryParams: {email: this.usuarioAuth.email}})
          this.toaster.info(`Para continuar, é necessário preencher o formulário.`)

        }else{
          let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
          this.toaster[template.tipoMensagem](`Houve um erro ao fazer login. Mensagem: ${template.mensagemErro}`, 'Erro!');
        }
      }
    ).add(() => this.spinner.hide())
  }

  private removerToken(){
    localStorage.removeItem('valor');
  }

  public validarCamposFormulario(): void {
    this.form = this.fb.group({
      email:  ['', [Validators.required, Validators.minLength(10),Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  private autoLogin(){
    const token = localStorage.getItem('valor');
    const lembrarMe = localStorage.getItem('lembrarme');

    if (token && lembrarMe == 'sim') {
      this.router.navigate(['dashboard']);
    }
   }

}
