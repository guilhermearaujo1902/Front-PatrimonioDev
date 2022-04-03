import { TokenService } from './../../../services/token/token.service';
import { Router } from '@angular/router';
import { Setor } from '../../../models/Setor';
import { SetorService } from '../../../services/setor/setor.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import * as XLSX from 'xlsx';
import configuracaoTabela from '../../../utils/configuracao-tabela'
import { MensagemRequisicao } from '../../../helpers/MensagemRequisicao';

@Component({
  selector: 'app-listarsetor',
  templateUrl: './listagem-setor.component.html',
  styleUrls: ['./listagem-setor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListarsetorComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: Setor[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public dataFiltradaExcel: Setor[] = [];
  public setores: Setor[] = [];
  public setorId: number = 0;
  public ehAdministrador = false;

  modalRef?: BsModalRef;

  constructor(
    private setorService: SetorService,
    private modalService: BsModalService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef
    ) {

    }

  ngOnInit(): void {

    this.ehAdministrador = this.token.ehUsuarioAdministrador()
    this.obterSetor();

    this.configuracao = configuracaoTabela()
    this.linhas = this.data.map((_) => _.codigoSetor).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
    this.checkView();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public abrirModal(event: any, template: TemplateRef<any>, setorId: number): void {
    event.stopPropagation();
    this.setorId = setorId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  private obterSetor(): void {

    this.spinner.show("buscando");

    this.setorService.obterSetor().subscribe({
      next: (setores: Setor[]) => {
        this.dataFiltradaExcel = setores;
        this.data = setores;

      },
      error: (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao buscar pelo setores. Mensagem ${template.mensagemErro}`, 'Erro');

      },
      complete: () =>{
        this.configuracao.isLoading = false;
        this.detectorAlteracao.markForCheck();

      }
    }).add(() => this.spinner.hide("buscando"));

  }

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show("excluindo");

    debugger;
    this.setorService.deletarSetor(this.setorId).subscribe(
      () =>{
        this.toaster.success('Setor removido com sucesso!', 'Deletado');
        this.obterSetor();
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao remover o setor. Mensagem: ${template.mensagemErro}`, 'Erro');
      }
    ).add(() => this.spinner.hide("excluindo"));

  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public detalheSetor(codigoSetor : number): void {
    this.router.navigate([`dashboard/setor/${codigoSetor}`])
  }

  public onChange(event: Event): void {
    let valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarSetores(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarSetores(valor: any): void{
    this.dataFiltradaExcel = this.data.filter(
      (setor: Setor) =>
       setor.codigoSetor.toString().indexOf(valor) !== -1 ||
       setor.nome.toLocaleLowerCase().indexOf(valor) !== -1
    );
  }

  public exportarParaExcel(): void {
     try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Setores');

      XLSX.writeFile(wb, 'setores.xlsx');
    } catch (err) {
      this.toaster.error(`Não foi possível exportar a planilha. Mensagem: ${err}`,"Erro")
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoSetor', title: 'Código' },
      { key: 'nome', title: 'Nome' },
      { key: '', title: '' },
      { key: '', title: '' },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: 'codigoSetor', title: 'Código' },
        { key: 'nome', title: 'Nome' },
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
