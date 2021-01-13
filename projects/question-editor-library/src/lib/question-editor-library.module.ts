import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonFormElementsModule } from 'v-dynamic-forms';
import { SuiModule } from 'v-sb-semantic-ui';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';
import { QuestionEditorLibraryComponent } from './question-editor-library.component';
import { EditorComponent } from './editor/editor.component';
import { QuestionComponent } from './question/question.component';
import { HeaderComponent } from './header/header.component';
import { TreeComponent } from './tree/tree.component';
import { AnswerComponent } from './answer/answer.component';
import { OptionsComponent } from './options/options.component';
import { QuestionSetComponent } from './question-set/question-set.component';
import { PlayerComponent } from './player/player.component';
import { TemplateComponent } from './template/template.component';
import {CkeditorToolComponent} from './ckeditor-tool/ckeditor-tool.component';
import { QumlLibraryModule } from '@project-sunbird/sunbird-quml-player';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { TelemetryInteractDirective } from './directives';


@NgModule({
  declarations: [QuestionEditorLibraryComponent, EditorComponent, QuestionComponent, HeaderComponent,
  TreeComponent, AnswerComponent, OptionsComponent, QuestionSetComponent, PlayerComponent, TemplateComponent, CkeditorToolComponent,
  TelemetryInteractDirective],
  imports: [
    CommonModule, FormsModule, RouterModule.forRoot([]), CommonFormElementsModule, InfiniteScrollModule,
    HttpClientModule, SuiModule,  QumlLibraryModule, CarouselModule.forRoot()
  ],
  exports: [QuestionEditorLibraryComponent, EditorComponent, QuestionComponent]
})
export class QuestionEditorLibraryModule { }
