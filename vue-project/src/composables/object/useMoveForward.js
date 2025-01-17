import { ref, onMounted } from "vue";

export function useMoveForward(initialPositionZ = -50, speed = 0.1) {
  const positionZ = ref(initialPositionZ);

  const animate = () => {
    positionZ.value += speed;
    requestAnimationFrame(animate);
  };

  onMounted(() => {
    animate();
  });

  return {
    positionZ,
  };
}
