<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
</script>

<template>
    <div class="flex items-center text-mitt-green-600 text-2xl">
        <span class="mr-2">H</span>
        <font-awesome-icon v-for="x in healthNumber" :key="x" :icon="['fas', 'shuttle-space']" class="text-mitt-green-600 -rotate-90 size-8" />
    </div>
</template>