import { Component } from '@angular/core';
import { ConductanceService } from './conductance.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTitleSubtitle,
  ChartType
} from 'ng-apexcharts';


@Component({
  selector: 'app-conductance',
   standalone: false,
  templateUrl: './conductance.component.html',
  styleUrls: ['./conductance.component.css'],
})


export class ConductanceComponent {
  voltage: string = '';
  current: string = '';
  result: any = null;

 chartSeries: ApexAxisChartSeries = [
    {
      name: 'Conductance',
      data: []
    }
  ];

  chartOptions = {
    chart: {
      type: 'line',
      height: 350
    } as ApexChart,
    stroke: {
      curve: 'smooth'
    } as ApexStroke,
    title: {
      text: 'Conductance vs Voltage'
    } as ApexTitleSubtitle,
    xaxis: {
      categories: []
    } as ApexXAxis,
    yaxis: {
      title: {
        text: 'Conductance (S)'
      }
    } as ApexYAxis
  };


   constructor(private conductanceService: ConductanceService) {}

  onSubmit(): void {
    const voltageArray = this.voltage.split(',').map(Number);
    const currentArray = this.current.split(',').map(Number);

    this.conductanceService.calculateConductance({
      voltage: voltageArray,
      current: currentArray
    }).subscribe({
      next: res => {
        this.result = res;
console.log('Conductance points:', res.conductance_Siemens);

      this.chartSeries[0].data = res.conductance_Siemens.map((point: any) => point.value);
      this.chartOptions.xaxis.categories = res.conductance_Siemens.map((point: any) => point.voltage);

      },
      error: err => console.error('API error:', err)
    });
  }
}