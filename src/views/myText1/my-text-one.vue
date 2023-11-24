<template>
    <div>my-text-one</div>
</template>
<script lang="ts">
import { defineComponent , toRaw } from 'vue';
import { useStore } from 'vuex';
export default defineComponent( {
    name: 'my-text-one',
    components: {},
    setup(){
        const store = useStore();
        const getRoute = store.state.currentRoute;
        console.log(toRaw(getRoute),'getRoute')
        return {}
    },
} )
</script>
<style scoped lang="scss"></style>