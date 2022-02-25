import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';

import { Usuario } from '../../models/Usuario';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { ValidacaoCampo } from '../../helpers/validacaoCampoSenha';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  form!: FormGroupTypeSafe<Usuario>;
  usuario = {} as Usuario;
  emailAuth?: any;

  public get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilderTypeSafe,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService,
    private toaster: ToastrService,
    private router: Router) {
      debugger;
      var emailURL = this.router.getCurrentNavigation().extras;
      this.emailAuth = typeof emailURL.state == 'undefined'? "": emailURL.queryParams.email;
    }



  ngOnInit(): void {
    this.validarCamposFormulario();
  }

  public validarCamposFormulario(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidacaoCampo.MustMatch('senha','confirmeSenha')
    };

    this.form = this.fb.group<Usuario>({
      codigoUsuario: new FormControl(''),
      codigoUsuarioPermissao: new FormControl(1),
      codigoEmpresa: new FormControl(1),
      codigoSetor: new FormControl(1),
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]),
      email: new FormControl(this.emailAuth, [Validators.required, Validators.minLength(10), Validators.email]),
      confirmeSenha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      ativo: new FormControl(true, [])
    }, formOptions);
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {

    this.usuario = {...this.form.value};
    this.spinner.show();

    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      () => this.toaster.success('Usuário cadastrado com sucesso. Redirecionando para a tela de login', 'Sucesso!'),
      (error: any) => {

        this.spinner.hide();
        this.toaster.toastrConfig.timeOut = 5000;
        this.toaster.error(`Houve um erro durante o cadastro do usuário. Mensagem: ${error.error.mensagem}`, 'Erro!');
      },
      () => {

        this.spinner.hide()

        setTimeout(() => {
          this.router.navigate(['login'])
        }, 5000)
      }
    );
  }
}
