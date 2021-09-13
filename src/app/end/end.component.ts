import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formio } from '@formio/angular';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
import { AppConfig } from 'src/config';
import { Submission } from '../model/submission.model';

@Component({
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent  implements OnInit {

  ngOnInit(): void {
    
    var formio = new Formio(AppConfig.appUrl+'/segnalazione/submission/'+this.sub.getId());
    formio.loadForm().then(function(form: any) {
      form.display = 'form';
      Formio.createForm(document.getElementById('formio-full'), form, {
        readOnly: true,
        renderMode: 'html',
      }).then(function(instance) {
        formio.loadSubmission().then(function(submission: any) {
          instance.submission = submission;
        });
      });
    });
  }

  constructor(private route:Router, private sub: Submission){

  }

  get submission(): string {
    return this.sub.getId();
  }

  options: Object = {
    readOnly: true,
    renderMode: 'html',
    flattened: true,
  };

  refreshForm = new EventEmitter();
  form: any;

  public downloadAsPDF()  
  {
    var data = document.getElementById('content');  
    html2canvas(data as HTMLElement).then(canvas => {
        var imgWidth = 208; 
        var pageHeight = 295;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF('p', 'mm');
        var position = 0;
        const contentDataURL = canvas.toDataURL('image/png')  

        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save( 'submission.pdf');
    });  
  }

  public edit()
  {
    var formio = new Formio(AppConfig.appUrl+'/segnalazione/submission/'+this.sub.getId());
    formio.loadForm().then(function(form: any) {
      form.display = 'form';
      Formio.createForm(document.getElementById('formio-full'), form, {
        renderMode: 'form',
        readOnly: false
      }).then(function(instance) {
        formio.loadSubmission().then(function(submission: any) {
          instance.submission = submission;
        });
      });
    });
  }
}