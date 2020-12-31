import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
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
import { CommonFormElementsModule } from 'v-dynamic-forms';
import { SuiModalModule} from 'ng2-semantic-ui';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [QuestionEditorLibraryComponent, EditorComponent, QuestionComponent, HeaderComponent,
  TreeComponent, AnswerComponent, OptionsComponent, QuestionSetComponent, PlayerComponent, TemplateComponent],
  imports: [
    CommonModule, FormsModule, CommonFormElementsModule, SuiModalModule, HttpClientModule
  ],
  exports: [QuestionEditorLibraryComponent, EditorComponent]
})
export class QuestionEditorLibraryModule { }
