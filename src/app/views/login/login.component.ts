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
    private router: Router) {
  }

  public validarCredenciais(): void {

    let credenciais = {...this.form.value}
    this.usuarioService.obterUsuarioPorLoginESenha(credenciais.email, credenciais.senha).subscribe(
      (result: any) => {
        debugger;
        this.usuario = {...result};
        const token = result.token;
        localStorage.setItem("jwt", token);
        let valor = jwtDecode(token);

        if(Object.keys(this.usuario).length !== 0 ){
          this.router.navigate(['dashboard']);
        }else
        {
          this.toaster.toastrConfig.timeOut = 5000;
          this.toaster.info(`Não foi encontrado nenhum usuário cadastrado com esse e-mail e senha. Por favor, tente novamente`, "Não encontrado");
        }
      },
      (error: any) => {
          this.toaster.error(`Houve um erro ao fazer login. Mensagem : ${error.message}`)
      }
    )

  }

  public validarCamposFormulario(): void {
    this.form = this.fb.group({
      email:  ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

}
