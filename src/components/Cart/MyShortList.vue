<template>
    <el-dialog v-if="dialogShortList" :visible="dialogShortList" @close="closeShortListPopup()">
        <Booking></Booking>
    </el-dialog>
</template>

<script>
    import Booking from "./Booking";

    export default {
        name: "MyShortList",
        components: {
            Booking
        },
        props: ['dialogShortList'],
        methods: {
            closeShortListPopup() {
                this.$emit('close-shortList', false);
            }
        }
    }
</script>

<style scoped>

</style>
