import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { Observable, of } from 'rxjs';
import { catchError,  tap, delay } from 'rxjs/operators';

import { Cig } from "./cig.model";

const PROTOCOL = "http";
const PORT = "3500";
const AUSA = "StazioniAppaltanti";

@Injectable()
export class RestDataSource {
    baseUrl: string;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                   'Access-Control-Allow-Origin':'*',
                                   'Access-Control-Allow-Methods':'GET',
                                   'Access-Control-Allow-Headers':'Content-Type'})
      };
    

    constructor(private http: HttpClient) {
       // this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/${AUSA}/`;
       this.baseUrl = `http://segnalazioni-backend-segnalazioni-ril.apps.ocp.premaster.local/ws/appalti/`;
       //this.baseUrl = `http://localhost:8080/ws/appalti/`;
       //this.baseUrl = `http://localhost:8080/appalti-test?cig=`;
    }

    
    async getInfoFromCigWait(cig: string): Promise<Cig>
    {
       console.log("attesa asincrona per cig: "+cig);
       let data = await this.http.get<Cig>(this.baseUrl+cig, this.httpOptions).toPromise();
       console.log("INFO:"+JSON.stringify(data));
       console.log("CR:"+data.codice_risposta);
       console.log("AMM:"+data.stazione_appaltante.DENOMINAZIONE_AMMINISTRAZIONE_APPALTANTE);
       return data;
    }
}