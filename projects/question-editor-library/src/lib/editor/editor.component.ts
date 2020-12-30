import { Component, Input, OnInit } from '@angular/core';
import { EditorConfig } from '../question-editor-library-interface';

@Component({
  selector: 'lib-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @Input() editorConfig: EditorConfig | undefined;
  constructor() { }

  ngOnInit() {
    console.log('QuestionSet config', this.editorConfig);
  }

}
