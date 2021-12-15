import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Cig } from "./cig.model";
import { SegnalazioniRepository } from "./segnalazioni.repository";
import { RestDataSource } from "./rest.datasource";
import { Submission } from "./submission.model";

@NgModule({
    imports: [HttpClientModule],
    providers: [Submission, SegnalazioniRepository, Cig, RestDataSource]
})

export class ModelModule { }