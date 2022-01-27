import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FabricanteService } from './../../../services/fabricante/fabricante.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Fabricante } from '../../../models/Fabricante';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-listarFabricante',
  templateUrl: './listagem-fabricante.component.html',
  styleUrls: ['./listagem-fabricante.component.scss']
})
export class ListagemfabricanteComponent implements OnInit {

  public fabricantes: Fabricante[] = [];
  public fabricantesFiltrados: Fabricante[] = [];
  private _filtroListado: string = '';
  public codigoFabricante: number;

  modalRef?: BsModalRef;

  public get filtroLista() {
    return this._filtroListado;
  }

  public set filtroLista(value: string) {
    this._filtroListado = value;
    this.fabricantesFiltrados = this.filtroLista ? this.filtrarFabricantes(this.filtroLista) : this.fabricantes;
  }

  constructor(
              private fabricanteService: FabricanteService,
              private spinner: NgxSpinnerService,
              private modalService: BsModalService,
              private toaster: ToastrService
              ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.obterFabricante();
  }

  public obterFabricante(): void {
    this.fabricanteService.obterTodosFabricante().subscribe({
      next: (fabricantes: Fabricante[]) => {
        this.fabricantes = fabricantes;
        this.fabricantesFiltrados = fabricantes;
      },
      error: () => {},
      complete: () => this.spinner.hide()

    });
  }

  public abrirModal(event: any, template: TemplateRef<any>, codigoFabricante: number): void {
    event.stopPropagation();
    this.codigoFabricante = codigoFabricante;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


  private filtrarFabricantes(filtrarPor: string): Fabricante[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.fabricantes.filter(
      (fabricante: any) => fabricante.nomeFabricante.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
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

}
