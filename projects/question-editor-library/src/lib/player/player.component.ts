import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import * as _ from 'lodash-es';
import { ServerResponse } from '../interfaces';
import { data1 } from './quml-library-data';
import { QuestionService, EditorTelemetryService, EditorService } from '../services';
@Component({
  selector: 'lib-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {
  QumlPlayerConfig: any = data1;
  @Input() questionMetaData: any;
  @Output() public toolbarEmitter: EventEmitter<any> = new EventEmitter();
  questionId: string;
  showPlayerPreview = false;

  constructor(private questionService: QuestionService, public telemetryService: EditorTelemetryService,
              public editorService: EditorService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.showPlayerPreview = false;
    this.initialize();
  }

  initialize() {
    this.questionId = _.get(this.questionMetaData, 'data.metadata.identifier');
    this.questionService.readQuestion(this.questionId).subscribe((res) => {
       const questionData = res.result.question;
       this.QumlPlayerConfig.data.children = [];
       this.QumlPlayerConfig.data.totalQuestions = 1;
       this.QumlPlayerConfig.data.maxQuestions =  1;
       this.QumlPlayerConfig.data.maxScore = 1;
       this.QumlPlayerConfig.data.children.push(questionData);
       this.showPlayerPreview = true;
    }, (err: ServerResponse) => {
      alert('Fetching question detailes failed. Try again later');
      console.log(err);
    });
  }

  removeQuestion() {
    this.toolbarEmitter.emit({button: { type : 'removeContent'}});
  }

  editQuestion() {
    this.toolbarEmitter.emit({button: { type : 'editContent'}});
  }

  getPlayerEvents(event) {
    console.log('get player events', JSON.stringify(event));
  }

  getTelemetryEvents(event) {
    console.log('event is for telemetry', JSON.stringify(event));
  }

}
