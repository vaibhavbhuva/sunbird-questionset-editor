import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonFormElementsModule } from 'v-dynamic-forms';
import { SuiModalModule, SuiDropdownModule, SuiTabsModule, SuiPopupModule } from 'v-sb-semantic-ui';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';
import { QuestionEditorLibraryComponent } from './question-editor-library.component';
import { EditorComponent, QuestionComponent, HeaderComponent, TreeComponent, AnswerComponent,
  OptionsComponent, QuestionSetComponent, PlayerComponent, TemplateComponent, CkeditorToolComponent, LibraryComponent,
  LibraryPlayerComponent , LibraryListComponent, LibraryFilterComponent} from './components';
import { QumlLibraryModule } from '@project-sunbird/sunbird-quml-player';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { TelemetryInteractDirective } from './directives';

@NgModule({
  declarations: [QuestionEditorLibraryComponent, EditorComponent, QuestionComponent, HeaderComponent,
  TreeComponent, AnswerComponent, OptionsComponent, QuestionSetComponent, PlayerComponent, TemplateComponent, CkeditorToolComponent,
  TelemetryInteractDirective,
  LibraryComponent,
  LibraryPlayerComponent,
  LibraryListComponent,
  LibraryFilterComponent],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild([]), CommonFormElementsModule, InfiniteScrollModule,
    HttpClientModule, SuiModalModule, SuiDropdownModule, SuiTabsModule, SuiPopupModule,  QumlLibraryModule, CarouselModule.forRoot()
  ],
  exports: [QuestionEditorLibraryComponent, EditorComponent, QuestionComponent]
})
export class QuestionEditorLibraryModule { }
