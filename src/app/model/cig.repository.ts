import { Injectable } from "@angular/core";
import { Cig } from "./cig.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class CigRepository {

    private cig: Cig = new Cig();

    constructor(private datasource: RestDataSource) {

    }

    getResponseWait(codice_cig: string) :any {
        return this.datasource.getInfoFromCigWait(codice_cig);
    }


    getResponse(codice_cig: string): any{
        this.datasource.getInfoFromCig(codice_cig).subscribe(data =>
         {
            this.cig.response = data;
         });

        return this.cig;        
    }
}