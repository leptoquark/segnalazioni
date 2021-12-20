import { Injectable } from "@angular/core";

@Injectable()
export class Submission
{
    public id: string = "";
    public prot: string = "NO-PROT";

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