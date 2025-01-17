import { ref, onMounted, onUnmounted } from "vue";

export function useStepMovement(step = 0.5) {
  const position = ref({ x: 0, y: 0 });

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 90: // Z
      case 38: // UP
        position.value.y += step;
        break;
      case 83: // S
      case 40: // DOWN
        position.value.y -= step;
        break;
      case 81: // Q
      case 37: // LEFT
        position.value.x -= step;
        break;
      case 68: // D
      case 39: // RIGHT
        position.value.x += step;
        break;
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  return { position };
}
