import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { Ausa } from "./ausa.model";

const PROTOCOL = "http";
const PORT = "3500";
const AUSA = "StazioniAppaltanti";

@Injectable()
export class RestDataSource {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/${AUSA}/`;
    }

    getInfoFromAusa(codiceAusa: string): Observable<Ausa> {
        return this.http.get<Ausa>(this.baseUrl+codiceAusa);
    }
}