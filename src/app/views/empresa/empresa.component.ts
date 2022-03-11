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

  form!: FormGroup;
  private empresa = {} as Empresa;
  private estadoSalvar = "cadastrarEmpresa";
  private codigoEmpresa: number;

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private empresaService: EmpresaService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarEmpresa();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoEmpresa: [],
      nomeFantasia: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      razaoSocial: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],

    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {

    this.spinner.show();

    this.empresa = (this.estadoSalvar === 'cadastrarEmpresa') ? {...this.form.value} : {codigoEmpresa: this.empresa.codigoEmpresa, ...this.form.value};

    this.empresaService[this.estadoSalvar](this.empresa).subscribe(
      () => this.toaster.success('Empresa cadastrada com sucesso', 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao cadastrar a empresa. Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () =>
      {
        this.spinner.hide()
        setTimeout(() => {
          this.router.navigate(['dashboard/listarEmpresa'])
        }, 1700)
      }
    ).add(() => this.spinner.hide());
  }

  private carregarEmpresa() : void{
    this.codigoEmpresa = +this.activateRouter.snapshot.paramMap.get('codigoEmpresa');

     if(this.codigoEmpresa !== null && this.codigoEmpresa !== 0){

      this.estadoSalvar = 'atualizarEmpresa';
       this.spinner.show();

       this.empresaService.obterApenasUmaEmpresa(this.codigoEmpresa).subscribe(
         {
           next: (empresa: Empresa) => {
             this.empresa = {...empresa};
             this.form.patchValue(this.empresa);
           },
           error: (error: any) => {
            let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            this.toaster[template.tipoMensagem](`Houve um problema ao carregar a empresa. Mensagem: ${template.mensagemErro}`, 'Erro!');
           }
         }
       ).add(() => this.spinner.hide());
     }
   }

}
