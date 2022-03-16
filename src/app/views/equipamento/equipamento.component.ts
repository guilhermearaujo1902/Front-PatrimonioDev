import { CategoriaService } from './../../services/categoria/categoria.service';
import { FabricanteService } from './../../services/fabricante/fabricante.service';
import { Fabricante } from './../../models/Fabricante';
import { Categoria } from './../../models/Categoria';
import { EquipamentoService } from './../../services/equipamento/equipamento.service';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Equipamento } from './../../models/Equipamento';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicao';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.scss','../../../scss/style-base.scss']
})
export class EquipamentoComponent implements OnInit {

  form!: FormGroupTypeSafe<Equipamento>;
  private equipamento = {} as Equipamento;
  private estadoSalvar = 'cadastrarEquipamento';
  private codigoEquipamento: number;
  public fabricantes: Fabricante[] = [];
  public categorias: Categoria[] = [];

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilderTypeSafe,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private equipamentoService: EquipamentoService,
    private fabricanteService: FabricanteService,
    private categoriaService: CategoriaService,
    private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarFabricantes();
    this.carregarCategorias();
    this.carregarEquipamento();
  }

  private carregarFabricantes(): void {

    this.fabricanteService.obterTodosFabricante().subscribe(
      (result: Fabricante[]) => {
        this.fabricantes = result;
      },
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao carregar os fabricante. Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () =>{}
    );
  }

  private carregarCategorias(): void {

    this.categoriaService.obterTodasCategorias().subscribe(
      (result: Categoria[]) => {
        this.categorias = result;
      },
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao carregar as categorias. Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () =>{}
    );
  }

  private validacao(): void {
    this.form = this.fb.group<Equipamento>({
      codigoEquipamento: new FormControl(),
      tipoEquipamento: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(70)]),
      codigoFabricante: new FormControl('' ,[Validators.required]),
      codigoCategoria: new FormControl('' ,[Validators.required])
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public cssValidatorCampoSelecao(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors};
  }

  public salvarAlteracao(): void {

    this.spinner.show();

    this.equipamento = (this.estadoSalvar === 'cadastrarEquipamento') ? {...this.form.value} : {codigoEquipamento: this.equipamento.codigoEquipamento, ...this.form.value};

    this.equipamentoService[this.estadoSalvar](this.equipamento).subscribe(
      () => this.toaster.success('Equipamento cadastrada com sucesso', 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao cadastrar o equipamento. Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () =>
      {
        setTimeout(() => {
          this.router.navigate(['dashboard/listarEquipamento'])
        }, 1700)
      }
    ).add(() => this.spinner.hide());
  }

  private carregarEquipamento() : void{
    this.codigoEquipamento = +this.activateRouter.snapshot.paramMap.get('codigoEquipamento');

     if(this.codigoEquipamento !== null && this.codigoEquipamento !== 0){

      this.estadoSalvar = 'atualizarEquipamento';
       this.spinner.show();

       this.equipamentoService.obterApenasUmEquipamento(this.codigoEquipamento).subscribe(
         {
           next: (equipamento: Equipamento) => {
             this.equipamento = {...equipamento};
             this.form.patchValue(this.equipamento);
           },
           error: (error: any) => {
            let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
            this.toaster[template.tipoMensagem](`Houve um problema ao carregar o equipamento. Mensagem: ${template.mensagemErro}`, 'Erro!');
           }
         }
       ).add(() => this.spinner.hide());
     }
   }

}
