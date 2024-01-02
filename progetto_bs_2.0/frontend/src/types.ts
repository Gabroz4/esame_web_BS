export interface Camera {
    nomecamera: string;
    postiletto: number;
    prezzonotte: number;
    descrizione: string;
    imgcamera1: string;
    imgcamera2: string;
    imgcamera3: string;
    imgcamera4: string;
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
    datainizio: Date;
    datafine: Date;
    giornitot: number;
    prezzotot: number;
}