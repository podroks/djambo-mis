import { ref, watch } from "vue";
import { Box3 } from "three";

export function useCollisionDetection(
  playerMeshRef,
  virusMeshRef,
  playerProjectileMeshsRef,
  playerPositionRef,
  meshPositionZ
) {
  const hasCollisionPlayer = ref(false);
  const collisionProjectileId = ref(null);

  const detectCollision = () => {
    if (!playerMeshRef.value || !virusMeshRef.value) return;

    const box1 = new Box3().setFromObject(playerMeshRef.value);
    const box2 = new Box3().setFromObject(virusMeshRef.value);

    hasCollisionPlayer.value = box1.intersectsBox(box2);

    if (
      !hasCollisionPlayer.value &&
      playerProjectileMeshsRef.value?.length > 0
    ) {
      let i = 0;
      while (
        !collisionProjectileId.value &&
        i < playerProjectileMeshsRef.value.length
      ) {
        const boxProjectile = new Box3().setFromObject(
          playerProjectileMeshsRef.value[i].projectileRef
        );
        if (boxProjectile.intersectsBox(box2)) {
          collisionProjectileId.value =
            playerProjectileMeshsRef.value[i].projectileRef.uid;
        }
        i++;
      }
    }
  };

  watch(
    () => ({
      ...playerPositionRef.value,
      meshPositionZ: meshPositionZ.value ?? 0,
    }),
    () => {
      detectCollision();
    },
    { deep: true }
  );

  return {
    hasCollisionPlayer,
    collisionProjectileId,
  };
}
