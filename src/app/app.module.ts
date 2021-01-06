import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuestionEditorLibraryModule } from 'question-editor-library';
import { AppComponent } from './app.component';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorBaseComponent } from './editor-base/editor-base.component';
import { QuestionBaseComponent } from './question-base/question-base.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorBaseComponent,
    QuestionBaseComponent
  ],
  imports: [
    BrowserModule,
    QuestionEditorLibraryModule,
    EditorRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
