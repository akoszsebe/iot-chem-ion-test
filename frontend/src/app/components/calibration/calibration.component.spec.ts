import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CalibrationComponent} from './calibration.component';
import {StepsModule} from 'primeng/primeng';
import {RouterTestingModule} from '@angular/router/testing';
import {CustomMatModule} from '../../../custom-md/custom-md.module';
import {CalibrationService} from '../../services/calibration/calibration.service';
import {IonService} from '../../services/ion/ion.service';
import {HttpModule} from '@angular/http';

describe('CalibrationComponent', () => {
  let component: CalibrationComponent;
  let fixture: ComponentFixture<CalibrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalibrationComponent],
      imports: [CustomMatModule, StepsModule, RouterTestingModule, HttpModule],
      providers: [CalibrationService, IonService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
