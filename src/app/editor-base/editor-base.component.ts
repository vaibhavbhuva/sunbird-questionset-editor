import { Component, OnInit } from '@angular/core';
import { Config } from '../data';
@Component({
  selector: 'app-editor-base',
  templateUrl: './editor-base.component.html',
  styleUrls: ['./editor-base.component.scss']
})
export class EditorBaseComponent implements OnInit {
  editorConfig = Config;
  constructor() { }

  ngOnInit() {
  }

}
