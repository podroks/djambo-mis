<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import ATH from "@/pages/ATHView.vue"
</script>

<template>
  <TresCanvas clear-color="#000706" window-size>
      <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
      <TresAmbientLight :intensity="1" />
  </TresCanvas>
  <ATH></ATH>
</template>
