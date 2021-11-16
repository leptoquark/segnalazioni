import { Injectable } from "@angular/core";

@Injectable()
export class Cig {
    codice_risposta: string ="";
    stazione_appaltante: StazioneAppaltante = new StazioneAppaltante;
    pubblicazioni: Pubblicazioni = new Pubblicazioni;
    bando: Bando = new Bando;
    incaricati: Incaricati[] = [];
}

export class StazioneAppaltante {
    INDIRIZZO!: string;
    ISTAT_COMUNE!: string;
    ID_CENTRO_COSTO!: string;
    DENOMINAZIONE_CENTRO_COSTO!: string;
    DENOMINAZIONE_AMMINISTRAZIONE_APPALTANTE!: string;
    CITTA!: string;
    REGIONE!: string;
    CF_AMMINISTRAZIONE_APPALTANTE!: string;
    SEZIONE_REGIONALE!: string;
    CODICE_AUSA!: string;
}

export class Pubblicazioni {
    DATA_CREAZIONE!: string;
    DATA_ALBO!: string;
    DATA_GURI!: string;
    DATA_GUCE!: string;
    DATA_PUBBLICAZIONE!: string;
    LINK_SITO_COMMITTENTE!: string;
    DATA_BORE!: string;
}

export class CPV {
    DESCRIZIONE_CPV!: string;
    COD_CPV!: string;
    FLAG_PREVALENTE?: any;
}

export class CONDIZIONINEGOZIATA {
    ID_CONDIZIONE?: any;
    DESCRIZIONE!: string;
}

export class CUP {
    CUP!: string;
}

export class Bando {
    LUOGO_ISTAT!: string;
    CIG_ACCORDO_QUADRO!: string;
    STATO!: string;
    TIPO_CIG!: string;
    COD_TIPO_SCELTA_CONTRAENTE!: number;
    OGGETTO_LOTTO!: string;
    OGGETTO_GARA!: string;
    CPV: CPV[] = [];
    FLAG_ESCLUSO!: number;
    NUMERO_GARA!: string;
    IMPORTO_LOTTO!: number;
    CONDIZIONI_NEGOZIATA: CONDIZIONINEGOZIATA[] = [];
    SETTORE!: string;
    LUOGO_NUTS!: string;
    CUP: CUP[] = [];
    N_LOTTI_COMPONENTI!: number;
    CIG!: string;
    IMPORTO_COMPLESSIVO_GARA!: number;
    COD_MODALITA_REALIZZAZIONE?: any;
    MODALITA_REALIZZAZIONE!: string;
    MOTIVO_ESCLUSIONE!: string;
    DATA_SCADENZA_OFFERTA!: string;
    SIGLA_PROVINCIA!: string;
    TIPO_SCELTA_CONTRAENTE!: string;
    OGGETTO_PRINCIPALE_CONTRATTO!: string;
}

export class Incaricati {
    CODICE_FISCALE!: string;
    COGNOME!: string;
    DESCRIZIONE_RUOLO!: string;
    NOME!: string;
    COD_RUOLO!: number;
}