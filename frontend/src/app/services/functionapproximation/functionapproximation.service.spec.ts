import {inject, TestBed} from '@angular/core/testing';

import {FunctionapproximationService} from './functionapproximation.service';
import {HttpModule} from '@angular/http';

describe('FunctionapproximationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctionapproximationService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([FunctionapproximationService], (service: FunctionapproximationService) => {
    expect(service).toBeTruthy();
  }));
});
