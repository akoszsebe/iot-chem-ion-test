import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, ResponseContentType, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as fileSaver from 'file-saver';
import {PhDO} from '../../models/ph';
import {SensorDO} from '../../models/sensor';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class PhService {

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

  getPumpStatus() {
    return new Observable<boolean>(observer => {
      this.socket = io(this.baseUrl);
      this.socket.on('pumpStatusChange', (value) => {
        observer.next(value);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  getPh(): Observable<PhDO> {

    return this.http.get(this.baseUrl + '/api/device/ph')
      .map(PhService.extractData)
      .catch(PhService.handleError);
  }

  getPhsInInterval(startDate: number, endDate: number): Observable<PhDO[]> {

    const params: URLSearchParams = new URLSearchParams();
    params.set('datefrom', startDate.toString());
    params.set('dateto', endDate.toString());


    return this.http.get(this.baseUrl + '/api/device/phsBetween', {search: params})
      .map(PhService.extractData)
      .catch(PhService.handleError);
  }

  exportPhsInInterval(startDate: number, endDate: number) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('datefrom', startDate.toString());
    params.set('dateto', endDate.toString());

    this.http.get(this.baseUrl + '/api/device/exportPhsBetween', {search: params, responseType: ResponseContentType.Blob}).subscribe(
      (response) => {
        const blob = new Blob([response.blob()], {type: 'application/vnd.ms-excel'});
        const filename = `ph-${new Date()}.xlsx`;
        fileSaver.saveAs(blob, filename);
      });
  }

  setPhValue(phValue: number): Observable<SensorDO> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.baseUrl + '/api/device/phValue', {'phValue': phValue}, options)
      .map(PhService.extractData)
      .catch(PhService.handleError);
  }

  getPhValue(): Observable<SensorDO> {
    return this.http.get(this.baseUrl + '/api/device/phvalue')
      .map(PhService.extractData)
      .catch(PhService.handleError);
  }

  setReadInterval(seconds: number): Observable<SensorDO> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.baseUrl + '/api/device/phUploadInterval', {'upinterval': seconds}, options)
      .map(PhService.extractData)
      .catch(PhService.handleError);
  }


}
