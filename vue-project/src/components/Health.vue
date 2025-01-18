<script setup>
import { computed, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
    healthNumber: {
        type: Number,
        default: 5,
    },
    hitOnHealth: {
        type: Number,
        required: true,
    }
})

const residualHealth = computed(() => { return props.healthNumber - props.hitOnHealth })

</script>

<template>
    <div class="flex items-center text-mitt-green-600 text-2xl">
        <span class="mr-2">H</span>
        <font-awesome-icon v-for="x in residualHealth" :key="x" :icon="['fas', 'shuttle-space']" class="text-mitt-green-600 -rotate-90 size-8" />
    </div>
</template>