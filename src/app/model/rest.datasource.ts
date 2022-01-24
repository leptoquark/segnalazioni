import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Cig } from "./cig.model";
import { PersonaGiuridica, PersoneGiuridiche } from "./persona-giuridica.model";
import { JWT } from "./jwt.model";
import { EnvConfig } from "src/environments/environment";
import { Regione } from "./localizzazione.model";
import { ProtocolloResponse } from "./protocollo.model";
import { Health } from "./health.model";
import { TranscodeResponse } from "./transocode.model";

@Injectable()
export class RestDataSource {
    private baseUrl_appalti: string;
    private baseUrl_personaGiuridica: string;
    private baseUrl_personaGiuridicaLike: string;
    private baseUrl_regione: string;
    private baseUrl_submissionHelper: string;
    private baseUrl_ambito: string;
    private baseUrl_contraente: string;

    private baseUrl_health: string;

    private baseUrl_authenticate: string;

       
    constructor(private http: HttpClient) {
       this.baseUrl_appalti = EnvConfig.backendUrl+`/ws/appalti/`;
       this.baseUrl_personaGiuridica = EnvConfig.backendUrl+`/ws/personagiuridica/cf/?cf=`;
       this.baseUrl_personaGiuridicaLike = EnvConfig.backendUrl+`/ws/personagiuridica/denominazione/?denominazioneLike=`;
       this.baseUrl_regione = EnvConfig.backendUrl+`/regioneFromProvincia?provincia=`;
       this.baseUrl_submissionHelper = EnvConfig.backendUrl+`/ws/protocollo?submissionId=`;
       this.baseUrl_ambito = EnvConfig.backendUrl+`/ws/transcode-ambito?code=`;
       this.baseUrl_contraente = EnvConfig.backendUrl+`/ws/transcode-contraente?code=`;
       
       this.baseUrl_health = EnvConfig.backendUrl+`/health`;
       this.baseUrl_authenticate = EnvConfig.backendUrl+`/authenticate`;
    }

    async getInfoFromCigWait(cig: string, jwt: string): Promise<Cig>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'GET',
                                    'Access-Control-Allow-Headers':'Content-Type',
                                    'Authorization':'Bearer '+jwt})
       };
       let data = await this.http.get<Cig>(this.baseUrl_appalti+cig,httpOptions).toPromise();
       return data;
    }

    async getAmbito(code: string, oggettoPrincipaleContratto: string, jwt: string): Promise<TranscodeResponse>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'GET',
                                    'Access-Control-Allow-Headers':'Content-Type',
                                    'Authorization':'Bearer '+jwt})
       };
       let data = await this.http.get<TranscodeResponse>(this.baseUrl_ambito+code+"&contratto="+oggettoPrincipaleContratto,httpOptions).toPromise();
       return data;
    }

    async getContraente(code: string, jwt: string): Promise<TranscodeResponse>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'GET',
                                    'Access-Control-Allow-Headers':'Content-Type',
                                    'Authorization':'Bearer '+jwt})
       };
       let data = await this.http.get<TranscodeResponse>(this.baseUrl_contraente+code,httpOptions).toPromise();
       return data;
    }

    async getSubmissionInvoice(id: string, jwt: string): Promise<ProtocolloResponse>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'GET',
                                    'Access-Control-Allow-Headers':'Content-Type',
                                    'Authorization':'Bearer '+jwt})
       };
       let data = await this.http.get<ProtocolloResponse>(this.baseUrl_submissionHelper+id,httpOptions).toPromise();
       return data;
    }
    
    async getInfoFromSAWait(sa: string, jwt: string): Promise<PersonaGiuridica>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'GET',
                                    'Access-Control-Allow-Headers':'Content-Type',
                                    'formio-auth-token':EnvConfig.formio_auth_token,
                                    'Authorization':'Bearer '+jwt})
       };

       let data = await this.http.get<PersonaGiuridica>(this.baseUrl_personaGiuridica+sa,httpOptions).toPromise();
       return data;
    }

    async getInfoFromSALikeWait(saLike: string, jwt: string): Promise<PersoneGiuridiche>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'GET',
                                    'Access-Control-Allow-Headers':'Content-Type',
                                    'formio-auth-token':EnvConfig.formio_auth_token,
                                    'Authorization':'Bearer '+jwt})
       };


       let data = await this.http.get<PersoneGiuridiche>(this.baseUrl_personaGiuridicaLike+saLike,httpOptions).toPromise();
       return data;
    }

    async getRegioneFromProvincia(provincia: string, jwt: string): Promise<Regione>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'GET',
                                    'Access-Control-Allow-Headers':'Content-Type',
                                    'Authorization':'Bearer '+jwt})
       };

       let data = await this.http.get<Regione>(this.baseUrl_regione+provincia,httpOptions).toPromise();
       return data;
    }

    async getHealthService(): Promise<Health>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'GET',
                                    'Access-Control-Allow-Headers':'Content-Type'})
       };


       let data = await this.http.get<Health>(this.baseUrl_health,httpOptions).toPromise();
       return data;
    }

    async autheticate(username: string, password: string): Promise<JWT>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'POST',
                                    'Access-Control-Allow-Headers':'Content-Type',
                                 })
       };

       let auth = JSON.parse("{\"username\":\""+username+"\", \"password\":\""+password+"\"}");
       let data = await this.http.post<JWT>(this.baseUrl_authenticate,auth,httpOptions).toPromise();
       return data;
    }
}