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
  public estadoSalvar = 'cadastrarEquipamento';
  private codigoEquipamento: number;
  public fabricantes: Fabricante[] = [];
  public categorias: Categoria[] = [];
  private limpandoCampo: boolean = false;

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

  public limparCampos(): void{
    this.limpandoCampo = true;
    this.validacao();
  }

  private carregarFabricantes(): void {

    this.fabricanteService.obterTodosFabricante().subscribe(
      (result: Fabricante[]) => {
        this.fabricantes = result;
      },
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao carregar os fabricante. Mensagem: ${template.mensagemErro}`, template.titulo);
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
        this.toaster[template.tipoMensagem](`Houve um problema ao carregar as categorias. Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () =>{}
    );
  }

  private validacao(): void {
    this.form = this.fb.group<Equipamento>({
      codigoTipoEquipamento: new FormControl(this.limpandoCampo? this.form.get('codigoTipoEquipamento').value : 0, [],),
      tipoEquipamento: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(70)]),
      codigoFabricante: new FormControl('' ,[Validators.required]),
      codigoCategoria: new FormControl('' ,[Validators.required]),
      nomeFabricante: new FormControl(''),
      nomeCategoria: new FormControl('')
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public cssValidatorCampoSelecao(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors};
  }

  public salvarAlteracao(): void {
    let atualizando = this.estadoSalvar == 'atualizarEquipamento';
    let nomeAcaoRealizada = atualizando? 'atualizado': 'cadastrado';

    this.spinner.show(nomeAcaoRealizada);

    this.equipamento = (this.estadoSalvar === 'cadastrarEquipamento') ? {...this.form.value} : {codigoTipoEquipamento: this.equipamento.codigoTipoEquipamento, ...this.form.value};

    this.equipamentoService[this.estadoSalvar](this.equipamento).subscribe(
      () => this.toaster.success(`Equipamento ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada,"equipamento", ['o','do'])} Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () =>
      {
        setTimeout(() => {
          this.router.navigate(['dashboard/listar-equipamento'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private carregarEquipamento() : void{
    this.codigoEquipamento = +this.activateRouter.snapshot.paramMap.get('codigoEquipamento');

     if(this.codigoEquipamento !== null && this.codigoEquipamento !== 0){

      this.estadoSalvar = 'atualizarEquipamento';
       this.spinner.show('carregando');

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
       ).add(() => this.spinner.hide('carregando'));
     }
   }

}
