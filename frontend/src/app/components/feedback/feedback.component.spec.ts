import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FeedbackComponent} from './feedback.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomMatModule} from '../../../custom-md/custom-md.module';
import {FeedbackService} from '../../services/feedback/feedback.service';
import {AuthService} from '../../services/auth/auth.service';
import {HttpModule} from '@angular/http';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackComponent],
      imports: [CustomMatModule, FormsModule, BrowserAnimationsModule, HttpModule],
      providers: [FeedbackService, AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
