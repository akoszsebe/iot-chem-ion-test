import { TestBed, inject } from '@angular/core/testing';

import { IonService } from './ion.service';
import {HttpModule} from "@angular/http";

describe('IonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [IonService]
    });
  });

  it('should be created', inject([IonService], (service: IonService) => {
    expect(service).toBeTruthy();
  }));
});
