<template>
  <div class="camera">
    <!-- se la camera esiste, mostra i suoi dettagli -->
    <div v-if="camera">
      <h2>Camera {{ camera.nomecamera }}</h2>
      <p>{{ camera.descrizione }}</p>
      <p>Prezzo a notte: {{ camera.prezzonotte }}€</p>
      <p>Posti letto: {{ camera.postiletto }}</p>
      <img :src="'/img/' + camera.imgcamera1" alt="" />
      <img :src="'/img/' + camera.imgcamera2" alt="" />
    </div>

    <!-- seleziona data inizio e fine prenotazione-->
    <p>Data inizio:</p>
    <input type="date" name="data inizio" v-model="dataInizio">
    <p>Data fine:</p>
    <input type="date" name="data fine" v-model="dataFine">

    <!-- visualizza i dettagli della prenotazione -->
    <div v-if="numeroGiorni !== null && prezzoTot !== null">
      <p>Numero di giorni selezionati: {{ numeroGiorni }}</p>
      <p>Prezzo totale: {{ prezzoTot }}€</p>
    </div>

    <!-- conferma prenotazione -->
    <button @click="confermaPrenotazione">Conferma Prenotazione</button>
  </div>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Camera } from "../types";

export default defineComponent({
  data() {
    return {
      camera: null as Camera | null, //camera selezionata
      dataInizio: null as string | null,
      dataFine: null as string | null,
      prezzoTotale: null as number | null,
      userToken: sessionStorage.getItem('userToken'), //token dell'utente
      emailToken: sessionStorage.getItem('emailToken'), //token dell'email
      errorMessage: '' as string, //debugging
    };
  },
  computed: {
    //calcola il numero di giorni tra le date selezionate
    numeroGiorni(): number | null {
      return this.calcolaNumeroGiorni(this.dataInizio, this.dataFine);
    },
    //calcola il prezzo totale in base alle date e alla camera selezionata
    prezzoTot(): number | null {
      return this.calcolaPrezzoTotale(this.numeroGiorni, this.camera);
    },
  },
  methods: {
    //funzione per calcolare il numero di giorni tra due date
    calcolaNumeroGiorni(dataInizio: string | null, dataFine: string | null): number | null {
      if (dataInizio && dataFine) {
        const timestampInizio = new Date(dataInizio).getTime();
        const timestampFine = new Date(dataFine).getTime();

        if (!isNaN(timestampInizio) && !isNaN(timestampFine)) {
          const differenzaInGiorni = Math.floor(
            (timestampFine - timestampInizio) / (24 * 60 * 60 * 1000)
          );
          return differenzaInGiorni > 0 ? differenzaInGiorni : null;
        }
      }
      return null;
    },
    //funzione per calcolare il prezzo totale della prenotazione
    calcolaPrezzoTotale(numeroGiorni: number | null, camera: Camera | null): number | null {
      if (numeroGiorni !== null && camera !== null) {
        this.prezzoTotale = camera.prezzonotte * numeroGiorni;
        return this.prezzoTotale;
      }
      return null;
    },
    //funzione per ottenere i dettagli della camera dato il nome
    async unaCamera(): Promise<void> {
      try {
        const response = await axios.get("/api/camere/" + this.$route.params.nomecamera);
        this.camera = response.data[0];
      } catch (error) {
        console.error('Errore nella richiesta:', error);
        this.errorMessage = 'Errore durante il recupero dei dettagli della camera';
      }
    },
    //funzione per confermare la prenotazione
    async confermaPrenotazione(): Promise<void> {
      if (!this.userToken) {
        alert('Per prenotare una camera, devi prima registrarti.');
        return;
      }

      if (this.dataInizio && this.dataFine && new Date(this.dataInizio) > new Date(this.dataFine)) {
        alert('La data di inizio non può essere successiva alla data di fine');
        return;
      }//aggiunta di un giorno per colmare l'errore
      function aggiungiUnGiorno(data: string): string {
        const dataObj = new Date(data);
        dataObj.setDate(dataObj.getDate() + 1);
        return dataObj.toISOString().split('T')[0];
      }

      const dataInizioFormatted = this.dataInizio ? aggiungiUnGiorno(this.dataInizio) : null;
      const dataFineFormatted = this.dataFine ? aggiungiUnGiorno(this.dataFine) : null;

      //corpo della richiesta da mandare al backend
      const requestBody = {
        datainizio: dataInizioFormatted,
        datafine: dataFineFormatted,
        prezzo: this.prezzoTotale,
        nomecamera: this.camera?.nomecamera,
        userToken: this.userToken,
        emailToken: this.emailToken
      };

      try {
        //risultato della query dal backend
        const response = await axios.post(`/api/camere/${this.$route.params.nomecamera}`, requestBody);

        if (response.data.success) {
          alert('Prenotazione inserita con successo');
        } else {
          this.errorMessage = response.data.message;
          if (this.errorMessage === 'La camera è già prenotata per le date selezionate') {
            alert(this.errorMessage);
          } else {
            alert('Errore durante la conferma della prenotazione');
          }
        }
      } catch (error: any) {
        console.error('Errore nella richiesta:', error);
        if (error.response && error.response.status === 400) {
          alert('La camera è già prenotata per le date selezionate');
        } else {
          alert('Errore durante la conferma della prenotazione');
        }
      }
    },
  },
  mounted(): void {
    this.unaCamera();
  },
});
</script>
