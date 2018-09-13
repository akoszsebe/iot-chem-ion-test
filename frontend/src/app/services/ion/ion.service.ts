import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response, ResponseContentType, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import * as fileSaver from 'file-saver';
import {IonDO} from '../../models/ion';
import {SensorDO} from '../../models/sensor';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class IonService {

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


    getIon(): Observable<IonDO> {

        return this.http.get(this.baseUrl + '/api/device/ion')
            .map(IonService.extractData)
            .catch(IonService.handleError);
    }

    getIonsInInterval(startDate: number, endDate: number): Observable<IonDO[]> {

        const params: URLSearchParams = new URLSearchParams();
        params.set('datefrom', startDate.toString());
        params.set('dateto', endDate.toString());

        return this.http.get(this.baseUrl + '/api/device/ionsBetween', {search: params})
            .map(IonService.extractData)
            .catch(IonService.handleError);
    }

    exportIonsInInterval(startDate: number, endDate: number) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('datefrom', startDate.toString());
        params.set('dateto', endDate.toString());

        this.http.get(this.baseUrl + '/api/device/exportIonsBetween', {search: params, responseType: ResponseContentType.Blob}).subscribe(
            (response) => {
                const blob = new Blob([response.blob()], {type: 'application/vnd.ms-excel'});
                const filename = `ion-${new Date()}.xlsx`;
                fileSaver.saveAs(blob, filename);
            });
    }


    getIonValue(): Observable<SensorDO> {
        return this.http.get(this.baseUrl + '/api/device/ionValue')
            .map(IonService.extractData)
            .catch(IonService.handleError);
    }

    setReadInterval(seconds: number): Observable<SensorDO> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.post(this.baseUrl + '/api/device/ionUploadInterval', {'upinterval': seconds}, options)
            .map(IonService.extractData)
            .catch(IonService.handleError);
    }


}
