import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReportsComponent} from './reports.component';
import {FormsModule} from '@angular/forms';
import {CalendarModule, ChartModule} from 'primeng/primeng';
import {TempService} from '../../services/temp/temp.service';
import {IonService} from '../../services/ion/ion.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMatModule} from '../../../custom-md/custom-md.module';
import {HttpModule} from '@angular/http';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      imports: [CustomMatModule, FormsModule, ChartModule, CalendarModule, BrowserAnimationsModule, HttpModule],
      providers: [TempService, IonService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
