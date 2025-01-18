<script setup>
import { useMoveForward } from "@/composables/object/useMoveForward";
import { onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0, z: 0 }),
  },
});
const emit = defineEmits(["destroy"]);

const projectileRef = ref(null);

const { positionZ } = useMoveForward(props.position.z, -0.1);

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

defineExpose({ projectileRef });
</script>

<template>
  <TresMesh
    ref="projectileRef"
    :position="[position.x, position.y, positionZ]"
    :rotation="[Math.PI / 2, 0, 0]"
  >
    <TresCylinderGeometry :args="[0.1, 0.1, 1, 8]" />
    <TresMeshStandardMaterial :color="'#00ff00'" />
  </TresMesh>
</template>
