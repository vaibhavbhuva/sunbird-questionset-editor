import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap, tap, mergeMap, filter, first, skipWhile } from 'rxjs/operators';
import * as _ from 'lodash-es';
import { DataService } from '../index';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private _availableLicenses: Array<any>;
  private _channelData: any;
  constructor(public dataService: DataService) { }

  initialize() {
    this.getLicenses().subscribe();
  }
  getLicenses(): Observable<any> {
    const req = {
      url: `composite/v1/search`,
      data: {
        request: {
          filters: {
            objectType: 'license',
            status: ['Live']
          }
        }
      }
    };
    return this.dataService.post(req).pipe(map((res: any) => {
      return res.result;
    }), tap((data: any) => this._availableLicenses = _.get(data, 'license')), catchError(err => {
      const errInfo = { errorMsg: 'search failed' };
      return throwError(errInfo);
    }));
  }

  getAvailableLicenses() {
    return this._availableLicenses;
  }

  // apiErrorHandling(err, errorInfo) {
  //   this.toasterService.error(_.get(err, 'error.params.errmsg') || errorInfo.errorMsg);
  // }

  // fetchChannelData(channelId) {
  //   this.frameworkService.getChannelData(channelId);
  //   this.frameworkService.channelData$
  //     .pipe(
  //       filter(data => channelId === _.get(data, 'channelData.identifier'), first())
  //     ).subscribe(
  //       (data) => {
  //         this._channelData = _.get(data, 'channelData');
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }
}
