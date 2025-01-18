<script setup>
    import Scoring from "@/components/Scoring.vue"
    import Health from "@/components/Health.vue"
    import Energy from "@/components/Energy.vue"
    import Timer from "@/components/Timer.vue"
    import HardwarePlayer from "@/components/HardwarePlayer.vue"
    import ActionsBar from "@/components/ActionsBar.vue"

</script>

<template>
    <div class="flex flex-col absolute justify-between h-full w-full p-10">
        <div class="flex w-full justify-between">
            <Timer/>
            <Scoring/>
        </div>
        <div class="flex justify-between">
            <div class="flex flex-col justify-start">
                <Health/>
                <Energy class="mt-3"/>
            </div>
            <div>
                <ActionsBar/>
            </div>
            <HardwarePlayer/>
        </div>
    </div>
</template>
<style>
</style>