import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuestionEditorLibraryModule } from 'question-editor-library';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    QuestionEditorLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
