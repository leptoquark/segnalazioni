import { Injectable } from "@angular/core";

@Injectable()
export class PersonaGiuridica {
    id: string = "";
    dati_identificativi!: DatiIdentificativi;
    _check_ValPar!: string;
    _source!: string;
    documento!: Documento;
    _acl!: string[];
    ts!: string;
    tipoSoggetto!: TipoSoggetto;
    stato!: Stato;
    classificazioni!: Classificazioni[];
    ruoli!: Ruoli;
    componenti!: any[];
}

export class NaturaGiuridica {
    codice!: string;
    descrizione!: string;
}

export class Provincia {
    codice!: string;
    nome!: string;
}

export class Citta {
    codice!: string;
    nome!: string;
}

export class Indirizzo {
    dug!: string;
    odonimo!: string;
    numero_civico!: string;
    esponente!: string;
}

export class Georef {
    lat!: number;
    lon!: number;
}

export class Localizzazione {
    provincia!: Provincia;
    citta!: Citta;
    indirizzo!: Indirizzo;
    cap!: string;
    tipo_sede?: any;
    georef!: Georef;
}

export class Contatti {
    MAIL_PEC!: string;
    EMAIL!: string;
    TELEFONO?: any;
}

export class DatiIdentificativi {
    codice_fiscale_jammed!: string;
    codice_fiscale!: string;
    partita_iva!: string;
    denominazione!: string;
    natura_giuridica!: NaturaGiuridica;
    soggetto_estero!: string;
    localizzazione!: Localizzazione;
    cciaa?: any;
    contatti!: Contatti;
}

export class Documento {
    tipo!: string;
    versione!: string;
}

export class TipoSoggetto {
    tipo_soggetto!: string;
    flag_inHouse!: string;
    flag_partecipata!: string;
    flag_consorziata!: string;
}

export class Stato {
    stato!: string;
    data_inizio!: string;
    data_fine!: string;
}

export class Classificazione {
    codice!: string;
    descrizione!: string;
}

export class Classificazioni {
    codice_codifica!: string;
    codifica!: string;
    classificazione!: Classificazione[];
}

export class Ruoli {
    rappresentanti_legali?: any;
    direttori_tecnici!: any[];
    soggetti!: any[];
}
