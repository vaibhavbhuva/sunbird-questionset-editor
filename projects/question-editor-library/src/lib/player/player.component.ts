import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'lib-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() questionMetaData: any;
  @Output() public toolbarEmitter: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  removeQuestion() {
    this.toolbarEmitter.emit({ button: { type: 'removeContent' } });
  }

  editQuestion() {
    this.toolbarEmitter.emit({ button: { type: 'editContent' } });
  }

}
