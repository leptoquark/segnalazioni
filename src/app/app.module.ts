import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormioAppConfig, FormioModule } from '@formio/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppConfig } from 'src/environments/environment';

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
    FormsModule,
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
