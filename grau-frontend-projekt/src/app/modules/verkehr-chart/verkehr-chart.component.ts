import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { Traffic } from 'src/app/models/traffic';
import { LocalDataService } from 'src/app/services/local-data/local-data.service';

@Component({
  selector: 'verkehr-chart',
  templateUrl: './verkehr-chart.component.html',
  styleUrls: ['./verkehr-chart.component.scss']
})
export class VerkehrChartComponent implements OnInit {

  @Input() theme: string | ThemeOption;

  timestamps: string[] = []
  pkw: number[] = []
  lkw: number[] = []
  motorrad: number[] = []
  kleintransporter: number[] = []
  mavi: Traffic = this.localDataService.getMavi1()

  timestampsHead = ['days']
  pkwHead: (string | number)[] = ["pkw"]
  lkwHead: (string | number)[] = ["lkw"]
  motorradHead: (string | number)[] = ["motorrad"]
  kleintransporterHead: (string | number)[] = ["kleintransporter"]

  constructor(private localDataService: LocalDataService) {
    this.theme = ''
   }

  ngOnInit(): void {
    this.processingData()
  }

  options: EChartsOption = {
    title: {
      text: 'Verkehr Pro Tag'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['pkw', 'lkw', 'motorrad', 'kleintransporter']
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    grid: {
      containLabel: true,
      top: '50%',
      left: '5%'
    },
    dataZoom: [
      {
        show: true,
        start: 0,
        end: 100
      },
    ],
    dataset: {
      source: [
        this.timestampsHead,
        this.lkwHead,
        this.motorradHead,
        this.kleintransporterHead,
        this.pkwHead,
      ]
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: this.timestamps
      }
    ],
    yAxis: [
      {
        type: 'value',
      }
    ],
    series: [
      {
        name: 'lkw',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: this.lkw
      },
      {
        name: 'motorrad',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: this.motorrad
      },
      {
        name: 'kleintransporter',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: this.kleintransporter
      },
      {
        name: 'pkw',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: this.pkw
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@days} ({d}%)'
        },
        encode: {
          itemName: 'days',
          value: '16-6-2021',
          tooltip: '16-6-2021'
        }
      }
    ]
  };

  //Veränderung des Pie Charts
  onChartReady(myChart: any) {
    myChart.on('updateAxisPointer', function (event: any) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });
    myChart.setOption(this.options);
  }

  processingData() {
    let mavi1: Traffic = this.mavi
    let timestampKeys = Object.keys(mavi1.timestamps)
    let timestampData = mavi1.timestamps
    let pkwData = mavi1.PKW
    let lkwData = mavi1.LKW
    let motorradData = mavi1.Motorrad
    let kleintransporterData = mavi1.Kleintransporter

    let date = new Date(timestampData[timestampKeys[0]])

    let str: string = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`

    let pkwCounter = 0
    let lkwCounter = 0
    let motorradCounter = 0
    let kleinTransporterCounter = 0
    for (let counter = 0; counter < timestampKeys.length; counter++) {

      date = new Date(timestampData[timestampKeys[counter]])

      if (counter == 0) {
        this.timestamps.push(str)
        this.timestampsHead.push(str)
        str = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`
      } else if (str != `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`) {
        str = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`

        this.timestamps.push(str)
        this.timestampsHead.push(str)

        this.pkw.push(pkwCounter)
        this.lkw.push(lkwCounter)
        this.kleintransporter.push(motorradCounter)
        this.motorrad.push(kleinTransporterCounter)


        this.pkwHead.push(pkwCounter)
        this.lkwHead.push(lkwCounter)
        this.motorradHead.push(motorradCounter)
        this.kleintransporterHead.push(kleinTransporterCounter)

        pkwCounter = 0
        lkwCounter = 0
        motorradCounter = 0
        kleinTransporterCounter = 0
      }
      pkwCounter += pkwData[`${counter}`]
      lkwCounter += lkwData[`${counter}`]
      motorradCounter += motorradData[`${counter}`]
      kleinTransporterCounter += kleintransporterData[`${counter}`]
    }

    this.pkw.push(pkwCounter)
    this.lkw.push(lkwCounter)
    this.kleintransporter.push(motorradCounter)
    this.motorrad.push(kleinTransporterCounter)

    this.pkwHead.push(pkwCounter)
    this.lkwHead.push(lkwCounter)
    this.motorradHead.push(motorradCounter)
    this.kleintransporterHead.push(kleinTransporterCounter)
  }

}
