import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FabricanteService } from './../../../services/fabricante/fabricante.service';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Fabricante } from '../../../models/Fabricante';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import configuracaoTabela from '../../../util/configuracao-tabela'

@Component({
  selector: 'app-listarFabricante',
  templateUrl: './listagem-fabricante.component.html',
  styleUrls: ['./listagem-fabricante.component.scss'],
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

  modalRef?: BsModalRef;

  constructor(
              private fabricanteService: FabricanteService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService,
              private toaster: ToastrService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.configuracao = configuracaoTabela();
    this.colunas = this.obterColunasDaTabela();
    this.obterFabricante();
  }

  public obterFabricante(): void {
    this.spinner.show();
    this.fabricanteService.obterTodosFabricante().subscribe({
      next: (fabricantes: Fabricante[]) => {
        this.data = fabricantes;
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
      (result: string) =>{
        this.spinner.hide();
        this.toaster.success('Fabricante removido com sucesso!', 'Deletado');
        this.obterFabricante();
      },
      (error: any) =>{
        this.spinner.hide();
        this.toaster.error(`Houve um erro ao remover o fabricante. Mensagem: ${error.message}`, 'Erro!');
      }
    );
  }

  public recusar(): void {
    this.modalRef?.hide();
  }

  public onChange(event: Event): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: (event.target as HTMLInputElement).value,
    });
  }

  public detalheFabricante(codigoFabricante: number): void {
    this.router.navigate([`dashboard/fabricante/${codigoFabricante}`])
  }

  private obterColunasDaTabela(): any {
    return [
      { key: 'codigoFabricante', title: 'Código' },
      { key: 'nomeFabricante', title: 'Nome' },
      { key: '', title: '' },
      { key: '', title: '' },
    ];
  }
}
