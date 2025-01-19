<script setup>
import { computed, onBeforeUnmount, ref, watch, watchEffect } from "vue";
import { useCollisionDetection } from "@/composables/useCollisionDetection";
import { useMoveForward } from "@/composables/object/useMoveForward";
import { GLTFModel } from "@tresjs/cientos";

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
  playerProjectiles: {
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

const emit = defineEmits([
  "destroy",
  "destroy-projectile",
  "hit-player",
  "stop-hit-player",
]);

const playerMeshRef = computed(() => props.playerMesh);
const virusMeshRef = ref(null);
const playerPositionRef = computed(() => props.playerPosition);
const playerProjectileMeshsRef = computed(() => props.playerProjectiles);

const { positionZ, onStart, onPause, onResume } = useMoveForward();
const { hasCollisionPlayer, collisionProjectileId } = useCollisionDetection(
  playerMeshRef,
  virusMeshRef,
  playerProjectileMeshsRef,
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
  () => collisionProjectileId.value,
  (hasCollision) => {
    if (hasCollision) {
      emit("destroy");
      emit("destroy-projectile", hasCollision);
    }
  }
);

watch(
  () => hasCollisionPlayer.value,
  (hasCollision) => {
    if (hasCollision) {
      emit("hit-player");
    } else {
      emit("stop-hit-player");
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
  if (virusMeshRef.value) {
    virusMeshRef.value.parent.remove(virusMeshRef.value);
  }
});
</script>

<template>
  <TresGroup
    ref="virusMeshRef"
    :position="[positionInitial[0], positionInitial[1], positionZ]"
  >
    <Suspense>
      <TresGroup
        :rotation="[Math.PI / 2, 0, 0]"
        :scale="[size[0], size[0], size[0]]"
      >
        <GLTFModel path="/models/virus.gltf" />
      </TresGroup>
    </Suspense>
  </TresGroup>
</template>
