import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { LocalDataService } from 'src/app/services/local-data/local-data.service';

@Component({
  selector: 'covid-faelle-chart',
  templateUrl: './covid-faelle-chart.component.html',
  styleUrls: ['./covid-faelle-chart.component.scss']
})
export class CovidFaelleChartComponent implements OnInit {

  @Input() theme: string | ThemeOption;

  gesamt: number[] = []
  bw: number[] = []
  timestampes: string[] = []

  constructor(private localeDataService: LocalDataService) {
    this.theme = ''
  }

  ngOnInit(): void {
    this.test()
  }

  options: EChartsOption = {
    title: {
      text: 'Durchschnittliche Infektionszahl',
      subtext: 'Pro Tag',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Deutschland', 'Baden-Württemberg']
    },
    grid: {
      containLabel: true,
      top: '10%',
      left: '5%'
    },
    xAxis: {
      type: 'category',
      data: this.timestampes
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Deutschland',
        data: this.gesamt,
        type: 'line',
        smooth: true,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markArea: {
          itemStyle: {
            color: 'rgba(100, 149, 237, 0.4)'
          },
          // data: [
          //   [
          //     {
          //       name: 'Corona-Warn-App \n gestartet',
          //       xAxis: '15-6-2020'
          //     },
          //     {
          //       xAxis: '17-6-2020'
          //     }
          //   ],
          //   [
          //     {
          //       name: 'Testpflicht \n Einreisende aus Risikogebieten \n in Kraft getreten',
          //       xAxis: '7-8-2020'
          //     },
          //     {
          //       xAxis: '9-8-2020'
          //     }
          //   ],
          //   [
          //     {
          //       name: 'In öffentlichen Räumen \n Max 50 Personen bei 7 Tagen 35 Neuinfektionen pro 100.000 Einwohner \n Ab 50 Neuinfektionen pro 100.000 Einwohner bei 7 Tagen max. 25 Personen ',
          //       xAxis: '28-9-2020'
          //     },
          //     {
          //       xAxis: '30-9-2020'
          //     }
          //   ],
          // ]
        },
      },
      {
        name: 'Baden-Württemberg',
        data: this.bw,
        type: 'line',
        smooth: true,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        }
      }
    ],
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100
      },
    ]
  }

  test() {

    let data = this.localeDataService.getCovidFälle()
    let str: string = ''
    let date: Date = new Date()
    for (let dataset of data) {

      // this.gesamt.push(
      //   parseFloat(dataset['Baden-Württemberg'])
      //   + parseFloat(dataset['Bayern'])
      //   + parseFloat(dataset['Berlin'])
      //   + parseFloat(dataset['Brandenburg'])
      //   + parseFloat(dataset['Bremen'])
      //   + parseFloat(dataset['Hamburg'])
      //   + parseFloat(dataset['Hessen'])
      //   + parseFloat(dataset['Mecklenburg-Vorpommern'])
      //   + parseFloat(dataset['Niedersachsen'])
      //   + parseFloat(dataset['Nordrhein-Westfalen'])
      //   + parseFloat(dataset['Rheinland-Pfalz'])
      //   + parseFloat(dataset['Saarland'])
      //   + parseFloat(dataset['Sachsen'])
      //   + parseFloat(dataset['Sachsen-Anhalt'])
      //   + parseFloat(dataset['Schleswig-Holstein'])
      //   + parseFloat(dataset['Thüringen']))
      this.gesamt.push(parseFloat(dataset.Gesamt))
      this.bw.push(parseFloat(dataset['Baden-Württemberg']))
      date = new Date(dataset.Date)
      str = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`
      this.timestampes.push(str)

    }
    console.log(this.timestampes)
  }


}
