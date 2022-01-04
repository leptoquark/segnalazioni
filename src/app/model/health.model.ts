import { Injectable } from "@angular/core";

@Injectable()
export class Health {
    status: string = "";
    message: string = "";
    protocollo: boolean = true;
}