<template>
    <div class="content">
        <router-view></router-view>
        <PropertyList></PropertyList>
    </div>
</template>

<script>
    import PropertyList from '../components/PropertyList';

    export default {
        name: "Home",
        components: {
            PropertyList
        }
    }
</script>

<style scoped>

</style>
