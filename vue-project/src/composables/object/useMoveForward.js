import { ref, onMounted } from "vue";

export function useMoveForward (initialPositionZ = -50, speed = 0.2) {
  const positionZ = ref(initialPositionZ);
  const currentSpeed = ref(speed)


  const animate = () => {
    positionZ.value += currentSpeed.value;
    requestAnimationFrame(animate);
  };

  onMounted(() => {
    animate();
  });

  function onStart () {
    currentSpeed.value = speed
  }

  function onPause () {
    currentSpeed.value = 0
  }

  function onResume () {
    positionZ.value = initialPositionZ
    currentSpeed.value = speed
  }

  return {
    positionZ,
    onStart,
    onPause,
    onResume,
  };
}
