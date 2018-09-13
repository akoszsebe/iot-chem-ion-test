import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../models/app-settings';
import { ValuePairDO } from '../../models/value-pair';

@Injectable()
export class FunctionapproximationService {

  private baseUrl = AppSettings.BASE_URL;

  private static extractData(res: Response) {
    return res.json();
  }

  private static handleError(error: any) {
    console.log(error);
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  constructor(private http: Http) {
  }

  getValuePairs(_callback) {
    this.http.get(this.baseUrl + '/api/backend/allValuePairs').subscribe(resp => {_callback(resp)});
  }


  sendValues(valuepairList: { conductivity: number; ion: number }[], name, comment): Observable<boolean> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    console.log('sending to server: ', valuepairList, name, comment);
    const dataToSend = {
      name: name,
      comment: comment,
      values: valuepairList
    };
    return this.http.post(this.baseUrl + '/api/backend/valuePairs', { 'data': JSON.stringify(dataToSend) }, options)
      .map(FunctionapproximationService.extractData)
      .catch(FunctionapproximationService.handleError);
  }
  updateValues (id, valuepairList: { conductivity: number; ion: number }[], name, comment): Observable<boolean> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const dataToSend = {
      id: id,
      name: name,
      comment: comment,
      values: valuepairList
    };
    console.log('dataToSend UPDATE: ', dataToSend);
    return this.http.put(this.baseUrl + '/api/backend/valuePairsById', { 'data': JSON.stringify(dataToSend) }, options)
      .map(FunctionapproximationService.extractData)
      .catch(FunctionapproximationService.handleError);
  }

  deleteValues(id): Observable<boolean>  {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const dataToSend = {
      _id: id
    };
    ///api/backend/deleteValuePairsById
    console.log('sending to server: DELETE VALUEPAIRS WITH ID: ', id);
    return this.http.post(this.baseUrl + '/api/backend/deleteValuePairsById', { 'data': JSON.stringify(dataToSend) }, options)
      .map(FunctionapproximationService.extractData)
      .catch(FunctionapproximationService.handleError);
  }
}
