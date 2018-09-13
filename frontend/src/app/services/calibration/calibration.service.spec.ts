import {inject, TestBed} from '@angular/core/testing';

import {CalibrationService} from './calibration.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';

describe('CalibrationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: XHRBackend, useExisting: MockBackend}, MockBackend, CalibrationService],
      imports: [HttpModule]
    });
  });

  it('should create', inject([CalibrationService], (service: CalibrationService) => {
    expect(service).toBeTruthy();
  }));


  // Doesn't apply
  xdescribe('calibratePhSensor ()', () => {
    it('should return a boolean depending on calibration success', inject([CalibrationService, MockBackend],
      (service: CalibrationService, backend: MockBackend) => {

        const mockResponse = {sent: true};

        prepareResponse(backend, mockResponse);

        // service.calibratePhSensor('Low').subscribe((response) => {
        //   expect(response).toEqual(true);
        // });
      }));
  });

  function prepareResponse(backend, mockResponse) {
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    })
  }
});
