<template>
    <div class="infinite-list-wrapper" style="overflow:auto">
        <el-row :gutter="20"
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled">
            <el-col class="item list-item" v-for="(item, index) in properties"
                    :key="item.listingName2 + index"
                    :span="6">
                <el-card>
                    <el-carousel>
                        <el-carousel-item v-for="image in item.imageUrls" :key="image">
                            <img :src="image">
                        </el-carousel-item>
                    </el-carousel>
                    <div @click="goToDetail(item.listingId)">
                        <span>{{ item.listingName2 }}</span>
                        <div class="bottom clearfix">
                            {{ item.location }}
                        </div>
                    </div>
                </el-card>
            </el-col>
<!--            <div v-if="isLoading && isScrolling" class="spinner">-->
<!--                <i class="fas fa-spinner"></i>-->
<!--            </div>-->
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import { FETCH_PROPERTIES } from "../../store/actions.type";

    export default {
        name: "PropertyList",
        props: ["title", "filterList"],
        data() {
            return {
                pageSize: 1,
                isScrolling: false
            }
        },
        components: {
        },
        computed: {
            ...mapGetters(['properties', 'propertiesCount', 'isLoading']),

            disabled() {
                return this.isScrolling;
            }
        },
        mounted() {
            // this.fetchProperties();
            // this.scrolling = 1;
        },
        methods: {
            fetchProperties() {
                const params = {
                    pageSize: this.pageSize
                }
                this.$store.dispatch(FETCH_PROPERTIES, params);
                this.pageSize++;
            },
            goToDetail(listingId) {
                // if don't use router.resolve => the current page will change URL
                // and open the new tab with blank url
                let routeData = this.$router.resolve({name: 'detail', query: {propId: listingId}});
                window.open(routeData.href, '_blank');
            },
            load() {
                this.isScrolling = this.isLoading;
                const params = {
                    pageSize: this.pageSize
                };
                this.$store.dispatch(FETCH_PROPERTIES, params)
                    .then(() => {
                        this.pageSize++;
                        this.isScrolling = this.isLoading;
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item {
        margin-bottom: 20px;
    }

    .spinner i {
        display: inline-block;
        font-size: 1.5em;
        animation: spinner .7s infinite;
    }
    @keyframes spinner {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
