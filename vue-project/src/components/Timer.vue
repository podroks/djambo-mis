<script setup>
import { ref, computed, onMounted } from 'vue';

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

const startTimer = () => {
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
</script>

<template>
  <div class="text-mitt-green-600 text-3xl">
    {{ timerToDisplay }}
  </div>
</template>
