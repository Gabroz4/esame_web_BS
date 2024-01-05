export interface Camera {
    nomecamera: string;
    postiletto: number;
    prezzonotte: number;
    descrizione: string;
    isfull: boolean;
    imgcamera1: string;
    imgcamera2: string;
}

export interface User {
    nome: string;
    cognome: string;
    email: string;
    password: string;
    imgutente: string;
}

export interface Prenotazione {
    id: number;
    email: string;
    nomecamera: string;
    datainizio: Date;
    datafine: Date;
    giornitot: number;
    prezzotot: number;
}