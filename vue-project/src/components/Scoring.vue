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

onMounted(() => {
    console.log('score', props.score)
    console.log('scoreMatrix', scoreMatrix.value)
    startScoring()
})

function startScoring () {
    console.log('start scoring')
    scoreMatrix.value = setInterval(() => {
        scoreMatrix.value += 300
    }, 1000);
};

function pauseScoring () {
    console.log('pause scoring')
    clearInterval(scoreMatrix.value);
};

function resetScoring () {
    console.log('reset scoring')
    startScoring();
    scoreMatrix.value = props.score
};

defineExpose({
    startScoring,
    pauseScoring,
    resetScoring,
})
</script>

<template>
    <div class="flex flex-col text-mitt-green-600">
        <span class="flex justify-end text-3xl">
            HIGH SCORE
        </span>
        <div class="flex flex-col items-end mt-2">
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