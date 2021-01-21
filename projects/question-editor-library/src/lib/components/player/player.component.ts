import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import * as _ from 'lodash-es';
import { ServerResponse } from '../../interfaces';
import { QuestionService, EditorTelemetryService, EditorService, PlayerService } from '../../services';
@Component({
  selector: 'lib-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {
  QumlPlayerConfig: any;
  @Input() questionMetaData: any;
  @Input() questionSetHierarchy: any;
  @Output() public toolbarEmitter: EventEmitter<any> = new EventEmitter();
  questionId: string;
  showPlayerPreview = false;

  constructor(private questionService: QuestionService, public telemetryService: EditorTelemetryService,
              public editorService: EditorService, private playerService: PlayerService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.showPlayerPreview = false;
    this.initialize();
  }

  initialize() {
    this.questionId = _.get(this.questionMetaData, 'data.metadata.identifier');
    this.questionService.readQuestion(this.questionId).subscribe((res) => {
       const questionData = res.result.question;
       this.setQumlPlayerData(questionData);
       this.showPlayerPreview = true;
    }, (err: ServerResponse) => {
      alert('Fetching question detailes failed. Try again later');
      console.log(err);
    });
  }

  setQumlPlayerData(questionMetadata) {
    const playerConfig = _.cloneDeep(this.playerService.getConfig());
    this.QumlPlayerConfig = playerConfig;
    this.QumlPlayerConfig.data = this.questionSetHierarchy;
    this.QumlPlayerConfig.data.totalQuestions = 1;
    this.QumlPlayerConfig.data.maxQuestions = this.QumlPlayerConfig.data.totalQuestions;
    this.QumlPlayerConfig.data.maxScore = this.QumlPlayerConfig.data.totalQuestions;
    this.QumlPlayerConfig.data.children = [];
    this.QumlPlayerConfig.data.children.push(questionMetadata);
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
