import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {JobDO} from '../../models/job';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class JobService {

  private baseUrl = AppSettings.BASE_URL;

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

  getJob(): Observable<JobDO> {

    return this.http.get(this.baseUrl + '/api/backend/job')
      .map(JobService.extractData)
      .catch(JobService.handleError);
  }

  setJob(newJob: JobDO): Observable<JobDO> {

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.baseUrl + '/api/backend/startJob', newJob, options)
      .map(JobService.extractData)
      .catch(JobService.handleError);
  }

  stopJob(): Observable<JobDO> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.baseUrl + '/api/backend/stopJob', options)
      .map(JobService.extractData)
      .catch(JobService.handleError);
  }
}
