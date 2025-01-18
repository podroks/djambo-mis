<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import ATH from "@/pages/ATHView.vue";
import { useMoveForward } from "./composables/object/useMoveForward";
import { ref, useTemplateRef, watch } from "vue";
import { onMounted } from "vue";
import Player from "./components/threeJs/Player.vue";
import Virus from "./components/threeJs/Virus.vue";
import { MAX_X, MAX_Y, MIN_X, MIN_Y } from "./constants/position";
import Cookie from "./components/threeJs/Cookie.vue";

const MAXIMUM_OBJECT = 23;

const player = useTemplateRef("player");
const playerPosition = ref({ x: 0, y: 0, z: 0 });
const objects = ref([]);
const timeoutRef = ref(null); // A utiliser pour stoper la boucle infini
const statePause = ref(false);

onMounted(() => {
  loopIntervalRendom();
});

watch(
  () => objects.value.length,
  (x) => {
    console.log("Debug: " + x + " objects in the scene");
  }
);

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function generateVirus() {
  const size = [getRandom(1.5, 0.8), getRandom(1.5, 0.8), getRandom(1.5, 0.8)];
  const positionInitial = [getRandom(MIN_X, MAX_X), getRandom(MIN_Y, MAX_Y), 0];
  const id = generateUID();
  if (objects.value.length <= MAXIMUM_OBJECT) {
    objects.value.push({ id, size, positionInitial, type: "virus" });
  }
}

function generateCookie() {
  const size = getRandom(0.2, 0.5);
  const positionInitial = [getRandom(MIN_X, MAX_X), getRandom(MIN_Y, MAX_Y), 0];
  const id = generateUID();
  if (objects.value.length <= 25) {
    objects.value.push({ id, size, positionInitial, type: "cookie" });
  }
}

function destroyObject(id) {
  objects.value = objects.value.filter((obj) => obj.id !== id);
}

function generateUID() {
  return "id" + new Date().getTime() + getRandom(0, 20000);
}

function loopIntervalRendom(
  min = 600,
  max = 1300,
  generationFunction = generateVirus
) {
  timeoutRef.value = setTimeout(() => {
    generationFunction();
    timeoutRef.value = loopIntervalRendom(min, max, generationFunction);
  }, getRandom(min, max));
}

function pause() {
  statePause.value = true;
}

onMounted(() => {
  loopIntervalRendom();

  loopIntervalRendom(2000, 5000, generateCookie);
});

watch(
  () => objects.value.length,
  (x) => {
    console.log("Debug: " + x + " objects in the scene");
  }
);

// Player comportement
function onHitPlayer() {
  if (player.value) {
    player.value.onHitPlayer();
  }
}
function onStopHitPlayer() {
  if (player.value) {
    player.value.onStopHitPlayer();
  }
}
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
        :pause="statePause"
      />

      <template v-for="obj in objects" :key="obj.id">
        <Virus
          v-if="obj.type === 'virus'"
          :size="obj.size"
          :position-initial="obj.positionInitial"
          :playerPosition
          :playerMesh="player?.mesh"
          @destroy="() => destroyObject(obj.id)"
          @hit-player="onHitPlayer"
          @stop-hit-player="onStopHitPlayer"
        />

        <Cookie
          v-else-if="obj.type === 'cookie'"
          :size="obj.size"
          :position-initial="obj.positionInitial"
          :playerPosition
          :playerMesh="player?.mesh"
          @destroy="() => destroyObject(obj.id)"
        />
      </template>
    </TresCanvas>
    <ATH @start-game="" @pause-game="pause" @restart-game="" />
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
