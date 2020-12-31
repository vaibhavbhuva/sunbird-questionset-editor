import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() toolbarConfig: any;
  @Input() telemetryEventsInput: any;
  @Output() toolbarEmitter = new EventEmitter<any>();
  public preview = false;

  constructor() { }

  ngOnInit() { }

  buttonEmitter(event, button) {
    this.toolbarEmitter.emit({ event, button });
  }

}
