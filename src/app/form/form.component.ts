import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SegnalazioniRepository } from '../model/segnalazioni.repository';
import { Submission } from '../model/submission.model';
import { FormioComponent } from 'angular-formio';
import { EnvConfig } from "src/environments/environment";
import { AnyForJSON } from 'formiojs';

@Component({
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  @ViewChild('formEl')
  formEl!: FormioComponent[];
  myform: any;

  refreshForm = new EventEmitter();

  private jwtToken:string = "";

  private tmpPG!: AnyForJSON;

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
          'Drop files to attach,':'Aggiungere i file spostandoli in quest\'area,',
          'or':'oppure',
          'browse': 'cliccare qui e cercare il file da allegare',
          'No choices to choose from': 'nessuna selezione disponibile',
          'Type to search': 'testo da cercare',
          'Add Another': 'Aggiungi',
          'File Name': 'Nome del file',
          'Please save all rows before proceeding.': 'cliccare sul tasto \'salva\' prima di procedere',
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
  
  onError(error: any): void 
  {
    JSON.stringify(error);
    this.onTop;
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
      form: this.myform,
      submission: {
        data: submissionDraft
      }
    });
   
  }

  private titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
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


      submissionAux.codiceFiscale_sa='';
      submissionAux.denominazione_sa='';
      submissionAux.regione_appalti='';
      submissionAux.comune_appalti='';
      submissionAux.rup_='';
      submissionAux.cognome_rup='';
      submissionAux.descrizione_intervento_segnalazione='';
      submissionAux.importo_contrattuale='';

    }

    if (event.type === 'cerca_ente_cf'){

      let valcf = submissionAux.cf_amministrazione;
      if (!valcf)
        valcf = submissionAux.cf_amministrazione2;

      let response = null;
      try {
        response = (await this.repository.getResponseWaitPG(valcf,this.jwtToken))       
      } catch (error) {
        
      }

      let auxval = "<p class='p-3 mb-2 bg-danger text-dark font-weight-bold'>CODICE FISCALE NON CORRETTO O NON TROVATO</p>"
      
      if (response)
      {
        auxval = "<ul class='list-group list-group-flush'>"+
                   "<li class='list-group-item'>"+"<b>Denominazione:</b> "+this.clean(response.dati_identificativi.denominazione,'N.D')+"</li>"+
                   "<li class='list-group-item'>"+"<b>Codice Fiscale:</b> "+this.clean(response.dati_identificativi.codice_fiscale,'N.D.')+"</li>"+
                   "<li class='list-group-item'>"+"<b>Localizzazione:</b> "+
                      this.clean(response.dati_identificativi.localizzazione.citta.nome + " (" +
                                 response.dati_identificativi.localizzazione.provincia.nome + ")",'N.D.')+"</li>"+
                   "<li class='list-group-item'>"+"<b>Natura giuridica:</b> "+this.clean(response.dati_identificativi.natura_giuridica.descrizione,'N.D.')+"</li>"+
                   "</ul>";
                   
        submissionAux.cf_trovato = "TROVATO";
      }
      else
      submissionAux.cf_trovato = "NON_TROVATO";
      
      submissionAux.summary_cf = auxval;
      submissionAux.summary_cf2 = auxval;

      this.tmpPG = response;
    }

    if (event.type === 'conferma_selezione_amministrazione_rpct' || event.type === 'conferma_selezione_cf_rpct') {

        submissionAux.denominazione_rpct = this.clean(this.tmpPG.dati_identificativi.denominazione,'N.D.');
        submissionAux.cf_rpct = this.clean(this.tmpPG.dati_identificativi.codice_fiscale,'N.D.');

        let regione =
          (await this.repository.getResponseWaitRegioneFromProvincia(
            this.tmpPG.dati_identificativi.localizzazione.provincia.nome, this.jwtToken));
                
        submissionAux.regione_rpct = regione.nome;

        submissionAux.provincia_rpct = this.titleCaseWord(this.clean(this.tmpPG.dati_identificativi.localizzazione.provincia.nome,''));
        submissionAux.comune_rpct = this.titleCaseWord(this.clean(this.tmpPG.dati_identificativi.localizzazione.citta.nome,''));
        submissionAux.pec_rpct = this.clean(this.tmpPG.dati_identificativi.contatti.MAIL_PEC,'');
        submissionAux.mail_rpct = this.clean(this.tmpPG.dati_identificativi.contatti.EMAIL,'');

        submissionAux.telefono_rpct = this.clean(this.tmpPG.dati_identificativi.contatti.TELEFONO,'');  


        if (event.type === 'conferma_selezione_amministrazione_rpct')
        {
          submissionAux.summary_denominazione =
            submissionAux.summary_denominazione.split('list-group-item').join('list-group-item list-group-item-primary');
          submissionAux.cf_amministrazione = "";
        }
        else 
        {
          submissionAux.summary_cf =
            submissionAux.summary_cf.split('list-group-item').join('list-group-item list-group-item-primary');
          submissionAux.denominazione_amministrazione = "";
        }
    }

    if (event.type === 'conferma_selezione_amministrazione' || event.type === 'conferma_selezione_cf') {

      submissionAux.denominazione = this.clean(this.tmpPG.dati_identificativi.denominazione,'N.D.');
      submissionAux.cf = this.clean(this.tmpPG.dati_identificativi.codice_fiscale,'N.D.');

      let regione =
        (await this.repository.getResponseWaitRegioneFromProvincia(
          this.tmpPG.dati_identificativi.localizzazione.provincia.nome, this.jwtToken));
      submissionAux.regione= (regione.nome);

      submissionAux.provincia = this.titleCaseWord(this.clean(this.tmpPG.dati_identificativi.localizzazione.provincia.nome,''));
      submissionAux.comune = this.titleCaseWord(this.clean(this.tmpPG.dati_identificativi.localizzazione.citta.nome,''));
      submissionAux.pec = this.clean(this.tmpPG.dati_identificativi.contatti.MAIL_PEC,'');
      submissionAux.mail = this.clean(this.tmpPG.dati_identificativi.contatti.EMAIL,'');

      submissionAux.telefono = this.clean(this.tmpPG.dati_identificativi.contatti.TELEFONO,'');  


      if (event.type === 'conferma_selezione_amministrazione')
      {
        submissionAux.summary_denominazione2 =
          submissionAux.summary_denominazione2.split('list-group-item').join('list-group-item list-group-item-primary');
        submissionAux.cf_amministrazione2 = "";
      }
      else 
      {
        submissionAux.summary_cf2 =
          submissionAux.summary_cf2.split('list-group-item').join('list-group-item list-group-item-primary');
        submissionAux.denominazione_amministrazione2 = "";
      }
  }


    if (event.type === 'valida_cig')
    {
      submissionAux.query_cig=0;
      submissionAux.cancella_cig=0;
      this.refreshForm.emit({
        form: this.myform,
        submission: {
          data: submissionAux
        }
      });
      let response =  (await this.repository.getResponseWaitCig(event.data.cig,this.jwtToken));
      submissionAux.query_cig=1;


      this.refreshForm.emit({
        form: this.myform,
        submission: {
          data: submissionAux
        }
      });
      
     if (response.codice_risposta==='NOKCN' || response.codice_risposta==='' || response==null)
        submissionAux.cig_trovato=1;
      else
      {
        // responsePG rappresenta il contenuto proveniente dalla seconda richiesta a ws per la pg
        let responsePG =
          (await this.repository.getResponseWaitPG(response.stazione_appaltante.CF_AMMINISTRAZIONE_APPALTANTE,this.jwtToken));        

        submissionAux.cig_trovato=0;

        let aux = "<ul>";
        for (let data of responsePG.classificazioni) {
          aux = aux + "</li>"+data.codifica+"</li>";
        }
        aux = aux + "</ul>";
        

        submissionAux.sintesi_cig =  "<ul class='list-group list-group-flush'>"+
        "<li class='list-group-item'>"+"<b>Stazione Appaltante</b> "+this.clean(response.stazione_appaltante.DENOMINAZIONE_AMMINISTRAZIONE_APPALTANTE,'N.D.')+"</li>"+
        "<li class='list-group-item'>"+"<b>Localizzazione:</b> "+this.clean(response.stazione_appaltante.CITTA+' ('+response.stazione_appaltante.REGIONE+')','N.D.')+"</li>"+
        "<li class='list-group-item'>"+"<b>Natura giuridica:</b> "+this.clean(response.bando.OGGETTO_GARA,'N.D.')+"</li>"+
        "<li class='list-group-item'>"+"<b>Classificazioni:</b> "+this.clean(aux,'N.D.')+"</li>"+
        "</ul>";
        

        submissionAux.codiceFiscale_sa=response.stazione_appaltante.CF_AMMINISTRAZIONE_APPALTANTE;
        submissionAux.denominazione_sa=response.stazione_appaltante.DENOMINAZIONE_AMMINISTRAZIONE_APPALTANTE;
        submissionAux.regione_appalti=response.stazione_appaltante.REGIONE;
        submissionAux.comune_appalti=response.stazione_appaltante.CITTA;
        submissionAux.rup_=response.incaricati[0].NOME;
        submissionAux.cognome_rup=response.incaricati[0].COGNOME;
        submissionAux.descrizione_intervento_segnalazione=response.bando.OGGETTO_GARA;
        submissionAux.importo_contrattuale=response.bando.IMPORTO_COMPLESSIVO_GARA;
      }
    }

    this.refreshForm.emit({
      form: this.myform,
      submission: {
        data: submissionAux
      }
    });

  }

  private clean(val: string, nil: string)
  {
    if (val==='')
      return nil;
    else
      return val;
  }

  async onChange(event: any) { 


    if (event.changed && event.changed.component.key === 'codiceIdentificativoGaraCig' && event.changed.value)  {
     
      if (event.changed.value.length < 10 || event.changed.value.length > 10)
      {
        event.data.query_cig_aggiuntivo = 0;
        this.refreshForm.emit({
          form: this.myform,
          submission: {
            data: event.data
          }
        });
      }

      else if (event.changed.value.length === 10)

       {

        event.data.query_cig_aggiuntivo = 0;


        let response = (await this.repository.getResponseWaitCig(event.changed.value,this.jwtToken))       
        let response_aux : string = "<b>CIG: "+event.changed.value+"<b> - non presente in banca dati</b>";


        if (response.codice_risposta!=='NOKCN' && response.codice_risposta!=='' && response!=null)
        {
          response_aux = 
          "<ul class='list-group list-group-flush'>"+
          "<li class='list-group-item'>"+"<b>CIG:</b> "+this.clean(event.changed.value,'N.D.')+"</li>"+
          "<li class='list-group-item'>"+"<b>Stazione Appaltante</b> "+this.clean(response.stazione_appaltante.DENOMINAZIONE_AMMINISTRAZIONE_APPALTANTE,'N.D.')+"</li>"+
          "<li class='list-group-item'>"+"<b>Localizzazione:</b> "+this.clean(response.stazione_appaltante.CITTA+' ('+response.stazione_appaltante.REGIONE+')','N.D.')+"</li>"+
          "<li class='list-group-item'>"+"<b>Natura giuridica:</b> "+this.clean(response.bando.OGGETTO_GARA,'N.D.')+"</li>"+
          "</ul>";
        }
  
        event.data.sintesi_cig_aggiuntivo = response_aux;
        event.data.query_cig_aggiuntivo = 1;

          this.refreshForm.emit({
            form: this.myform,
            submission: {
              data: event.data
            }
          });
      }
    }

    if (event.changed && event.changed.component.key === 'selezione_ente' && event.changed.value)  {
      
      this.tmpPG = event.changed.value;

      let auxval = "<ul class='list-group list-group-flush'>"+
                   "<li class='list-group-item'>"+"<b>Denominazione:</b> "+this.clean(event.changed.value.dati_identificativi.denominazione,'N.D.')+"</li>"+
                   "<li class='list-group-item'>"+"<b>Codice Fiscale:</b> "+this.clean(event.changed.value.dati_identificativi.codice_fiscale,'N.D.')+"</li>"+
                   "<li class='list-group-item'>"+"<b>Localizzazione:</b> "+
                   this.clean(event.changed.value.dati_identificativi.localizzazione.citta.nome + " (" +
                              event.changed.value.dati_identificativi.localizzazione.provincia.nome + ")",'N.D.')+"</li>"+   
                   "<li class='list-group-item'>"+"<b>Natura giuridica:</b> "+this.clean(event.changed.value.dati_identificativi.natura_giuridica.descrizione,'N.D.')+"</li>"+
                   "</ul>";

      event.data.summary_denominazione = auxval;

        this.refreshForm.emit({
          form: this.myform,
          submission: {
            data: event.data
          }
        });
    }

    if (event.changed && event.changed.component.key === 'selezione_ente2' && event.changed.value)  {
      
      this.tmpPG = event.changed.value;

      let auxval = "<ul class='list-group list-group-flush'>"+
                   "<li class='list-group-item'>"+"<b>Denominazione:</b> "+this.clean(event.changed.value.dati_identificativi.denominazione,'N.D.')+"</li>"+
                   "<li class='list-group-item'>"+"<b>Codice Fiscale:</b> "+this.clean(event.changed.value.dati_identificativi.codice_fiscale,'N.D.')+"</li>"+
                   "<li class='list-group-item'>"+"<b>Localizzazione:</b> "+
                   this.clean(event.changed.value.dati_identificativi.localizzazione.citta.nome + " (" +
                              event.changed.value.dati_identificativi.localizzazione.provincia.nome + ")",'N.D.')+"</li>"+
                   "<li class='list-group-item'>"+"<b>Natura giuridica:</b> "+this.clean(event.changed.value.dati_identificativi.natura_giuridica.descrizione,'N.D.')+"</li>"+
                   "</ul>";

      event.data.summary_denominazione2 = auxval;

        this.refreshForm.emit({
          form: this.myform,
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
              form: this.myform,
              submission: {
                data: event.data
              }
            });
        }
      }

  }
  
  constructor(public router:Router, public sub: Submission, private repository: SegnalazioniRepository, private elem: ElementRef) {
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