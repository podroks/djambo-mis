import { ref, watch } from "vue";
import { Box3 } from "three";

export function useCollisionDetection(
  playerMeshRef,
  virusMeshRef,
  playerPositionRef
) {
  const collision = ref(false);

  const detectCollision = () => {
    if (!playerMeshRef.value || !virusMeshRef.value) return;

    const box1 = new Box3().setFromObject(playerMeshRef.value);
    const box2 = new Box3().setFromObject(virusMeshRef.value);

    collision.value = box1.intersectsBox(box2);
  };

  watch(
    playerPositionRef,
    () => {
      detectCollision();
    },
    { deep: true }
  );

  return {
    collision,
  };
}
