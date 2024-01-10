<template>
  <div v-if="adminToken" class="adminprofile"> <!--impedisce che un normale utente acceda alle funzion admin-->
    <h1>Profilo Amministratore</h1>

    <!-- seleziona utente -->
    <div class="select-container">
      <label for="utenti-select">Seleziona Prenotazione:</label>
      <select name="utenti" id="utenti-select" v-model="emailSelezionata">
        <option value="" selected>-- Scegli un utente --</option>
        <option v-for="email in univoca()" :key="email" :value="email">{{ email }}</option>
      </select>
    </div>

    <!-- visualizza prenotazioni -->
    <div v-for="prenotazione in prenotazioni" :key="prenotazione.id" class="prenotazione">
      <div v-if="prenotazione.email == emailSelezionata" class="prenotazione-details">
        <h3>Prenotazione #{{ prenotazione.id }}</h3>
        <p>E-mail: {{ prenotazione.email }}</p>
        <p>Camera: {{ prenotazione.nomecamera }}</p>
        <p>Data Inizio: {{ convertiData(prenotazione.datainizio) }}</p>
        <p>Data Fine: {{ convertiData(prenotazione.datafine) }}</p>
        <button @click="eliminaPrenotazione(prenotazione.id)" class="delete-btn">Elimina Prenotazione</button>
      </div>
    </div>

    <!-- seleziona camera -->
    <div class="select-container">
      <label for="camere-select">Seleziona Camera:</label>
      <select name="camere" id="camere-select" v-model="cameraSelezionata">
        <option value="" selected>-- Scegli una camera --</option>
        <option v-for="camera in cameraUnivoca()" :key="camera" :value="camera">{{ camera }}</option>
      </select>
    </div>

    <!-- visualizza dettagli camere -->
    <div v-for="camera in camere" :key="camera.nomecamera" class="camera-details">
      <div v-if="camera.nomecamera == cameraSelezionata" class="camera-details-inner">
        <h3>Dettagli Camera</h3>
        <p>Camera: {{ camera.nomecamera }}</p>
        <p>Posti Letto: {{ camera.postiletto }}</p>
        <p>Prezzo a Notte: {{ camera.prezzonotte }}</p>
        <p>Descrizione: {{ camera.descrizione }}</p>
        <button @click="eliminaCamera(camera.nomecamera)" class="delete-btn">Elimina Camera</button>
        <button @click="modificaCamera(camera.nomecamera)" class="edit-btn">Modifica Camera</button>
      </div>
    </div>

    <!-- modifica camera -->
    <div v-if="modificaAttiva" class="edit-form">
      <h2>Modifica Camera</h2>
      <label for="postiletto">Posti Letto:</label>
      <input id="postiletto" type="number" v-model="cameraInModifica.postiletto" />

      <label for="prezzonotte">Prezzo a Notte:</label>
      <input id="prezzonotte" type="number" v-model="cameraInModifica.prezzonotte" />

      <label for="descrizione">Descrizione:</label>
      <textarea id="descrizione" v-model="cameraInModifica.descrizione"></textarea>

      <button @click="salvaModificheCamera" class="save-btn">Salva Modifiche</button>
    </div>

    <div class="controls">
      <button @click="logout" class="logout-btn">Logout</button>
      <router-link to="/admin/nuova-camera" class="link-btn">Inserisci Nuova Camera</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Prenotazione, Camera } from '../types';

export default defineComponent({
  data() {
    return {
      prenotazioni: [] as Prenotazione[],
      camere: [] as Camera[],
      emailSelezionata: null as string | null,
      cameraSelezionata: null as string | null,
      adminToken: sessionStorage.getItem('adminToken'),

      modificaAttiva: false,
      cameraInModifica: { //tiene temporaneamente i nuovi dati della camera prima di mandarli al server
        nomecamera: '',
        postiletto: 0,
        prezzonotte: 0,
        descrizione: ''
      } as Camera

    };
  },

  methods: {
    //funzione per il logout
    logout() {
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('emailToken');
      sessionStorage.removeItem('adminToken');
      this.$router.push('/').then(() => {
        //ricarica della pagina
        window.location.reload();
      });
    },
    //funzione per stampare le mail degli utenti una sola volta e non per ogni prenotazione
    univoca(): string[] {
      const insieme = Array.from(new Set(this.prenotazioni.map(p => p.email)));
      console.log(insieme);
      return insieme;
    },
    //funzione per ottenere i nomi delle camere una sola volta
    cameraUnivoca(): string[] {
      const insieme = Array.from(new Set(this.camere.map(p => p.nomecamera)));
      console.log(insieme);
      return insieme;
    },
    //funzione per l'eliminazione di una prenotazione dato l'id
    eliminaPrenotazione(id: number) {
      //chiamata di tipo delete al backend per cancellare la prenotazione
      axios.delete(`/api/prenotazioni/${id}`)
        .then(response => {
          if (response.data.success) {
            alert('Prenotazione eliminata con successo');
            //aggiorno la lista delle prenotazioni dopo l'eliminazione
            this.fetchPrenotazioni();
          } else {
            alert('Errore durante l\'eliminazione della prenotazione');
          }
        })
        .catch(error => console.error(error));
    },
    //funzione per l'eliminazione di una camera
    eliminaCamera(nomecamera: string) {
      //chiamata di tipo delete al backend per cancellare la camera
      axios.delete(`/api/camere/${nomecamera}`)
        .then(response => {
          if (response.data.success) {
            alert('Camera eliminata con successo');
            //aggiorno la lista delle prenotazioni dopo l'eliminazione
            this.fetchCamere();
          } else {
            alert('Errore durante l\'eliminazione della camera');
          }
        })
        .catch(error => console.error(error));
    },
    //funzione per la modificazione dei dati di una camera
    modificaCamera(nomecamera: string) {
      //trova la camera da modificare
      const cameraDaModificare = this.camere.find(camera => camera.nomecamera === nomecamera);

      //se trovo la camera posso modificarla
      if (cameraDaModificare) {
        this.modificaAttiva = true;
        this.cameraInModifica = { ...cameraDaModificare }; //assegno a camerainmodifica i dati della camera da modificare
      } else {
        alert('Camera non trovata');
      }
    },
    //funzione per il salvataggio delle modifiche alla camera
    salvaModificheCamera() {
      //chiamata al backend per la modifica della camera dato il nome e i dati da modificare
      axios.put(`/api/camere/${this.cameraInModifica.nomecamera}`, this.cameraInModifica)
        .then(response => {
          if (response.data.success) {
            alert('Camera modificata con successo');
            //aggiorno la lista delle camere dopo la modificazine
            this.fetchCamere();
            this.modificaAttiva = false; //disabilita la modifica
          } else {
            alert('Errore durante la modifica della camera');
          }
        })
        .catch(error => console.error(error));
    },
    //funzione per ottenere tutte le prenotazioni
    fetchPrenotazioni() {
      axios.get('/api/prenotazioni')
        .then(response => {
          this.prenotazioni = response.data;
        })
        .catch(error => console.error(error));
    },
    //funzione per ottenere tutte le camere
    fetchCamere() {
      axios.get('/api/camere')
        .then(response => {
          this.camere = response.data;
        })
        .catch(error => console.error(error));
    },
    //funzione per impostare le date al formato corretto
    convertiData(date: Date) {
      const newdate = new Date(date).toISOString().split('T')[0];
      return newdate;
    }
  },

  mounted() {
    this.fetchPrenotazioni();
    this.fetchCamere();
  }
});
</script>
