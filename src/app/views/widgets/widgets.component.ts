import { Component, OnInit } from '@angular/core';
import { EstatisticaService } from '../../services/estatistica/estatistica.service';
import { Estatisticas } from '../../models/Estatistica';
import { MensagemRequisicao } from '../../helpers/MensagemRequisicao';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  templateUrl: 'widgets.component.html',
  styleUrls: ['widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  private estatisticaCategoria: Estatisticas[] = [];

  public lineChartData: Array<any> = [ { data: 0, backgroundColor: ['#20A8D8'], label: 'Categorias' }];
  public lineChartLabels: Array<any> = [[' ']];
  public lineChartOptions: any;
  public lineChartLegend = true;
  public lineChartType = 'line';
  public quantidadeDeEquipamentos: number = 0;

  constructor(private estatisticaService: EstatisticaService,
              private toaster: ToastrService,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.obterEstatisticaCategoria()
  }

  private obterEstatisticaCategoria(): void {

    this.spinner.show('graficoLinha');

    this.estatisticaService.obterEstatisticasCategoria().subscribe(
      (result: Estatisticas[]) => {
        this.estatisticaCategoria = result;
        this.construirGraficoQuantidadeEquipamentosCategoria();
      },
      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao carregar as informações do Dashboard. Mensagem: ${template.mensagemErro}`, template.titulo);
      }
    ).add(()=> this.spinner.hide('graficoLinha'));
  }

  private construirGraficoQuantidadeEquipamentosCategoria(): void {

    const quantidadeEquipamento = this.estatisticaCategoria.map((valorAtual) => {
      return valorAtual.quantidadeEquipamento;
    });

    this.calcularQuantidadeDeEquipamentos(quantidadeEquipamento)

    this.lineChartData = [ { data: quantidadeEquipamento,
                             backgroundColor: ['#20A8D8'],
                             label: 'Categorias' }];

    this.lineChartLabels = this.estatisticaCategoria.map((valorAtual) => {
      return valorAtual.nomeCategoria;
    });

    this.lineChartOptions = {
      animation: true,
      responsive: true,
    };

  }

  private calcularQuantidadeDeEquipamentos(quantidadeEquipamento: number[]) {
    for(let i = 0; i < quantidadeEquipamento.length; i++){
      this.quantidadeDeEquipamentos += +quantidadeEquipamento[i];
    }
  }
}
