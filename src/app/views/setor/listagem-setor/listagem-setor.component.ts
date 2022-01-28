import { Router } from '@angular/router';
import { Setor } from '../../../models/Setor';
import { SetorService } from '../../../services/setor/setor.service';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import * as XLSX from 'xlsx';
import configuracaoTabela from '../../../util/configuracao-tabela'

@Component({
  selector: 'app-listarsetor',
  templateUrl: './listagem-setor.component.html',
  styleUrls: ['./listagem-setor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListarsetorComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuration: Config;
  public columns: Columns[];
  public data: Setor[] = [];
  public linhas = 0;

  public setores: Setor[] = [];
  public setorId: number = 0;

  modalRef?: BsModalRef;

  constructor(
    private setorService: SetorService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.obterSetor();
    this.configuration = configuracaoTabela()

    this.linhas = this.data.map((_) => _.codigoSetor).reduce((acc, cur) => cur + acc, 0);

    this.columns = this.obterColunasDaTabela();
  }

  public abrirModal(event: any, template: TemplateRef<any>, setorId: number): void {
    event.stopPropagation();
    this.setorId = setorId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  private obterSetor(): void {
    this.setorService.obterSetor().subscribe({
      next: (setores: Setor[]) => {
        this.data = setores;
      },
      error: () => {},
      complete: () =>{
        this.spinner.hide();
        this.configuration.isLoading = false;
      }
    });
  }

  public confirmar(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.setorService.deletarSetor(this.setorId).subscribe(
      (result: string) =>{
        this.spinner.hide();
        this.toastr.success('Setor removido com sucesso!', 'Deletado');
        this.obterSetor();
      },
      (error: any) =>{
        this.spinner.hide();
        this.toastr.error(`Houve um erro ao remover o setor. Mensagem: ${error.message}`, 'Erro!');
      }
    );
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public detalheSetor(codigoSetor : number): void {
    this.router.navigate([`dashboard/setor/${codigoSetor}`])
  }

  public onChange(event: Event): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: (event.target as HTMLInputElement).value,
    });
  }

  public exportarParaExcel(): void {
     try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Setores');

      XLSX.writeFile(wb, 'setores.xlsx');
    } catch (err) {
      this.toastr.error(`Não foi possível exportar a planilha. Mensagem: ${err}`,"Erro")
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

}
