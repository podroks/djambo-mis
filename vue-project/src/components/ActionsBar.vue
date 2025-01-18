<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

</script>

<template>
  <div class="flex">
    <button class="flex items-center bg-mitt-green-600 p-2">
      <font-awesome-icon :icon="['fas', 'play']" class="size-8" />
      <span class="ml-1">START</span>
    </button>
    <button class="flex items-center bg-mitt-green-600 p-2 ml-2">
      <font-awesome-icon :icon="['fas', 'pause']" class="size-8" />
      <span class="ml-1">PAUSE</span>
    </button>
    <button class="flex items-center bg-mitt-green-600 p-2 ml-2">
      <font-awesome-icon :icon="['fas', 'retweet']" class="size-8" />
      <span class="ml-1">RESET</span>
    </button>
  </div>
</template>