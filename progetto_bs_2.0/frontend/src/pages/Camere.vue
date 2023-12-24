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
      axios.get("/api/articolo/" + this.$route.params.idCamera)
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
  <article v-for="camera in camere">
    <img :src="'/img/finestag200607025.jpg'" alt="" />
    <h3>{{camera.nomecamera}}</h3>
    <p>{{camera.prezzonotte}}</p>
    <p>{{camera.postiletto}}</p>
  </article>
</template>
