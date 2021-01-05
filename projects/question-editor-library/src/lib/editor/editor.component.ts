import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { EditorConfig } from '../question-editor-library-interface';
import { catchError, finalize, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as _ from 'lodash-es';
import { templateList, toolbarConfig } from '../editor.config';
import { EditorService, TreeService } from '../services';

@Component({
  selector: 'lib-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @Input() editorConfig: EditorConfig | undefined;
  public toolbarConfig = toolbarConfig;
  public templateList: any = templateList;
  public collectionTreeNodes: any;
  public selectedQuestionData: any = {};
  public showQuestionTemplate = false;
  public showQuestionTemplatePopup = false;
  public showConfirmPopup = false;
  public submitFormStatus = false;
  public terms = false;

  constructor(private editorService: EditorService, private treeService: TreeService) { }

  ngOnInit() {
    console.log('QuestionSet config', this.editorConfig);
    this.fetchQuestionSetHierarchy();
  }

  ngAfterViewInit() { }

  fetchQuestionSetHierarchy() {
    this.editorService.getQuestionSetHierarchy('do_113187143974723584150').pipe(catchError(error => {
      const errInfo = {
        errorMsg: 'Fetching question set details failed. Please try again...',
      };
      return throwError(error);
    })).subscribe(res => {
      this.toolbarConfig.title = res.name;
      this.collectionTreeNodes = res;
      if (_.isEmpty(res.children)) {
        // TODO: Call update questionSet APIs if children property empty
      }
    });
  }

  toolbarEventListener(event) {
    switch (event.button.type) {
      case 'saveCollection':
        this.saveCollection();
        break;
      case 'submitCollection':
        this.submitHandler();
        break;
      case 'removeContent':
        this.removeNode();
        break;
      case 'editContent':
        this.redirectToQuestionTab();
        break;
      case 'showQuestionTemplate':
        this.showQuestionTemplatePopup = true;
        break;
      case 'onFormChange':
        this.submitFormStatus = event.event.isValid;
        break;
      default:
        break;
    }
  }

  saveCollection() {
    this.editorService.updateQuestionSetHierarchy()
      .pipe(map(data => _.get(data, 'result'))).subscribe(response => {
        this.treeService.replaceNodeId(response.identifiers);
        this.treeService.clearTreeCache();
        alert('Question set updated successfully');
      });
  }

  submitHandler() {
    if (!this.submitFormStatus) {
      alert('Please fill the required metadata');
      return false;
    }
    this.showConfirmPopup = true;
  }

  submitCollection() {
    this.editorService.sendQuestionSetForReview('do_113187143974723584150').pipe(catchError(error => {
      const errInfo = {
        errorMsg: 'Sending question set for review failed. Please try again...',
      };
      return throwError(errInfo);
    })).subscribe(res => {
      this.showConfirmPopup = false;
      alert('Question set sent for review');
    });
  }

  removeNode() {
    this.treeService.removeNode();
  }

  treeEventListener(event: any) {
    switch (event.type) {
      case 'nodeSelect':
        this.selectedQuestionData = event.data;
        console.log(this.selectedQuestionData);
        break;
      default:
        break;
    }
  }

  handleTemplateSelection($event) {
    this.showQuestionTemplatePopup = false;
    const selectedQuestionType = $event.type;
    if (selectedQuestionType === 'close') { return false; }
    console.log(selectedQuestionType);
    // this.programsService.getCategoryDefinition(selectedQuestionType, this.userService.channel).subscribe((res) => {
    //   const selectedtemplateDetails = res.result.objectCategoryDefinition;
    //   const catMetaData = selectedtemplateDetails.objectMetadata;
    //   if (_.isEmpty(_.get(catMetaData, 'schema.properties.interactionTypes.enum'))) {
    //       this.toasterService.error(this.resourceService.messages.emsg.m0026);
    //   } else {
    //     const supportedMimeTypes = catMetaData.schema.properties.interactionTypes.enum;
    //     console.log(supportedMimeTypes);
    //   }
    // }, (err) => {
    //   this.toasterService.error(this.resourceService.messages.emsg.m0027);
    // });
    this.redirectToQuestionTab('default');
  }

  redirectToQuestionTab(type?) {
    // let questionId;
    // if (!type) {
    //   type = this.selectedQuestionData.data.metadata.interactionTypes || 'default';
    //   questionId = this.selectedQuestionData.data.metadata.identifier;
    // }
    // let queryParams = `?type=${type}`;
    // if (questionId) { queryParams += `&questionId=${questionId}`; }
    // this.router.navigateByUrl(`/create/questionSet/${this.editorParams.collectionId}/question${queryParams}`);
  }
}
