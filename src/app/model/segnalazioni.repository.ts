import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EnvConfig } from "src/environments/environment";
import { Cig } from "./cig.model";
import { Health } from "./health.model";
import { JWT } from "./jwt.model";
import { Regione } from "./localizzazione.model";
import { PersonaGiuridica, PersoneGiuridiche } from "./persona-giuridica.model";
import { ProtocolloResponse } from "./protocollo.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class SegnalazioniRepository {

    private cig: Cig = new Cig();
    private personaGiuridica: PersonaGiuridica = new PersonaGiuridica();
    private personeGiuridiche: PersoneGiuridiche = new PersoneGiuridiche();

    constructor(private datasource: RestDataSource) {

    }

    getResponseWaitPG(cf: string, jwt: string):Promise<PersonaGiuridica> {
        return this.datasource.getInfoFromSAWait(cf, jwt);
    }

    getResponseWaitPGLike(cf: string, jwt: string):Promise<PersoneGiuridiche> {
        return this.datasource.getInfoFromSALikeWait(cf, jwt);
    }

    getResponseWaitCig(codice_cig: string, jwt: string) :Promise<Cig> {
        return this.datasource.getInfoFromCigWait(codice_cig, jwt);
    }

    getResponseWaitRegioneFromProvincia(provincia: string, jwt: string) :Promise<Regione> {
        return this.datasource.getRegioneFromProvincia(provincia, jwt);
    }

    getResponseWaitProtocollo(id: string, jwt: string) : Promise<ProtocolloResponse> {
        return this.datasource.getSubmissionInvoice(id,jwt);
    }

    health():Promise<Health> {
        return this.datasource.getHealthService();
    }

    authenticate():Promise<JWT> {
        return this.datasource.autheticate(EnvConfig.jwt_user, EnvConfig.jwt_password);
    }
}