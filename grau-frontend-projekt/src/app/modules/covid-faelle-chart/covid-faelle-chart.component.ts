import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';

@Component({
  selector: 'covid-faelle-chart',
  templateUrl: './covid-faelle-chart.component.html',
  styleUrls: ['./covid-faelle-chart.component.scss']
})
export class CovidFaelleChartComponent implements OnInit {

  @Input() theme: string | ThemeOption;

  constructor() { 
    this.theme = ''
  }

  ngOnInit(): void {
  }

  options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  }
}
