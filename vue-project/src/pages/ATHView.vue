<script setup>
    import Scoring from "@/components/Scoring.vue" 
    import Health from "@/components/Health.vue" 
    import Energy from "@/components/Energy.vue" 

</script>

<template>
    <div class="flex flex-col absolute justify-between h-full w-full p-10">
        <div class="flex w-full justify-end">
            <Scoring/>
        </div>
        <div class="flex flex-col w-full justify-start">
            <Health/>
            <Energy class="mt-3"/>
        </div>
    </div>
</template>

<style>
</style>