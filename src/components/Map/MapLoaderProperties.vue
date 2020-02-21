<template>
    <div>
        <div id="map"></div>
        <template v-if="!!this.google && this.map">
            <map-provider :google="google" :map="map">
                <slot/>
            </map-provider>
        </template>
    </div>
</template>

<script>
    import GoogleMapsApiLoader from 'google-maps-api-loader';
    import MapProvider from "./MapProvider";

    export default {
        name: "MapLoaderProperties",
        components: {
            MapProvider
        },
        props: {
            mapConfig: Object,
            apiKey: String
        },
        data() {
            return {
                google: null,
                map: null
            }
        },
        mounted() {
            // Google Map Example
            // https://vuejs.org/v2/cookbook/practical-use-of-scoped-slots.html#3-Expose-google-and-map-properties-to-the-parent-component-by-adding-a-scoped-slot

            GoogleMapsApiLoader({
                apiKey: this.apiKey
            }).then(google => {
                this.google = google;
                this.initializeMap();
            })
        },
        methods: {
            initializeMap() {
                // https://vuejs.org/v2/api/#vm-el
                const mapContainer = this.$el.querySelector('#map');
                this.map = new this.google.maps.Map(mapContainer, this.mapConfig);

                // const { Map } = this.google.maps;
                // this.map = new Map(mapContainer, this.mapConfig);
            }
        }
    }
</script>

<style scoped>
    #map {
        height: 540px;
        width: 100%;
        font-family: Josefin Sans;
    }
</style>
