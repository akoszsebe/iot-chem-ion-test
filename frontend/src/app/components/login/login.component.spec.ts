import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from '../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {ProgressBarModule} from 'primeng/primeng';
import {RouterTestingModule} from '@angular/router/testing';
import {CustomMatModule} from '../../../custom-md/custom-md.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [CustomMatModule, RouterTestingModule, FormsModule, ProgressBarModule],
      providers: [AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
