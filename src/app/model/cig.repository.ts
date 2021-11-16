import { Injectable } from "@angular/core";
import { Cig } from "./cig.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class CigRepository {

    private cig: Cig = new Cig();

    constructor(private datasource: RestDataSource) {

    }

    getResponseWait(codice_cig: string) :Promise<Cig> {
        return this.datasource.getInfoFromCigWait(codice_cig);
    }
}