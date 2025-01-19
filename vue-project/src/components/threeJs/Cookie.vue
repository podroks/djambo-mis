<script setup>
import { computed, onBeforeUnmount, ref, watch, watchEffect } from "vue";
import { useCollisionDetection } from "@/composables/useCollisionDetection";
import { useMoveForward } from "@/composables/object/useMoveForward";
import { GLTFModel } from "@tresjs/cientos";

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
  start: {
    type: Boolean,
    default: false,
  },
  pause: {
    type: Boolean,
    default: false,
  },
  restart: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["destroy", "destroy-on-collision"]);

const playerMeshRef = computed(() => props.playerMesh);
const cookieMeshRef = ref(null);
const playerPositionRef = computed(() => props.playerPosition);

const { positionZ, onStart, onPause, onResume } = useMoveForward(-50, 0.25);
const { hasCollisionPlayer } = useCollisionDetection(
  playerMeshRef,
  cookieMeshRef,
  [],
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
  () => hasCollisionPlayer.value,
  (hasCollision) => {
    if (hasCollision) {
      emit("destroy-on-collision");
    }
  }
);

watchEffect(() => {
  if (props.start) {
    onStart();
  } else if (props.pause) {
    onPause();
  } else if (props.restart) {
    onResume();
  }
});

onBeforeUnmount(() => {
  if (cookieMeshRef.value) {
    cookieMeshRef.value.parent.remove(cookieMeshRef.value);
  }
});
</script>

<template>
  <TresGroup
    ref="cookieMeshRef"
    :position="[positionInitial[0], positionInitial[1], positionZ]"
  >
    <Suspense>
      <TresGroup :rotation="[Math.PI / 2, 0, 0]" :scale="[0.15, 0.15, 0.15]">
        <GLTFModel path="/models/cookie.gltf" />
      </TresGroup>
    </Suspense>
  </TresGroup>
</template>
