<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Camera } from "../types";

export default defineComponent({
  data() {
    return {
      camera: null as Camera | null,
      dataInizio: null as string | null,
      dataFine: null as string | null,
      prezzoTotale: null as number | null,
      userToken: sessionStorage.getItem('userToken'),
      emailToken: sessionStorage.getItem('emailToken')
    };
  },
  computed: {
    numeroGiorni(): number | null {
      if (this.dataInizio && this.dataFine) {
        const timestampInizio = new Date(this.dataInizio).getTime();
        const timestampFine = new Date(this.dataFine).getTime();

        if (!isNaN(timestampInizio) && !isNaN(timestampFine)) {
          const differenzaInGiorni = Math.floor(
            (timestampFine - timestampInizio) / (24 * 60 * 60 * 1000)
          );
          return differenzaInGiorni > 0 ? differenzaInGiorni : null;
        }
      }
      return null;
    },
    prezzoTot(): number | null {
      if (this.numeroGiorni !== null && this.camera !== null) {
        this.prezzoTotale = this.camera.prezzonotte * this.numeroGiorni; // Assign to prezzoTotale
        return this.prezzoTotale;
      }
      return null;
    },
  },
  methods: {
    unaCamera(): void {
      axios
        .get("/api/camere/" + this.$route.params.nomecamera)
        .then((response) => {
          this.camera = response.data[0];
        });
    },
    confermaPrenotazione(): void {
      const requestBody = {
        datainizio: this.dataInizio,
        datafine: this.dataFine,
        prezzo: this.prezzoTotale,
        nomecamera: this.camera?.nomecamera,
        userToken: this.userToken,
        emailToken: this.emailToken
      };
    
      axios
        .post(`/api/camere/${this.$route.params.nomecamera}`, requestBody)
        .then((response) => {
          if (response.data.success) {
            alert('Prenotazione inserita con successo');
          } else {
            alert('Errore durante l\'inserimento della prenotazione: ' + response.data.message);
          }
        })
        .catch((error) => {
          console.error('Errore nella richiesta:', error);
          alert('Errore: devi registrarti per prenotare');
        });
    }
  },
  mounted(): void {
    this.unaCamera();
  },
});
</script>

<template>
  <template v-if="camera">
    <h2>Camera {{ camera.nomecamera }}</h2>
    <p>Prezzo a notte: {{ camera.prezzonotte }}€</p>
    <p>Posti letto: {{ camera.postiletto }}</p>
    <img :src="'/img/' + camera.imgcamera1" alt="" />
    <input type="date" name="data inizio" v-model="dataInizio">
    <input type="date" name="data fine" v-model="dataFine">
    <p v-if="numeroGiorni !== null">Numero di giorni selezionati: {{ numeroGiorni }}</p>
    <p v-if="prezzoTot !== null">Prezzo totale: {{ prezzoTot }}</p>
    <button @click="confermaPrenotazione">Conferma Prenotazione</button>
  </template>
</template>
