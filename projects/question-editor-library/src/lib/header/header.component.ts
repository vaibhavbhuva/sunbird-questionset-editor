import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditorTelemetryService } from '../services';
@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() toolbarConfig: any;
  @Output() toolbarEmitter = new EventEmitter<any>();
  public preview = false;

  constructor(public telemetryService: EditorTelemetryService) {}

  ngOnInit() { }

  buttonEmitter(event, button) {
    this.toolbarEmitter.emit({ event, button });
  }

}
