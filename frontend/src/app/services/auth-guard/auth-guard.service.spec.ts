import {inject, TestBed} from '@angular/core/testing';
import {AuthGuardService} from './auth-guard.service';
import {AuthService} from '../auth/auth.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {CustomMatModule} from '../../../custom-md/custom-md.module';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [AuthGuardService, AuthService],
      imports: [HttpModule, FormsModule, CustomMatModule, RouterTestingModule]
    });
  });

  it('should ...', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
