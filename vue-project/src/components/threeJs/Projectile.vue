<script setup>
import { useMoveForward } from "@/composables/object/useMoveForward";
import { onBeforeUnmount, ref, watch, watchEffect } from "vue";

const props = defineProps({
  uid: String,
  position: {
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
const emit = defineEmits(["destroy"]);

const projectileRef = ref(null);

const { positionZ, onStart, onPause, onResume } = useMoveForward(props.position.z, -0.7);

watch(
  () => positionZ.value,
  () => {
    if (positionZ.value <= -50) {
      emit("destroy");
    }
  }
);

onBeforeUnmount(() => {
  if (projectileRef.value) {
    projectileRef.value.parent.remove(projectileRef.value);
  }
});

watchEffect(
  () => {
    if (props.start) {
      onStart();
    } else if (props.pause) {
      onPause();
    } else if (props.restart) {
      onResume();
    }
  }
);

defineExpose({ projectileRef });
</script>

<template>
  <TresMesh
    :uid="uid"
    ref="projectileRef"
    :position="[position.x, position.y, positionZ]"
    :rotation="[Math.PI / 2, 0, 0]"
  >
    <TresCylinderGeometry :args="[0.1, 0.1, 1, 8]" />
    <TresMeshStandardMaterial :color="'#00ff00'" />
  </TresMesh>
</template>
