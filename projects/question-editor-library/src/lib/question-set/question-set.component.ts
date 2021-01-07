import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash-es';
import { TreeService } from '../services';
import { formConfig } from './formConfig';

@Component({
  selector: 'lib-question-set',
  templateUrl: './question-set.component.html',
  styleUrls: ['./question-set.component.css']
})
export class QuestionSetComponent implements OnInit {
  @Input() questionSetMetadata: any;
  @Input() telemetryEventsInput: any;
  @Output() toolbarEmitter = new EventEmitter<any>();
  config = formConfig;
  constructor(private treeService: TreeService) { }

  ngOnInit() {
    this.prepareFormConfiguration();
  }

  prepareFormConfiguration() {
    const questionSetObj = this.questionSetMetadata.data.metadata;
    // tslint:disable-next-line:max-line-length
    const metadata = (_.isUndefined(this.treeService.treeCache.nodesModified[questionSetObj.identifier])) ? questionSetObj : _.assign(questionSetObj, this.treeService.treeCache.nodesModified[questionSetObj.identifier].metadata);
    _.forEach(this.config, field => {
      if (metadata && metadata[field.code]) {
        field.default = metadata[field.code];
      }
    });
  }

  addQuestion() {
    this.toolbarEmitter.emit({ button: { type: 'showQuestionTemplate' } });
  }

  output(event) {
  }

  onStatusChanges(event) {
    this.toolbarEmitter.emit({ button: { type: 'onFormChange' }, event });
  }

  valueChanges(event) {
    this.treeService.updateNode(event);
  }
}
