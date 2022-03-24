import { UsuarioPermissao } from '../../models/UsuarioPermissao';
import { Empresa } from './../../models/Empresa';
import { Usuario } from './../../models/Usuario';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SetorService } from '../../services/setor/setor.service';
import { Setor } from '../../models/Setor';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { PermissaoService } from '../../services/permissao/permissao.service';
import { ValidacaoCampoSenha } from '../../helpers/ValidacaoSenha';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss', '../../../scss/style-base.scss']
})
export class UsuarioComponent implements OnInit {

  form!: FormGroupTypeSafe<Usuario>;
  usuario = {} as Usuario;
  codigoUsuario: number;
  estadoSalvar: string = 'cadastrarUsuario';
  setores: Setor[] = [];
  empresas: Empresa[] = [];
  permissoes: UsuarioPermissao[] = [];
  limpandoCampo: boolean = false;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilderTypeSafe,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private setorService: SetorService,
    private empresaService: EmpresaService,
    private permissaoService: PermissaoService,
    private router: Router,
    private usuarioService: UsuarioService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
      this.validacao();
      this.carregarUsuario();
      this.carregarSetor();
      this.carregarEmpresa();
      this.carregarPermissao();
      this.controlarVisibilidadeCampoAtivo();

  }
  private controlarVisibilidadeCampoAtivo(): void{

    if(this.estadoSalvar == 'cadastrarUsuario')
       this.form.controls.ativo.disable()
    else
      this.form.controls.ativo.enable()
  }

  private carregarSetor(): void {
    this.setorService.obterSetor().subscribe(
      (setores: Setor[]) => {
        this.setores = setores
      },
      (error: any) => {
        this.toaster.error(`Houve um erro ao carregar o setor. Mensagem ${error.message}`, 'Erro!');
      },
    );
  }

  private carregarEmpresa(): void {
    this.empresaService.obterEmpresas().subscribe(
      (empresas: Empresa[]) => {
        this.empresas = empresas
      },
      (error: any) => {
        this.toaster.error(`Houve um erro ao carregar a empresa. Mensagem ${error.message}`, 'Erro!');
      },
    );
  }

  public limparCampos(): void{
    this.limpandoCampo = true;
    this.validacao();
  }

  private carregarPermissao(): void {
    this.permissaoService.obterPermissoes().subscribe(
      (permissoes: UsuarioPermissao[]) => {
        this.permissoes = permissoes
      },
      (error: any) => {
        this.toaster.error(`Houve um erro ao carregar a permissão. Mensagem ${error.message}`, 'Erro!');
      },
    );
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public cssValidatorCampoSelecao(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors};
  }

  private validacao(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidacaoCampoSenha.MustMatch('senha','confirmeSenha')
    };

    this.form = this.fb.group<Usuario>({
      codigoUsuario: new FormControl(this.limpandoCampo? this.form.get('codigoUsuario').value : 0, []),
      codigoUsuarioPermissao: new FormControl('', [Validators.required]),
      codigoEmpresa: new FormControl('' ,[Validators.required]),
      codigoSetor: new FormControl('' ,[Validators.required]),
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
      confirmeSenha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      ativo: new FormControl(true)
    }, formOptions);
  }

  public salvarAlteracao(): void {

    this.spinner.show();
    this.usuario = (this.estadoSalvar === 'cadastrarUsuario') ? {...this.form.value} : {codigoUsuario: this.usuario.codigoUsuario, ...this.form.value};
    debugger;
    this.usuarioService[this.estadoSalvar](this.usuario).subscribe(
      () => this.toaster.success('Usuário cadastrado com sucesso', 'Sucesso!'),
      (error: any) => {
        this.spinner.hide();

        this.toaster.error(`Houve um erro durante o cadastro do usuário. Mensagem: ${error.error.mensagem}`, 'Erro!');
      },
      () =>
      {
        this.spinner.hide()
        setTimeout(() => {
          this.router.navigate(['dashboard/listarUsuario'])
        }, 1700)
      }
    );
  }

  public carregarUsuario() : void{
    this.codigoUsuario = +this.activateRouter.snapshot.paramMap.get('codigoUsuario');
     if(this.codigoUsuario !== null && this.codigoUsuario !== 0){
      this.estadoSalvar = 'atualizarUsuario';
       this.spinner.show();

       this.usuarioService.obterApenasUmUsuario(this.codigoUsuario).subscribe(
         {
           next: (usuario: Usuario) => {
             this.usuario = {...usuario};
             this.form.patchValue(this.usuario);
             this.form.controls.confirmeSenha.setValue(usuario.senha);
           },
           error: (error: any) => {
             this.toaster.error(`Houve um erro ao tentar carregar o usuário. Mensagem: ${error.message}`, 'Erro!');
           }
         }
       ).add(() => this.spinner.hide());
     }
   }
}
