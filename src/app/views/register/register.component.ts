import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  form!: FormGroupTypeSafe<Usuario>;
  usuario = {} as Usuario;

  public get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilderTypeSafe,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService,
    private toaster: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.validarCamposFormulario();
  }

  public validarCamposFormulario(): void {
    this.form = this.fb.group<Usuario>({
      codigoUsuario: new FormControl(''),
      codigoUsuarioPermissao: new FormControl(1),
      codigoEmpresa: new FormControl(1),
      codigoSetor: new FormControl(1),
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      ativo: new FormControl(true, [])
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {

    this.usuario = {...this.form.value};
    debugger;
    this.spinner.show();
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      () => this.toaster.success('Usuário cadastrado com sucesso', 'Sucesso!'),
      (error: any) => {
        this.spinner.hide();
        this.toaster.error(`Houve um erro durante o cadastro do usuário. Mensagem: ${error.error.mensagem}`, 'Erro!');
      },
      () =>
      {
        this.spinner.hide()
        setTimeout(() => {
          this.router.navigate(['login'])
        }, 1000)
      }
    );
  }

}
