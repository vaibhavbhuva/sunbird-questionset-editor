import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonFormElementsModule } from 'v-dynamic-forms';
import { SuiModule } from 'v-sb-semantic-ui';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';
import { QuestionEditorLibraryComponent } from './question-editor-library.component';
import { EditorComponent, QuestionComponent, HeaderComponent, TreeComponent, AnswerComponent,
  OptionsComponent, QuestionSetComponent, PlayerComponent, TemplateComponent, CkeditorToolComponent} from './components';
import { QumlLibraryModule } from '@project-sunbird/sunbird-quml-player';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { TelemetryInteractDirective } from './directives';
import { ToasterService } from './services';


@NgModule({
  providers: [ToasterService],
  declarations: [QuestionEditorLibraryComponent, EditorComponent, QuestionComponent, HeaderComponent,
  TreeComponent, AnswerComponent, OptionsComponent, QuestionSetComponent, PlayerComponent, TemplateComponent, CkeditorToolComponent,
  TelemetryInteractDirective],
  imports: [
    CommonModule, FormsModule, CommonFormElementsModule, InfiniteScrollModule,
    HttpClientModule, SuiModule,  QumlLibraryModule, CarouselModule.forRoot()
  ],
  exports: [QuestionEditorLibraryComponent, EditorComponent, QuestionComponent]
})
export class QuestionEditorLibraryModule { }
