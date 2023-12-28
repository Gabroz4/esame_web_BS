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
    ruolo: "admin" | "user" | undefined;
}