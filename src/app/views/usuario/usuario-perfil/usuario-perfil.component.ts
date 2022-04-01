import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuarioPerfil } from './../../../models/UsuarioPerfil';
import { UsuarioPerfilService } from './../../../services/usuario-perfil/usuario-perfil.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { AbstractControlOptions, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ValidacaoCampoSenha } from '../../../helpers/ValidacaoSenha';
import { MensagemRequisicao } from '../../../helpers/MensagemRequisicao';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {

  private codigoUsuario: number;
  public nomeUsuario: string;
  public form!: FormGroupTypeSafe<UsuarioPerfil>;
  private usuarioPerfil = {} as UsuarioPerfil;
  public imagemUrl: string = 'assets/img/sem-imagem.png';
  file: File;

  constructor(
    private perfilService: UsuarioPerfilService,
    private token: TokenService,
    private toaster: ToastrService,
    private fb: FormBuilderTypeSafe,
    private spinner: NgxSpinnerService) { }

  public get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  ngOnInit(): void {
    debugger;
    this.codigoUsuario = this.token.obterCodigoUsuarioToken();
    this.validacao();
    this.carregarPerfilUsuario();
  }

  private validacao(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidacaoCampoSenha.MustMatch('senha','confirmeSenha')
    };

    this.form = this.fb.group<UsuarioPerfil>({
      codigoUsuario: new FormControl(null),
      nomeUsuario: new FormControl(''),
      nomeSetor: new FormControl(null),
      razaoSocial: new FormControl(null),
      descricaoPermissao: new FormControl(null),
      email: new FormControl(null),
      senha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      imagemUrl: new FormControl(''),
      confirmeSenha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
    }, formOptions);
  }

  private carregarPerfilUsuario(){

    this.spinner.show("carregando");

    this.perfilService.obterPerfilUsuario(this.codigoUsuario).subscribe(
      (result: UsuarioPerfil) => {
        this.form.patchValue(result);
        this.nomeUsuario = result.nomeUsuario;
        this.codigoUsuario = result.codigoUsuario;
        this.form.controls.confirmeSenha.setValue(result.senha);
        debugger;
        this.tratarUrlImagem(result.imagemUrl);
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao carregar o perfil. Mensagem: ${template.mensagemErro}`, 'Erro');
      }
    ).add(() => this.spinner.hide("carregando"));
  }

  private tratarUrlImagem(url: string): void {
    debugger;
    if(typeof url == "undefined" || url == null)
      this.imagemUrl = 'assets/img/sem-imagem.png';
    else
      this.imagemUrl = `${environment.apiUrlImage}/${url}`;
  }

  public salvarAlteracaoPerfil(): void{

    this.usuarioPerfil.senha = this.form.controls.senha.value;
    this.usuarioPerfil.nomeUsuario = this.nomeUsuario;
    this.usuarioPerfil.codigoUsuario = this.form.controls.codigoUsuario.value

    this.perfilService.atualizarPerfilUsuario(this.usuarioPerfil).subscribe(
      () =>{
        this.toaster.success(`Perfil atualizado com sucesso!`)
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao atualizar o perfil. Mensagem: ${template.mensagemErro}`, 'Erro');
      }
    );

  }

  onFileChange(env: any): void{
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemUrl = event.target.result;
    this.file = env.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  public handleMissingImage(event: Event) {
    debugger;
    (event.target as HTMLImageElement).style.display = 'none';
  }

  private uploadImagem(): void{

    this.spinner.show("upload");

    this.perfilService.inserirImagem(this.codigoUsuario, this.file).subscribe(
      () => {
        this.carregarPerfilUsuario();
        this.toaster.success("Imagem atualizada com sucesso", "Sucesso")
      },
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao subir a imagem: Mensagem: ${template.mensagemErro}`, 'Erro');
      }
    ).add(() => this.spinner.hide("upload"));
  }

}
