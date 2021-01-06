import { Component, OnInit } from '@angular/core';
import { Config } from '../data';

@Component({
  selector: 'app-question-base',
  templateUrl: './question-base.component.html',
  styleUrls: ['./question-base.component.scss']
})
export class QuestionBaseComponent implements OnInit {
  editorConfig = Config;
  constructor() { }

  ngOnInit() {
  }

}
