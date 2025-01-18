<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import ATH from "@/pages/ATHView.vue";
import { useMoveForward } from "./composables/object/useMoveForward";
import { ref, useTemplateRef } from "vue";
import { onMounted } from "vue";
import Player from "./components/threeJs/Player.vue";
import Virus from "./components/threeJs/Virus.vue";

const { positionZ: objectPositionZ } = useMoveForward();

const player = useTemplateRef("player");
const playerPosition = ref({ x: 0, y: 0, z: 0 });

const objects = ref([]);

onMounted(() => {
  for (var i = 0; i < 5; i++) {
    objects.value.push({
      x: Math.random() * 14 - 7,
      y: Math.random() * 8 - 4,
    });
  }
});
</script>

<template>
  <div class="relative canvas-container">
    <TresCanvas clear-color="#000706">
      <TresAmbientLight :intensity="1" />
      <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />

      <Player
        ref="player"
        @position="
          (newPos) => {
            playerPosition = newPos;
          }
        "
      />

      <Virus :playerPosition :playerMesh="player?.mesh" />

      <!-- ref="virus" -->
      <!-- <TresMesh
        v-for="obj in objects"
        :position="[obj.x, obj.y, objectPositionZ]"
      >
        <TresBoxGeometry :args="[1, 1, 0.5]" />
        <TresMeshStandardMaterial :color="!collision ? '#77CA84' : 'red'" />
      </TresMesh> -->
    </TresCanvas>
    <ATH></ATH>
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
