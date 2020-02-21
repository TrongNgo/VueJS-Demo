<template>
    <div>
        <!--    https://vuejs.org/v2/guide/components-slots.html-->
        <!--  like ng-content   -->
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "MapProvider",
        props: {
            google: Object,
            map: Object
        },
        // https://vuejs.org/v2/api/#provide-inject
        // provide for ChildMarker
        provide() {
            return {
                google: this.google,
                map: this.map
            }
        }

    }
</script>

<style scoped>

</style>
