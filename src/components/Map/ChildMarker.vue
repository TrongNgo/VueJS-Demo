<template>
    <div>
        <div id="mapInfo" style="display:none;"
             :class="detail.projectId == this.getClassMapInfo ?'mapContent selected':'mapContent'">
                {{detail.title + ' (' + detail.countProp + ')'}}
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "ChildMarker",
        // receive from MapProvider
        inject: ["google", "map"],
        props: {
            position: Object,
            detail: Object
        },
        computed: {
            ...mapGetters(["getClassMapInfo"])
        },
        data(){
            return {
                marker: null,
                iconBase : 'https://imomistorage.blob.core.windows.net/documents-dev/mapMarker.svg'}
        },
        mounted() {
            let _route = this.$router;
            // let self = this;
            const { Marker } = this.google.maps;
            // var container = this.$el.querySelector("#mapInfo")

            //  console.log(container)
            // container.addClass( ".selected" );
            let contentString = '<div class="mapContent">'+ this.detail.title;
            if (this.detail.countProp) {
                contentString += ' (' + this.detail.countProp + ')';
            }
            contentString += '</div>';

            var infowindow = new this.google.maps.InfoWindow({
                content: contentString,
                maxWidth: 350
            });

            this.marker = new Marker({
                position: this.position,
                map: this.map,
                title: "",
                animation: this.google.maps.Animation.DROP,
                icon: this.iconBase
            });

            infowindow.open(Marker, this.marker);
            this.marker.addListener('mouseover', function() {
                // infowindow.open(this.map, this);
            });

            this.marker.addListener('mouseout', function() {
                //  infowindow.close(this.map, this);
            })

            this.marker.addListener('click', function() {

                if (this.detail.clickMode && this.detail.clickMode == 'project') {
                    //project marker click
                    // do notthing
                } else {
                    //go to detail
                    let routeData = _route.resolve({name: 'detail', query: {propId: this.detail.listingId }});
                    window.open(routeData.href, '_blank');
                }
            });

            this.$emit("SentMarker", this.marker);
        },
        methods: {
            GotoDetail() {
                let routeData = this.$router.resolve({name: 'detail', query: {propId: this.detail.listingId }});
                window.open(routeData.href, '_blank');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mapContent {
        display: flex;
        flex-direction: row;
        width: 200px;
        .leftArea{
            width: 70px;
            justify-content: flex-start;
        }
        .rightArea{
            width: 120px;
            justify-content: flex-end;

        }
    }
</style>
