import { PatrimonioService } from './../../services/patrimonio/patrimonio.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from './../../services/token/token.service';
import { Patrimonio } from './../../models/Patrimonio';
import { SituacaoEquipamento } from './../../models/enums/situacao-equipamento.enum';
import { Equipamento } from './../../models/Equipamento';
import { EquipamentoService } from './../../services/equipamento/equipamento.service';
import { ToastrService } from 'ngx-toastr';
import { FuncionarioService } from './../../services/funcionario/funcionario.service';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Funcionario } from './../../models/Funcionario';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicao';
import { InformacaoAdicional } from '../../models/InformacaoAdicional';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patrimonio',
  templateUrl: './patrimonio.component.html',
  styleUrls: ['./patrimonio.component.scss','../../../scss/style-base.scss']
})
export class PatrimonioComponent implements OnInit {

  form = {} as FormGroupTypeSafe<Patrimonio>;
  formAdicional = {} as FormGroupTypeSafe<InformacaoAdicional>;

  public funcionarios: Funcionario[] = [];
  public equipamentos: Equipamento[] = [];
  public patrimonio: Patrimonio = {} as Patrimonio;
  public chaveSituacaoEquipamento: any
  public situacaoEquipamento = SituacaoEquipamento;
  private limpandoCampo: boolean = false;
  private estadoSalvar: string = 'cadastrarPatrimonio'

  get f(): any {
    return this.form.controls;
  }

  get fa(): any {
    return this.formAdicional.controls;
  }

  constructor(private fb: FormBuilderTypeSafe,
    private funcionario: FuncionarioService,
    private equipamento: EquipamentoService,
    private patrimonioService: PatrimonioService,
    private toaster: ToastrService,
    private token: TokenService,
    private spinner: NgxSpinnerService,
    private router: Router)
    {
      debugger;
      this.chaveSituacaoEquipamento = Object.keys(this.situacaoEquipamento).filter(Number);
    }

    public salvarAlteracao(): void {
      this.spinner.show();
      debugger;
      this.patrimonio = (this.estadoSalvar === 'cadastrarPatrimonio') ? {...this.form.value} : {codigoPatrimonio: this.patrimonio.codigoPatrimonio, ...this.form.value};
      this.patrimonio.situacaoEquipamento = +this.form.controls.situacaoEquipamento.value;

      this.patrimonioService[this.estadoSalvar](this.patrimonio).subscribe(
        () => this.toaster.success('Patrimônio cadastrado com sucesso', 'Sucesso!'),
        (error: any) => {
          debugger;
          let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
          this.toaster[template.tipoMensagem](`Houve um erro durante o cadastro do patrimônio. Mensagem: ${template.mensagemErro}`, 'Erro!');
        },
        () => {
          setTimeout(() => {
            this.router.navigate(['dashboard/listarPatrimonio'])
          }, 1700)
        }
      ).add(() => this.spinner.hide());
    }


  ngOnInit(): void {
    this.validarCamposPatrimonio();
    this.validarCamposInformacaoAdicional();
    this.obterFuncionarios();
    this.obterEquipamentos();
  }

  private obterEquipamentos(): void {
    this.equipamento.obterTodosEquipamentos().subscribe(
      (result: Equipamento[]) =>{
        debugger;
        this.equipamentos = result;
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao carregar os equipamentos. Mensagem: ${template.mensagemErro}`, 'Erro!');
      },
      () =>{}

    );
  }

  private obterFuncionarios(): void{

    this.funcionario.obterTodosFuncionarios().subscribe(
      (result: Funcionario[]) =>{
        this.funcionarios = result;
      },
      (error: any) =>{
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um problema ao carregar os funcionários. Mensagem: ${template.mensagemErro}`, 'Erro!');
      }
    );
  }

  private validarCamposPatrimonio(): void {
    this.form = this.fb.group<Patrimonio>({
      codigoPatrimonio: new FormControl(this.limpandoCampo? this.form.get('codigoPatrimonio').value : 0, []),
      codigoTipoEquipamento: new FormControl('', [Validators.required]),
      tipoEquipamento: new FormControl(''),
      codigoFuncionario: new FormControl('', [Validators.required]),
      nomeFuncionario: new FormControl(''),
      codigoUsuario: new FormControl(this.token.obterCodigoUsuarioToken()),
      nomeUsuario: new FormControl(this.token.obterNomeUsuarioToken()),
      armazenamento: new FormControl(''),
      ip: new FormControl(''),
      mac: new FormControl(''),
      memoriaRam: new FormControl(''),
      modelo: new FormControl(''),
      placaVideo: new FormControl(''),
      processador: new FormControl(''),
      serviceTag: new FormControl(''),
      situacaoEquipamento: new FormControl(+SituacaoEquipamento.Disponível)

    });
  }

  private validarCamposInformacaoAdicional(): void{
    this.formAdicional = this.fb.group<InformacaoAdicional>({
      codigoInformacaoAdicional: new FormControl(this.limpandoCampo? this.form.get('codigoInformacaoAdicional').value : '', []),
      versaoWindows: new FormControl(),
      antivirus: new FormControl(),
      dataCompra: new FormControl(),
      dataExpiracaoGarantia: new FormControl(),
      valorPago: new FormControl('', [Validators.required]),
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public cssValidatorCampoSelecao(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors};
  }


}
