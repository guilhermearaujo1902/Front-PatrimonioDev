import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt/encrypt-decrypt.service';
import { MovimentacaoService } from '../../../services/movimentacao/movimentacao.service';
import { Movimentacao } from '../../../models/Movimentacao';
import { MensagemRequisicao } from '../../../helpers/MensagemRequisicaoHelper';
import { MovimentacaoEquipamento } from '../../../models/enums/movimentacao-equipamento.enum';
import {API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import configuracaoTabela from '../../../utils/configuracao-tabela';
import { CssHelper } from '../../../helpers/CssHelper';

@Component({
  selector: 'app-listagem-movimentacao',
  templateUrl: './listagem-movimentacao.component.html',
  styleUrls: ['./listagem-movimentacao.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListagemMovimentacaoComponent implements OnInit, AfterViewInit {
  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public data: Movimentacao[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();
  public colunas: Columns[];

  private codigoPatrimonio: number;
  public movimentacoes: Movimentacao[] = [];

  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private movimentacaoService: MovimentacaoService,
    private activatedRoute: ActivatedRoute,
    private encriptacao: EncryptDecryptService,
    private detectorAlteracao: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    let botaoPaginacaoProximo = document.getElementsByClassName('ngx-pagination-wrapper')[0] as HTMLElement;
    CssHelper.alterarBackgroundColor('whitesmoke', botaoPaginacaoProximo);
    botaoPaginacaoProximo.style.setProperty('padding','15px')
  }

  ngOnInit(): void {
    this.obterMovimentacoes();

    this.configuracao = configuracaoTabela()
    this.configuracao.tableLayout.hover = false;
    this.configuracao.headerEnabled = false;

    this.colunas =  [ {key: 'observacao', title: '' },
                      {key: 'nomeUsuario', title: ''},
                      {key: 'codigoMovimentacao', title: ''}]


    this.linhas = this.data.map((_) => _.codigoMovimentacao).reduce((acc, cur) => cur + acc, 0);

  }

  public adicionarClasseAlinhamentoDireita(index: number): any {
    return { 'right': index % 2 === 0 };
  }

  public obterDescricaoEnum(index: number): string {
    return MovimentacaoEquipamento[index];
  }

  public onChange(event: Event): void {
    debugger;
    let valorDigitado = (event.target as HTMLInputElement).value;

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private obterMovimentacoes(): void {
    this.activatedRoute.queryParams.subscribe(parametro => {this.codigoPatrimonio = +this.encriptacao.decrypt(parametro.codigoPatrimonio) })

    this.spinner.show("buscando");

    this.movimentacaoService.obterTodasMovimentacoesDoPatrimonio(this.codigoPatrimonio).subscribe({
      next: (movimentacoes: Movimentacao[]) => {
        this.movimentacoes = movimentacoes;
        this.data = movimentacoes;
      },
      error: (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao buscar pelas movimentações. Mensagem ${template.mensagemErro}`, 'Erro');

      },
      complete: () =>{
        this.detectorAlteracao.markForCheck();

      }

    }).add(() => this.spinner.hide("buscando"));
  }

  public detalheMovimentacao(codigoMovimentacao: number): void {
    this.router.navigate([`dashboard/listar-patrimonio/movimentacao`], { queryParams: { codigoMovimentacao } })
  }
}
