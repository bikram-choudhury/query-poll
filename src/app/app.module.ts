import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { QueryComponent } from './master/query/query.component';
import { AppRoutes } from './app.routing';

import { QueryService } from './master/service/query.service';
import { ViewQueryComponent } from './master/view-query/view-query.component';

@NgModule({
  declarations: [
    AppComponent,
    QueryComponent,
    ViewQueryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    NgbModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [ QueryService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
