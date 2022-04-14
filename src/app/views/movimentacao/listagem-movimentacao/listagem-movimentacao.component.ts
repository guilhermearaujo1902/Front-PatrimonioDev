import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt/encrypt-decrypt.service';
import { MovimentacaoService } from '../../../services/movimentacao/movimentacao.service';
import { Movimentacao } from '../../../models/Movimentacao';
import { MensagemRequisicao } from '../../../helpers/MensagemRequisicao';
import { MovimentacaoEquipamento } from '../../../models/enums/movimentacao-equipamento.enum';

@Component({
  selector: 'app-listagem-movimentacao',
  templateUrl: './listagem-movimentacao.component.html',
  styleUrls: ['./listagem-movimentacao.component.scss']
})
export class ListagemMovimentacaoComponent implements OnInit {

  private codigoPatrimonio: number;
  public movimentacoes: Movimentacao[] = [];

  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private movimentacaoService: MovimentacaoService,
    private activatedRoute: ActivatedRoute,
    private encriptacao: EncryptDecryptService
  ) {

  }

  ngOnInit(): void {
      this.obterMovimentacoes();
  }

  private obterMovimentacoes(): void {
    this.activatedRoute.queryParams.subscribe(parametro => { this.codigoPatrimonio = +this.encriptacao.decrypt(parametro.codigoDoPatrimonio) })

    this.spinner.show("buscando");

    this.movimentacaoService.obterTodasMovimentacoesDoPatrimonio(this.codigoPatrimonio).subscribe({
      next: (movimentacoes: Movimentacao[]) => {
        this.movimentacoes = movimentacoes;
        debugger;
      },
      error: (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao buscar pelas movimentações. Mensagem ${template.mensagemErro}`, 'Erro');

      }

    }).add(() => this.spinner.hide("buscando"));
  }
}
