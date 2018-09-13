import {inject, TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {UserDO} from '../../models/user';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: XHRBackend, useExisting: MockBackend}, MockBackend, AuthService],
      imports: [HttpModule, RouterTestingModule]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('checkAuthentication ()', () => {

    it('should return a UserDO if logged in', inject([AuthService, MockBackend],
      (service: AuthService, backend: MockBackend) => {

        const USER = new UserDO('1', 'istvan', 'myaddress@gmail.com', 'www.picurl.com');
        const mockResponse = {user: USER};

        prepareResponse(backend, mockResponse);

        service.checkAuthentication().subscribe((response) => {
          expect(response.id).toEqual(USER.id);
          expect(response.name).toEqual(USER.name);
          expect(response.email).toEqual(USER.email);
          expect(response.picUrl).toEqual(USER.picUrl);
        });
      }));


    it('should return a null if logged out', inject([AuthService, MockBackend],
      (service: AuthService, backend: MockBackend) => {

        const mockResponse = {user: null};

        prepareResponse(backend, mockResponse);

        service.checkAuthentication().subscribe((response) => {
          expect(response).toBeNull();
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
