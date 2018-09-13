import {inject, TestBed} from '@angular/core/testing';

import {FeedbackService} from './feedback.service';
import {HttpModule} from '@angular/http';

describe('FeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackService],
      imports: [HttpModule]
    });
  });

  it('should ...', inject([FeedbackService], (service: FeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
