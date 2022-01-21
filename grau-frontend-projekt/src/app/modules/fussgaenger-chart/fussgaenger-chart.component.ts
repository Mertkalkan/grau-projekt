import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption, util } from 'echarts/types/dist/echarts';
import { ThemeOption } from 'ngx-echarts';
import { LocalDataService } from 'src/app/services/local-data/local-data.service';

@Component({
  selector: 'fussgaenger-chart',
  templateUrl: './fussgaenger-chart.component.html',
  styleUrls: ['./fussgaenger-chart.component.scss']
})
export class FussgaengerChartComponent implements OnInit {

  @Input() theme: string | ThemeOption;

  plankenData: { date: string[], count: number[] } = {
    date: [],
    count: []
  }

  weeklyPredestrians: number[] = [];

  constructor(private localDataService: LocalDataService) { 
    this.theme = ''
  }
  ngOnInit(): void {
    this.processingPedestriansAndDate()
    this.weeklyPedestrians()
  }

  options: EChartsOption = {
    title: {
      text: 'Passantenanzahl',
      subtext: 'Pro Tag bei Planken Mitte',
      left: '5%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      orient: 'vertical',
      right: '0%',
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        dataZoom: {
          yAxisIndex: 'none'
        },
        // brush: {
        //   type: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
        // },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['Pedestrians', 'Pedestrians average per week']
    },
    xAxis: [
      {
        type: 'category',
        data: this.plankenData.date,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: {},
    series: [
      {
        name: 'Pedestrians',
        type: 'bar',
        data: this.plankenData.count,
      },
      {
        name: 'Pedestrians average per week',
        type: 'line',
        data: this.weeklyPredestrians
      }
    ],
    dataZoom: [
      {
        type: 'slider'
      },
      {
        type: 'inside'
      }
    ],
    grid: {
      containLabel: true,
      left: '5%'

    }
  };

  processingPedestriansAndDate() {
    let data = this.localDataService.getPlankenMitteData()
    let date = new Date(data[0]["time of measurement"])
    let str: string = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`
    let count = 0

    for (let counter = 0; counter < data.length; counter++) {
      date = new Date(data[counter]["time of measurement"])

      if (counter == 0) {
        this.plankenData.date.push(str)
        str = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`
      } else if (str != `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`) {
        str = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`
        this.plankenData.count.push(count)
        this.plankenData.date.push(str)
        count = 0
      }
      count += parseFloat(data[counter]["pedestrians count"])
    }
    this.plankenData.count.push(count)
  }

  weeklyPedestrians() {
    let count = 0
    let data = this.plankenData.count
    let sevenDayCounter = 0
    for (let counter = 0; counter <= data.length; counter++) {
      if (sevenDayCounter == 7) {
        for (let j = 0; j < 7; j++) {
          this.weeklyPredestrians.push(Math.floor(count / 7))
        }
        count = 0;
        sevenDayCounter = 0;
      }
      sevenDayCounter++;
      count += data[counter]
    }

  }
}
