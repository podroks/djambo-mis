<script setup>
import { onMounted, ref, useTemplateRef, watch, watchEffect } from "vue";
import { useFluidMovement } from "@/composables/player/useFluidMovement";
import { generateUID } from "@/utils/generation";
import { GLTFModel } from "@tresjs/cientos";
import Projectile from "./Projectile.vue";

const props = defineProps({
  size: {
    type: Array,
    default: () => [0.5, 0.5, 1],
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
const emit = defineEmits(["position"]);

const mesh = ref(null);
const isHit = ref(false);

const { position, onStart, onPause, onResume } = useFluidMovement(0.1);

watch(
  () => position.value,
  (newPos) => {
    emit("position", { x: newPos.x, y: newPos.y, z: 0 });
  },
  { deep: true }
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
const canShoot = ref(true);
const shootDelay = ref(200);

function shoot(event) {
  if (canShoot.value && event.keyCode === 32) {
    canShoot.value = false;
    setTimeout(() => {
      canShoot.value = true;
    }, shootDelay.value);
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

defineExpose({
  mesh,
  onHitPlayer,
  onStopHitPlayer,
  projectileRefs,
  destroyProjectile,
});
</script>

<template>
  <TresGroup :position="[position.x, position.y, 0]">
    <TresMesh ref="mesh">
      <TresBoxGeometry :args="[1, 0.5, 1]" />
      <TresMeshStandardMaterial
        :color="'#77CA84'"
        :opacity="isHit ? 0.6 : 0.1"
        :transparent="true"
      />
    </TresMesh>
    <Suspense>
      <TresGroup :rotation="[0, Math.PI, 0]" :scale="[0.025, 0.025, 0.025]">
        <GLTFModel path="/models/space_craft.gltf" />
      </TresGroup>
    </Suspense>

    <TresMesh :position="[0, 0, -10]" :rotation="[Math.PI / 2, 0, 0]">
      <TresCylinderGeometry :args="[0.015, 0.015, 20, 8]" />
      <TresMeshStandardMaterial :color="'#4D9C64'" />
    </TresMesh>
  </TresGroup>
  <Projectile
    v-for="projectile in projectiles"
    :key="projectile.id"
    ref="projectileRefs"
    :uid="projectile.id"
    :position="projectile.position"
    @destroy="() => destroyProjectile(projectile.id)"
    :start="start"
    :pause="pause"
    :restart="restart"
  />
</template>
