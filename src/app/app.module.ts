import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormioAppConfig, FormioModule } from '@formio/angular';
import { Form } from 'formiojs';
import { AppConfig } from 'src/config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EndComponent } from './end/end.component';
import { FormComponent } from './form/form.component';
import { ModelModule } from './model/model.module';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    EndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormioModule,
    CommonModule,
    ModelModule,
    RouterModule.forRoot([
      {path: "end", component: EndComponent},
      {path: "form", component: FormComponent},
      {path: "**", redirectTo: "/form"}
    ])
  ],
  providers: [
    {provide: FormioAppConfig, useValue: AppConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
