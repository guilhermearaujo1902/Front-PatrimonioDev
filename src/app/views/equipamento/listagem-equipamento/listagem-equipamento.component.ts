import { Equipamento } from '../../../models/Equipamento';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EquipamentoService } from '../../../services/equipamento/equipamento.service';

@Component({
  selector: 'app-listarEquipamento',
  templateUrl: './listagem-equipamento.component.html',
  styleUrls: ['./listagem-equipamento.component.scss']
})
export class ListarequipamentoComponent implements OnInit {

  public equipamentos: Equipamento[] = [];
  public equipamentosFiltrados: Equipamento[] = [];

  public equipamentoId: number = 0;
  private _filtroListado: string = '';

  modalRef?: BsModalRef;

  constructor(
    private equipamentoService: EquipamentoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.obterEquipamentos();
  }

  public get filtroLista() {
    return this._filtroListado;
  }

  public set filtroLista(value: string) {
    this._filtroListado = value;
    this.equipamentosFiltrados = this.filtroLista ? this.filtrarEquipamentos(this.filtroLista) : this.equipamentos;
  }

  public filtrarEquipamentos(filtrarPor: string): Equipamento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.equipamentos.filter(
      (equipamento: any) => equipamento.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public abrirModal(event: any, template: TemplateRef<any>, equipamentoId: number): void {
    event.stopPropagation();
    this.equipamentoId = equipamentoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public obterEquipamentos(): void {
    // this.setorService.obterSetor().subscribe({
    //   next: (equipamentos: Equipamento[]) => {
    //     this.equipamentos = equipamentos;
    //     this.equipamentosFiltrados = equipamentos;
    //   },
    //   error: () => {},
    //   complete: () => {}

    // });
  }

  public Confirmar(): void {

    // this.modalRef?.hide();
    // this.spinner.show();

    // this.setorService.deletarSetor(this.equipamentoId).subscribe(
    //   (result: string) =>{
    //     this.spinner.hide();
    //     this.toastr.success('Equipamento removido com sucesso!', 'Deletado');
    //     this.obterEquipamentos();

    //   },
    //   (error: any) =>{
    //     this.spinner.hide();
    //     this.toastr.error(`Houve um erro ao remover o equipamentp. Mensagem: ${error.message}`, 'Erro!');
    //   }
    // );
  }

  public recusar(): void {
    this.modalRef?.hide();
  }


}
