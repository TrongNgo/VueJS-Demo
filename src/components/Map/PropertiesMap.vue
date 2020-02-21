<template>
    <div>
        <map-loader-properties
                :map-config="mapConfig" apiKey="AIzaSyBWvW7Wt8ugToDaU4uBlIfEBxR_gPrOt24">
            <div v-for="(marker, index) in detailData" :key="index">
                <child-marker :position="marker.position" :detail="marker.details"
                            @sendMarker="addMarker">
                </child-marker>
            </div>
        </map-loader-properties>
    </div>
</template>

<!--
    PropertiesMap
        |__ MapLoader
            |__MapProvider
                |__ChildMarker

    - API Kye of Google map :
    https://developers.google.com/maps/documentation/javascript/get-api-key

    - Article: https://viblo.asia/p/su-dung-google-maps-trong-vuejs-Qbq5Qv74KD8

-->
<script>
    import MapLoaderProperties from "./MapLoaderProperties";
    import ChildMarker from "./ChildMarker";
    import helper from '../../helpers/index';

    export default {
        name: "PropertiesMap",
        components: {
            MapLoaderProperties,
            ChildMarker
        },
        props: {
            markers: Array,
            mapData: Object,
            mapConfig: Object
        },
        data() {
            return {
                detailData: [],
                allMarkers:[]
            }
        },
        mounted() {
            this.setMapData()
        },
        watch: {
            mapData: async function() {
                this.setMapData()
            }
        },
        methods: {
            addMarker(data) {
                this.allMarkers.push(data)
            },

            async setMapData() {
                console.log('projectmap -- setmapdata (1)', this.getPage, this.allmarkers)
                this.detailData = []
                /*for(var i = 0 ; i < this.allmarkers.length;i++) {
                    console.log('clear marker',this.allmarkers[i])
                    this.allmarkers[i].setMap(null);
                }*/

                if(this.mapData) {
                    let _lat = this.mapData.lat
                    let _long = this.mapData.lng

                    if(_lat != null && _long != null) {
                        // const imgUrl = this.mapData.projectImageUrls && this.mapData.projectImageUrls.length > 0
                        //     ? this.mapData.projectImageUrls[0].imageURL
                        //     : '';
                        this.detailData.push({
                            details:{title:this.mapData.listingName2,
                                imageUrl: this.CheckDefaultImage(this.mapData.imageUrls[0]),
                                transType: this.CheckListingClass(this.mapData.listingClassId),
                                priceDetial:this.CheckTypeForPrice(this.mapData.listingClassId, this.mapData.price, this.mapData.priceForSale),
                            },
                            position: {lat:_lat, lng:_long}
                        });
                        this.markers.push(this.detailData[0].position);
                    }
                    console.log('projectmap -- setmapdata (2) this.markers', this.markers)
                    console.log('projectmap -- setmapdata (2) this.detailData', this.detailData)

                } else {

                    this.detailData = []
                }
                // this.$store.commit('setIsMapReload', false);
            },

            ConvertPrice(value) {
                if (value == null || value == "") {
                    return "";
                }
                return helper.PRICE_FORMAT(value);
            },
            CheckDefaultImage(value) {
                if (value == undefined || value == null || value == "") {
                    return "/images/empty-photo.png";
                } else {
                    return value;
                }
            },
            CheckListingClass(ListingClassId) {
                let result;
                switch (ListingClassId) {
                    case 1:
                    case 3:
                    case 5:
                    case 6:
                        result = "For Sale";
                        break;
                    case 2:
                    case 4:
                    case 7:
                        result = "For Rent";
                        break;
                    case 12:
                        result = "For Rent | For Sale";
                        break;
                    default:
                        result =  "Unknown"
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
                        result =  "Unknown";
                        break;
                }
                return result;
            }
        }
    }
</script>

<style scoped>

</style>
