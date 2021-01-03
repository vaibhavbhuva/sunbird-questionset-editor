import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import * as _ from 'lodash-es';
import { map } from 'rxjs/operators';
import { TreeService, DataService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  data: any;
  public questionStream$ = new Subject<any>();

  constructor(public treeService: TreeService, private dataService: DataService) { }

  public getQuestionSetHierarchy(identifier: string) {
    console.log('getQuestionSetHierarchy ');
    const req = {
      url: `api/questionset/v1/hierarchy/${identifier}`,
      param: { mode: 'edit'}
    };
    return this.dataService.get(req).pipe(map((res: any) => _.get(res, 'result.questionSet')));
  }

  public updateQuestionSetHierarchy(): Observable<any> {
    const req = {
      url: 'api/questionset/v1/hierarchy/update',
      data: {
        request: {
          data: {
            ...this.prepareQuestionSetHierarchy(),
            ...{lastUpdatedBy: 'b8d50233-5a4d-4a8c-9686-9c8bccd2c448'}
          }
        }
      }
    };
    return this.dataService.patch(req);
  }

  public sendQuestionSetForReview(identifier: string): Observable<any> {
    const req = {
      url: `questionset/v1/review/${identifier}`,
      data: {
        request : {
            questionSet: {}
        }
    }
    };
    return this.dataService.post(req);
  }

  public getQuestionStream$() {
    return this.questionStream$;
  }

  public publish(value: any) {
    this.questionStream$.next(value);
  }

  prepareQuestionSetHierarchy() {
    this.data = {};
    const data = this.treeService.getFirstChild();
    return {
      nodesModified: this.treeService.treeCache.nodesModified,
      hierarchy: this._toFlatObj(data)
    };
  }

  _toFlatObj(data) {
    const instance = this;
    if (data && data.data) {
      instance.data[data.data.id] = {
        name: data.data.metadata.name,
        // 'contentType': data.data.objectType,
        children: _.map(data.children, (child) => {
          return child.data.id;
        }),
        root: data.data.root
      };

      _.forEach(data.children, (collection) => {
        instance._toFlatObj(collection);
      });
    }
    return instance.data;
  }
}
