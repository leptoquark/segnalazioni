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

    static httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                   'Access-Control-Allow-Origin':'*',
                                   'Access-Control-Allow-Methods':'GET',
                                   'Access-Control-Allow-Headers':'Content-Type'})
      };
   
    constructor(private http: HttpClient) {
       this.baseUrl_appalti = EnvConfig.backendUrl+`/ws/appalti/`;
       this.baseUrl_personaGiuridica = EnvConfig.backendUrl+`/ws/personagiuridica/cf/`;
       this.baseUrl_authenticate = EnvConfig.backendUrl+`/authenticate/`;
    }

    async getInfoFromCigWait(cig: string): Promise<Cig>
    {
       let data = await this.http.get<Cig>(this.baseUrl_appalti+cig, RestDataSource.httpOptions).toPromise();
       return data;
    }

    async getInfoFromSAWait(sa: string): Promise<PersonaGiuridica>
    {
       let data = await this.http.get<PersonaGiuridica>(this.baseUrl_personaGiuridica+sa,RestDataSource.httpOptions).toPromise();
       return data;
    }

    async autheticate(username: string, password: string): Promise<JWT>
    {
       let auth = JSON.parse("{\"username\":\""+username+"\", \"password\":\""+password+"\"}");
       let data = await this.http.post<JWT>(this.baseUrl_authenticate,auth,RestDataSource.httpOptions).toPromise();
       RestDataSource.httpOptions.headers.set('Authorization', 'Bearer ' + data);
       return data;
    }
}