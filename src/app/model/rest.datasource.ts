import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { Observable, of } from 'rxjs';
import { catchError,  tap, delay } from 'rxjs/operators';

import { Cig } from "./cig.model";

const PROTOCOL = "http";
const PORT = "3500";
const AUSA = "StazioniAppaltanti";

@Injectable()
export class RestDataSource {
    baseUrl: string;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                   'Access-Control-Allow-Origin':'*',
                                   'Access-Control-Allow-Methods':'GET',
                                   'Access-Control-Allow-Headers':'Content-Type'})
      };
    

    constructor(private http: HttpClient) {
       // this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/${AUSA}/`;
       this.baseUrl = `http://segnalazioni-backend-segnalazioni-ril.apps.ocp.premaster.local/ws/appalti/`;
       //this.baseUrl = `http://localhost:8080/ws/appalti/`;
       //this.baseUrl = `http://localhost:8080/appalti-test?cig=`;
    }

    
    async getInfoFromCigWait(cig: string): Promise<Cig>
    {
       let data = await this.http.get<Cig>(this.baseUrl+cig, this.httpOptions).toPromise();
       return data;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(error);
          console.log(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
      }

    getInfoFromCig(cig: string): Observable<Cig> {
          return this.http.get<Cig>(this.baseUrl+cig, this.httpOptions).pipe(
            tap(_ => console.log(`fetched cig id=${cig}`)),
            catchError(this.handleError<Cig>(`cig id=${cig}`))
          );
    }
}