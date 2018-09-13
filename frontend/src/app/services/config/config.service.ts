import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class ConfigService {


  private baseUrl = AppSettings.BASE_URL;

  constructor(private _http: Http) { }

  getConfig() {
   return this._http.get(this.baseUrl + '/api/backend/domain').map(res => res.json());
  }

}
