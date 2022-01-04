import { Injectable } from "@angular/core";
import { ProtocolloResponse } from "./protocollo.model";

@Injectable()
export class Submission
{
    public id: string = "";
    public prot: string = "";
    public sync: boolean = false;

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

    setSync(sync: boolean)
    {
        this.sync = sync;
    }

    getSync(){
        return this.sync;
    }
}