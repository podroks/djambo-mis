<script setup>
import { computed, ref, watch } from "vue";
import { useCollisionDetection } from "@/composables/useCollisionDetection";
import { useMoveForward } from "@/composables/object/useMoveForward";

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

const emit = defineEmits(["destroy"]);

const playerMeshRef = computed(() => props.playerMesh);
const virusMeshRef = ref(null);
const playerPositionRef = computed(() => props.playerPosition);

const { positionZ } = useMoveForward();
const { collision } = useCollisionDetection(
  playerMeshRef,
  virusMeshRef,
  playerPositionRef,
  positionZ
);

watch(
  () => positionZ.value,
  () => {
    if (positionZ.value >= 10) {
      emit("destroy");
    }
  }
);
</script>

<template>
  <TresMesh
    ref="virusMeshRef"
    :position="[positionInitial[0], positionInitial[1], positionZ]"
  >
    <TresBoxGeometry :args="size" />
    <TresMeshStandardMaterial :color="!collision ? '#236E43' : 'red'" />
  </TresMesh>
</template>
