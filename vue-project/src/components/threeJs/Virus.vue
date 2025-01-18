<script setup>
import { computed, ref } from "vue";
import { useCollisionDetection } from "@/composables/useCollisionDetection";

const props = defineProps({
  size: {
    type: Array,
    default: () => [1, 1, 0.5],
  },
  positionInitial: {
    type: Array,
    default: () => [-7, -4, 0],
  },
  playerMesh: {
    default: undefined,
  },
  playerPosition: {
    type: Object,
    default: () => ({ x: 0, y: 0, z: 0 }),
  },
});

const playerMeshRef = computed(() => props.playerMesh);
const virusMeshRef = ref(null);
const playerPositionRef = computed(() => props.playerPosition);

const { collision } = useCollisionDetection(
  playerMeshRef,
  virusMeshRef,
  playerPositionRef
);
</script>

<template>
  <TresMesh ref="virusMeshRef" :position="positionInitial">
    <TresBoxGeometry :args="size" />
    <TresMeshStandardMaterial :color="!collision ? '#236E43' : 'red'" />
  </TresMesh>
</template>
