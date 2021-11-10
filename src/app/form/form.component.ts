import { Component, EventEmitter, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AusaRepository } from '../model/ausa.repository';
import { Submission } from '../model/submission.model';

@Component({
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {

  options: Object = {
    submitMessage: "",
    disableAlerts: true,
    noAlerts: true,
    saveDraft: true ,
  };

  renderOptions: Object = {
    buttonSettings: {
      showCancel: false
    },
    breadcrumbSettings: {
      clickable:false
    },
    language: 'it',
    i18n: {
        it: {
          complete: 'Sottomissione completa',
          cancel: 'Cancella',
          next: 'Avanti',
          previous: 'Sezione Precedente',
          submit: 'Invia e completa la sottomissione',
          'Add Another': 'Aggiungi',
          'File Name': 'Nome del file',
          'Size': 'Dim.',
          'Save': 'Salva',
          'Cancel': 'Cancella',
          'Edit' : 'Modifica',
          'Delete': 'Cancella',
          'Yes:': 'Sì',
          'No': 'No',
          'Day': 'giorno',
          'Month': 'mese',
          'Year': 'anno',
          "january": "Gennaio",
          "february": "Febbraio",
          "march": "Marzo",
          "april": "Aprile",
          "may": "Maggio",
          "june": "Giugno",
          "july": "Luglio",
          "august": "Agosto",
          "september": "Settembre",
          "october": "Ottobre",
          "november": "Novembre",
          "december": "Dicembre"
        }
    }
  }
  
  refreshForm = new EventEmitter();
  form: any;
  
  ngOnInit(): void {
    window.scrollTo(0, 0);    
  }


  render(event: any) {

    let submissionDraft = "";
    let dataAux = localStorage.getItem("draft");
    if (dataAux != null)
      submissionDraft = JSON.parse(dataAux);

    this.refreshForm.emit({
      form: this.form,
      submission: {
        data: submissionDraft
      }
    });
   
  }


  customEvent(event: any)
  {
    /* azione per il salvataggio in bozza, nella localstorage, della sottomissione */
    if (event.type === 'salvabozza'){
      localStorage.setItem("draft",JSON.stringify(event.data));
    }
  }
  onChange(event: any) { 

       if (event.changed && event.changed.component.key === 'cig' && event.changed.value)  {
        if (event.changed.value.length >= 10){
          var submissionAux = event;
          
        /*  submissionAux.data.codiceFiscale = this.repository.getCodiceFiscale(event.changed.value);
          submissionAux.data.denominazione = this.repository.getDenominazione(event.changed.value);*/

          if (event.changed.value==='1234567890')
          {
            console.log(submissionAux)
            submissionAux.data.page3FieldsetDenominazione='CIG_DENOMINAZIONE'
            submissionAux.data.page3Fieldset4PanelColumnsCodiceFiscale='1234567890123456'

          }

        this.refreshForm.emit({
          form: this.form,
          submission: {
            data: submissionAux.data
          }
        });
      }
    }
  }
  
  constructor(public router:Router, public sub: Submission, private repository: AusaRepository, private renderer: Renderer2){


  }

  get submission() {
    return this.sub.getId();
  }

  setSubmission(id: any) {
    this.sub.setId(id);
  }

  onSubmit(submission: any) {
    this.sub.setId(submission._id);
    this.router.navigate(['/end']);
  }

}