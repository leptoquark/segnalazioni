import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscription, timer } from 'rxjs';
import { AusaRepository } from '../model/ausa.repository';
import { RestDataSource } from '../model/rest.datasource';
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
          'Add Another': 'Aggiungi Documento',
          'File Name': 'Nome del file',
          'Size': 'Dim.',
          'Save': 'Salva',
          'Cancel': 'Cancella',
          'Edit' : 'Modifica',
          'Delete': 'Cancella'
        }
    }
  }
  
  refreshForm = new EventEmitter();
  form: any;
  
  ngOnInit(): void {
   
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

       if (event.changed && event.changed.component.key === 'codiceAusa' && event.changed.value)  {
        if (event.changed.value.length >= 10){
          var submissionAux = event;
          
          submissionAux.data.codiceFiscale = this.repository.getCodiceFiscale(event.changed.value);
          submissionAux.data.denominazione = this.repository.getDenominazione(event.changed.value);

          if (event.changed.value==='1234567890')
          {
            submissionAux.data.codiceFiscale='1234567890123456'
            submissionAux.data.denominazione='Laziocrea S.p.A.'
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
  
  everySecond: Observable<number> = timer(0, 1000);
  private subscription: Subscription;

  constructor(public router:Router, public sub: Submission, private repository: AusaRepository){

    this.subscription = this.everySecond.subscribe((seconds) => {
      console.log("test");
    })

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