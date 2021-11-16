import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { Observable, of } from 'rxjs';
import { catchError,  tap, delay } from 'rxjs/operators';

import { Cig } from "./cig.model";
import { PersonaGiuridica } from "./persona-giuridica.model";

@Injectable()
export class RestDataSource {
    baseUrl_appalti: string;
    baseUrl_personaGiuridica: string;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                   'Access-Control-Allow-Origin':'*',
                                   'Access-Control-Allow-Methods':'GET',
                                   'Access-Control-Allow-Headers':'Content-Type'})
      };
    
    constructor(private http: HttpClient) {
       // this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/${AUSA}/`;
       this.baseUrl_appalti = `http://segnalazioni-backend-segnalazioni-ril.apps.ocp.premaster.local/ws/appalti/`;
       this.baseUrl_personaGiuridica = `http://segnalazioni-backend-segnalazioni-ril.apps.ocp.premaster.local/ws/personagiuridica/cf`;
       //this.baseUrl = `http://localhost:8080/ws/appalti/`;
       //this.baseUrl = `http://localhost:8080/appalti-test?cig=`;
    }

    async getInfoFromCigWait(cig: string): Promise<Cig>
    {
       let data = await this.http.get<Cig>(this.baseUrl_appalti+cig, this.httpOptions).pipe().toPromise();
       return data;
    }

    async getInfoFromSAWait(sa: string): Promise<PersonaGiuridica>
    {
       let data = await this.http.get<PersonaGiuridica>(this.baseUrl_personaGiuridica+sa, this.httpOptions).pipe().toPromise();
       return data;
    }
}