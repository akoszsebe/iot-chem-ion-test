import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, ResponseContentType, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ConductivityDO} from '../../models/conductivity';
import {SensorDO} from '../../models/sensor';
import * as io from 'socket.io-client';
import * as fileSaver from 'file-saver';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class ConductivityService {

  private baseUrl = AppSettings.BASE_URL;
  private socket;

  private static extractData(res: Response) {
    return res.json();
  }

  private static handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  constructor(private http: Http) {
  }

  getConductivityValue(): Observable<ConductivityDO> {
    return this.http.get(this.baseUrl + '/api/device/conductivityValue')
      .map(ConductivityService.extractData)
      .catch(ConductivityService.handleError);
  }


  setReadInterval(seconds: number): Observable<SensorDO> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + '/api/device/condUploadInterval', {'upinterval': seconds}, options)
      .map(ConductivityService.extractData)
      .catch(ConductivityService.handleError);
  }
}
