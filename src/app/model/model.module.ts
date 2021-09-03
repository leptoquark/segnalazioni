import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Ausa } from "./ausa.model";
import { AusaRepository } from "./ausa.repository";
import { RestDataSource } from "./rest.datasource";
import { Submission } from "./submission.model";

@NgModule({
    imports: [HttpClientModule],
    providers: [Submission, AusaRepository, Ausa, RestDataSource]
})

export class ModelModule { }