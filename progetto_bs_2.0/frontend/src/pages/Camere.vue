<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { Camera } from "../types"

export default defineComponent({
  data() {
    return {
      camere: [] as Camera []
    }
  },
  methods: {
    getCamere() {
      axios.get("/api/camere")
        .then(response => this.camere = response.data)
    }
  },
  mounted() {
    this.getCamere()
  }
})
</script>

<template>
  <h2>Camere</h2>
  <!--<article v-for="camera in camere">-->
    <img :src="'/img/finestag200607025.jpg'" alt="" />
    <!--<h3>{{camera.nomecamera}}</h3>
    <p>{{camere.prezzonotte}}</p>
    <p>{{camera.postiletto}}</p>
    <RouterLink :to="'/camera/' + camera.nomecamera">Leggi tutto</RouterLink>
  </article>-->
</template>
