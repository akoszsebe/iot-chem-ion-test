import {Component, OnInit, ViewChild} from '@angular/core';
import {UIChart} from 'primeng/components/chart/chart';
import {TempService} from '../../services/temp/temp.service';

import {IonService} from '../../services/ion/ion.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})


export class ReportsComponent implements OnInit {

  @ViewChild('tempchart') tempChart: UIChart;
  @ViewChild('ionchart') ionChart: UIChart;

  tempMinDate: Date;
  tempMaxDate: Date;
  tempStartDate: Date;
  tempEndDate: Date;

  ionMinDate: Date;
  ionMaxDate: Date;
  ionStartDate: Date;
  ionEndDate: Date;


  tempChartData: any;
  ionChartData: any;


  constructor(private tempService: TempService,
              private ionService: IonService,
              private snackBar: MatSnackBar) {
    this.tempChartData = {
      datasets: [
        {
          label: 'Measured temperatures',
          fill: true,
          borderColor: '#4bc0c0'
        }]
    };

    this.ionChartData = {
      datasets: [
        {
          label: 'Measured ion values',
          fill: true,
          borderColor: '#4bc0c0'
        }]
    };
  }


  loadTempInInterval(tempChart: UIChart) {
    if (this.tempStartDate == null || this.tempEndDate == null) {
      return;
    }
    const me = this;
    const newData: number[] = [];
    const newLabels: string[] = [];
    this.tempService.getTempsInInterval(this.tempStartDate.getTime(), this.tempEndDate.getTime())
      .subscribe(tempDOs => {
          if (tempDOs.length === 0) {
            this.snackBar.open('No records in that period', null, {duration: 2000});
          } else {
            tempDOs.forEach(function (item) {
              newData.push(item.tempvalue);
              const date = new Date();
              date.setTime(item.tempdate);
              newLabels.push(date.toLocaleString());
            });
            me.tempChartData.datasets[0].data = newData;
            me.tempChartData.labels = newLabels;
            me.tempChart.refresh();
          }
        },
        error => {
          console.log(error);
        });
  };

  exportTempsInInterval() {
    this.tempService.exportTempsInInterval(this.tempStartDate.getTime(), this.tempEndDate.getTime());
  }

  exportIonsInInterval() {
    this.ionService.exportIonsInInterval(this.ionStartDate.getTime(), this.ionEndDate.getTime());
  }

  loadIonsInInterval(ionChart: UIChart) {
    if (this.ionStartDate == null || this.ionEndDate == null) {
      return;
    }
    const me = this;
    const newData: number[] = [];
    const newLabels: string[] = [];
    this.ionService.getIonsInInterval(this.ionStartDate.getTime(), this.ionEndDate.getTime())
      .subscribe(ionDOs => {
          if (ionDOs.length === 0) {
            this.snackBar.open('No records in that period', null, {duration: 2000});
          } else {
            ionDOs.forEach(function (item) {
              newData.push(item.ionvalue);
              const date = new Date();
              date.setTime(item.iondate);
              newLabels.push(date.toLocaleString());
            });
            me.ionChartData.datasets[0].data = newData;
            me.ionChartData.labels = newLabels;
            me.ionChart.refresh();
          }
        },
        error => {
          console.log(error);
        });
  }


  ngOnInit() {
    this.tempService.getOldestReadDates().subscribe(dates => {
      this.tempMinDate = new Date();
      this.tempMinDate.setTime(dates.temp);
      this.tempMaxDate = new Date();
      this.ionMinDate = new Date();
      this.ionMinDate.setTime(dates.ion);
      this.ionMaxDate = new Date();
    });

    this.tempEndDate = new Date();
    this.tempStartDate = new Date();
    this.tempStartDate.setDate((new Date()).getDate() - 1);
    this.ionEndDate = new Date();
    this.ionStartDate = new Date();
    this.ionStartDate.setDate((new Date()).getDate() - 1);
  }

}
