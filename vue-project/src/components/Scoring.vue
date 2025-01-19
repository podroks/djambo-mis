<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  score: {
    type: Number,
    default: 0,
  },
  scoreCookies: {
    type: Number,
    default: 1000,
  },
});
// const scoreMatrix = ref(props.score);
// const interval = ref(null);

// onMounted(() => {
//   startScoring();
// });

// function startScoring() {
//   if (interval.value) {
//     return;
//   }

//   interval.value = setInterval(() => {
//     scoreMatrix.value += 300;
//   }, 1000);
// }

// function pauseScoring() {
//   clearInterval(interval.value);
//   interval.value = null;
// }

// function resetScoring() {
//   scoreMatrix.value = props.score;
//   startScoring();
// }

// defineExpose({
//   startScoring,
//   pauseScoring,
//   resetScoring,
// });

const iconToDisplay = computed(() =>
  props.scoreCookies > 5 ? 1 : props.scoreCookies
);
</script>

<template>
  <div class="flex flex-col text-mitt-green-600">
    <span class="flex justify-end text-3xl"> HIGH SCORE </span>
    <div class="flex flex-col items-end mt-2">
      <div class="text-6xl">
        {{ score }}
      </div>
      <div class="flex text-4xl justify-between mt-2">
        <div
          v-for="cookie in iconToDisplay"
          :key="cookie"
          class="infinite-rotation-animation"
        >
          <font-awesome-icon
            :icon="['fas', 'cookie']"
            class="text-mitt-green-600"
          />
        </div>
        <span v-if="scoreCookies > 5">
          {{ scoreCookies }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.infinite-rotation-animation {
  animation: animName 2s linear infinite;
}

@keyframes animName {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
