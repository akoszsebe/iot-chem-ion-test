import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from 'primeng/primeng';
import {JobDateDO} from '../../models/job-date';
import {TemperatureDO} from '../../models/temperature';

import {IonDO} from '../../models/ion';
import {JobDO} from '../../models/job';
import {ConductivityDO} from '../../models/conductivity';

import {TempService} from '../../services/temp/temp.service';
import {JobService} from '../../services/job/job.service';
import {DialogService} from '../../services/dialog/dialog.service';
import {DeviceService} from '../../services/device/device.service';
import {IonService} from '../../services/ion/ion.service';
import {ConductivityService} from '../../services/conductivity/conductivity.service';


@Component({
  selector: 'app-root',
  templateUrl: 'experiment.component.html',
  styleUrls: ['experiment.component.css']
})
export class ExperimentComponent implements OnInit, OnDestroy {

  progressBarTimer: any;
  countdownDate: Date;
  optionsTempGauge = ExperimentComponent.createTempGauge(50);
  optionsIONGauge = ExperimentComponent.createIonGauge(50);
  optionsCondGauge = ExperimentComponent.createCondGauge(50000);

  maxTemp = 100;
  maxIon = 100;
  maxCond = 100000;

  currentJob = new JobDateDO(new Date(), new Date(), '', 0, 0, 0, 0, 0, 0, '0', '0');


  syncLabel: string;
  toggleChecked: boolean;
  deviceConnected: boolean;


  tempTimer: any;
  ionTimer: any;
  conductivityTimer: any;

  temp = new TemperatureDO('', '', 0, 0);
  ion = new IonDO('', '', 0, 0);
  conductivity = new ConductivityDO('', '', 0, 0);

  progressBarValue: number;

  connection1;
  connection3;
  idConnection;
  rpi;
  selectedRpi = -1;
  isHeaterOn = false;

  showRPi = false;

  msg: Message[] = [];

  text: any = {
    'Weeks': 'w',
    'Days': 'd', 'Hours': 'h',
    'Minutes': 'm', 'Seconds': 's',
    'MilliSeconds': 'ms'
  };

  static createTempGauge(targetValue: number) {
    return {
      id: 'tempGauge',
      label: 'Temperature',
      symbol: '°C',
      min: 0,
      max: 100,
      decimals: 2,
      gaugeWidthScale: 0.6,
      customSectors: [{
        color: '#ff0000', lo: 0, hi: targetValue - 3
      }, {
        color: '#ffd50e', lo: targetValue - 3, hi: targetValue - 1
      }, {
        color: '#00ff00', lo: targetValue - 1, hi: targetValue + 1
      }, {
        color: '#ffd50e', lo: targetValue + 1, hi: targetValue + 3
      }, {
        color: '#ff0000', lo: targetValue + 3, hi: 100
      }],
      counter: true
    };
  }

  static createCondGauge(targetValue: number) {
    return {
      id: 'condGauge',
      label: 'Conductivity',
      symbol: 'μS',
      min: 0,
      max: 100000,
      decimals: 0,
      gaugeWidthScale: 0.6,
      customSectors: [{
        color: '#ff0000', lo: 0, hi: targetValue - 3
      }, {
        color: '#ffd50e', lo: targetValue - 3, hi: targetValue - 1
      }, {
        color: '#00ff00', lo: targetValue - 1, hi: targetValue + 1
      }, {
        color: '#ffd50e', lo: targetValue + 1, hi: targetValue + 3
      }, {
        color: '#ff0000', lo: targetValue + 3, hi: 100
      }],
      counter: true
    };
  }


