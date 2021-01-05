import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../services';
import { ServerResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public dataService: DataService) { }

  readQuestion(questionId) {
    const filters = '?fields=body,answer,templateId,responseDeclaration,interactionTypes,interactions,name,solutions,editorState,media';
    const option = {
      url: `question/v1/read/${questionId}${filters}`,
    };
    return this.dataService.get(option);
  }

  updateHierarchyQuestionCreate(questionSetId, metadata, questionSetHierarchy): Observable<ServerResponse> {
    let hierarchyChildren: Array<string>;
    hierarchyChildren = questionSetHierarchy.childNodes;
    hierarchyChildren.push('UUID');
    const requestObj = {
      data: {
          nodesModified: {
              UUID: {
                  metadata,
                  objectType: 'Question',
                  root: false,
                  isNew: true
              }
          },
          hierarchy: {
          }
      }
    };
    requestObj.data.hierarchy[questionSetId] = {
      children: hierarchyChildren,
      root: true
    };
    const req = {
      url: 'questionset/v1/hierarchy/update',
      data: {
        request: requestObj
      }
    };
    return this.dataService.patch(req);
  }

  updateHierarchyQuestionUpdate(questionSetId, questionId, metadata, questionSetHierarchy): Observable<ServerResponse> {
    const requestObj = {
      data: {
          nodesModified: {
          },
          hierarchy: {
          }
      }
    };
    requestObj.data.hierarchy[questionSetId] = {
      children: questionSetHierarchy.childNodes,
      root: true
    };
    requestObj.data.nodesModified[questionId] = {
      metadata,
      objectType: 'Question',
      root: false,
      isNew: false
    };
    const req = {
      url: 'questionset/v1/hierarchy/update',
      data: {
        request: requestObj
      }
    };
    return this.dataService.patch(req);
  }
}
