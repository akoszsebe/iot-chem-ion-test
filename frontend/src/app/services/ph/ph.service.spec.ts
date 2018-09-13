import {inject, TestBed} from '@angular/core/testing';
import {PhService} from './ph.service';
import {HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {SensorDO} from '../../models/sensor';
import {PhDO} from '../../models/ph';

describe('PhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: XHRBackend, useExisting: MockBackend}, MockBackend, PhService],
      imports: [HttpModule]
    });
  });

  it('should create', inject([PhService], (service: PhService) => {
    expect(service).toBeTruthy();
  }));


  describe('getPh ()', () => {

    it('should return an Observable<PhDO>', inject([PhService, MockBackend],
      (service: PhService, backend: MockBackend) => {

        const mockResponse = new PhDO('1', '1', 7, 2123123);

        prepareResponse(backend, mockResponse);

        service.getPh().subscribe((ph) => {
          expect(ph.phvalue).toEqual(7);
          expect(ph.phdate).toEqual(2123123);
          expect(ph.raspberryid).toEqual('1');
          expect(ph.sensorid).toEqual('1');
        });
      }));
  });

  describe('getPhsInInterval (from, to)', () => {

    it('should return a list of Observable<PhDO>', inject([PhService, MockBackend],
      (service: PhService, backend: MockBackend) => {

        const mockResponse = [
          new PhDO('1', '1', 5, 2123123),
          new PhDO('1', '1', 6, 2123124),
          new PhDO('1', '1', 7, 2123126)
        ];

        prepareResponse(backend, mockResponse);

        service.getPhsInInterval(2000000, 2200000).subscribe((phs) => {
          expect(phs[0].phvalue).toEqual(5);
          expect(phs[1].phvalue).toEqual(6);
          expect(phs[2].phvalue).toEqual(7);
          expect(phs.length).toEqual(3);
        });
      }));
  });

  describe('setPhValue (phvalue)', () => {

    it('should return an Observable<SensorDO>', inject([PhService, MockBackend],
      (service: PhService, backend: MockBackend) => {

        const PH = 7;
        const mockResponse = new SensorDO(PH);

        prepareResponse(backend, mockResponse);

        service.setPhValue(PH).subscribe((response) => {
          expect(response.sensorSetValue).toEqual(PH);
        });
      }));
  });


  describe('getPhValue ()', () => {

    it('should return an Observable<SensorDO>', inject([PhService, MockBackend],
      (service: PhService, backend: MockBackend) => {

        const PH = 8;
        const mockResponse = new SensorDO(PH);

        prepareResponse(backend, mockResponse);

        service.getPhValue().subscribe((response) => {
          expect(response.sensorSetValue).toEqual(PH);
        });
      }));
  });


  describe('setReadinterval (seconds)', () => {

    it('should return an Observable<SensorDO>', inject([PhService, MockBackend],
      (service: PhService, backend: MockBackend) => {

        const SECONDS = 10;
        const mockResponse = new SensorDO(SECONDS);

        prepareResponse(backend, mockResponse);

        service.setReadInterval(SECONDS).subscribe((response) => {
          expect(response.sensorSetValue).toEqual(SECONDS);
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
