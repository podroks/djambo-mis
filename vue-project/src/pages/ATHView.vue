<script setup>
import { ref, useTemplateRef, watch } from "vue";

import Scoring from "@/components/Scoring.vue";
import Health from "@/components/Health.vue";
import Timer from "@/components/Timer.vue";
import HardwarePlayer from "@/components/HardwarePlayer.vue";
import ActionsBar from "@/components/ActionsBar.vue";
import Modal from "@/components/Modal.vue";

const timerRef = useTemplateRef("timer");
const scoringRef = useTemplateRef("scoring");
const countHit = ref(null);
const score = ref(0);
const scoreCookies = ref(0);

watch(countHit, (newCountHit) => {
  //   console.log("tu as pris un hit");
  if (newCountHit >= 5) {
    // console.log("pause");
    pauseControl();
  }
});

function startControl() {
  if (timerRef.value) {
    timerRef.value.startTimer();
    // scoringRef.value.startScoring();
    emit("startGame");
  }
}

function pauseControl() {
  if (timerRef.value) {
    timerRef.value.pauseTimer();
    // scoringRef.value.pauseScoring();
    emit("pauseGame");
  }
}

function restartControl() {
  if (timerRef.value) {
    timerRef.value.resetTimer();
    // scoringRef.value.resetScoring();
    countHit.value = 0;
    emit("restartGame");
  }
}

function onHitPlayerHealth() {
  countHit.value++;
}

function addScore(scoreToAdd) {
  score.value += scoreToAdd;
}

function addScoreCookie(scoreToAdd = 1) {
  scoreCookies.value += scoreToAdd;
}

function resetScore() {
  score.value = 0;
}

function resetScoreCookie() {
  scoreCookies.value = 0;
}

function onActiveSound() {
  emit("soundActive");
}

defineExpose({
  onHitPlayerHealth,
  addScore,
  addScoreCookie,
  resetScore,
  resetScoreCookie,
});
const emit = defineEmits([
  "startGame",
  "pauseGame",
  "restartGame",
  "resetHitHealth",
  "soundActive",
]);
</script>

<template>
  <div class="flex flex-col absolute justify-between h-full w-full p-10">
    <div class="flex w-full justify-between">
      <Timer ref="timer" />
      <Scoring ref="scoring" :score :score-cookies="scoreCookies" />
    </div>
    <Modal
      v-if="countHit >= 5"
      title-modal="GAME OVER"
      :icon-button-modal="['fas', 'power-off']"
      title-button="RESTART"
      class="m-auto"
      @button-action-modal="restartControl"
    />
    <div class="flex justify-between">
      <div class="flex flex-col justify-start w-1/3">
        <Health ref="health" :hit-on-health="countHit" />
      </div>
      <ActionsBar
        v-if="countHit < 5"
        @start-action="startControl"
        @pause-action="pauseControl"
        @restart-action="restartControl"
        @sound-activation="onActiveSound"
      />
      <HardwarePlayer />
    </div>
  </div>
</template>
<style></style>
