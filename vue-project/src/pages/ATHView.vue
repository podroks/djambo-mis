<script setup>
    import { ref, useTemplateRef } from 'vue'

    import Scoring from "@/components/Scoring.vue"
    import Health from "@/components/Health.vue"
    import Energy from "@/components/Energy.vue"
    import Timer from "@/components/Timer.vue"
    import HardwarePlayer from "@/components/HardwarePlayer.vue"
    import ActionsBar from "@/components/ActionsBar.vue"

    const timerRef = useTemplateRef('timer')

    function pauseControl () {
        console.log('timerRef', timerRef.value)
        if(timerRef.value) {
            timerRef.value.pauseTimer()
            emit('pauseGame')
        }
    }

    const emit = defineEmits(['startGame', 'pauseGame', 'restartGame'])
</script>

<template>
    <div class="flex flex-col absolute justify-between h-full w-full p-10">
        <div class="flex w-full justify-between">
            <Timer ref="timer"/>
            <Scoring/>
        </div>
        <div class="flex justify-between">
            <div class="flex flex-col justify-start w-1/3">
                <Health/>
                <Energy class="mt-3"/>
            </div>
            <ActionsBar @start-action="emit('startGame')" @pause-action="pauseControl" @restart-action="emit('restartGame')"/>
            <HardwarePlayer/>
        </div>
    </div>
</template>
<style>
</style>