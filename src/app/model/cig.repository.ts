import { Injectable } from "@angular/core";
import { Cig } from "./cig.model";
import { PersonaGiuridica } from "./persona-giuridica.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class CigRepository {

    private cig: Cig = new Cig();
    private personaGiuridica: PersonaGiuridica = new PersonaGiuridica();

    constructor(private datasource: RestDataSource) {

    }

    getResponseWaitPG(cf: string):Promise<PersonaGiuridica> {
        return this.datasource.getInfoFromSAWait(cf);
    }

    getResponseWaitCig(codice_cig: string) :Promise<Cig> {
        return this.datasource.getInfoFromCigWait(codice_cig);
    }
}