  static createIonGauge(targetValue: number) {
        return{
            id : 'ionGauge',
            label: 'Ion Concentration',
            symbol: '%',
            min: 0,
            max: 100,
            decimals: 2,
            gaugeWidthScale: 0.6,
            customSectors: [{
                color: '#ff0000', lo: 0, hi: targetValue - 3
            }, {
                color: '#ffd50e', lo: targetValue - 3, hi: targetValue - 1
            }, {
                color: '#00ff00', lo: targetValue - 1, hi: targetValue + 1
            }, {
                color: '#ffd50e', lo: targetValue + 1, hi: targetValue + 3
            }, {
                color: '#ff0000', lo: targetValue + 3, hi: 100
            }],
            counter: true
        };
    }

  static setupJob(job: JobDO, currentJob: JobDateDO) {
    const date1 = new Date();
    date1.setTime(job.jobStartDate);
    currentJob.jobStartDate = date1;
    const date2 = new Date();
    date2.setTime(job.jobEndDate);
    currentJob.jobEndDate = date2; // currentjob = job, aztan enddate valtoztat?
    currentJob.jobDescription = job.jobDescription;
    currentJob.heaterValue = job.heaterValue;
    currentJob.tempReadInt = job.tempReadInt;
    currentJob.ionValue = job.ionValue;
    currentJob.ionReadInt = job.ionReadInt;
    currentJob.conductivityValue = job.conductivityValue;
    currentJob.conductivityReadInt = job.conductivityReadInt;
    currentJob.usedInterpolation = job.usedInterpolation;
    currentJob.usedValuePairs = job.usedValuePairs
  }

  constructor(private tempService: TempService,
              private ionService: IonService,
              private conductivityService: ConductivityService,
              private jobService: JobService,
              private dialogService: DialogService,
              private deviceService: DeviceService) {
  }

  ngOnDestroy(): void {
    clearInterval(this.tempTimer);
    clearInterval(this.progressBarTimer);
    clearInterval(this.ionTimer);
    this.connection1.unsubscribe();
    this.connection3.unsubscribe();
    // this.connection4.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.rpi);
    this.connection1 = this.tempService.getHeaterStatus().subscribe(response => {
      response ? console.log('Heater turned on') : console.log('Heater turned off');
      this.isHeaterOn = response;
    });
    this.connection3 = this.deviceService.getDeviceStatusChanges().subscribe(response => {
      this.msg = [];
      this.toggleChecked = response;
      this.toggleSync();
      this.deviceConnected = response; // deviceconnected atirni!
      response ? this.msg = [{severity: 'success', summary: 'Device', detail: 'Pi connected'}]
        :
        this.msg = [{severity: 'error', summary: 'Device', detail: 'Pi disconnected'}];
    });


    this.jobService.getJob()
      .subscribe(job => {
        ExperimentComponent.setupJob(job, this.currentJob);
        this.optionsTempGauge = ExperimentComponent.createTempGauge(this.currentJob.heaterValue);
        this.optionsIONGauge = ExperimentComponent.createIonGauge(this.currentJob.ionValue);
        if (this.currentJob.jobEndDate < (new Date())) {
          this.countdownDate = null;
        } else {
          this.countdownDate = this.currentJob.jobEndDate;
        }
        this.calculateProgBarValue();
        this.progressBarTimer = setInterval(() => {
          this.calculateProgBarValue();
          console.log('progressbar updated');
        }, 10000);
        this.startSync();
      });
  }

  showConnectedDevices() {
      this.showRPi = !this.showRPi;
  }

  selectRPi(piId) {
    this.selectedRpi = piId;
    this.showRPi = !this.showRPi;
  }

  toggleSync() {
    console.log(this.toggleChecked);
    if (this.toggleChecked) {
      this.syncLabel = 'Sync is on';
    } else {
      this.syncLabel = 'Sync is off';
    }
  }

  startSync() {
    this.getTemp();
    this.getIon();
    this.getConductivity();
  }


  getTemp() {
    this.tempTimer = setInterval(() => {
      if (!this.toggleChecked || !this.countdownDate) {
        return;
      }
      this.tempService.getTemp()
        .subscribe(temp => {
          this.temp = temp;
          console.log(temp);
          },
          error => {
            console.log(error);
          });
    }, this.currentJob.tempReadInt * 1000);
  }

