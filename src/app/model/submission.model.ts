import { Injectable } from "@angular/core";

@Injectable()
export class Submission{
    public id: string = "";
    setId(id: string){
        this.id=id;
    }
    getId(){
        return this.id;
    }
}