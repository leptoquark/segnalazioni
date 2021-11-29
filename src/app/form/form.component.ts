import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CigRepository } from '../model/cig.repository';
import { Submission } from '../model/submission.model';
import { FormioComponent } from 'angular-formio';
import { EnvConfig } from "src/environments/environment";
import { EventManager } from '@angular/platform-browser';

@Component({
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {
  @ViewChild('formEl')
  formEl!: FormioComponent;
  form: any;

  refreshForm = new EventEmitter();

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


  private clean(val: string)
  {
    if (val==='')
      return "-";
    else
      return val;
  }

  async onChange(event: any) { 


    if (event.changed && event.changed.component.key === 'denominazione_amministrazione' && event.changed.value)  {

      console.log("changed-value: "+event.changed.value)

      event.data.cerca_buntton_val = 0;

        this.refreshForm.emit({
          form: this.form,
          submission: {
            data: event.data
          }
        });

    }




    if (event.changed && event.changed.component.key === 'selezione_ente' && event.changed.value)  { 

      let auxval = "<ul class='list-group list-group-flush'>"+
                   "<li class='list-group-item'>"+"Codice Fiscale: "+this.clean(event.changed.value.dati_identificativi.codice_fiscale)+"</li>"+
                   "<li class='list-group-item'>"+"Partita IVA: "+this.clean(event.changed.value.dati_identificativi.partita_iva)+"</li>"+
                   "<li class='list-group-item'>"+"Denominazione: "+this.clean(event.changed.value.dati_identificativi.partita_iva)+"</li>"+
                   "<li class='list-group-item'>"+"Natura giuridica: "+this.clean(event.changed.value.dati_identificativi.natura_giuridica.descrizione)+"</li>"+
                   "</ul>";

      event.data.summary_denominazione = auxval;

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