import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuarioPerfil } from './../../../models/UsuarioPerfil';
import { UsuarioPerfilService } from './../../../services/usuario-perfil/usuario-perfil.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {

  private codigoUsuario: number;
  public nomeUsuario!: string;
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

  ngOnInit(): void {
    this.codigoUsuario = this.token.obterCodigoUsuarioToken();
    this.validacao();
    this.carregarPerfilUsuario();
  }

  private validacao(): void {
    this.form = this.fb.group<UsuarioPerfil>({
      codigoUsuario: new FormControl(null),
      nomeUsuario: new FormControl(null),
      nomeSetor: new FormControl(null),
      razaoSocial: new FormControl(null),
      descricaoPermissao: new FormControl(null),
      email: new FormControl(null),
      senha: new FormControl(null),
      imagemUrl: new FormControl("")
    });
  }

  private carregarPerfilUsuario(){

    this.perfilService.obterPerfilUsuario(this.codigoUsuario).subscribe(
      (result: UsuarioPerfil) => {
        this.form.patchValue(result);
        this.nomeUsuario = result.nomeUsuario;
        this.codigoUsuario = result.codigoUsuario;

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

    debugger;
    this.perfilService.atualizarPerfilUsuario(this.usuarioPerfil).subscribe(
      () =>{
        this.toaster.success(`Perfil atualizado com sucesso!`)
      },
      (error: any) =>{
        debugger;
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
    debugger;
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
