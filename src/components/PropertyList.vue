<template>
    <div>
        <div class="title">
            <span class="title">{{ title }}</span>
        </div>
        <el-row v-loading="isLoading" :gutter="20">
            <div v-for="(item, index) in properties" :key="index">
                <el-col class="property-excerpt-area" :xs="12" :sm="12" :lg="24" :xl="12">
                    <el-row class="property-area" :gutter="20">
                        <el-col :span="24">
                            <!--  Image Carousel  -->
                            <el-row class="detail-header-slide" v-if="item.document.imageUrls.length > 0">
                                <ImageSlideForHome :slides="CheckDefaultImage(item.document.imageUrls)"
                                                    :listing-id="item.document.listingId" class="slider-gallery">
                                </ImageSlideForHome>
                            </el-row>

                            <el-row class="detail-header-slide">
                                <!--  directive :style  = NgClass -->
                                <div class="property-img new-line"
                                     :style="{ 'background-image': 'url(' + CheckDefaultImage(item.document.imageUrls[0]) + ')' }">
                                </div>
                                <div class="property-tag" v-if="item.document.tagsId !== 0">
                                    {{item.document.tagsName}}
                                </div>
                            </el-row>
                        </el-col>
                    </el-row>

                    <div @click="GotoDetail(item.document.listingId)">
                        <div class="property-detail">
                            <el-row>
                                <el-col :md="16" :sm="16" :xs="14">
                                    <div class="property-for new-line" style="padding-top: 2px;">
                                        {{CheckTypeOfProperty(item.document.propClassId)}}
                                        {{CheckListingClass(item.document.listingClassId)}}
                                    </div>
                                </el-col>
                                <el-col :md="2" :sm="2" :xs="3">
                                    <img class="time-icon" src="/images/time.svg" >
                                </el-col>
                                <el-col :md="6" :sm="6" :xs="7">
                                    <div class="time new-line" style="padding-top: 2px;">{{item.document.displayTimeAgo}}</div>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col>
                                    <div class="property-name new-line">{{truncate(item.document.title, 20)}}</div>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col>
                                    <div class="property-cost new-line" v-if="item.document">
                                        <span>{{CheckTypeForPrice(item.document.listingClassId, item.document.price, item.document.priceForSale)}}</span>
                                    </div>
                                </el-col>
                            </el-row>

                            <!--  Number of Bed    -->
                            <el-row>
                                <el-col :span="6">
                                    <div class="bed new-line">
                                        <font-awesome-icon icon="bed" style="margin-top:2px;"/>
                                        <span class="fearture-text" style="padding-left: 5px;">{{item.document.bedrooms}}</span>
                                    </div>
                                </el-col>

                                <el-col :span="6">
                                    <div class="bath new-line">
                                        <font-awesome-icon icon="bath" />
                                        <span class="fearture-text-bath" style="padding-left: 5px;">{{item.document.bathrooms}}</span>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="area">
                                        <span> <img style="margin-top:3px;" src="/images/square.svg"></span>
                                        <span class="area-text">
                                            {{item.document.areaSqM}}
                                            <small class="area new-line">sqm</small>
                                        </span>
                                    </div>
                                </el-col>
                            </el-row>

                            <!--  Location   -->
                            <el-row>
                                <el-col :span="24">
                                    <img src="../../public/images/location-Icon.svg" alt="" style="height: 15px; width: 15px;">
                                    <span class="location" style="padding-left: 10px;">{{truncate(item.document.location, 20)}}</span>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
            </div>
        </el-row>

        <div class="view-all" @click="Search(filterList)">
            <span class="view-all">View All {{count.count}}+</span>
            <font-awesome-icon icon="angle-right" class="fa-lg" />
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    import {FETCH_PROPERTIES} from '../store/actions.type';
    import helper from '../helpers/index';
    import ImageSlideForHome from "./PropertyList/ImageSlideForHome";

    export default {
        name: "PropertyList",
        components: {
            ImageSlideForHome
        },
        data() {
            return {
                property: [],
                count: [],
                bindingData: {
                    PREFERENCES:[],
                    NEARBY:[],
                    FLOOR_LEVEL:[],
                    UNIT_TYPE: [],
                    VIEW_TYPE: [],
                    BATH_ROOM: "",
                    BED_ROOM: "",
                    RENT_OR_BUY: [],
                    PRICE_START: "",
                    PRICE_END: "",
                    AREA_START:"",
                    AREA_END: "",
                    SEARCH_TEXT: ""
                },
            }
        },
        computed: {
            ...mapGetters(["propertiesCount", "isLoading", "properties"])
        },
        mounted() {
            this.fetchProperties();
        },
        methods: {
            fetchProperties() {
                this.$store.dispatch(FETCH_PROPERTIES, {});
            },
            CheckDefaultImage(value) {
                if (value == undefined || value == null || value == "") {
                    return "/images/empty-photo.png";
                } else {
                    return value;
                }
            },
            GotoDetail(listingId) {
                let routeData = this.$router.resolve({name: 'detail', query: {propId: listingId}});
                // Open new window
                window.open(routeData.href, '_blank');
            },
            truncate (value,max) {
                if (value.length > max) {
                    value = value.substring(0, max) + '...';
                }
                return value
            },
            CheckTypeOfProperty(PropClassId) {
                let result;
                switch (PropClassId) {
                    case 28:
                        result = "Condo";
                        break;
                    case 33:
                        result = "Apartment";
                        break;
                    case 24:
                        result = "Townhouse";
                        break;
                    default:
                        result = "Unknown";
                        break;
                }
                return result;
            },
            CheckListingClass(ListingClassId) {
                let result;
                switch (ListingClassId) {
                    case 1:
                    case 3:
                    case 5:
                    case 6:
                        result = "for Sale";
                        break;
                    case 2:
                    case 4:
                    case 7:
                        result = "for Rent";
                        break;
                    case 12:
                        result = "for Rent | Sale";
                        break;
                    default:
                        result = "Unknown";
                        break;
                }
                return result;
            },
            CheckTypeForPrice(ListingClassId, priceText, priceForSaleText) {
                let result;
                switch (ListingClassId) {
                    case 1:
                    case 3:
                    case 5:
                    case 6:
                        result = '฿ ' + this.ConvertPrice(priceForSaleText);
                        break;
                    case 2:
                    case 4:
                    case 7:
                        result = '฿ ' + this.ConvertPrice(priceText) + ' /month';
                        break;
                    case 12:
                        result = '฿ ' + this.ConvertPrice(priceText) + ' /month | ฿ ' + this.ConvertPrice(priceForSaleText);
                        break;
                    default:
                        result = 'Unknown';
                        break;
                }
                return result;
            },
            ConvertPrice(value) {
                if (value == null || value == "") {
                    return "";
                }
                return helper.PRICE_FORMAT(value);
            },

            // Search
        }
    }
</script>

<style lang="scss" scoped>
    .item {
        margin-bottom: 20px;
    }
</style>

<!--
        <el-col class="item" v-for="(property, index) in properties"
                :key="property.listingName2 + index"
                :span="6">
            <el-card>
                <el-carousel>
                    <el-carousel-item v-for="image in property.imageUrls" :key="image">
                        <img :src="image">
                    </el-carousel-item>
                </el-carousel>
                <div>
                    <span>{{ property.listingName2 }}</span>
                    <div class="bottom clearfix">
                        {{ property.location }}
                    </div>
                </div>
            </el-card>
        </el-col>
-->
