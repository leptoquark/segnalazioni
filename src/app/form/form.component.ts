import { Component, EventEmitter, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CigRepository } from '../model/cig.repository';
import { Submission } from '../model/submission.model';
import { Cig } from '../model/cig.model'

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
    this.refreshForm.emit({
      form: this.form
    });
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
    let submissionAux = event.data;

    /* azione per il salvataggio in bozza, nella localstorage, della sottomissione */
    if (event.type === 'salvabozza'){
      localStorage.setItem("draft",JSON.stringify(event.data));
    }

    if (event.type === 'cancella_cig'){
      submissionAux.cig_trovato=1;
      submissionAux.cig="";
    }

    if (event.type === 'nextPage')
    {
      window.scrollTo(0,0)
    }

    if (event.type === 'valida_cig')
    {
      let response = this.repository.getResponse(event.data.cig).response;

      if (response.codice_risposta==='NOKCN' || response.codice_risposta==='')
        submissionAux.cig_trovato=1;
      else
      {
        submissionAux.cig_trovato=0;
        console.log("CF: "+response.stazione_appaltante.CF_AMMINISTRAZIONE_APPALTANTE);
        submissionAux.page3Fieldset4PanelColumnsCodiceFiscale=response.stazione_appaltante.CF_AMMINISTRAZIONE_APPALTANTE;
        console.log("Denominazione: "+response.stazione_appaltante.DENOMINAZIONE_AMMINISTRAZIONE_APPALTANTE);
        submissionAux.page3FieldsetDenominazione=response.stazione_appaltante.DENOMINAZIONE_AMMINISTRAZIONE_APPALTANTE;
        console.log("Comune: "+response.stazione_appaltante.ISTAT_COMUNE);
        submissionAux.page3Fieldset4PanelColumnsComune=response.stazione_appaltante.ISTAT_COMUNE;
        console.log("Nome RUP: "+response.incaricati[0].NOME);
        submissionAux.page3PanelColumnsNome=response.incaricati[0].NOME;
        console.log("Cognome RUP: "+response.incaricati[0].COGNOME);
        submissionAux.page3PanelColumnsCognome=response.incaricati[0].COGNOME;
        console.log("Oggetto gara: "+response.bando.OGGETTO_GARA);
        submissionAux.page3FieldsetColumnsDescrizioneIntervento=response.bando.OGGETTO_GARA;
        console.log("importo gara:"+response.bando.IMPORTO_COMPLESSIVO_GARA);
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

  onChange(event: any) { 
       if (event.changed && event.changed.component.key === 'cig' && event.changed.value)  {
        if (event.changed.value.length >= 10){
          event.data.ricerca_cig=1;
          this.repository.getResponse(event.data.cig).response;
          event.data.cig=event.data.cig.substring(0, 10);
        }

        this.refreshForm.emit({
          form: this.form,
          submission: {
            data: event.data
          }
        });
      }

  }
  
  constructor(public router:Router, public sub: Submission, private repository: CigRepository) {
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