<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useCollisionDetection } from "@/composables/useCollisionDetection";
import { useMoveForward } from "@/composables/object/useMoveForward";

const props = defineProps({
  size: {
    type: Number,
    default: 0.3,
  },
  positionInitial: {
    type: Array,
    default: () => [7, 4, 0],
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
const cookieMeshRef = ref(null);
const playerPositionRef = computed(() => props.playerPosition);

const { positionZ } = useMoveForward(-50, 0.25);
const { collision } = useCollisionDetection(
  playerMeshRef,
  cookieMeshRef,
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
      emit("destroy");
    }
  }
);

onBeforeUnmount(() => {
  if (cookieMeshRef.value) {
    cookieMeshRef.value.parent.remove(cookieMeshRef.value);
  }
});
</script>

<template>
  <TresMesh
    ref="cookieMeshRef"
    :position="[positionInitial[0], positionInitial[1], positionZ]"
    :scale="[1, 1, 0.1]"
  >
    <TresTorusGeometry :args="[size, size * 0.6, 16, 40]" />
    <TresMeshStandardMaterial :color="!collision ? '#77CA84' : 'red'" />
  </TresMesh>
</template>
