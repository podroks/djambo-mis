<script setup>
    import { ref, useTemplateRef } from 'vue'

    import Scoring from "@/components/Scoring.vue"
    import Health from "@/components/Health.vue"
    import Timer from "@/components/Timer.vue"
    import HardwarePlayer from "@/components/HardwarePlayer.vue"
    import ActionsBar from "@/components/ActionsBar.vue"

    const timerRef = useTemplateRef('timer')
    const scoringRef = useTemplateRef('scoring')
    const countHit = ref(null)


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
            countHit.value = 0
            emit('restartGame')
        }
    }

    function onHitPlayerHealth () {
        countHit.value++
    }

    defineExpose({
        onHitPlayerHealth
    });
    const emit = defineEmits(['startGame', 'pauseGame', 'restartGame', 'resetHitHealth'])
</script>

<template>
    <div class="flex flex-col absolute justify-between h-full w-full p-10">
        <div class="flex w-full justify-between">
            <Timer ref="timer"/>
            <Scoring ref="scoring"/>
        </div>
        <div class="flex justify-between">
            <div class="flex flex-col justify-start w-1/3">
                <Health ref="health" :hit-on-health="countHit"/>
            </div>
            <ActionsBar @start-action="startControl" @pause-action="pauseControl" @restart-action="restartControl"/>
            <HardwarePlayer/>
        </div>
    </div>
</template>
<style>
</style>