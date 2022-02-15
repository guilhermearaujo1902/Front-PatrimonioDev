import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import jwtDecode, * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./login.component.scss'],
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  usuario = {} as Usuario;
  form!: FormGroup


  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validarCamposFormulario();
  }

  constructor(
    private usuarioService: UsuarioService,
    private fb:FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService) {
  }

  public validarCredenciais(): void {

    this.removerToken();

    this.spinner.show();

    let credenciais = {...this.form.value}
    this.usuarioService.obterUsuarioPorLoginESenha(credenciais.email, credenciais.senha).subscribe(
      (result: any) => {
        this.usuario = {...result};
        const token = result.token;
        localStorage.setItem("jwt", token);
        let valor = jwtDecode(token);

        if(Object.keys(this.usuario).length !== 0 ){
          this.router.navigate(['dashboard']);
        }
      },
      (error: any) => {
        this.toaster.toastrConfig.timeOut = 5000;
        this.toaster.info(`Houve um erro ao fazer login. Mensagem : ${error.error.mensagem}`)
      }
    ).add(() => this.spinner.hide())

  }

  private removerToken(){
    localStorage.removeItem("jwt");
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

}
