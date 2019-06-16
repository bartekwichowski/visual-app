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

  Highcharts = Highcharts;

  constructor(private dataService: DataService) { }

  getInstance(chart): void {
    this.chart = chart;
 }

  private data: number[][];

  private chart;

  ngOnInit(){
    this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe(
      (dataPoints: DataPoint[]) => {
        this.data = this.converter(dataPoints);
        this.chart.series[0].update({
          data: this.data
        }, true); 
      })
  }

  converter(dataPoints: DataPoint[]) : number[][] {
    var values = [];
    for (var i = 0; i < dataPoints.length; i++) {
      var item = [];

      item.push(new Date(dataPoints[i]['time']).getTime());
      item.push(dataPoints[i]['value']);
      values.push(item);
    } 
    return values;
  }

  public chartOptions: any = {
    title: {
      text: 'Stock prices'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) + ' y: ' + this.y;
      }
    },
    xAxis: {
      type: 'string',
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%e %b %y', this.value);
        }
      }
    },
    series: [
      {
        name: 'Prices',
        data: []
      }
    ]
  }
}
