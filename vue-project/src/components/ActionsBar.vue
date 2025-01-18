<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emit = defineEmits(['startAction', 'pauseAction', 'restartAction'])
</script>

<template>
  <div class="flex items-center justify-center w-1/3">
    <button @click="emit('startAction')" class="flex items-center p-2 h-fit outline-none bg-mitt-green-600 rounded hover:bg-mitt-green-500 hover:text-mitt-green-600 transition-colors">
      <font-awesome-icon :icon="['fas', 'play']" class="size-8" />
      <span class="ml-1">START</span>
    </button>
    <button @click="emit('pauseAction')" class="flex items-center p-2 ml-2 h-fit outline-none bg-mitt-green-600 rounded hover:bg-mitt-green-500 hover:text-mitt-green-600 transition-colors">
      <font-awesome-icon :icon="['fas', 'pause']" class="size-8" />
      <span class="ml-1">PAUSE</span>
    </button>
    <button @click="emit('restartAction')" class="flex items-center p-2 ml-2 h-fit outline-none bg-mitt-green-600 rounded hover:bg-mitt-green-500 hover:text-mitt-green-600 transition-colors">
      <font-awesome-icon :icon="['fas', 'power-off']" class="size-8" />
      <span class="ml-1">RESTART</span>
    </button>
  </div>
</template>