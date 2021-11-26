import { Component, ElementRef, EventEmitter, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CigRepository } from '../model/cig.repository';
import { Submission } from '../model/submission.model';
import { FormioComponent } from 'angular-formio';
import { EnvConfig } from "src/environments/environment";


import * as $ from 'jquery';

@Component({
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {
  @ViewChild('formEl')
  formEl!: FormioComponent;

  refreshForm = new EventEmitter();
  form: any;

  private jwtToken:string = "";

  options: Object = {
    submitMessage: "",
    disableAlerts: true,
    noAlerts: true,
    saveDraft: true ,
  };

  src: string = EnvConfig.appUrl+"/"+EnvConfig.formId;
  
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
  
  ngOnInit(): void {

  }

  async formLoad(event: any): Promise<void> {
    this.jwtToken = (await this.repository.authenticate()).token;
  }

  onTop(): void {
    window.scrollTo(0,0);

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
  async customEvent(event: any)
  {
    let submissionAux = event.data;

    /* azione per il salvataggio in bozza, nella localstorage, della sottomissione */
    if (event.type === 'salvabozza'){
      localStorage.setItem("draft",JSON.stringify(event.data));
    }

    if (event.type === 'cancella_cig'){
      submissionAux.cancella_cig=1;
      submissionAux.cig_trovato=1;
      submissionAux.cig="";
    }

    if (event.type === 'valida_cig')
    {

      submissionAux.cancella_cig=0;
      let response =  (await this.repository.getResponseWaitCig(event.data.cig,this.jwtToken));
      
     if (response.codice_risposta==='NOKCN' || response.codice_risposta==='' || response==null)
        submissionAux.cig_trovato=1;
      else
      {
        console.log("Ricerca per: "+response.stazione_appaltante.CF_AMMINISTRAZIONE_APPALTANTE);
        let responsePG =
          (await this.repository.getResponseWaitPG(response.stazione_appaltante.CF_AMMINISTRAZIONE_APPALTANTE,this.jwtToken));
        submissionAux.cig_trovato=0;
        submissionAux.page3Fieldset4PanelColumnsCodiceFiscale=response.stazione_appaltante.CF_AMMINISTRAZIONE_APPALTANTE;
        submissionAux.page3FieldsetDenominazione=response.stazione_appaltante.DENOMINAZIONE_AMMINISTRAZIONE_APPALTANTE;
        submissionAux.page3Fieldset4PanelColumnsComune=response.stazione_appaltante.CITTA+' ('+response.stazione_appaltante.REGIONE+')';
        submissionAux.page3PanelColumnsNome=response.incaricati[0].NOME;
        submissionAux.page3PanelColumnsCognome=response.incaricati[0].COGNOME;
        submissionAux.page3FieldsetColumnsDescrizioneIntervento=response.bando.OGGETTO_GARA;
        submissionAux.page3FieldsetColumnsNumber2=response.bando.IMPORTO_COMPLESSIVO_GARA;
      }
    }

    this.refreshForm.emit({
      form: this.form,
      submission: {
        data: submissionAux
      }
    });

  }

  private currentSegnalazione: string = "";

  onChange(event: any) { 

    if (event.changed && event.changed.component.key === 'appalti' && event.changed.value==='appalti')  {
      event.data.area_survey = "appalti";
      this.refreshForm.emit({
        form: this.form,
        submission: {
          data: event.data
        }
      });
    }
    if (event.changed && event.changed.component.key === 'anticorruzione' && event.changed.value==='anticorruzione')  {
      event.data.area_survey = "anticorruzione";
      this.refreshForm.emit({
        form: this.form,
        submission: {
          data: event.data
        }
      });
    }
    if (event.changed && event.changed.component.key === 'incarichi' && event.changed.value==='incarichi')  {
      event.data.area_survey = "incarichi";
      this.refreshForm.emit({
        form: this.form,
        submission: {
          data: event.data
        }
      });
    }
    if (event.changed && event.changed.component.key === 'trasparenza' && event.changed.value==='trasparenza')  {
      event.data.area_survey = "trasparenza";
      this.refreshForm.emit({
        form: this.form,
        submission: {
          data: event.data
        }
      });
    }

       if (event.changed && event.changed.component.key === 'cig' && event.changed.value)  {
          if (event.changed.value.length > 10){
            event.data.ricerca_cig=1;
            event.data.cig=event.data.cig.substring(0, 10);

          this.refreshForm.emit({
            form: this.form,
            submission: {
              data: event.data
            }
          });
        }
      }

  }
  
  constructor(public router:Router, public sub: Submission, private repository: CigRepository, private elem: ElementRef) {
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