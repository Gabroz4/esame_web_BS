<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { DettagliArticolo } from "../types"

export default defineComponent({
  data() {
    return {
      articolo: null as DettagliArticolo | null
    }
  },
  methods: {
    getArticolo() {
        axios.get("/api/articolo/" + this.$route.params.idArticolo)
        .then(response => this.articolo = response.data[0])
    }
  },
  mounted() {
    this.getArticolo()
  }
})
</script>

<template>
  <template v-if="articolo">
    <h2>{{articolo.titoloarticolo}}</h2>
    <article>
      <img :src="'/img/' + articolo.imgarticolo" alt="" />
      <h3>{{articolo.titoloarticolo}}</h3>
      <p>{{articolo.nome}} - {{articolo.dataarticolo.slice(0, 10)}}</p>
      <p>{{articolo.testoarticolo}}</p>
    </article>
  </template>
</template>
