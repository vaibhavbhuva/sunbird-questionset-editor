import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorBaseComponent } from './editor-base/editor-base.component';
import { QuestionBaseComponent } from './question-base/question-base.component';

const routes: Routes = [
  {
    path: 'questionSet/:questionSetId', component: EditorBaseComponent, pathMatch: 'full',
  },
  {
    path: 'questionSet/:questionSetId/question', component: QuestionBaseComponent, pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
