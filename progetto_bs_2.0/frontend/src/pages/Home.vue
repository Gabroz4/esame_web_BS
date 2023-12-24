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
    getUltimiArticoli() {
      axios.get("/api/camere/*")
        .then(response => this.datiCamere = response.data)
    }
  },
  mounted() {
    this.getUltimiArticoli()
  }
})
</script>

<template>
  <h2>Home</h2>
  <article v-for="camera in datiCamere">
    <img :src="'/img/' + ''" alt="" />
    <h3>{{camera.nomecamera}}</h3>
    <p>{{camera.postiletto}} - {{camera.nomecamera}}</p>
    <p>{{camera.descrizione}}</p>
    <a href="#">Leggi tutto</a>
    <RouterLink :to="'/camere/' + camera.nomecamera">Leggi tutto</RouterLink>
  </article>
</template>
