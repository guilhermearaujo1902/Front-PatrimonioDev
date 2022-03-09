import { TokenService } from './../../../services/token/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FabricanteService } from './../../../services/fabricante/fabricante.service';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Fabricante } from '../../../models/Fabricante';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import configuracaoTabela from '../../../util/configuracao-tabela'
import * as XLSX from 'xlsx';
import { MensagemRequisicao } from '../../../helpers/MensagemRequisicao';

@Component({
  selector: 'app-listarFabricante',
  templateUrl: './listagem-fabricante.component.html',
  styleUrls: ['./listagem-fabricante.component.scss', '../../../../scss/style-listagem.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListagemfabricanteComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: Fabricante[] = [];

  public fabricantes: Fabricante[] = [];
  public fabricantesFiltrados: Fabricante[] = [];
  public codigoFabricante: number;
  public ehAdministrador = false;

  public dataFiltradaExcel: Fabricante[] = [];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  modalRef?: BsModalRef;

  constructor(
              private fabricanteService: FabricanteService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService,
              private toaster: ToastrService,
              private router: Router,
              private token: TokenService) { }

  ngOnInit(): void {
    this.configuracao = configuracaoTabela();
    this.colunas = this.obterColunasDaTabela();

    this.obterFabricante();
    this.ehAdministrador = this.token.ehUsuarioAdministrador();

  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public obterFabricante(): void {
    this.spinner.show();
    this.fabricanteService.obterTodosFabricante().subscribe({
      next: (fabricantes: Fabricante[]) => {
        this.data = fabricantes;
        this.dataFiltradaExcel = fabricantes;
      },
      error: () => {},
      complete: () =>{
        this.spinner.hide();
        this.configuracao.isLoading = false;
      }
    });
  }

  public abrirModal(event: any, template: TemplateRef<any>, codigoFabricante: number): void {
    event.stopPropagation();
    this.codigoFabricante = codigoFabricante;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirmar(): void {

    this.modalRef?.hide();
    this.spinner.show();

    this.fabricanteService.deletarFabricante(this.codigoFabricante).subscribe(
      () =>{
        this.spinner.hide();
        this.toaster.success('Fabricante removido com sucesso!', 'Deletado');
        this.obterFabricante();
      },
      (error: any) =>{
        this.spinner.hide();
        this.toaster.error(`Houve um erro ao remover o fabricante. Mensagem: ${MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem)}`, 'Erro!');
      }
    );
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public onChange(event: Event): void {
    let valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarFabricantes(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarFabricantes(valor: any): void{
    this.dataFiltradaExcel = this.data.filter(
      (usuario: Fabricante) =>
       usuario.codigoFabricante.toString().indexOf(valor) !== -1 ||
       usuario.nomeFabricante.toLocaleLowerCase().indexOf(valor) !== -1
    );
  }


  public detalheFabricante(codigoFabricante: number): void {
    this.router.navigate([`dashboard/fabricante/${codigoFabricante}`])
  }

  public exportarParaExcel(): void {
    try {
     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'fabricantes');

     XLSX.writeFile(wb, 'fabricantes.xlsx');
   } catch (err) {
     this.toaster.error(`Não foi possível exportar a planilha. Mensagem: ${err}`,"Erro")
   }
 }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoFabricante', title: 'Código' },
      { key: 'nomeFabricante', title: 'Nome' },
      { key: '', title: '' },
      { key: '', title: '' },
    ];
  }
  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
        { key: 'codigoFabricante', title: 'Código' },
        { key: 'nomeFabricante', title: 'Nome' },
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
