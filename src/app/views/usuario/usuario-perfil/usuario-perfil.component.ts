import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuarioPerfil } from './../../../models/UsuarioPerfil';
import { UsuarioPerfilService } from './../../../services/usuario-perfil/usuario-perfil.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { AbstractControlOptions, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ValidacaoCampoSenha } from '../../../helpers/ValidacaoCampoSenha';

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
  public imagemUrl: string = 'assets/img/upload.png';
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
      nomeUsuario: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
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

    this.perfilService.obterPerfilUsuario(this.codigoUsuario).subscribe(
      (result: UsuarioPerfil) => {
        this.form.patchValue(result);
        this.nomeUsuario = result.nomeUsuario;
        this.codigoUsuario = result.codigoUsuario;
        this.form.controls.confirmeSenha.setValue(result.senha);
        debugger;

        if(typeof result.imagemUrl == "undefined" || result.imagemUrl == null)
          this.imagemUrl = '../../../../assets/img/sem-imagem.png';
        else
          this.imagemUrl = `${environment.apiUrl}Resources/Imagens/${result.imagemUrl}`;



      },
      (error: any) =>{
        this.toaster.error(`Houve um erro ao carregar o perfil. Mensagem: ${JSON.stringify(error)}`)
      }
    );
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
        this.toaster.error(`Houve um erro ao atualizar o perfil. Mensagem: ${error.message}`)
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

  private uploadImagem(): void{

    this.spinner.show();

    this.perfilService.inserirImagem(this.codigoUsuario, this.file).subscribe(
      () => {
        this.carregarPerfilUsuario();
        this.toaster.success("Imagem atualizada com sucesso", "Sucesso")
      },
      (error: any) => {
        this.toaster.error(`Houve um problema ao subir a imagem: Mensagem ${error.message}`, "Erro")
      }
    ).add(() => this.spinner.hide());
  }

}
