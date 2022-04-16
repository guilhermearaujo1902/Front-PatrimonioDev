import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { PerdaEquipamento } from '../../models/PerdaEquipamento';
import { PerdaService } from '../../services/perda/perda.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perda',
  templateUrl: './perda.component.html',
  styleUrls: ['./perda.component.scss','../../../scss/style-base.scss']
})
export class PerdaComponent implements OnInit {
  @Input('codigoPatrimonio') codigoPatrimonio: number;
  @Output() podeFecharModal = new EventEmitter<boolean>();

  form!: FormGroupTypeSafe<PerdaEquipamento>;
  private perda = {} as PerdaEquipamento

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilderTypeSafe,
              private perdaService: PerdaService,
              private spinner: NgxSpinnerService,
              private toaster: ToastrService
              ) { }

  ngOnInit(): void {
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group<PerdaEquipamento>({
      codigoPerdaEquipamento: new FormControl(),
      motivoDaPerda: new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(300)]),
      codigoPatrimonio: new FormControl('')
    });
  }

  public salvarAlteracao(): void {

    this.spinner.show();

    this.perda = {...this.form.value};
    this.perda.codigoPatrimonio = this.codigoPatrimonio;

    this.perdaService.cadastrarPerda(this.perda).subscribe(
      () => this.toaster.success(`Perda cadastrada com sucesso`, 'Sucesso!'),
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`${MensagemRequisicao.retornarMensagemDeErroAoRealizarOperacao("cadastrar","perda", ['o','da'])} Mensagem: ${template.mensagemErro}`, template.titulo);
      },
      () =>{
        this.podeFecharModal.emit(true);
      }
    ).add(() => this.spinner.hide());
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }
}
