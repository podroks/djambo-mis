<script setup>
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { useFluidMovement } from "@/composables/player/useFluidMovement";
import { generateUID } from "@/utils/generation";
import Projectile from "./Projectile.vue";

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

// Projectile
const projectileRefs = useTemplateRef("projectileRefs");
onMounted(() => {
  window.addEventListener("keydown", shoot);
});

const projectiles = ref([]);
function shoot(event) {
  if (event.keyCode === 32) {
    projectiles.value.push({
      id: generateUID(),
      position: {
        x: position.value.x,
        y: position.value.y,
        z: 0,
      },
    });
  }
}

function destroyProjectile(id) {
  projectiles.value = projectiles.value.filter(
    (projectile) => projectile.id !== id
  );
}

watch(
  () => projectileRefs.value,
  (newVal) => console.log(newVal, projectileRefs.value),
  { deep: true }
);

defineExpose({ mesh, onHitPlayer, onStopHitPlayer, projectileRefs });
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
  <Projectile
    v-for="projectile in projectiles"
    :key="projectile.id"
    ref="projectileRefs"
    :position="projectile.position"
    @destroy="() => destroyProjectile(projectile.id)"
  />
</template>
