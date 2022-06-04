import { Component, OnInit, ViewChild} from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart, ChartComponent
} from "ng-apexcharts";
import {DashboardService} from "../../../common/service/dashboard.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries|any;
  chart: ApexChart|any;
  labels: string[]|any;
  plotOptions: ApexPlotOptions|any;
};




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  @ViewChild("chart", { static: false }) chart!: ChartComponent;
   chartOptions!: Partial<ChartOptions>;
  day3Count: number=0;
  day7Count: number=0;
  dailyStock: number=0;
  dailyIncome: number=0;

  constructor(private dashboardService:DashboardService) {
    this.chartOptions = {
      series: [0],
      chart: {
        height: 350,
        width:350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%"
          }
        }
      },
      labels: ["Free Space"]
    };
  }

  ngOnInit(): void {

       this.dashboardService.getData().subscribe(res=>{
         this.day3Count=res?.data?.day3Count;
         this.day7Count=res?.data?.day7Count;
         this.dailyStock=res?.data?.dailyStock;
         this.dailyIncome=res?.data?.dailyIncome;
         this.chartOptions = {
           series: [<number>res?.data?.available],
           chart: {
             height: 350,
             width:350,
             type: "radialBar"
           },
           plotOptions: {
             radialBar: {
               hollow: {
                 size: "70%"
               }
             }
           },
           labels: ["Free Space"]
         };
       })
    }


}
