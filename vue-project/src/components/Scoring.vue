<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, ref } from 'vue';

const props = defineProps({
    score: {
        type: Number,
        default: 1000,
    }
})
const scoreMatrix = ref(props.score)
onMounted (() => {
    setInterval(() => {
        scoreMatrix.value += 300
    }, 1000)
})
</script>

<template>
    <div class="flex flex-col p-10 text-mitt-green-600">
        <span class="text-3xl">
            HIGH SCORE
        </span>
        <div class="flex flex-col items-end p-2">
            <div class="text-6xl ">
                {{ scoreMatrix }}
            </div>
            <div class="flex text-4xl justify-between mt-2">
                <div class="infinite-rotation-animation">
                    <font-awesome-icon :icon="['fas', 'cookie']" class="text-mitt-green-600" />
                </div>
                <div class="infinite-rotation-animation">
                    <font-awesome-icon :icon="['fas', 'cookie']" class="text-mitt-green-600" />
                </div>
                <div class="infinite-rotation-animation">
                    <font-awesome-icon :icon="['fas', 'cookie']" class="text-mitt-green-600" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.infinite-rotation-animation {
    animation: animName 2s linear infinite;
}

@keyframes animName {
 0%{
    transform: rotateY(0deg);
   }
100%{
    transform: rotateY(360deg);
   }
}
</style>