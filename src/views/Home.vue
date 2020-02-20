<template>
    <div v-loading="isLoading" class="content">
        <router-view></router-view>
        <PropertyList></PropertyList>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import PropertyList from '../components/PropertyList/PropertyList';
    import {FILTER_CATEGORY} from "../store/actions.type";

    export default {
        name: "Home",
        components: {
            PropertyList
        },
        computed: {
            ...mapGetters(['filterList', 'isLoading'])
        },
        mounted() {
            // this.fetchCategory();
        },
        methods : {
            fetchCategory() {
                this.$store.dispatch(FILTER_CATEGORY);
            }
        },
    }
</script>

<style scoped>

</style>
