<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const props = defineProps({
    isKeyboard: {
      type: Boolean,
      default: false,
    },
    isJoy: {
      type: Boolean,
      default: true,
    },
    isMouse: {
      type: Boolean,
      default: false,
    },
})

const keyboardIsActive = ref(props.isKeyboard)
const joyIsActive = ref(props.isJoy)
const mouseIsActive = ref(props.isMouse)
</script>

<template>
  <div class="flex flex-col justify-center">
    <Transition name="fade" mode="out-in">
      <font-awesome-icon v-if="keyboardIsActive" :icon="['fas', 'keyboard']" class="text-mitt-green-600 text-5xl" />
      <font-awesome-icon v-else-if="joyIsActive" :icon="['fas', 'gamepad']" class="text-mitt-green-600 text-5xl" />
      <font-awesome-icon v-else-if="mouseIsActive" :icon="['fas', 'computer-mouse']" class="text-mitt-green-600 text-5xl" />
    </Transition>
  </div>
</template>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>