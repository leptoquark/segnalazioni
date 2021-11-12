import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Cig } from "./cig.model";
import { CigRepository } from "./cig.repository";
import { RestDataSource } from "./rest.datasource";
import { Submission } from "./submission.model";

@NgModule({
    imports: [HttpClientModule],
    providers: [Submission, CigRepository, Cig, RestDataSource]
})

export class ModelModule { }