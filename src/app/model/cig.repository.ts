import { Injectable } from "@angular/core";
import { EnvConfig } from "src/config";
import { Cig } from "./cig.model";
import { JWT } from "./jwt.model";
import { PersonaGiuridica } from "./persona-giuridica.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class CigRepository {

    private cig: Cig = new Cig();
    private personaGiuridica: PersonaGiuridica = new PersonaGiuridica();

    constructor(private datasource: RestDataSource) {

    }

    getResponseWaitPG(cf: string, jwt: string):Promise<PersonaGiuridica> {
        return this.datasource.getInfoFromSAWait(cf, jwt);
    }

    getResponseWaitCig(codice_cig: string, jwt: string) :Promise<Cig> {
        return this.datasource.getInfoFromCigWait(codice_cig, jwt);
    }

    authenticate():Promise<JWT> {
        return this.datasource.autheticate(EnvConfig.jwt_user, EnvConfig.jwt_password);
    }
}