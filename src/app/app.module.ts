import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { NotesComponent } from './notes/notes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UpdateNoteComponent } from './update-note/update-note.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const appRoutes: Routes =[
  { path: '', component: MainComponent},
  { path: 'notes', component: NotesComponent},
  { path: 'form', component: NoteFormComponent},
  { path: 'update', component: UpdateNoteComponent},
  { path: 'about', component: AboutComponent}
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NoteFormComponent,
    NotesComponent,
    UpdateNoteComponent,
    NavBarComponent,
    AboutComponent,
    MainComponent,
  ],
  imports: [ BrowserModule, 
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'ru'
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
