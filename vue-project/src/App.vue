<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import ATH from "@/pages/ATHView.vue";
import { ref, useTemplateRef } from "vue";
import { onMounted } from "vue";
import Player from "./components/threeJs/Player.vue";
import Virus from "./components/threeJs/Virus.vue";
import { MAX_X, MAX_Y, MIN_X, MIN_Y } from "./constants/position";
import Cookie from "./components/threeJs/Cookie.vue";
import { generateUID, getRandom } from "./utils/generation";

// import { GLTFModel } from "@tresjs/cientos";

const MAXIMUM_OBJECT = 20;

const player = useTemplateRef("player");
const athRef = useTemplateRef('ath')
const playerPosition = ref({ x: 0, y: 0, z: 0 });
const objects = ref([]);
const timeoutRef = ref(null); // A utiliser pour stoper la boucle infini
const stateStart = ref(false);
const statePause = ref(false);
const stateRestart = ref(false);

onMounted(() => {
  loopIntervalRendom();
});

// watch(
//   () => objects.value.length,
//   (x) => {
//     console.log("Debug: " + x + " objects in the scene");
//   }
// );

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

function start() {
  stateStart.value = true;
  statePause.value = false;
  stateRestart.value = false;
}

function pause() {
  stateStart.value = false;
  statePause.value = true;
  stateRestart.value = false;
}

function restart() {
  stateStart.value = false;
  statePause.value = false;
  stateRestart.value = true;
}

onMounted(() => {
  loopIntervalRendom();
  loopIntervalRendom(2000, 5000, generateCookie);
});

// Player comportement
function onHitPlayer() {
  if (player.value) {
    player.value.onHitPlayer()
  }
  if(athRef.value) {
    athRef.value.onHitPlayerHealth()
  }
}

function onStopHitPlayer() {
  if (player.value) {
    player.value.onStopHitPlayer()
  }
}

function onDestroyProjectile(id) {
  if (player.value) {
    player.value.destroyProjectile(id);
  }
}

// const onModelLoaded = (gltf) => {
//   gltf.scene.traverse((child) => {
//     console.log(child.isMesh, child.material);
//     if (child.isMesh && child.material) {
//       child.material.color = new Color(0x00ff00);
//     }
//   });
// };
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
        :start="stateStart"
        :pause="statePause"
        :restart="stateRestart"
      />

      <template v-for="obj in objects" :key="obj.id">
        <Virus
          v-if="obj.type === 'virus'"
          :size="obj.size"
          :position-initial="obj.positionInitial"
          :playerPosition
          :playerMesh="player?.mesh"
          :playerProjectiles="player?.projectileRefs"
          @destroy="() => destroyObject(obj.id)"
          @destroy-projectile="onDestroyProjectile"
          @hit-player="onHitPlayer"
          @stop-hit-player="onStopHitPlayer"
          :start="stateStart"
          :pause="statePause"
          :restart="stateRestart"
        />

        <Cookie
          v-else-if="obj.type === 'cookie'"
          :size="obj.size"
          :position-initial="obj.positionInitial"
          :playerPosition
          :playerMesh="player?.mesh"
          :playerProjectiles="player?.projectileRefs"
          @destroy="() => destroyObject(obj.id)"
          :start="stateStart"
          :pause="statePause"
          :restart="stateRestart"
        />
      </template>
      <!-- <Suspense>
        <TresGroup :rotation="[Math.PI / 2, 0, 0]" :scale="[0.4, 0.4, 0.4]">
          <GLTFModel path="/models/cookie.gltf" @loaded="onModelLoaded" />
        </TresGroup>
      </Suspense> -->
    </TresCanvas>
    <ATH ref="ath" @start-game="start" @pause-game="pause" @restart-game="restart"/>
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
