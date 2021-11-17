import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Cig } from "./cig.model";
import { PersonaGiuridica } from "./persona-giuridica.model";
import { EnvConfig } from "src/config";
import { JWT } from "./jwt.model";

@Injectable()
export class RestDataSource {
    baseUrl_appalti: string;
    baseUrl_personaGiuridica: string;
    baseUrl_authenticate: string;

       
    constructor(private http: HttpClient) {
       this.baseUrl_appalti = EnvConfig.backendUrl+`/ws/appalti/`;
       this.baseUrl_personaGiuridica = EnvConfig.backendUrl+`/ws/personagiuridica/cf/`;
       this.baseUrl_authenticate = EnvConfig.backendUrl+`/authenticate/`;
    }

    async getInfoFromCigWait(cig: string, jwt: string): Promise<Cig>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'GET',
                                    'Access-Control-Allow-Headers':'Content-Type',
                                    'Authotization':'Bearer'+jwt})
       };
       let data = await this.http.get<Cig>(this.baseUrl_appalti+cig,httpOptions).toPromise();
       return data;
    }

    async getInfoFromSAWait(sa: string, jwt: string): Promise<PersonaGiuridica>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'GET',
                                    'Access-Control-Allow-Headers':'Content-Type',
                                    'Authotization':'Bearer'+jwt})
       };

       let data = await this.http.get<PersonaGiuridica>(this.baseUrl_personaGiuridica+sa,httpOptions).toPromise();
       return data;
    }

    async autheticate(username: string, password: string): Promise<JWT>
    {
      let httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin':'*',
                                    'Access-Control-Allow-Methods':'POST',
                                    'Access-Control-Allow-Headers':'Content-Type'})
       };

       let auth = JSON.parse("{\"username\":\""+username+"\", \"password\":\""+password+"\"}");
       let data = await this.http.post<JWT>(this.baseUrl_authenticate,auth,httpOptions).toPromise();
       return data;
    }
}