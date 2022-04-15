import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicao';
import { Movimentacao } from '../../models/Movimentacao';
import { MovimentacaoService } from '../../services/movimentacao/movimentacao.service';
import { TokenService } from '../../services/token/token.service';
import { EncryptDecryptService } from '../../services/encrypt-decrypt/encrypt-decrypt.service';
import { MovimentacaoEquipamento } from '../../models/enums/movimentacao-equipamento.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.scss', '../../../scss/style-base.scss']
})
export class MovimentacaoComponent implements OnInit {


  public form!: FormGroupTypeSafe<Movimentacao>;
  private movimentacao = {} as Movimentacao;
  private codigoMovimentacao: number;
  public estadoSalvar: string = 'realizarMovimentacao';
  private limpandoCampo: boolean = false;
  private codigoPatrimonio: number;
  private nomePatrimonio: string;

  public chaveSituacaoMovimento: any;
  public situacaoMovimento = MovimentacaoEquipamento;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilderTypeSafe,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private movimentacaoService: MovimentacaoService,
    private token: TokenService,
    private encriptacao: EncryptDecryptService,
    private activatedRoute: ActivatedRoute) {
    this.chaveSituacaoMovimento = Object.keys(this.situacaoMovimento).filter(Number);
    this.activatedRoute.queryParams.subscribe(parametro => { this.codigoPatrimonio = +this.encriptacao.decrypt(parametro.codigoPatrimonio) });

  }

  ngOnInit(): void {

    this.validacao();
    // this.carregarMovimentacao();

  }

  public limparCampos(): void {
    this.limpandoCampo = true;
    this.validacao();
  }


  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public cssValidatorCampoSelecao(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors };
  }

  private validacao(): void {

    this.form = this.fb.group<Movimentacao>({
      codigoMovimentacao: new FormControl(this.limpandoCampo ? this.form.get('codigoMovimentacao').value : 0, []),
      dataApropriacao: new FormControl('', [Validators.required]),
      dataDevolucao: new FormControl(' '),
      observacao: new FormControl(''),
      movimentacaoDoEquipamento: new FormControl(+MovimentacaoEquipamento['Em Uso']),
      codigoPatrimonio: new FormControl(this.codigoPatrimonio),
      codigoUsuario: new FormControl(this.token.obterCodigoUsuarioToken()),
      nomeUsuario: new FormControl(this.token.obterNomeUsuarioToken()),
      nomePatrimonio: new FormControl("")

    });
  }

  public salvarAlteracao(): void {

    let atualizando = this.estadoSalvar == 'atualizarMovimentacao';
    let nomeAcaoRealizada = atualizando ? 'atualizado' : 'realizada';

    this.spinner.show(nomeAcaoRealizada);

    this.movimentacao = (this.estadoSalvar === 'realizarMovimentacao') ? { ...this.form.value } : { codigoMovimentacao: this.movimentacao.codigoMovimentacao, ...this.form.value };

    this.formatarDatas()
    this.converterEnumEquipamentoParaNumber()

    this.movimentacaoService[this.estadoSalvar](this.movimentacao).subscribe(
      () => this.toaster.success(`Movimentação ${nomeAcaoRealizada} com sucesso`, 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao(nomeAcaoRealizada, "usuário", ['o', 'do'])} Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () => {
        setTimeout(() => {
          this.router.navigate(['dashboard/listar-movimentacao'])
        }, 1700)
      }
    ).add(() => this.spinner.hide(nomeAcaoRealizada));
  }

  private formatarDatas(): void {

    let dataApropriacao = this.form.controls.dataApropriacao.value
    let dataDevolucao = this.form.controls.dataDevolucao.value

    this.movimentacao.dataApropriacao = new Date(moment(dataApropriacao).subtract(3, 'hours').toISOString());

    if (typeof dataDevolucao != 'undefined') {
      this.movimentacao.dataDevolucao = moment(dataDevolucao).local().subtract(3, 'hours').toISOString();
    }

  }
  private converterEnumEquipamentoParaNumber(): void {
    this.movimentacao.movimentacaoDoEquipamento = +this.form.controls.movimentacaoDoEquipamento.value
  }



}