    getIon() {
        // setInterval -> Same as setTimeout(), but repeats the execution of the function continuously.
        this.ionTimer = setInterval(() => {
            if (!this.toggleChecked || !this.countdownDate) {
                return; // countdowndate null ha vege a kiserletnek. togglechecked-syncrol szol:
            }
            this.ionService.getIon()
                .subscribe(ion => {
                        this.ion = ion;
                        console.log(ion);
                    },
                    error => {
                        console.log(error);
                    });
        }, this.currentJob.ionReadInt * 1000);
    }

    getConductivity() {
        this.conductivityTimer = setInterval(() => {
          if (!this.toggleChecked || !this.countdownDate) {
              return;
          }
          this.conductivityService.getConductivityValue()
              .subscribe(conductivity => {
                      this.conductivity = conductivity;
                      console.log(conductivity)
                  },
                  error => {
                      console.log(error);
                  });
      }, 1000);
    }

    openTempSettings() {

    this.dialogService.openSettings(this.currentJob.tempReadInt).subscribe(res => {
      if (res != null) {
        this.tempService.setReadInterval(res[0])
          .subscribe(result1 => {
            this.currentJob.tempReadInt = result1.sensorSetValue;
          });
      }
    });
  }


  openIonSettings() {
      this.dialogService.openSettings(this.currentJob.ionReadInt).subscribe(res => {
        if (res != null) {
          this.ionService.setReadInterval(res[0])
              .subscribe(result1 => {
                this.currentJob.ionReadInt = result1.sensorSetValue;
              })
        }
      })
  }


  openConductivitySettings() {
    this.dialogService.openSettings(this.currentJob.conductivityReadInt).subscribe(res => {
      if (res != null) {
        this.conductivityService.setReadInterval(res[0])
          .subscribe(result1 => {
            this.currentJob.conductivityReadInt = result1.sensorSetValue;
          })
      }
    })
  }


  checkJob() {
    if ((new Date()) < this.currentJob.jobEndDate) {
      this.dialogService.openConfirmation('There is an another job going on, do you want to start a new one?').subscribe(response => {
        if (response) {
          this.openNewJob();
        }
      });
    } else {
      this.openNewJob();
    }
  }

  stopJob() {
    this.dialogService.openConfirmation('There is a job going on, do you want to stop it?').subscribe(response => {
      if (response) {
        this.jobService.stopJob().subscribe(newJob => {
          ExperimentComponent.setupJob(newJob, this.currentJob);
          this.countdownDate = new Date();
          this.countdownDate = null;
          this.calculateProgBarValue();
        });
      }
    });
  }

  openNewJob() {
    this.dialogService.openNewJob()
      .subscribe(res => {
        console.log(res);
        if ((res[0]) != null) {
          console.log('valuepairs selected: ', res[2]);
          console.log('interpolation selected: ', res[3]);

          this.jobService.setJob(new JobDO(new Date().getTime(), res[0].getTime(), String(res[1]),
            this.currentJob.heaterValue, this.currentJob.tempReadInt, this.currentJob.ionValue,
            this.currentJob.ionReadInt,
            this.currentJob.conductivityValue,
            this.currentJob.conductivityReadInt,
            String(res[2]),
            String(res[3])))
            .subscribe(newJob => {
              ExperimentComponent.setupJob(newJob, this.currentJob);
              this.countdownDate = new Date();
              this.countdownDate = this.currentJob.jobEndDate;
              this.calculateProgBarValue();
            });
        }
      });
  }


  calculateProgBarValue() {

    if (this.currentJob.jobEndDate > (new Date())) {
      this.progressBarValue = parseFloat((((new Date().getTime()) - this.currentJob.jobStartDate.getTime() ) * 100
      / (this.currentJob.jobEndDate.getTime() - this.currentJob.jobStartDate.getTime())).toFixed(3));
    } else {
      this.progressBarValue = 100;
      this.countdownDate = null;
    }
  }
}
