import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Case } from './interfaces/case';
import { CaseRegion } from './interfaces/CaseRegion';
import { CovidApiService } from './services/covid-api.service';

import { Chart } from "chart.js";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  total: Case;
  daily: Case[];
  regions: CaseRegion[];

  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;
  private doughnutChart: Chart;

  constructor(private covidService: CovidApiService) { }

  ngOnInit() {

    this.covidService.getDaily().subscribe(x => {
      this.daily = x;
      console.log(x);
    })

    this.covidService.getTotal().subscribe(x => {
      this.total = x;
      console.log(x);
    })

    this.covidService.getRegionTotal().subscribe(x => {
      this.regions = x;
      this.loadRegionsPie();
    })
  }

  loadRegionsPie(): void {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "pie",
      data: {
        labels: this.regions.map(item => item.region),                
        datasets: [
          {            
            data: this.regions.map(item => item.totalCases),

          }
        ]
      }
    });

    // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    //   type: "doughnut",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)"
    //         ],
    //         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
    //       }
    //     ]
    //   }
    // });
  }

}
