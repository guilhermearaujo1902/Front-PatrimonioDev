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
  public mediaEquipamento: number;

  public lineChartData: Array<any> = [ { data: 0, backgroundColor: ['#20A8D8'], label: 'Categorias' }];
  public lineChartLabels: Array<any> = [[' ']];
  public lineChartOptions: any;
  public lineChartLegend = true;
  public lineChartType = 'line';
  public quantidadeDeEquipamentos: number = 0;
  public quantidadeTotalDePatrimonios: number = 0;
  public quantidadeTotalDePatrimoniosDisponiveis: number = 0;

  constructor(private estatisticaService: EstatisticaService,
              private toaster: ToastrService,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.obterEstatisticas();
  }

  private obterEstatisticas(): void {

    this.spinner.show('graficoLinha');

    this.estatisticaService.obterEstatisticas().subscribe(listaDeResposta =>{
        this.estatisticaCategoria = listaDeResposta[0];
        this.construirGraficoQuantidadeEquipamentosCategoria();

        this.mediaEquipamento = +(listaDeResposta[1][0].quantidadeTotalDeEquipamento / listaDeResposta[1][0].quantidadeTotalFuncionario).toFixed(2);

        if(isNaN(this.mediaEquipamento)){
          this.mediaEquipamento = 0
        }
        debugger;
        this.quantidadeTotalDePatrimonios = listaDeResposta[2][0].quantidadeTotalPatrimonio;
        this.quantidadeTotalDePatrimoniosDisponiveis = listaDeResposta[2][0].quantidadePatrimonioDisponivel;
        this.alterarProgessBar();
     },

      (error: any) => {
        let template = MensagemRequisicao.retornarMensagemTratada(error.message, error.error.mensagem);
        this.toaster[template.tipoMensagem](`Houve um erro ao carregar as informações do Dashboard. Mensagem: ${template.mensagemErro}`, template.titulo);
      }
    ).add(()=> this.spinner.hide('graficoLinha'));
  }

  private alterarProgessBar(): void{
    const demoId = document.querySelector('.progress-bar');
    demoId.setAttribute('style', `width: ${(this.quantidadeTotalDePatrimoniosDisponiveis*100)/this.quantidadeTotalDePatrimonios}%`)
  }

  private construirGraficoQuantidadeEquipamentosCategoria(): void {

    const quantidadeEquipamento = this.estatisticaCategoria.map((valorAtual) => {
      return valorAtual.quantidadeEquipamento;
    });

    this.calcularQuantidadeDeEquipamentos(quantidadeEquipamento)

    this.lineChartData = [ { data: quantidadeEquipamento,
                             backgroundColor: ['#20A8D8'],
                             label: 'Quantidade' }];

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
