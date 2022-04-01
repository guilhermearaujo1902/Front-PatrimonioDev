import { PatrimonioService } from './../../../services/patrimonio/patrimonio.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import { MensagemRequisicao } from '../../../helpers/MensagemRequisicao';
import { Patrimonio } from '../../../models/Patrimonio';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';
import configuracaoTabela from '../../../util/configuracao-tabela';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listarPatrimonio',
  templateUrl: './listagem-patrimonio.component.html',
  styleUrls: ['./listagem-patrimonio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListarpatrimonioComponent implements OnInit {

  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: Patrimonio[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public dataFiltradaExcel: Patrimonio[] = [];
  public patrimonios: Patrimonio[] = [];
  public patrimonioId: number = 0;
  public ehAdministrador = false;

  modalRef?: BsModalRef;

  constructor(
    private patrimonioService: PatrimonioService,
    private modalService: BsModalService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.ehAdministrador = this.token.ehUsuarioAdministrador()
    this.obterPatrimonios();

    this.configuracao = configuracaoTabela()
    this.linhas = this.data.map((_) => _.codigoPatrimonio).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
    this.checkView();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 1200;
  }

  public abrirModal(event: any, template: TemplateRef<any>, patrimonioId: number): void {
    event.stopPropagation();
    this.patrimonioId = patrimonioId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  private obterPatrimonios(): void {

    this.spinner.show("buscando");

    this.patrimonioService.obterPatrimonios().subscribe({
      next: (patrimonios: Patrimonio[]) => {
        this.dataFiltradaExcel = patrimonios;
        this.data = patrimonios;
        debugger;
      },
      error: (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao buscar pelos patrimônios. Mensagem ${template.mensagemErro}`, 'Erro');

      },
      complete: () => {
        this.configuracao.isLoading = false;
        this.detectorAlteracao.markForCheck();

      }
    }).add(() => this.spinner.hide("buscando"));

  }

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show("excluindo");

    debugger;
    this.patrimonioService.excluirPatrimonio(this.patrimonioId).subscribe(
      () => {
        this.toaster.success('Patrimônio excluído com sucesso!', 'Deletado');
        this.obterPatrimonios();
      },
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao excluir o patrimônio. Mensagem: ${template.mensagemErro}`, 'Erro');
      }
    ).add(() => this.spinner.hide("excluindo"));

  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public detalhePatrimonio(codigoPatrimonio: number, serviceTag: string): void {
    this.router.navigate([`dashboard/patrimonio`], { queryParams: { codigoPatrimonio, serviceTag } })
  }

  public onChange(event: Event): void {
    let valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarPatrimonios(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarPatrimonios(valor: any): void {
    this.dataFiltradaExcel = this.data.filter(
      (patrimonios: Patrimonio) =>
        patrimonios.codigoPatrimonio.toString().indexOf(valor) !== -1 ||
        patrimonios.codigoTipoEquipamento.toString().toLocaleLowerCase().indexOf(valor) !== -1 ||
        patrimonios.situacaoEquipamento.toString().toLocaleLowerCase().indexOf(valor) !== -1 ||
        patrimonios.modelo.toString().toLocaleLowerCase().indexOf(valor) !== -1 ||
        patrimonios.nomeFuncionario.toLocaleLowerCase().indexOf(valor) !== -1

    );
  }

  public exportarParaExcel(): void {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Patrimonios');

      XLSX.writeFile(wb, 'patrimonios.xlsx');
    } catch (err) {
      this.toaster.error(`Não foi possível exportar a planilha. Mensagem: ${err}`, "Erro")
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoPatrimonio', title: 'Código' },
      { key: 'situacaoEquipamento', title: 'Situação' },
      { key: 'tipoEquipamento', title: 'Equipamento' },
      { key: 'nomeFuncionario', title: 'Funcionário' },
      { key: 'modelo', title: 'Modelo' },
      { key: '', title: '' },
      { key: '', title: '' },
      { key: '', title: '' },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: 'nomeFuncionario', title: 'Funcionário' },
        { key: 'tipoEquipamento', title: 'Equipamento' },
        { key: '', title: 'Expandir' },
      ];
    } else {
      this.colunas = this.obterColunasDaTabela();
    }
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.checkView();
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
