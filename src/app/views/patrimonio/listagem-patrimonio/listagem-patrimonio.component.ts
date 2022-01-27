import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-listarPatrimonio',
  templateUrl: './listagem-patrimonio.component.html',
  styleUrls: ['./listagem-patrimonio.component.scss']
})
export class ListarpatrimonioComponent implements OnInit {

  modalRef?: BsModalRef;


  constructor(private modalService: BsModalService,) { }

  ngOnInit(): void {
  }

  public abrirModalPerca(event: any, template: TemplateRef<any>): void {
    event.stopPropagation();
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  public recusar(): void {
    this.modalRef?.hide();
  }
}
