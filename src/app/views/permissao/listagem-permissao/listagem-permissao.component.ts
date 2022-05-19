import { PermissaoService } from './../../../services/permissao/permissao.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import { MensagemRequisicao } from '../../../helpers/MensagemRequisicaoHelper';
import configuracaoTabela from '../../../utils/configuracao-tabela';
import { TokenService } from '../../../services/token/token.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuarioPermissao } from '../../../models/UsuarioPermissao';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listarPermissao',
  templateUrl: './listagem-permissao.component.html',
  styleUrls: ['./listagem-permissao.component.scss', ],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListarpermissaoComponent implements OnInit {

  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public linhas = 0;
  public innerWidth: number;
  public toggledRows = new Set<number>();

  public data: UsuarioPermissao[] = [];
  public dataFiltradaExcel: UsuarioPermissao[] = [];
  public permissaoId: number = 0;
  public ehAdministrador = false;

  modalRef?: BsModalRef;

  constructor(
    private permissaoService: PermissaoService,
    private modalService: BsModalService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private token: TokenService,
    private detectorAlteracao: ChangeDetectorRef
    ) { }

  ngOnInit(): void {

    this.obterPermissoes();
    this.ehAdministrador = this.token.ehUsuarioAdministrador()

    this.configuracao = configuracaoTabela()
    this.linhas = this.data.map((_) => _.codigoUsuarioPermissao).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
    this.checkView();

  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  public abrirModal(event: any, template: TemplateRef<any>, permissaoId: number): void {
    event.stopPropagation();
    this.permissaoId = permissaoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  private obterPermissoes(): void {

    this.spinner.show("buscando")

    this.permissaoService.obterPermissoes().subscribe({
      next: (permissoes: UsuarioPermissao[]) => {
        this.data = permissoes;
        this.dataFiltradaExcel = permissoes;

      },
      error: (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao carregar as permissões. Mensagem ${template.mensagemErro}`, template.titulo);

      },
      complete: () =>{
        this.detectorAlteracao.markForCheck();
      }
    }).add(() => this.spinner.hide("buscando"));

  }

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show("desativando");

    debugger;
    this.permissaoService.desativarPermissao(this.permissaoId).subscribe(
      () =>{
        this.toaster.success('Permissão desativada com sucesso!', 'Desativar');
        this.obterPermissoes();
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao desativar a permissão. Mensagem ${template.mensagemErro}`, template.titulo);
      }
    ).add(()=> this.spinner.hide("desativando"));
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public detalhePermissao(codigoPermissao : number): void {
    this.router.navigate([`dashboard/permissao/${codigoPermissao}`])
  }

  public onChange(event: Event): void {
    let valorDigitado = (event.target as HTMLInputElement).value;
    this.filtrarPermissoes(valorDigitado);

    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: valorDigitado,
    });
  }

  private filtrarPermissoes(valor: any): void{
    this.dataFiltradaExcel = this.data.filter(
      (permissao: UsuarioPermissao) =>
       permissao.codigoUsuarioPermissao.toString().indexOf(valor) !== -1 ||
       permissao.descricaoPermissao.toLocaleLowerCase().indexOf(valor) !== -1
    );
  }

  public exportarParaExcel(): void {
     try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataFiltradaExcel);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Permissoes');

      XLSX.writeFile(wb, 'permissoes.xlsx');
    } catch (err) {
      this.toaster.error(`Não foi possível exportar a planilha. Mensagem: ${err}`,"Erro")
    }
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoUsuarioPermissao', title: 'Código' },
      { key: 'descricaoPermissao', title: 'Nome' },
      { key: 'ativo', title: 'Situação' },
      { key: '', title: '' },
      { key: '', title: '' },
    ];
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.colunas = [
      { key: 'descricaoPermissao', title: 'Nome' },
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
