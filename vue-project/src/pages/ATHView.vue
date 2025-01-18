<script setup>
    import { useTemplateRef } from 'vue'

    import Scoring from "@/components/Scoring.vue"
    import Health from "@/components/Health.vue"
    import Energy from "@/components/Energy.vue"
    import Timer from "@/components/Timer.vue"
    import HardwarePlayer from "@/components/HardwarePlayer.vue"
    import ActionsBar from "@/components/ActionsBar.vue"

    const timerRef = useTemplateRef('timer')
    const scoringRef = useTemplateRef('scoring')


    function startControl () {
        if(timerRef.value) {
            timerRef.value.startTimer()
            scoringRef.value.startScoring()
            emit('startGame')
        }
    }

    function pauseControl () {
        if(timerRef.value) {
            timerRef.value.pauseTimer()
            scoringRef.value.pauseScoring()
            emit('pauseGame')
        }
    }

    function restartControl () {
        if(timerRef.value) {
            timerRef.value.resetTimer()
            scoringRef.value.resetScoring()
            emit('restartGame')
        }
    }


    const emit = defineEmits(['startGame', 'pauseGame', 'restartGame'])
</script>

<template>
    <div class="flex flex-col absolute justify-between h-full w-full p-10">
        <div class="flex w-full justify-between">
            <Timer ref="timer"/>
            <Scoring ref="scoring"/>
        </div>
        <div class="flex justify-between">
            <div class="flex flex-col justify-start w-1/3">
                <Health/>
            </div>
            <ActionsBar @start-action="startControl" @pause-action="pauseControl" @restart-action="restartControl"/>
            <HardwarePlayer/>
        </div>
    </div>
</template>
<style>
</style>