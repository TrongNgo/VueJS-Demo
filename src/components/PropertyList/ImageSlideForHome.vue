<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, i) in imageList" :key="`slide-${i}`">
            <div  @click="GotoDetail(listingId)">
                <img v-if="slide.imageURL != undefined" :src="slide.imageURL"  style="height:300px;object-fit: contain;" alt="">
                <img v-else :src="slide"  style="height:300px;object-fit: contain;" alt="">
            </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    </swiper>
</template>

<script>
    export default {
        name: 'Slider',
        // https://www.smashingmagazine.com/2020/01/data-components-vue-js/#propos-share-data-parent-child
        // @Input
        props: [ 'slides', 'listingId' ],

        data () {
            return {
                imageList: [],
                swiperOption: {
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    height: 300,
                    spaceBetween: 10,
                    centeredSlides: true,
                    paginationShow: true,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets'
                    }
                }
            }
        },
        mounted() {
            this.imageList = this.slides;
        },
        methods: {
            GotoDetail(listingId){
                let routeData = this.$router.resolve({name: 'detail', query: {propId: listingId }});
                window.open(routeData.href, '_blank');
            },
        },
        watch: {
            slides: function(newVal, oldVal) {
                this.imageList = newVal;
            },
        },

    }
</script>

<style lang="scss" scoped>
    @import 'src/assets/scss/image-slide-home';
</style>
