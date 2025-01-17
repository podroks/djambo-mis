import { ref, onMounted, onUnmounted } from "vue";

export function useFluidMovement(speed = 0.1) {
  const position = ref({ x: 0, y: 0 });

  const ArrowUp = "ArrowUp";
  const ArrowDown = "ArrowDown";
  const ArrowLeft = "ArrowLeft";
  const ArrowRight = "ArrowRight";

  const keys = {
    [ArrowUp]: false,
    [ArrowDown]: false,
    [ArrowLeft]: false,
    [ArrowRight]: false,
  };

  const getKeyToMove = (event) => {
    switch (event.keyCode) {
      case 90: // Z
      case 38: // UP
        return ArrowUp;
      case 83: // S
      case 40: // DOWN
        return ArrowDown;
      case 81: // Q
      case 37: // LEFT
        return ArrowLeft;
      case 68: // D
      case 39: // RIGHT
        return ArrowRight;
    }
    return null;
  };

  const handleKeyDown = (event) => {
    const keyToMove = getKeyToMove(event);
    if (keys.hasOwnProperty(keyToMove)) {
      keys[keyToMove] = true;
    }
  };

  const handleKeyUp = (event) => {
    const keyToMove = getKeyToMove(event);
    if (keys.hasOwnProperty(keyToMove)) {
      keys[keyToMove] = false;
    }
  };

  const animate = () => {
    if (keys.ArrowUp) position.value.y += speed;
    if (keys.ArrowDown) position.value.y -= speed;
    if (keys.ArrowLeft) position.value.x -= speed;
    if (keys.ArrowRight) position.value.x += speed;
    requestAnimationFrame(animate);
  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    animate();
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  });

  return {
    position,
  };
}
