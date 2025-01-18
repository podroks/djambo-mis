<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue';

const props = defineProps({
    pauseTimer: {
      type: Boolean,
      default: true,
    },
})

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const timer = ref(null);

const timerToDisplay = computed(() => {
  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(hours.value)}:${pad(minutes.value)}:${pad(seconds.value)}`;
});

onMounted(() => {
  startTimer()
})

function startTimer () {
  timer.value = setInterval(() => {
    seconds.value++;

    if (seconds.value >= 60) {
      seconds.value = 0;
      minutes.value++;
    }

    if (minutes.value >= 60) {
      minutes.value = 0;
      hours.value++;
    }
  }, 1000);
};

function pauseTimer () {
  clearInterval(timer.value);
  timer.value = null;
};

function resetTimer () {
  startTimer();
  hours.value = 0;
  minutes.value = 0;
  seconds.value = 0;
};

defineExpose({
  startTimer,
  pauseTimer,
  resetTimer,
})

</script>

<template>
  <div class="text-mitt-green-600 text-3xl">
    {{ timerToDisplay }}
  </div>
</template>
