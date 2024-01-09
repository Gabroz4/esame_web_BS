<template>
  <div class="camera">
    <!-- Se la camera esiste, mostra i suoi dettagli -->
    <div v-if="camera">
      <h2>Camera {{ camera.nomecamera }}</h2>
      <p>{{ camera.descrizione }}</p>
      <p>Prezzo a notte: {{ camera.prezzonotte }}€</p>
      <p>Posti letto: {{ camera.postiletto }}</p>
      <img :src="'/img/' + camera.imgcamera1" alt="" />
      <img :src="'/img/' + camera.imgcamera2" alt="" />
    </div>

    <!-- Seleziona date prenotazione -->
    <p>Data inizio:</p>
    <input type="date" name="data inizio" v-model="dataInizio">
    <p>Data fine:</p>
    <input type="date" name="data fine" v-model="dataFine">

    <!-- Se il numero di giorni e il prezzo totale sono noti, visualizza i dettagli della prenotazione -->
    <div v-if="numeroGiorni !== null && prezzoTot !== null">
      <p>Numero di giorni selezionati: {{ numeroGiorni }}</p>
      <p>Prezzo totale: {{ prezzoTot }}€</p>
    </div>

    <!-- Conferma prenotazione -->
    <button @click="confermaPrenotazione">Conferma Prenotazione</button>
  </div>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Camera } from "../types";

export default defineComponent({
  data() {
    //  Inizializza le variabili di stato del componente
    return {
      camera: null as Camera | null, //camera selezionata
      dataInizio: null as string | null,
      dataFine: null as string | null,
      prezzoTotale: null as number | null, // Prezzo totale della prenotazione
      userToken: sessionStorage.getItem('userToken'), // Token dell'utente
      emailToken: sessionStorage.getItem('emailToken'), // Email dell'utente
      errorMessage: '' as string,
    };
  },
  computed: {
    // Calcola il numero di giorni tra le date selezionate
    numeroGiorni(): number | null {
      return this.calcolaNumeroGiorni(this.dataInizio, this.dataFine);
    },
    // Calcola il prezzo totale in base alle date e alla camera selezionate
    prezzoTot(): number | null {
      return this.calcolaPrezzoTotale(this.numeroGiorni, this.camera);
    },
  },
  methods: {
    // Funzione per calcolare il numero di giorni tra due date
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
    // Funzione per calcolare il prezzo totale della prenotazione
    calcolaPrezzoTotale(numeroGiorni: number | null, camera: Camera | null): number | null {
      if (numeroGiorni !== null && camera !== null) {
        this.prezzoTotale = camera.prezzonotte * numeroGiorni;
        return this.prezzoTotale;
      }
      return null;
    },
    // Funzione per recuperare i dettagli della camera
    async unaCamera(): Promise<void> {
      try {
        const response = await axios.get("/api/camere/" + this.$route.params.nomecamera);
        this.camera = response.data[0];
      } catch (error) {
        console.error('Errore nella richiesta:', error);
        this.errorMessage = 'Errore durante il recupero dei dettagli della camera';
      }
    },
    // Funzione per confermare la prenotazione
    async confermaPrenotazione(): Promise<void> {
      if (!this.userToken) {
        alert('Per prenotare una camera, devi prima registrarti.');
        return;
      }

      if (this.dataInizio && this.dataFine && new Date(this.dataInizio) > new Date(this.dataFine)) {
        alert('La data di inizio non può essere successiva alla data di fine');
        return;
      }
      function aggiungiUnGiorno(data: string): string {
        const dataObj = new Date(data);
        dataObj.setDate(dataObj.getDate() + 1);
        return dataObj.toISOString().split('T')[0];
      }

      const dataInizioFormatted = this.dataInizio ? aggiungiUnGiorno(this.dataInizio) : null;
      const dataFineFormatted = this.dataFine ? aggiungiUnGiorno(this.dataFine) : null;

      const requestBody = {
        datainizio: dataInizioFormatted,
        datafine: dataFineFormatted,
        prezzo: this.prezzoTotale,
        nomecamera: this.camera?.nomecamera,
        userToken: this.userToken,
        emailToken: this.emailToken
      };

      try {
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
  // Quando il componente viene montato, recupera i dettagli della camera
  mounted(): void {
    this.unaCamera();
  },
});
</script>
