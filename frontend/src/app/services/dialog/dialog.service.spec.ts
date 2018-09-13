import {inject, TestBed} from '@angular/core/testing';
import {DialogService} from './dialog.service';
import {CustomMatModule} from '../../../custom-md/custom-md.module';

describe('DialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService],
      imports: [CustomMatModule]
    });
  });

  it('should ...', inject([DialogService], (service: DialogService) => {
    expect(service).toBeTruthy();
  }));
});
