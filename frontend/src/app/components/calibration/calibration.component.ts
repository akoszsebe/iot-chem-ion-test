import {Component, OnInit} from '@angular/core';
import {CalibrationService} from '../../services/calibration/calibration.service';
import {IonService} from '../../services/ion/ion.service';
import {MenuItem} from 'primeng/primeng';
import {DeviceService} from '../../services/device/device.service'; //to disable "calibrate button" if dev is not connected -later

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.css']
})
export class CalibrationComponent implements OnInit {

  colors = ['warn', 'primary'];
  mode = 'indeterminate';
  currentLevel: number;
  levels = ['Clear', 'Dry','Low', 'High', 'again'];
  buttonDisabled = false;

  items: MenuItem[];

  constructor(private calibrationService: CalibrationService,
              private ionService: IonService) {
  }

  ngOnInit() {
    this.currentLevel = 0;
    this.items = [{label: 'Clear'}, {label: 'Dry'}, {label: 'Low'},  {label: 'High'}, {label: 'Done'}];
  }

  calibrate() {
    if (this.currentLevel < 4) {

      this.buttonDisabled = true;
      this.calibrationService.calibrateIonSensor(this.levels[this.currentLevel]).subscribe(response => {
        setTimeout(() => {
          this.buttonDisabled = false;
          this.currentLevel = (this.currentLevel + 1) % 3;
        }, 5000);
      });
    } else {
      this.currentLevel = (this.currentLevel + 1) % 3;
    }
  }
}
