<script setup>
import { reactive, ref, watch } from "vue";
import { useFluidMovement } from "@/composables/player/useFluidMovement";

const props = defineProps({
  size: {
    type: Array,
    default: () => [0.5, 0.5, 1],
  },
  pause: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["position"]);

const mesh = ref(null);
const isHit = ref(false);

const { position, onPause, onResume } = useFluidMovement(0.04);

watch(
  () => position.value,
  (newPos) => {
    emit("position", { x: newPos.x, y: newPos.y, z: 0 });
  },
  { deep: true }
);

watch(
  () => props.pause,
  (isPause) => {
    // console.log("props.pause", props.pause);
    if (isPause) {
      onPause();
    } else {
      onResume();
    }
  }
);

function onHitPlayer() {
  isHit.value = true;
}

function onStopHitPlayer() {
  isHit.value = false;
}

defineExpose({ mesh, onHitPlayer, onStopHitPlayer });
</script>

<template>
  <TresGroup :position="[position.x, position.y, 0]">
    <TresMesh ref="mesh">
      <TresBoxGeometry :args="size" />
      <TresMeshStandardMaterial :color="isHit ? '#225034' : '#77CA84'" />
    </TresMesh>

    <TresMesh :position="[0, 0, -10]" :rotation="[Math.PI / 2, 0, 0]">
      <TresCylinderGeometry :args="[0.015, 0.015, 20, 8]" />
      <TresMeshStandardMaterial :color="'#4D9C64'" />
    </TresMesh>
  </TresGroup>
</template>
