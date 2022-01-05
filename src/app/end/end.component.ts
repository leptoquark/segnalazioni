import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formio } from '@formio/angular';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
import { EnvConfig } from 'src/environments/environment';
import { Submission } from '../model/submission.model';
import { SegnalazioniRepository } from '../model/segnalazioni.repository';


declare var require: any
const FileSaver = require('file-saver');

@Component({
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent  implements OnInit {
  http: any;

  private jwtToken:string = "";

  async ngOnInit(): Promise<void> {

   if (this.sub.getId())
    {
      console.log("ID: "+this.sub.getId);
      console.log("Protocollo: "+this.sub.getProt);
      console.log("SYNC: "+this.sub.getSync);

      this.jwtToken = (await this.repository.authenticate()).token;

      // Inserire la logica di sottomissione asincrona
      if (this.sub.getSync())
        this.sub.setProt((await this.repository.getResponseWaitProtocollo(this.sub.getId(),this.jwtToken)).numeroProtocollo);
      else
        this.sub.setProt("DA ASSEGNARE");

      var formio = new Formio(EnvConfig.appUrl+'/'+EnvConfig.formId+'/submission/'+this.sub.getId());
      formio.loadForm().then(function(form: any) {
        form.display = 'form';
        Formio.createForm(document.getElementById('formio-full'), form, {
          buttonSettings: {
            showCancel: false,
            showSubmit: false
          },
          noDefaultSubmitButton: true,
          readOnly: true,
         // renderMode: 'html',
          flatten: true,
        }).then(function(instance) {
            formio.loadSubmission().then(function(submission: any) {
            instance.submission = submission;
          });
        })
      });
    } else
    {
      this.route.navigate(['/form']);
    }
  }


  constructor(private route:Router, private sub: Submission, private repository: SegnalazioniRepository)
  {

  }

  get submission(): string {
    return this.sub.getId();
  }

  prot(): string {
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

  public getPdfLink()
  {
    if (this.sub.getId())
    {
      console.log("url per pdf: "+EnvConfig.backendUrl+'/ws/report?id='+this.sub.getId())
      return (EnvConfig.backendUrl+'/ws/report?id='+this.sub.getId());
    }
    return "";
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
        renderMode: 'flat',
        readOnly: false
      }).then(function(instance) {
        formio.loadSubmission().then(function(submission: any) {
          instance.submission = submission;
        });
      });
    });
  }
}