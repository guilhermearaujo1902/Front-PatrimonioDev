import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Usuario } from './../../../models/Usuario';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { API, APIDefinition, Columns, Config } from 'ngx-easy-table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import configuracaoTabela from '../../../util/configuracao-tabela';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ListagemUsuarioComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;

  public configuracao: Config;
  public colunas: Columns[];
  public data: Usuario[] = [];
  public linhas = 0;

  modalRef?: BsModalRef;
  codigoUsuario: number;

  constructor(
    private toaster: ToastrService,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.obterUsuario();
    this.configuracao = configuracaoTabela()

    this.linhas = this.data.map((_) => _.codigoSetor).reduce((acc, cur) => cur + acc, 0);

    this.colunas = this.obterColunasDaTabela();
  }

  obterColunasDaTabela(): Columns[] {
    return [
      { key: 'codigoUsuario', title: 'Código' },
      { key: 'nome', title: 'Nome' },
      { key: 'email', title: 'E-mail' },
      { key: '', title: '' },
      { key: '', title: '' },
    ];
  }

  private obterUsuario(): void {

    this.usuarioService.obterTodosUsuarios().subscribe({
      next: (usuarios: Usuario[]) => {
        this.data = usuarios;
      },
      error: () => {},
      complete: () =>{
        this.configuracao.isLoading = false;
      }
    });
  }

  public exportarParaExcel(): void {
    try {
     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

     XLSX.writeFile(wb, 'usuarios.xlsx');
   } catch (err) {
     this.toaster.error(`Não foi possível exportar a planilha. Mensagem: ${err}`,"Erro")
   }
 }

  public onChange(event: Event): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: (event.target as HTMLInputElement).value,
    });
  }

  public confirmar(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.usuarioService.desativarUsuario(this.codigoUsuario).subscribe(
      () =>{
        this.toaster.success('Usuário desativado com sucesso!', 'Desativado');
        this.obterUsuario();
      },
      (error: any) =>{
        this.toaster.error(`Houve um erro ao desativar o usuário. Mensagem: ${error.message}`, 'Erro!');
      }
    ).add(() => this.spinner.hide())
  }

  public abrirModal(event: any, template: TemplateRef<any>, codigoUsuario: number): void {
    event.stopPropagation();
    this.codigoUsuario = codigoUsuario;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public recusar(): void {
    this.modalRef.hide();
  }
}
