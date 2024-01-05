<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { Camera } from "../types"

export default defineComponent({
  data() {
    return {
      datiCamere: [] as Camera[]
    }
  },
  methods: {
    getCamere() {
      axios.get("/api/camere")
        .then(response => this.datiCamere = response.data)
    }
  },
  mounted() {
    this.getCamere()
  }
})
</script>

<template>
  <h2>Home</h2>
  <img class="home" :src="'/img/' + 'home.jpg'" alt="" />
  <h3>Chi siamo - Benvenuti</h3>
  <p>Situato tra le maestose vette montane, il Chalet delle Alpi è il rifugio perfetto per gli amanti della natura e delle atmosfere accoglienti. Immerso in uno scenario alpino incantevole, il nostro chalet offre una calda e autentica esperienza di montagna.</p>
  <h3>Camere uniche e confortevoli</h3>
  <p>Le nostre camere sono progettate con cura per garantire il massimo comfort durante il vostro soggiorno. Ogni stanza è un rifugio accogliente, arredata con elementi tradizionali delle Alpi e dotata di moderni comfort. Dalle finestre potrete ammirare panorami mozzafiato delle vette circostanti e respirare l'aria fresca di montagna.</p>
  <h3>Le nostre Camere</h3>

  <article class="cameraprev" v-for="camera in datiCamere">
    <img :src="'/img/' + camera.imgcamera1" alt="" />   
    <img :src="'/img/' + camera.imgcamera2" alt="" /> 
    <p>Camera: {{camera.nomecamera}} - Posti letto:{{camera.postiletto}}</p>
    <RouterLink :to="'/camere/' + camera.nomecamera">Prenota</RouterLink>
  </article>
</template>
