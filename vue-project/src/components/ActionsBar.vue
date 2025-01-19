<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

const props = defineProps({
  soundState: {
    type: Boolean,
    default: false,
  },
});

const soundControlState = ref(props.soundState);

function soundControl() {
  soundControlState.value = !soundControlState.value;
  emit("soundActivation");
}

const emit = defineEmits([
  "startAction",
  "pauseAction",
  "restartAction, controlSound",
]);
</script>

<template>
  <div class="flex items-center justify-center w-1/3">
    <button
      @keydown.space.prevent
      @click="emit('startAction')"
      class="flex items-center p-2 h-fit outline-none bg-mitt-green-600 rounded hover:bg-mitt-green-500 hover:text-mitt-green-600 transition-colors"
    >
      <font-awesome-icon :icon="['fas', 'play']" class="size-8" />
      <span class="ml-1">START</span>
    </button>
    <button
      @keydown.space.prevent
      @click="emit('pauseAction')"
      class="flex items-center p-2 ml-2 h-fit outline-none bg-mitt-green-600 rounded hover:bg-mitt-green-500 hover:text-mitt-green-600 transition-colors"
    >
      <font-awesome-icon :icon="['fas', 'pause']" class="size-8" />
      <span class="ml-1">PAUSE</span>
    </button>
    <button
      @click="emit('restartAction')"
      @keydown.space.prevent
      class="flex items-center p-2 ml-2 h-fit outline-none bg-mitt-green-600 rounded hover:bg-mitt-green-500 hover:text-mitt-green-600 transition-colors"
    >
      <font-awesome-icon :icon="['fas', 'power-off']" class="size-8" />
      <span class="ml-1">RESTART</span>
    </button>
    <button
      @keydown.space.prevent
      @click="soundControl"
      class="flex items-center p-2 ml-2 h-fit outline-none rounded hover:bg-mitt-green-500 text-mitt-green-600 transition-colors"
    >
      <font-awesome-icon
        :icon="
          soundControlState ? ['fas', 'volume-high'] : ['fas', 'volume-xmark']
        "
        class="size-8"
      />
    </button>
  </div>
</template>
