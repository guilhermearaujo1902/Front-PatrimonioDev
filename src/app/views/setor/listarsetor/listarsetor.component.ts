import { SetorService } from './../../../services/setor.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Setor } from '../../../models/Setor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listarsetor',
  templateUrl: './listarsetor.component.html',
  styleUrls: ['./listarsetor.component.scss']
})
export class ListarsetorComponent implements OnInit {

  public setores: Setor[] = [];
  public setorId: number = 0;

  modalRef?: BsModalRef;


  constructor(private setorService: SetorService, private modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.ObterSetor();
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
