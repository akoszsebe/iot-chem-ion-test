import { TestBed, inject } from '@angular/core/testing';

import { ConfigService } from './config.service';
import {AppSettings} from '../../models/app-settings';
import {Http, HttpModule} from '@angular/http';

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ConfigService]
    });
  });

  it('should be created', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));
});
