import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataPoint } from './model/dataPoint';
import { DataService } from './service/dataService';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) { }

  private data: number[][];

  ngOnInit(){
    this.loadData();
    Highcharts.chart('container', this.options);
  }

  loadData() {
    this.dataService.getData().subscribe(
      (dataPoints: DataPoint[]) => {
        this.data = this.converter(dataPoints);
        this.options.series[0]['data'] = this.data;
      })
  }

  converter(dataPoints: DataPoint[]) : number[][] {
    var values = [];
    for (var i = 0; i < dataPoints.length; i++) {
      var item = [];
      item.push(dataPoints[i].value);
      item.push(dataPoints[i].time.getTime());
      values.push(item);
    } 
    return values;
  }

  public options: any = {
    chart: {
      type: 'scatter',
      height: 700
    },
    title: {
      text: 'Sample Price Chart'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) + ' y: ' + this.y.toFixed(2);
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
    series: [
      {
        name: 'Prices',
        turboThreshold: 500000
      }
    ]
  }
}
