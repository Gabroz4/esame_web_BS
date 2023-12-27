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
      axios.get("/api/camere")
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
  <img :src="'/img/' + 'home.jpg'" alt="" />
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>

  <article v-for="camera in datiCamere">
    <h3>{{camera.nomecamera}}</h3>
    <img :src="'/img/' + camera.imgcamera1" alt="" />   
    <img :src="'/img/' + camera.imgcamera2" alt="" /> 
    <p>{{camera.postiletto}} - {{camera.nomecamera}}</p>
    <RouterLink :to="'/camere/' + camera.nomecamera">Prenota</RouterLink>
  </article>
</template>
