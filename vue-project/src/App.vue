<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { useFluidMovement } from "@/composables/player/useFluidMovement.js";
import { useMoveForward } from "./composables/object/useMoveForward";

const { position } = useFluidMovement(0.1);
const { positionZ: objectPositionZ } = useMoveForward();
</script>

<template>
  <div class="canvas-container">
    <TresCanvas clear-color="#000">
      <!-- <TresAmbientLight :intensity="0.5" /> -->
      <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />

      <TresMesh :position="[position.x, position.y, 0]">
        <TresBoxGeometry :args="[0.5, 0.5, 1]" />
        <TresMeshStandardMaterial color="blue" />
      </TresMesh>

      <TresMesh :position="[5, 3, objectPositionZ]">
        <TresBoxGeometry :args="[0.5, 0.5, 0.5]" />
        <TresMeshStandardMaterial color="#236E43" />
      </TresMesh>

      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<style scoped>
.canvas-container {
  max-width: 100vw;
  max-height: 100vh;

  aspect-ratio: 16 / 9;

  margin: auto;
  background-color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}
</style>
