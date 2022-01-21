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
      text: '7-Tage-Inzidenz',
      // subtext: 'Pro Tag',
      left: '5%',
    },
    tooltip: {
      trigger: 'axis'
    },
    brush: {
      toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
      xAxisIndex: 0
    },
    toolbox: {
      orient: 'vertical',
      right: '0%',
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        dataZoom: {
          yAxisIndex: 'none'
        },
        brush: {
          type: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
        },
        restore: { show: true },
        saveAsImage: { show: true },
       
      }
    },
    legend: {
      data: ['Deutschland', 'Baden-Württemberg'],
      bottom: 0,
    },
    grid: {
      containLabel: true,
      top: '20%',
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
          data: [
            // [
            //   {

            //     name: 'Corona-Warn-App \ngestartet',
            //     xAxis: '15-6-2020'
            //   },
            //   {
            //     xAxis: '17-6-2020'
            //   }
            // ],
            // [
            //   {
            //     name: 'Testpflicht \nEinreisende aus Risikogebieten \nin Kraft getreten',
            //     xAxis: '7-8-2020'
            //   },
            //   {
            //     xAxis: '9-8-2020'
            //   }
            // ],
            // [
            //   {
            //     name: 'In öffentlichen Räumen \nMax 50 Personen bei 7 Tagen 35 Neuinfektionen pro 100.000 Einwohner \nAb 50 Neuinfektionen pro 100.000 Einwohner bei 7 Tagen max. 25 Personen ',
            //     xAxis: '28-9-2020'
            //   },
            //   {
            //     xAxis: '30-9-2020'
            //   }
            // ],
          ],
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
        // show: false,
        type: 'slider',
        top: '80%',
        height: 20,
      },
      {
        type: 'inside',
      }
    ]
  }

  onChartReady(myChart: any) {
    myChart.on('brushSelected', function (params: any) {
      var brushed = [];
      var brushComponent = params.batch[0];
    
      for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
        var rawIndices = brushComponent.selected[sIdx].dataIndex;
        brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
      }
    
      myChart.setOption({
        title: {
          backgroundColor: '#333',
          text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
          bottom: 0,
          right: '5%',
          width: 100,
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        }
      });
    });
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
