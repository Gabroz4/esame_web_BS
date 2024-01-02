<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { Camera } from "../types"

export default defineComponent({
  data() {
    return {
      camera: null as Camera | null
    }
  },
  methods: {
    unaCamera() {
      axios.get("/api/camere/" + this.$route.params.nomecamera)
        .then(response => {
          this.camera = response.data[0];
        })
    },
  },
  mounted() {
    this.unaCamera();
  }
})
</script>
<template>
<template v-if="camera">
  <h2>Camera {{ camera.nomecamera }}</h2>
  <p>Prezzo a notte: {{ camera.prezzonotte }}€</p>
  <p>Posti letto: {{ camera.postiletto }}</p>
  <img :src="'/img/' + camera.imgcamera1" alt="" />
  <input type="date" name="data inizio">
  <input type="date" name="data fine">
  <input type="submit" value="conferma">
</template>
</template>