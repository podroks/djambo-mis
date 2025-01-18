<script setup>
import { ref, watch } from "vue";
import { useFluidMovement } from "@/composables/player/useFluidMovement";

defineProps({
  size: {
    type: Array,
    default: () => [0.5, 0.5, 1],
  },
});
const emit = defineEmits("position");

const mesh = ref(null);

const { position } = useFluidMovement(0.04);

watch(
  () => position.value,
  (newPos) => {
    emit("position", { x: newPos.x, y: newPos.y, z: 0 });
  },
  { deep: true }
);

defineExpose({ mesh });
</script>

<template>
  <TresMesh ref="mesh" :position="[position.x, position.y, 0]">
    <TresBoxGeometry :args="size" />
    <TresMeshStandardMaterial color="#77CA84" />
  </TresMesh>
</template>
