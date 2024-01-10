//definizione dei tipi da usare nel frontend
export interface Camera {
    nomecamera: string;
    postiletto: number;
    prezzonotte: number;
    descrizione: string;
    isfull: boolean;
    imgcamera1: File | null;
    imgcamera2: File | null; 
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
