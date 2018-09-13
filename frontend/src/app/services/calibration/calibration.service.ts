import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {AppSettings} from '../../models/app-settings';


@Injectable()
export class CalibrationService {

  private baseUrl = AppSettings.BASE_URL;

  private static extractData(res: Response) {
    return res.json().sent;
  }

  private static handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  constructor(private http: Http) {
  }

  calibrateIonSensor(level: string): Observable<boolean> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.baseUrl + '/api/device/calibrateIonSensor', {'level': level}, options)
      .map(CalibrationService.extractData)
      .catch(CalibrationService.handleError);
  }

}
