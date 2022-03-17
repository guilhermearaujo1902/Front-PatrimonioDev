import { CategoriaService } from './../../services/categoria/categoria.service';
import { Categoria } from './../../models/Categoria';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicao';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss','../../../scss/style-base.scss']
})
export class CategoriaComponent implements OnInit {


  form!: FormGroupTypeSafe<Categoria>;
  private categoria = {} as Categoria;
  private estadoSalvar = "cadastrarCategoria";
  private codigoCategoria: number;
  private limpandoCampo: boolean = false;

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilderTypeSafe,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private categoriaService: CategoriaService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarCategoria();
  }

  public limparCampos(): void{
    this.limpandoCampo = true;
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group<Categoria>({
      codigoCategoria: new FormControl(this.limpandoCampo? this.form.get('codigoCategoria').value : '', [],),
      descricao: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)])

    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {

    this.spinner.show();

    this.categoria = (this.estadoSalvar === 'cadastrarCategoria') ? {...this.form.value} : {codigoCategoria: this.categoria.codigoCategoria, ...this.form.value};

    this.categoriaService[this.estadoSalvar](this.categoria).subscribe(
      () => this.toaster.success('Categoria cadastrada com sucesso', 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao cadastrar a categoria. Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () =>
      {
        this.spinner.hide()
        setTimeout(() => {
          this.router.navigate(['dashboard/listarCategoria'])
        }, 1700)
      }
    ).add(() => this.spinner.hide());
  }

  private carregarCategoria() : void{
    debugger;
    this.codigoCategoria = +this.activateRouter.snapshot.paramMap.get('codigoCategoria');

     if(this.codigoCategoria !== null && this.codigoCategoria !== 0){

      this.estadoSalvar = 'atualizarCategoria';
       this.spinner.show();

       this.categoriaService.obterApenasUmaCategoria(this.codigoCategoria).subscribe(
         {
           next: (categoria: Categoria) => {
             debugger;
             this.categoria = {...categoria};
             this.form.patchValue(this.categoria);
           },
           error: (error: any) => {
             debugger;
            let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            this.toaster[template.tipoMensagem](`Houve um problema ao carregar a categoria. Mensagem: ${template.mensagemErro}`, 'Erro!');
           }
         }
       ).add(() => this.spinner.hide());
     }
   }

}
