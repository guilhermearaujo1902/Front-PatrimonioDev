import { Usuario } from './../../models/Usuario';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  form!: FormGroupTypeSafe<Usuario>;
  usuario = {} as Usuario;
  codigoUsuario: number;
  estadoSalvar: string = 'cadastrarUsuario';

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilderTypeSafe,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private usuarioService: UsuarioService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
      this.validacao();
      this.carregarUsuario();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  private validacao(): void {
    this.form = this.fb.group<Usuario>({
      codigoUsuario: new FormControl([]),
      codigoUsuarioPermissao: new FormControl([]),
      codigoEmpresa: new FormControl([]),
      codigoSetor: new FormControl([]),
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      ativo: new FormControl([])
    });
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
           },
           error: (error: any) => {
             this.toaster.error('Erro ao tentar carregar o usuário', 'Erro!');
             console.error(error);
           }
         }
       ).add(() => this.spinner.hide());
     }
   }
}
