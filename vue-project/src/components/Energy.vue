<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, ref } from 'vue';

const props = defineProps({
    healthNumber: {
        type: Number,
        default: 5,
    },
    residualHealth: {
        type: Number,
        default: 5,
    }
})

const test = ref(5)

onMounted(() => {
    setInterval(() => {
        test.value -= 0.05
    }, 100)
})
const opacity =  ref(.4)
</script>

<template>
    <div class="flex items-center text-mitt-green-600 text-2xl" >
        <span class="mr-2">E</span>
        <div v-for="x in healthNumber" :key="x" :style="`--opacity: ${test - x + 1}`">
            <font-awesome-icon  :icon="['fas', 'bolt']" class="ma-class text-mitt-green-600 size-8"/>
        </div>
    </div>
</template>

<style>
.ma-class {
    opacity: var(--opacity);
}
</style>