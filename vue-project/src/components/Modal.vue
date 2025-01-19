<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps({
  titleModal: {
    type: String,
    required: true,
  },
  iconButtonModal: {
    type: Array,
    required: true,
  },
  titleButton: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['buttonActionModal'])

</script>

<template>
  <div class="flex p-2 bg-mitt-green-600 rounded w-80">
    <img src="@/assets/images/smith.png" alt="Agent Smith de Matrix" class="h-full size-1/3">
    <div class="flex flex-col justify-between p-5">
      <span class="text-2xl">{{ titleModal }}</span>
      <button @click="emit('buttonActionModal')" class="flex items-center justify-center p-2 mt-2 outline-none bg-mitt-green-600 rounded hover:bg-mitt-green-500 hover:text-mitt-green-600 transition-colors border">
        <font-awesome-icon :icon="iconButtonModal" class="size-6"/>
        <span class="ml-1">{{ titleButton }}</span>
      </button>
    </div>
  </div>
</template>