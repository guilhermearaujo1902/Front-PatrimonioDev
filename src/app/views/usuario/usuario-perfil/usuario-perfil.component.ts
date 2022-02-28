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

  constructor(
    private perfilService: UsuarioPerfilService,
    private token: TokenService,
    private toaster: ToastrService,
    private fb: FormBuilderTypeSafe) { }

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
      senha: new FormControl(null)
    });
  }

  private carregarPerfilUsuario(){

    this.perfilService.obterPerfilUsuario(this.codigoUsuario).subscribe(
      (result: UsuarioPerfil) => {
        this.form.patchValue(result);
        this.nomeUsuario = result.nomeUsuario

      },
      (error: any) =>{
        this.toaster.error(`Houve um erro ao carregar o perfil. Mensagem: ${JSON.stringify(error)}`)
      }
    );
  }

  public salvarAlteracaoPerfil(): void{

    this.usuarioPerfil = {...this.form.value};
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

}
