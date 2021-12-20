import { Injectable } from "@angular/core";
import { ProtocolloResponse } from "./protocollo.model";

@Injectable()
export class Submission
{
    public id: string = "";
    public prot: string = "";

    setId(id: string){
        this.id=id;
    }
    getId(){
        return this.id;
    }

    setProt(prot: string){
        this.prot=prot;
    }
    getProt(){
        return this.prot;
    }
}