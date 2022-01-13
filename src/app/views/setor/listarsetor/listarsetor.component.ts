import { Setor } from './../../../models/Setor';
import { SetorService } from './../../../services/setor.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listarsetor',
  templateUrl: './listarsetor.component.html',
  styleUrls: ['./listarsetor.component.scss']
})
export class ListarsetorComponent implements OnInit {

  public setores: Setor[] = [];
  public setoresFiltrados: Setor[] = [];

  public setorId: number = 0;
  private _filtroListado: string = '';

  modalRef?: BsModalRef;

  constructor(private setorService: SetorService, private modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ObterSetor();
  }

  public get filtroLista() {
    return this._filtroListado;
  }

  public set filtroLista(value: string) {
    this._filtroListado = value;
    this.setoresFiltrados = this.filtroLista ? this.filtrarSetores(this.filtroLista) : this.setores;
  }

  public filtrarSetores(filtrarPor: string): Setor[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.setores.filter(
      (setor: any) => setor.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public AbrirModal(event: any, template: TemplateRef<any>, setorId: number): void {
    event.stopPropagation();
    this.setorId = setorId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public ObterSetor(): void {
    this.setorService.obterSetor().subscribe({
      next: (setores: Setor[]) => {
        this.setores = setores;
        this.setoresFiltrados = setores;
      },
      error: () => {},
      complete: () => {}

    });
  }

  public Confirmar(): void {

    this.modalRef?.hide();
    // this.spinner.show();

    this.setorService.deletarSetor(this.setorId).subscribe(
      (result: string) =>{

        this.toastr.success('Setor removido com sucesso!', 'Deletado');
        this.ObterSetor();

      },
      (error: any) =>{
        this.toastr.error(`Houve um erro ao remover o setor. Mensagem: ${error}`, 'Erro!');
      }
    );
  }

  public Recusar(): void {
    this.modalRef?.hide();
  }


}
