<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
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

const emit = defineEmits(["destroy", "hit-player", "stop-hit-player"]);

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

watch(
  () => collision.value,
  (hasCollision) => {
    if (hasCollision) {
      emit("hit-player");
    } else {
      emit("stop-hit-player");
    }
  }
);

onBeforeUnmount(() => {
  if (virusMeshRef.value) {
    virusMeshRef.value.parent.remove(virusMeshRef.value);
  }
});
</script>

<template>
  <TresMesh
    ref="virusMeshRef"
    :position="[positionInitial[0], positionInitial[1], positionZ]"
  >
    <TresBoxGeometry :args="size" />
    <TresMeshStandardMaterial color="#236E43" />
  </TresMesh>
</template>
