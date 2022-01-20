import { Component, OnInit } from '@angular/core';


@Component({
  templateUrl: 'widgets.component.html',
  styleUrls: ['widgets.component.scss']
})
export class WidgetsComponent implements OnInit {
  ngOnInit(): void {
  }


  // lineChart
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], backgroundColor: ['#20A8D8'], label: 'Meses'},

  ];
  public lineChartLabels: Array<any> = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
  public lineChartOptions: any = {
    animation: true,
    responsive: true
  };


  public lineChartLegend = true;
  public lineChartType = 'line';






}
