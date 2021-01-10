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

      if ((_.isEmpty(field.range) || _.isEmpty(field.terms)) &&
      !field.editable && !_.isEmpty(field.default)) {
        if (_.has(field, 'terms')) {
          field.terms = [];
          if (_.isArray(field.default)) {
            field.terms = field.default;
          } else {
            field.terms.push(field.default);
          }
        } else {
          field.range = [];
          if (_.isArray(field.default)) {
            field.range = field.default;
          } else {
            field.range.push(field.default);
          }
        }
      }


      if (field.inputType === 'nestedselect') {
        _.map(field.range, val => {
          return {
            value: val.value || val,
            label: val.value || val
          }
        });
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
