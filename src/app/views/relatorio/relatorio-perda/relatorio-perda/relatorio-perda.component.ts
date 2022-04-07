import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { MensagemRequisicao } from '../../../../helpers/MensagemRequisicao';
import { PerdaRelatorio } from '../../../../models/relatorios/PerdaRelatorio';
import { TokenService } from '../../../../services/token/token.service';
import configuracaoTabela from '../../../../utils/configuracao-tabela';
import { PerdaService } from '../../../../services/perda/perda.service';

@Component({
  selector: 'app-relatorio-perda',
  templateUrl: './relatorio-perda.component.html',
  styleUrls: ['./relatorio-perda.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class RelatorioPerdaComponent implements OnInit {

  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: PerdaRelatorio[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public dataFiltradaExcel: PerdaRelatorio[] = [];
  public funcionarios: PerdaRelatorio[] = [];
  public ehAdministrador = false;

  constructor(
    private toaster: ToastrService,
    private token: TokenService,
    private spinner: NgxSpinnerService,
    private perdaService: PerdaService,
    private detectorAlteracao: ChangeDetectorRef) {
    }

  ngOnInit(): void {

    this.ehAdministrador = this.token.ehUsuarioAdministrador()
    this.obterPerdas();

    this.configuracao = configuracaoTabela()
    this.linhas = this.data.map((_) => _.codigoPerda).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  private obterPerdas(): void {

    this.spinner.show("buscando");

    this.perdaService.obterPerdas().subscribe({
      next: (perdas: PerdaRelatorio[]) => {
        this.dataFiltradaExcel = perdas;
        this.data = perdas;

      },
      error: (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao buscar pelas perdas. Mensagem ${template.mensagemErro}`, 'Erro');

      },
      complete: () =>{
        this.detectorAlteracao.markForCheck();
      }
    }).add(() => this.spinner.hide("buscando"));

  }

  public onChange(event: Event): void {
    let valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarPerdas(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarPerdas(valor: any): void{
    this.dataFiltradaExcel = this.data.filter(
      (perdas: PerdaRelatorio) =>
       perdas.motivoDaPerda.toString().indexOf(valor) !== -1 ||
       perdas.codigoPerda.toString().indexOf(valor) !== -1 ||
       perdas.nomeFuncionario.toString().indexOf(valor) !== -1 ||
       perdas.nomeUsuario.toString().indexOf(valor) !== -1
    );
  }

  public exportarParaExcel(): void {
     try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Perdas');

      XLSX.writeFile(wb, 'perdas.xlsx');
    } catch (err) {
      this.toaster.error(`Não foi possível exportar a planilha. Mensagem: ${err}`,"Erro")
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'motivoDaPerda', title: 'Perda'},

    ];
  }

  onRowClickEvent($event: MouseEvent, index: number): void {
    $event.preventDefault();
    this.table.apiEvent({
      type: API.toggleRowIndex,
      value: index,
    });
    if (this.toggledRows.has(index)) {
      this.toggledRows.delete(index);
    } else {
      this.toggledRows.add(index);
    }
  }
}
