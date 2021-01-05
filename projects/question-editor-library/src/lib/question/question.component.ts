import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash-es';
import { UUID } from 'angular2-uuid';
import { forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { EditorConfig } from '../question-editor-library-interface';
import { questionToolbarConfig, questionEditorConfig } from '../editor.config';
import { McqForm, ServerResponse } from '../interfaces';
import { EditorService, QuestionService } from '../services';

@Component({
  selector: 'lib-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() editorConfig: EditorConfig | undefined;
  toolbarConfig = questionToolbarConfig;
  public ckeditorConfig: any = questionEditorConfig;
  public editorState: any = {};
  public showPreview = false;
  public mediaArr: any = [];
  public videoShow = false;
  public showFormError = false;
  selectedSolutionType: string;
  selectedSolutionTypeIndex: string;
  showSolutionDropDown = true;
  showSolution = false;
  videoSolutionName: string;
  videoSolutionData: any;
  videoThumbnail: string;
  solutionUUID: string;
  solutionValue: string;
  solutionTypes: any = [{
    type: 'html',
    value: 'Text+Image'
  },
  {
    type: 'video',
    value: 'video'
  }];
  questionMetaData: any;
  questionInteractionType;
  questionId;
  questionSetId;
  public setCharacterLimit = 160;
  public showLoader = true;
  questionSetHierarchy: any;

  constructor(
    private questionService: QuestionService,
    private editorService: EditorService,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit() {
    this.questionInteractionType = 'choice';
    this.questionId = 'do_11318790724225433616';
    this.questionSetId = 'do_113187143974723584150';
    if (this.questionInteractionType === 'default') {
      this.toolbarConfig.title = 'Subjective';
    } else if (this.questionInteractionType === 'choice') {
      this.toolbarConfig.title = 'MCQ';
    }
    this.initialize();
    this.solutionUUID = UUID.UUID();
  }

  initialize() {
   this.editorService.getQuestionSetHierarchy(this.questionSetId).
   subscribe((response) => {
    this.questionSetHierarchy = response;
   });
   if (!_.isUndefined(this.questionId)) {
      this.questionService.readQuestion(this.questionId)
      .subscribe((res) => {
        if (res.result) {
          this.questionMetaData = res.result.question;

          if (this.questionInteractionType === 'default') {
            if ( this.questionMetaData.editorState) {
              this.editorState = this.questionMetaData.editorState;
            } else {
              this.editorState = this.questionMetaData;
              this.editorState.question = this.questionMetaData.body;
            }
          }
          if (this.questionInteractionType === 'choice') {
            const responseDeclaration = this.questionMetaData.responseDeclaration;
            const templateId = this.questionMetaData.templateId;
            this.questionMetaData.editorState = this.questionMetaData.editorState;
            const numberOfOptions = this.questionMetaData.editorState.options.length;
            const options = _.map(this.questionMetaData.editorState.options, option => ({ body: option.value.body }));
            const question = this.questionMetaData.editorState.question;
            this.editorState = new McqForm({
              question, options, answer: _.get(responseDeclaration, 'response1.correctResponse.value')
            }, { templateId, numberOfOptions });
            this.editorState.solutions = this.questionMetaData.editorState.solutions;
          }

          if (!_.isEmpty(this.editorState.solutions)) {
            this.selectedSolutionType = this.editorState.solutions[0].type;
            this.solutionUUID = this.editorState.solutions[0].id;
            this.showSolutionDropDown = false;
            this.showSolution = true;
            if (this.selectedSolutionType === 'video') {
              const index = _.findIndex(this.questionMetaData.media, (o) => {
                return o.type === 'video' && o.id === this.editorState.solutions[0].value;
              });
              this.videoSolutionName = this.questionMetaData.media[index].name;
              this.videoThumbnail = this.questionMetaData.media[index].thumbnail;
            }
            if (this.selectedSolutionType === 'html') {
              this.editorState.solutions = this.editorState.solutions[0].value;
            }
          }
          if (this.questionMetaData.media) {
            this.mediaArr = this.questionMetaData.media;
          }
          this.showLoader = false;
        }
      });
    }
   if (_.isUndefined(this.questionId)) {
      if (this.questionInteractionType === 'default') {
        this.editorState = { question: '', answer: '', solutions: '' };
        this.showLoader = false;
      }
      if (this.questionInteractionType === 'choice') {
        this.editorState = new McqForm({ question: '', options: [] }, {});
        this.showLoader = false;
      }
    }
  }

  toolbarEventListener(event) {
    switch (event.button.type) {
      case 'saveContent':
        this.saveContent();
        break;
      case 'cancelContent':
        this.redirectToQuestionset();
        break;
      case 'backContent':
        this.redirectToQuestionset();
        break;
      default:
        break;
    }
  }

  saveContent() {
    // to handle when question type is subjective
    if (this.questionInteractionType === 'default') {
      if (this.editorState.question !== '' && this.editorState.answer !== '') {
        this.showFormError = false;
        const metadata = this.getSubjectiveMetadata(this.editorState);
        this.saveQuestion(metadata);
      } else {
        this.showFormError = true;
        return;
      }
    }
    // to handle when question type is mcq
    if (this.questionInteractionType === 'choice') {
      const optionValid = _.find(this.editorState.options, option =>
        (option.body === undefined || option.body === '' || option.length > this.setCharacterLimit));
      if (optionValid || !this.editorState.answer || [undefined, ''].includes(this.editorState.question)) {
        this.showFormError = true;
        return;
      } else {
        const metadata = this.getMcqMetadata(this.editorState);
        this.saveQuestion(metadata);
      }
    }
  }

  redirectToQuestionset() {
    this.router.navigateByUrl(`create/questionSet/${this.questionSetId}`);
  }

  editorDataHandler(event, type?) {
    if (type === 'question') {
      this.editorState.question = event.body;
    } else if (type === 'answer') {
      this.editorState.answer = event.body;
    } else if (type === 'solution') {
      this.editorState.solutions = event.body;
    }

    if (event.mediaobj) {
      const media = event.mediaobj;
      const value = _.find(this.mediaArr, ob => {
        return ob.id === media.id;
      });
      if (value === undefined) {
        this.mediaArr.push(event.mediaobj);
      }
    }
  }

  getMedia(media) {
    if (media) {
      const value = _.find(this.mediaArr, ob => {
        return ob.id === media.id;
      });
      if (value === undefined) {
        this.mediaArr.push(media);
      }
    }
  }

  selectSolutionType(data: any) {
    const index = _.findIndex(this.solutionTypes, (sol: any) => {
      return sol.value === data;
    });
    this.selectedSolutionType = this.solutionTypes[index].type;
    if (this.selectedSolutionType === 'video') {
      const showVideo = true;
      this.videoShow = showVideo;
    } else {
      this.showSolutionDropDown = false;
    }
  }

  videoDataOutput(event) {
    if (event) {
      this.videoSolutionData = event;
      this.videoSolutionName = event.name;
      this.editorState.solutions = event.identifier;
      this.videoThumbnail = event.thumbnail;
      const videoMedia: any = {};
      videoMedia.id = event.identifier;
      videoMedia.src = event.src;
      videoMedia.type = 'video';
      videoMedia.assetId = event.identifier;
      videoMedia.name = event.name;
      videoMedia.thumbnail = this.videoThumbnail;
      if (videoMedia.thumbnail) {
        const thumbnailMedia: any = {};
        thumbnailMedia.src = this.videoThumbnail;
        thumbnailMedia.type = 'image';
        thumbnailMedia.id = `video_${event.identifier}`;
        this.mediaArr.push(thumbnailMedia);
      }
      this.mediaArr.push(videoMedia);
      this.showSolutionDropDown = false;
      this.showSolution = true;
    } else {
      this.deleteSolution();
    }
    this.videoShow = false;
  }

  deleteSolution() {
    if (this.selectedSolutionType === 'video') {
      this.mediaArr = _.filter(this.mediaArr, (item: any) => item.id !== this.editorState.solutions);
    }
    this.showSolutionDropDown = true;
    this.selectedSolutionType = '';
    this.videoSolutionName = '';
    this.editorState.solutions = '';
    this.videoThumbnail = '';
    this.showSolution = false;
  }

  saveQuestion(metadata) {
    if (_.isUndefined(this.questionId)) {
      this.createQuestion(metadata);
    }
    if (!_.isUndefined(this.questionId)) {
      metadata = _.omit(metadata, ['visibility', 'code', 'status', 'mimeType']);
      this.updateQuestion(metadata, this.questionId);
    }
  }

  getSubjectiveMetadata(editorState: any) {
    let metadata: any;
    forkJoin([this.getConvertedLatex(editorState.question), this.getConvertedLatex(editorState.answer)])
    .subscribe((res) => {
      const rendererBody = res[0];
      const rendererAnswer = res[1];
      metadata = {
        code: UUID.UUID(),
        body: rendererBody,
        answer: rendererAnswer,
        templateId: '',
        responseDeclaration: {},
        // 'interactionTypes': [],
        interactions: {},
        editorState: {
          question: editorState.question,
          answer: editorState.answer
        },
        status: 'Draft',
        name: 'SA',
        qType: 'SA',
        media: this.mediaArr,
        mimeType: 'application/vnd.sunbird.question',
        primaryCategory: 'Subjective Question'
      };

      if (!_.isUndefined(this.selectedSolutionType) && !_.isEmpty(this.selectedSolutionType)) {
        const solutionObj = this.getSolutionObj(this.solutionUUID, this.selectedSolutionType, editorState.solutions);
        metadata.editorState.solutions = [solutionObj];
        metadata.solutions = [solutionObj];
      }
      if (_.isEmpty(editorState.solutions)) {
        metadata.solutions = [];
      }
    });
    return metadata;
  }

  getMcqMetadata(editorState) {
    let metadata: any;
    // tslint:disable-next-line:max-line-length
    forkJoin([this.getConvertedLatex(editorState.question), ...editorState.options.map(option => this.getConvertedLatex(option.body))])
      .subscribe((res) => {
        const body = res[0]; // question with latex
        const questionData = this.getQuestionHtml(body, editorState);
        const correctAnswer = editorState.answer;
        let resindex;
        const options = _.map(editorState.options, (opt, key) => {
          resindex = Number(key);
          if (Number(correctAnswer) === key) {
            return { answer: true, value: {body: opt.body, value: resindex} };
          } else {
            return { answer: false, value: {body: opt.body, value: resindex} };
          }
        });
        metadata = {
          code: UUID.UUID(),
          templateId: ' mcq-vertical',
          name: 'MCQ', // hardcoded value need to change it later
          body: questionData.body,
          responseDeclaration: questionData.responseDeclaration,
          interactionTypes: ['choice'],
          interactions : this.getInteractions(editorState.options),
          editorState : {
            question: editorState.question,
            options
          },
          status: 'Draft',
          media: this.mediaArr,
          qType: 'MCQ',
          mimeType: 'application/vnd.sunbird.question',
          primaryCategory: 'Multiple Choice Question'
        };
        if (!_.isUndefined(this.selectedSolutionType) && !_.isEmpty(this.selectedSolutionType)) {
          const solutionObj = this.getSolutionObj(this.solutionUUID, this.selectedSolutionType, editorState.solutions);
          metadata.editorState.solutions = [solutionObj];
          metadata.solutions = [solutionObj];
        }
        if (_.isEmpty(editorState.solutions)) {
          metadata.solutions = [];
        }
      });
    return metadata;
  }

  getSolutionObj(solutionUUID, selectedSolutionType, editorStateSolutions: any) {
    let solutionObj: any;
    solutionObj = {};
    solutionObj.id = solutionUUID;
    solutionObj.type = selectedSolutionType;
    solutionObj.value = editorStateSolutions;
    return solutionObj;
  }

  getConvertedLatex(body) {
    const getLatex = (encodedMath) => {
      return this.http.get('https://www.wiris.net/demo/editor/mathml2latex?mml=' + encodedMath, {
        responseType: 'text'
      });
    };
    let latexBody;
    const isMathML = body.match(/((<math("[^"]*"|[^\/">])*)(.*?)<\/math>)/gi);
    if (isMathML && isMathML.length > 0) {
      latexBody = isMathML.map(math => {
        const encodedMath = encodeURIComponent(math);
        return getLatex(encodedMath);
      });
    }
    if (latexBody) {
      return forkJoin(latexBody).pipe(
        map((res) => {
          _.forEach(res, (latex, i) => {
            body = latex.includes('Error') ? body : body.replace(isMathML[i], '<span class="mathText">' + latex + '</span>');
          });
          return body;
        })
      );
    } else {
      return of(body);
    }
  }

  getQuestionHtml(question, editorState: any) {
    const mcqTemplateConfig = {
      // tslint:disable-next-line:max-line-length
      mcqBody: '<div class=\"question-body\"><div class=\"mcq-title\">{question}</div><div data-choice-interaction=\"response1\" class=\"mcq-vertical\"></div></div>'
    };
    const { mcqBody } = mcqTemplateConfig;
    const questionBody = mcqBody.replace('{templateClass}', editorState.templateId)
      .replace('{question}', question);
    const responseDeclaration = {
      maxScore: 1,
      response1: {
        cardinality: 'single',
        type: 'integer',
        correctResponse: {
          value: editorState.answer,
          outcomes: {SCORE: 1}
        }
      }
    };
    return {
      body: questionBody,
      responseDeclaration,
    };
  }

  getInteractions(options) {
    let index;
    const interactOptions = _.map(options, (opt, key) => {
      index = Number(key);
      return { value: {label: opt.body, value: index} };
    });
    const interactions = {
      response1: {
        type: 'choice',
        options: interactOptions
      }
    };
    return interactions;
  }

  createQuestion(metadata) {
    this.questionService.updateHierarchyQuestionCreate(this.questionSetId, metadata, this.questionSetHierarchy).
    subscribe(
      (response: ServerResponse) => {
        if (response.result) {
          alert('create question done');
          this.router.navigate([`create/questionSet/${this.questionSetId}`]);
        }
      },
      (err: ServerResponse) => {
        console.log(err);
      });
  }

  updateQuestion(metadata, questionId) {
    this.questionService.updateHierarchyQuestionUpdate(this.questionSetId, questionId, metadata, this.questionSetHierarchy).
    subscribe(
      (response: ServerResponse) => {
        if (response.result) {
          alert('update question done');
          this.router.navigate([`create/questionSet/${this.questionSetId}`]);
        }
      },
      (err: ServerResponse) => {
        console.log(err);
      });
  }
}

