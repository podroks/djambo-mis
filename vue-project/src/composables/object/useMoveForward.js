import { ref, onMounted } from "vue";

const maxSpeed = 0.8

export function useMoveForward (initialPositionZ = -50, speed = 0.1) {
  const positionZ = ref(initialPositionZ);
  const currentSpeed = ref(speed)


  const animate = () => {
    positionZ.value += currentSpeed.value;
    requestAnimationFrame(animate);
  };

  const increaseSpeed = (interval, increment) => {
    setInterval(() => {
      // Vérifie si la vitesse est inférieure à la vitesse maximale
      if (currentSpeed.value < maxSpeed) {
        currentSpeed.value = Math.min(currentSpeed.value + increment, maxSpeed);
        console.log(`Current global speed: ${currentSpeed.value}`);
      } else {
        console.log("Maximum speed reached!");
      }
    }, interval);
  };

  onMounted(() => {
    animate();
    if (!increaseSpeed.hasRun) {
      increaseSpeed(6000, 0.008); // Ajuste l'incrément si nécessaire
      increaseSpeed.hasRun = true;
    }
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
