import { AfterViewInit, Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { EditorConfig } from '../../question-editor-library-interface';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as _ from 'lodash-es';
import { EditorService, TreeService, EditorTelemetryService, HelperService, FrameworkService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @Input() editorConfig: EditorConfig | undefined;
  public toolbarConfig: any;
  public templateList: any;
  public collectionTreeNodes: any;
  public selectedQuestionData: any = {};
  public showQuestionTemplatePopup = false;
  public showConfirmPopup = false;
  public submitFormStatus = false;
  public terms = false;
  public collectionId;
  public pageStartTime;
  public editorMode;
  public rootObject = 'QuestionSet';
  public childObject = 'Question';
  public telemetryPageId = 'question_set';

  constructor(private editorService: EditorService, private treeService: TreeService, private helperService: HelperService,
              private router: Router, public telemetryService: EditorTelemetryService,  private cdr: ChangeDetectorRef,
              private frameworkService: FrameworkService) {}

  ngOnInit() {
    this.editorService.initialize(this.editorConfig);
    this.editorMode = this.editorService.editorMode;
    this.toolbarConfig = this.editorService.getToolbarConfig();
    this.pageStartTime = Date.now();
    this.collectionId = _.get(this.editorConfig, 'context.identifier');
    this.telemetryService.initializeTelemetry(this.editorConfig);
    this.telemetryService.telemetryPageId = this.telemetryPageId;
    this.fetchQuestionSetHierarchy();
    this.helperService.initialize(_.get(this.editorConfig, 'context.defaultLicense'));
    this.frameworkService.initialize(_.get(this.editorConfig, 'context.framework'));
    this.telemetryService.start({type: 'editor', pageid: this.telemetryPageId});
  }

  ngAfterViewInit() {
    this.telemetryService.impression({type: 'list', pageid: this.telemetryPageId, uri: this.router.url});
  }

  generateTelemetryEndEvent(eventMode) {
    const telemetryEnd = {
        type: 'editor',
        pageid: this.telemetryPageId,
        mode: eventMode || '',
        duration: _.toString((Date.now() - this.pageStartTime) / 1000)
    };
    this.telemetryService.end(telemetryEnd);
  }

  fetchQuestionSetHierarchy() {
    this.editorService.getQuestionSetHierarchy(this.collectionId).pipe(catchError(error => {
      const errInfo = {
        errorMsg: 'Fetching question set details failed. Please try again...',
      };
      return throwError(errInfo);
    })).subscribe(res => {
      if (_.isUndefined(this.editorService.hierarchyConfig)) {
        // tslint:disable-next-line:max-line-length
        this.editorService.getCategoryDefinition(res.primaryCategory, null, this.rootObject).subscribe((categoryDefRes) => {
          const objectMetadata = categoryDefRes.result.objectCategoryDefinition.objectMetadata;
          if (!_.isEmpty(_.get(objectMetadata, 'config.hierarchyConfig'))) {
            this.editorService.hierarchyConfig = objectMetadata.config.hierarchyConfig;
          } else {
            this.editorService.hierarchyConfig = {
              maxDepth: 1,
              children: {
                  Question: ['Multiple Choice Question', 'Subjective Question']
              }
            };
          }
          this.templateList = this.editorService.hierarchyConfig.children[this.childObject];
        }, (err) => {
          console.log(err);
        });
      } else {
        this.templateList = this.editorService.hierarchyConfig.children[this.childObject];
      }
      this.toolbarConfig.title = res.name;
      this.collectionTreeNodes = res;
      this.cdr.detectChanges();
      if (_.isEmpty(res.children)) {
          this.hideButton('submitCollection');
      }
    });
  }

  showButton(buttonType) {
    const buttonIndex = _.findIndex(this.toolbarConfig.buttons, {type: buttonType});
    this.toolbarConfig.buttons[buttonIndex].display = 'display';
  }

  hideButton(buttonType) {
    const buttonIndex = _.findIndex(this.toolbarConfig.buttons, {type: buttonType});
    this.toolbarConfig.buttons[buttonIndex].display = 'none';
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
        this.generateTelemetryEndEvent('remove_content');
        this.removeNode();
        break;
      case 'editContent':
        this.redirectToQuestionTab('edit');
        break;
      case 'showQuestionTemplate':
        this.showQuestionTemplatePopup = true;
        break;
      case 'onFormChange':
        this.submitFormStatus = event.event.isValid;
        break;
      case 'publishCollection':
        this.publishCollection();
        break;
      case 'rejectCollection':
        this.rejectCollection();
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
    this.editorService.sendQuestionSetForReview(this.collectionId).pipe(catchError(error => {
      const errInfo = {
        errorMsg: 'Sending question set for review failed. Please try again...',
      };
      return throwError(errInfo);
    })).subscribe(res => {
      this.showConfirmPopup = false;
      alert('Question set sent for review');
    });
  }

  publishCollection() {
    this.editorService.publishQuestionSet(this.collectionId).pipe(catchError(error => {
      const errInfo = {
        errorMsg: 'Publishing question set failed. Please try again...',
      };
      return throwError(errInfo);
    })).subscribe(res => {
      this.showConfirmPopup = false;
      this.generateTelemetryEndEvent('submit');
      alert('Question set published successfully');
    });
  }

  rejectCollection() {
    this.editorService.rejectQuestionSet(this.collectionId).pipe(catchError(error => {
      const errInfo = {
        errorMsg: 'Rejecting question set failed. Please try again...',
      };
      return throwError(errInfo);
    })).subscribe(res => {
      this.showConfirmPopup = false;
      this.generateTelemetryEndEvent('submit');
      alert('Question set rejected successfully');
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
    const selectedQuestionType = $event;
    if (selectedQuestionType && selectedQuestionType.type === 'close') {
      this.showQuestionTemplatePopup = false;
      return false;
    }
    // tslint:disable-next-line:max-line-length
    this.editorService.getCategoryDefinition(selectedQuestionType, null, this.childObject).subscribe((res) => {
      const selectedtemplateDetails = res.result.objectCategoryDefinition;
      const catMetaData = selectedtemplateDetails.objectMetadata;
      if (_.isEmpty(_.get(catMetaData, 'schema.properties.interactionTypes.items.enum'))) {
          // this.toasterService.error(this.resourceService.messages.emsg.m0026);
          this.editorService.selectedChildren = {
            primaryCategory: selectedQuestionType,
            mimeType: catMetaData.schema.properties.mimeType.enum[0],
            interactionType: null
          };
          this.redirectToQuestionTab(undefined, 'default');
      } else {
        const interactionTypes = catMetaData.schema.properties.interactionTypes.items.enum;
        this.editorService.selectedChildren = {
          primaryCategory: selectedQuestionType,
          mimeType: catMetaData.schema.properties.mimeType.enum[0],
          interactionType: interactionTypes[0]
        };
        this.redirectToQuestionTab(undefined, interactionTypes[0]);
      }
    }, (err) => {
      console.log(err);
    });
  }

  redirectToQuestionTab(mode?, interactionType?) {
    let queryParams = '?';
    if (interactionType) {
      queryParams += `type=${interactionType}`;
    }
    if (mode === 'edit' && this.selectedQuestionData.data.metadata.identifier) {
      queryParams += `questionId=${this.selectedQuestionData.data.metadata.identifier}`;
    }
    this.router.navigateByUrl(`/questionSet/${this.collectionId}/question${queryParams}`);
  }
}
