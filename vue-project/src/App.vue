<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import ATH from "@/pages/ATHView.vue";
import { useMoveForward } from "./composables/object/useMoveForward";
import { ref, useTemplateRef, watch } from "vue";
import { onMounted } from "vue";
import Player from "./components/threeJs/Player.vue";
import Virus from "./components/threeJs/Virus.vue";
import { MAX_X, MAX_Y, MIN_X, MIN_Y } from "./constants/position";

const { positionZ: objectPositionZ } = useMoveForward();

const player = useTemplateRef("player");
const playerPosition = ref({ x: 0, y: 0, z: 0 });

const objects = ref([]);

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function generateVirus() {
  const size = [getRandom(1.5, 0.8), getRandom(1.5, 0.8), getRandom(1.5, 0.8)];
  const positionInitial = [getRandom(MIN_X, MAX_X), getRandom(MIN_Y, MAX_Y), 0];
  const id = generateUID();
  if (objects.value.length <= 25) {
    objects.value.push({ id, size, positionInitial });
  }
}

function destroyVirus(id) {
  objects.value = objects.value.filter((obj) => obj.id !== id);
}

function generateUID() {
  return "id" + new Date().getTime();
}

const timeoutRef = ref(null); // A utiliser pour stoper la boucle infini
function loopIntervalRendom(min = 600, max = 1300) {
  timeoutRef.value = setTimeout(() => {
    generateVirus();
    timeoutRef.value = loopIntervalRendom(min, max);
  }, getRandom(min, max));
}

onMounted(() => {
  loopIntervalRendom();
});

watch(
  () => objects.value.length,
  (x) => {
    console.log("Debug: " + x + " objects in the scene");
  }
);
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

      <!-- <Virus :playerPosition :playerMesh="player?.mesh" /> -->
      <Virus
        v-for="obj in objects"
        :key="obj.id"
        :size="obj.size"
        :position-initial="obj.positionInitial"
        :playerPosition
        :playerMesh="player?.mesh"
        @destroy="() => destroyVirus(obj.id)"
      />

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
