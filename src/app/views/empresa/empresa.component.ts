import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { EmpresaService } from '../../services/empresa/empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from './../../models/Empresa';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicao';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss', '../../../scss/style-base.scss']
})
export class EmpresaComponent implements OnInit {

  form!: FormGroupTypeSafe<Empresa>;
  private empresa = {} as Empresa;
  public estadoSalvar = 'cadastrarEmpresa';
  private codigoEmpresa: number;
  private limpandoCampo: boolean = false;

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilderTypeSafe,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private empresaService: EmpresaService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarEmpresa();
  }

  public limparCampos(): void{
    this.limpandoCampo = true;
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group<Empresa>({
      codigoEmpresa: new FormControl(this.limpandoCampo? this.form.get('codigoEmpresa').value : 0, []),
      nomeFantasia: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]),
      cnpj: new FormControl('', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]),
      razaoSocial: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]),
      empresaPadraoImpressao: new FormControl(false)
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {

    let atualizando = this.estadoSalvar == 'atualizarEmpresa';
    let nomeAcaoRealizada = atualizando? 'atualizada': 'cadastrada';

    this.spinner.show(nomeAcaoRealizada);

    this.empresa = (this.estadoSalvar === 'cadastrarEmpresa') ? {...this.form.value} : {codigoEmpresa: this.empresa.codigoEmpresa, ...this.form.value};
    debugger;
    this.empresaService[this.estadoSalvar](this.empresa).subscribe(
      () => this.toaster.success(`Empresa ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        debugger;
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada,"empresa", ['o','da'])} Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () =>
      {
        setTimeout(() => {
          this.router.navigate(['dashboard/listarEmpresa'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private carregarEmpresa() : void{
    this.codigoEmpresa = +this.activateRouter.snapshot.paramMap.get('codigoEmpresa');
     if(this.codigoEmpresa !== null && this.codigoEmpresa !== 0){

      this.estadoSalvar = 'atualizarEmpresa';
       this.spinner.show('carregando');

       this.empresaService.obterApenasUmaEmpresa(this.codigoEmpresa).subscribe(
         {
           next: (empresa: Empresa) => {
             this.empresa = {...empresa};
             this.form.patchValue(this.empresa);
             debugger;

           },
           error: (error: any) => {
            let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            this.toaster[template.tipoMensagem](`Houve um problema ao carregar a empresa. Mensagem: ${template.mensagemErro}`, template.titulo);
           }
         }
       ).add(() => this.spinner.hide('carregando'));
     }
   }

}
