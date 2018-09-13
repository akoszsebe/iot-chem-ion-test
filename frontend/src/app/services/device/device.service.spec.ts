import {inject, TestBed} from '@angular/core/testing';

import {DeviceService} from './device.service';
import {HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('DeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: XHRBackend, useExisting: MockBackend}, MockBackend, DeviceService],
      imports: [HttpModule]
    });
  });

  it('should create', inject([DeviceService], (service: DeviceService) => {
    expect(service).toBeTruthy();
  }));

  describe('getDeviceStatus ()', () => {

    it('should return a boolean depending on device status', inject([DeviceService, MockBackend],
      (service: DeviceService, backend: MockBackend) => {

        const mockResponse = {alive: true};

        prepareResponse(backend, mockResponse);

        service.getDeviceStatus().subscribe((response) => {
          expect(response).toEqual(true);
        });
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
