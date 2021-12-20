import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formio } from '@formio/angular';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
import { EnvConfig } from 'src/environments/environment';
import { Submission } from '../model/submission.model';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent  implements OnInit {
  http: any;

  ngOnInit(): void {
    var formio = new Formio(EnvConfig.appUrl+'/'+EnvConfig.formId+'/submission/'+this.sub.getId());
    formio.loadForm().then(function(form: any) {
      form.display = 'form';
      Formio.createForm(document.getElementById('formio-full'), form, {
        noDefaultSubmitButton: true,
        readOnly: true,
        renderMode: 'flat',
      }).then(function(instance) {
        formio.loadSubmission().then(function(submission: any) {
          instance.submission = submission;
        });
      });
    });

  }


  constructor(private route:Router, private sub: Submission)
  {

  }

  get submission(): string {
    return this.sub.getId();
  }

  get prot(): string {
    return this.sub.getProt();
  }



  refreshForm = new EventEmitter();
  form: any;

  public downloadAsPDF()
  {
    console.log("ID: "+this.sub.getId)
      FileSaver.saveAs(EnvConfig.backendUrl+
                        '/ws/report?id='+this.sub.getId(),
                        "ricevuta_"+this.sub.getId()+".pdf");
  }

  /*public downloadAsPDF()  
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
  }*/

  public edit()
  {
    var formio = new Formio(EnvConfig.appUrl+'/'+EnvConfig.formId+'/submission/'+this.sub.getId());
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