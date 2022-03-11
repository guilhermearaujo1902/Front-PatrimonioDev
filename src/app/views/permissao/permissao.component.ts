import { PermissaoService } from './../../services/permissao/permissao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioPermissao } from '../../models/UsuarioPermissao';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicao';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.scss', '../../../scss/style-base.scss']
})
export class PermissaoComponent implements OnInit {

  form!: FormGroupTypeSafe<UsuarioPermissao>;;
  permissao = {} as UsuarioPermissao;
  codigoUsuarioPermissao: number;
  estadoSalvar: string = 'cadastrarPermissao';

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilderTypeSafe,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private permissaoService: PermissaoService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarPermissao();
  }

  public carregarPermissao() : void{
    this.codigoUsuarioPermissao = +this.activateRouter.snapshot.paramMap.get('codigoPermissao');

     if(this.codigoUsuarioPermissao !== null && this.codigoUsuarioPermissao !== 0){
      this.estadoSalvar = 'atualizarPermissao';
       this.spinner.show();

       this.permissaoService.obterApenasUmaPermissao(this.codigoUsuarioPermissao).subscribe(
         {
           next: (permissao: UsuarioPermissao) => {
             this.permissao = {...permissao};
             this.form.patchValue(this.permissao);
           },
           error: (error: any) => {
             this.toaster.error(`Houve um problema ao carregar a permissão. Mensagem: ${MensagemRequisicao.retornarMensagemTratada(error.message)}`, 'Erro!');
           }
         }
       ).add(() => this.spinner.hide());
     }
   }

  private validacao(): void {
    this.form = this.fb.group<UsuarioPermissao>({
      codigoUsuarioPermissao: new FormControl(null),
      descricaoPermissao: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      ativo: new FormControl(true),
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {
    this.spinner.show();

    this.permissao = (this.estadoSalvar === 'cadastrarPermissao') ? {...this.form.value} : {codigoUsuarioPermissao: this.permissao.codigoUsuarioPermissao, ...this.form.value};

    this.permissaoService[this.estadoSalvar](this.permissao).subscribe(
      () => this.toaster.success('Permissão cadastrada com sucesso', 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro durante o cadastro da permissão. Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () =>
      {
        setTimeout(() => {
          this.router.navigate(['dashboard/listarPermissao'])
        }, 1700)
      }
    ).add(() => this.spinner.hide());
  }
}
