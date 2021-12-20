import { Injectable } from "@angular/core";
import { ProtocolloResponse } from "./protocollo.model";

@Injectable()
export class Submission
{
    public id: string = "";
    public prot: ProtocolloResponse = new ProtocolloResponse;

    setId(id: string){
        this.id=id;
    }
    getId(){
        return this.id;
    }
}