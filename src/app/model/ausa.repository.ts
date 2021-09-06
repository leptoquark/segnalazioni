import { Injectable } from "@angular/core";
import { Ausa } from "./ausa.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class AusaRepository {

    private ausa: Ausa = new Ausa();

    constructor(private datasource: RestDataSource) {

    }

    getDenominazione(codiceAusa: string): string{

        this.datasource.getInfoFromAusa(codiceAusa).subscribe(data =>
            {
              this.ausa.codiceFiscale = data.codiceFiscale;
              this.ausa.denominazione = data.denominazione;
              this.ausa.id = data.id;
            });

        return this.ausa.denominazione ;        
    }

    getCodiceFiscale(codiceAusa: string): string{
        this.datasource.getInfoFromAusa(codiceAusa).subscribe(data =>
            {
              this.ausa.codiceFiscale = data.codiceFiscale;
              this.ausa.denominazione = data.denominazione;
              this.ausa.id = data.id;
            });

        return this.ausa.codiceFiscale;   
    }
}

