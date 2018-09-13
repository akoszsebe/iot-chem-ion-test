import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {UserDO} from '../../models/user';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class AuthService {

  user: UserDO;
  redirectUrl: string;

  private baseUrl = AppSettings.BASE_URL;

  private static handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private static extractData(res: Response) {
    return res.json().user;
  }

  setUser(user: UserDO) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }


  checkAuthentication(): Observable<UserDO> {
    return this.http.get(this.baseUrl + '/api/frontend/checkAuth')
      .map(AuthService.extractData)
      .catch(AuthService.handleError);
  }

  constructor(private http: Http) {
    this.checkAuthentication().subscribe(user => this.user = user);
  }

}
