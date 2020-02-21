<template>
    <div class="properties-detail-area">
        <div class="detail-inner-area" v-if="details.listingId != undefined">
            <div class="detail-header-area">
                <el-row class="detail-header">
                    <el-col :span="16">
                        <el-row>
                            <el-carousel height="400px">
                                <el-carousel-item v-for="image in details.imageUrls" :key="image">
                                    <img :src="image" style="height: 100%">
                                </el-carousel-item>
                            </el-carousel>
                        </el-row>
                    </el-col>

                    <el-col :span="8">
                        <div class="price-area">
                            <el-row style="padding-bottom: 15px;">
                                <el-col :md="12" class="price-title">For Rent</el-col>
                                <el-col :md="12" class="price-title">For Sale</el-col>
                            </el-row>
                            <el-row>
                                <el-col :md="12" class="price-text">
                                    <span>$ 12k/month</span>
                                </el-col>
                                <el-col :md="12" class="price-text">
                                    <span>$ 12k/month</span>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col>
                                    <!-- TODO: Edit button For only Staff  -->
                                    <el-button round
                                               class="btn-edit"
                                               @click="dialogVisible = true">
                                        <span><font-awesome-icon icon="edit" /></span>
                                        <span>Edit</span>
                                    </el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-button v-if="!isBooked" round @click="addShortList()"
                                               class="btn-add-shortlisted btn-add">
                                        <span>Add to ShortList</span>
                                    </el-button>
                                    <el-button v-else round @click="removeShortList()"
                                               class='btn-add-shortlisted-selected btn-add'>
                                        <span v-if="isBooked" class="btn-add-icon"><i class="el-icon-check"></i></span>
                                        <span>Added to ShortList</span>
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="detail-body">
                <el-row class="detail-body-inner">
                    <el-col :md="16">
                        <el-row :md="15" :xs="24" class="detail-row">
                            <el-col class="time-ago">{{ details.displayTimeAgo }}</el-col>
                        </el-row>

                        <el-row class="detail-row">
                            <el-col class="properties-name">{{ details.listingName2 }}</el-col>
                        </el-row>

                        <el-row class="detail-row">
                            <el-col>
                                <span class="font-icon-small" style="color: red"><i class="fas fa-map-marker-alt"></i></span>
                                <span class="location-text">   {{details.location}}</span>
                            </el-col>
                        </el-row>

                        <el-row class="detail-row">
                            <el-col :md="6" :xs="6" :sm="6">
                                <div class="feature-item">
                                    <span class="font-icon-large"><i class="fas fa-bed"></i></span>
                                    <span class="text">{{details.bedrooms}}</span>
                                </div>
                            </el-col>

                            <el-col :md="6" :xs="6" :sm="6">
                                <div class="feature-item">
                                    <span class="font-icon-large"><i class="fas fa-bath"></i></span>
                                    <span class="text">{{details.bathrooms}}</span>
                                </div>
                            </el-col>

                            <el-col :md="10" :xs="10" :sm="10">
                                <div class="feature-item">
                                    <span class="font-icon-large"><i class="fas fa-vector-square"></i></span>
                                    <span class="text-area">{{details.areaSqM}} sqm</span>
                                </div>
                            </el-col>
                        </el-row>

                        <el-row class="detail-row">
                            <el-col :md="6" :xs="6" :sm="6">
                                <div class="feature-item2">
                                    <span class="font-icon-large"><i class="fas fa-building"></i></span>
                                    <span class="text">{{details.floorNumber == null || details.floorNumber == "0"?"- fl":details.floorNumber+" fl"}}</span>
                                </div>
                            </el-col>

                            <el-col :md="6" :xs="6" :sm="6">
                                <div class="feature-item2">
                                    <span class="font-icon-large"><i class="fas fa-chair"></i></span>
                                    <span class="text">{{details.furniture == 'true'? 'Furnished':'Unfurnished'}}</span>
                                </div>
                            </el-col>

                            <el-col :md="10" :xs="10" :sm="10">
                                <div class="feature-item2">
                                    <span class="font-icon-large"><i class="fas fa-paw"></i></span>
                                    <span class="text">{{details.petsAllowed == 'true'? 'Pet Friendly':'Not Pet Friendly'}}</span>
                                </div>
                            </el-col>
                        </el-row>

                        <!--  Staff : Owner Info  -->
                        <el-row class="score-feature-area">
                            <el-col>
                                <!--   Tabs    -->
                                <el-tabs value="first">
                                    <el-tab-pane class="tab-label" label="Owner Details" name="first">
                        <!--   Column Info   -->
                                        <div class="homeowner-detail">
                                            <el-row>
                                                <el-col :span="7" class="header-detail">Name</el-col>
                                                <el-col :span="5" class="header-detail">Joined</el-col>
                                            </el-row>

                                            <el-row>
                                                <el-col :span="7" class="header-detail">
                                                    {{ homeOwnerDetail.firstName }} {{ homeOwnerDetail.lastName }}
                                                </el-col>
                                                <el-col :span="7" class="header-detail">
                                                    {{ setFormatDate(homeOwnerDetail.createdDate) }}
                                                </el-col>
                                            </el-row>

                                            <el-row>
                                                <el-col :span="7" class="header-detail">Email</el-col>
                                                <el-col :span="5" class="header-detail">Other properties</el-col>
                                            </el-row>

                                            <el-row style="margin-bottom: 15px;">
                                                <el-col :span="7" class="header-detail">
                                                    {{ homeOwnerDetail.email }}
                                                </el-col>

                                                <!--  go to home  -->
                                                <el-col :span="7" class="header-detail">
                                                    {{ homeOwnerDetail.numberOfProperties }}
                                                    <span class="link" @click="goToHomeOwnerProp()">
                                                        View
                                                    </span>
                                                </el-col>
                                            </el-row>

                                            <el-row>
                                                <el-col :span="7" class="header-detail">Phone</el-col>
                                                <el-col :span="5" class="header-detail">Mobile</el-col>
                                            </el-row>

                                            <el-row>
                                                <el-col :span="7" class="header-detail">{{ homeOwnerDetail.phone }}</el-col>
                                                <el-col :span="5" class="header-detail">{{ homeOwnerDetail.mobile}}</el-col>
                                            </el-row>
                                        </div>
                                    </el-tab-pane>


                                    <el-tab-pane class="tab-label" :label="noteHead" name="second"
                                            style="background-color: #FAFAFA;padding-top:10px;padding-bottom:10px;" >
                                        <div v-for="(item, index) in notesList" :key="index" class="note-area">
                                            <div v-if="index <= 1" class="note-inner">
                                                <p>{{ item.note }}</p>
                                                <div class="note-date-inner">
                                                    {{ item.createBy }} | {{ setFormatDate(item.createdDate) }} || {{  }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="note-control-area">
                                            <div class="left-area">
                                                <el-button type="text" size="medium" icon="el-icon-circle-plus"
                                                    @click="addNote()">
                                                    Add New Note
                                                </el-button>
                                            </div>

                                            <div class="right-area">
                                                <el-button type="text" size="medium"
                                                           @click="openNoteDialog('note')">
                                                    View All <i class="el-icon-arrow-right"></i>
                                                </el-button>
                                            </div>
                                        </div>
                                    </el-tab-pane>

                                    <!-- History -->
                                    <el-tab-pane class="tab-label" label="History" name="third"
                                                 style="background-color: #FAFAFA;padding-top:10px;padding-bottom:10px;">
                                        <div class="history-control-area">
                                            <div class="left-area">
                                                <el-table border :data="historyList"
                                                    stripe height="100%"
                                                    style="width: 100%">
                                                    <el-table-column prop="changedField" label="Field" width="105"></el-table-column>
                                                    <el-table-column prop="changedFrom" label="Changed From" width="145"></el-table-column>
                                                    <el-table-column prop="changedto" label="Changed To" width="140"></el-table-column>
                                                    <el-table-column prop="createdBy" label="By" width="85"></el-table-column>

                                                    <!-- like cellTemplate  -->
                                                    <el-table-column prop="createdDate" label="On" width="160">
                                                        <template slot-scope="scope">
                                                            <span style="margin-left: 10px">
                                                                {{ setFormatDate(scope.row.createdDate, 'dd/mm/yyyy', true) }}
                                                            </span>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                            </div>

                                            <div class="right-area">
                                                <el-button type="text" size="medium" @click="openNoteDialog('history')">
                                                     View All <i class="el-icon-arrow-right"></i>
                                                </el-button>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-col>
                        </el-row>


                <!--     Staff - Feedback      v-if="getMemberId == details.listingOwnerId || getRole == 'Staff'"             -->
                        <el-row class="score-feature-area" style="margin-top: 20px;">
                            <div v-if="feedbackSum.summaryList && feedbackSum.summaryList.length !== 0">
                                <el-col :md="15">
                                    <div>
                                        <el-row class="new-line">
                                            <el-col :md="24" :sm="12">
                                                <div class="score-feature-head">
                                                    <span class="text">Property Score</span>
                                                </div>
                                            </el-col>

                                            <el-col :md="24" :sm="12" v-for="(item,index) in feedbackSum.summaryList" :key="index">
                                                <el-row>
                                                    <el-col :md="18">
                                                        <span class="text">{{item.question}}</span>
                                                    </el-col>
                                                    <!-- Binding Custom Color  -->
                                                    <el-col :md="6">
                                                        <div v-bind:style="renderColorItem(item.score,1)"></div>
                                                        <div v-bind:style="renderColorItem(item.score,2)"></div>
                                                        <div v-bind:style="renderColorItem(item.score,3)"></div>
                                                        <div v-bind:style="renderColorItem(item.score,4)"></div>
                                                        <div v-bind:style="renderColorItem(item.score,5)"></div>
                                                    </el-col>
                                                </el-row>
                                            </el-col>

                                            <!-- Open Dialog   -->
                                            <el-col style="margin-top: 20px;">
                                                <el-button round
                                                           class="view-details"
                                                           :ListingName="details.listingName"
                                                           :feedbackSum="feedbackSum"
                                                           @click="dialogFeedBack = true">
                                                    <span>View Details</span>
                                                </el-button>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>

                                <el-col :md="9">
                                    <el-row class="new-line" style="margin-top: 55px;">
                                        <img style="margin-top:5px;" src="public/images/trophyne.png">
                                        <div v-bind:style="renderColorBorder(feedbackSum.averageScore)">
                                            <div v-bind:style="renderColorText(feedbackSum.averageScore)">{{feedbackSum.averageScore}}</div>
                                            <div class="slash">/</div>
                                            <div class="max-score">{{feedbackSum.totalScore}}</div>
                                        </div>
                                    </el-row>
                                </el-col>
                            </div>

                            <div v-else>
                                <div class="score-feature-head">
                                    <span class="text">Property Score</span>
                                </div>
                                <div class="no-score">No score yet.</div>
                                <div class="no-score">You will see your score here based on feedback given by buyers and agents.</div>
                            </div>
                        </el-row>

                        <el-row>
                            <el-col :md="24">
                                <div>Neighbourhood</div>
                            </el-col>
                            <el-col :md="24">
                                <PropertiesMap :map-data="details" :markers="mapMarkers"
                                                :map-config="mapConfig">
                                </PropertiesMap>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>

            <!-- Property Configuration -->
            <!--   close-on-click-modal : click out of dialog         -->
            <el-dialog :visible="isDialogEditPopup" :fullscreen="true" class="form-edit" :close-on-click-modal="true">
                <SaveProperties :list-id="details.listingId" :IsEdit="true" @IsClose="CloseEdit">
                </SaveProperties>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    import helper from '../helpers/index';
    import {
        FETCH_PROPERTY_DETAIL,
        ADD_TO_CART,
        REMOVE_FROM_CART,
        FETCH_SUMMARY_SCORE
    } from "../store/actions.type";
    import PropertiesMap from "../components/Map/PropertiesMap";
    import SaveProperties from "../components/PropertyDetail/SaveProperties";

    export default {
        name: "PropertiesDetail",
        components: {
            PropertiesMap,
            SaveProperties
        },
        data() {
            return {
                propId: null,
                isBooked: false,
                currentImage: null,

                isPublish: false,
                homeOwnerDetail: {},
                noteHead: '',
                notesList: [],
                historyList:[],
                feedbackSum: {},

                mapMarkers: [],
                mapConfig: {zoom: 14, center: {lat:13.7394935, lng:100.5643137}},

                isDialogEditPopup: false
            }
        },
        computed: {
            ...mapGetters([
                'isDetailLoading',
                'details',
                'getBookingList'
            ])
        },
        mounted() {
            this.loadPropertyDetailPage();
        },

        methods: {
            async loadPropertyDetailPage() {
                await this.getPropertyDetails();
                this.mapMarkers = [];

                let _listBooking = this.getBookingList;

                let listingId = this.$route.query.propId;
                let isExist = _listBooking.findIndex(p => p.listingId === listingId);
                this.isBooked = (isExist !== -1) ? true : false;

                // homeOwnerDetail
                if (this.details.homeOwnerInfo) {
                    this.homeownerDetail = this.details.homeOwnerInfo.details;
                    this.notesList = this.details.homeOwnerInfo.notes;
                    this.noteHead = "Notes ("+this.notesList.length+")";
                    this.historyList = this.details.homeOwnerInfo.history;
                }
                // feedback
                this.getSummaryScore(listingId);
            },

            getSummaryScore(listingId) {
                this.$store.dispatch(FETCH_SUMMARY_SCORE, listingId);
            },

            getPropertyDetails() {
                this.propId = this.$route.query.propId;
                this.$store.dispatch(FETCH_PROPERTY_DETAIL, this.propId);

                // push Map position
                if (this.details) {
                    const position = {
                        lat: this.details.lat,
                        lng: this.details.lng
                    };

                    this.mapMarkers.push(position);
                    this.mapConfig = {zoom: 14, center: position};
                    this.isPublish = this.details.makeLive === '1' ? 'Published' : 'Unpublished';
                }
            },

            addShortList() {
                this.$store.dispatch(ADD_TO_CART, this.details);
                this.isBooked = true;
            },
            removeShortList() {
                this.$store.dispatch(REMOVE_FROM_CART, this.details);
                this.isBooked = false;
            },

            // Staff only
            goToHomeOwnerProp() {
                let routeData = this.$route.resolve({
                    name: 'blank',
                    query: {homeOwnerId: this.details.listingOwnerId}
                });
                window.open(routeData.href, '_blank');
            },

            addNote(e) {
                console.log('a', e);
            },

            openNoteDialog(e) {
                console.log('a', e);
            },

            // Feedback
            renderColorItem(score, index) {
                let _color = '#dadada';
                if (score === 0 || index > score) {
                    _color = '#dadada';
                } else if (score > 0 && score <=2) {
                    _color = '#ffb042';
                } else if (score === 3) {
                    _color = '#48c5e8';
                } else if (score > 3) {
                    _color = '#26d1bd';
                }

                let customStyle = {
                    'width': '14px' ,'height': '14px',
                    'borderRadius': '100px', 'backgroundColor' : _color,
                    'margin-top': '5px', 'margin-right': '3px', 'display': 'inline-block'
                }
                return customStyle;
            },

            renderColorBorder(score) {
                let _color = '#dadada';
                if (score == 0){
                    _color = '#dadada'
                } else if (score > 0 && score <=20) {
                    _color = '#ffb042'
                } else if (score == 21) {
                    _color = '#48c5e8'
                } else if (score > 21) {
                    _color = '#26d1bd'
                }
                let _customStyle =  { 'width': '162px',
                    'height': '162px',
                    'border-style': 'solid',
                    'border-width': '2px',
                    'border-color': _color,
                    'position': 'absolute',
                    'left': '14%',
                    'top': '-8px',
                    'background-color': '#fff',
                    'border-radius': '100px'}

                return _customStyle;
            },

            renderColorText(score) {
                let _color = '#dadada'

                if (score == 0){
                    _color = '#dadada'
                } else if (score > 0 && score <=20) {
                    _color = '#ffb042'
                } else if (score == 21) {
                    _color = '#48c5e8'
                } else if (score > 21) {
                    _color = '#26d1bd'
                }

                let _customStyle =  { 'font-family': 'Josefin Sans',
                    'text-align': 'center',
                    'font-size': '40px',
                    'right': '50%',
                    'top': '25%',
                    'position': 'absolute',
                    'color': _color}

                return _customStyle;
            },

            // Map


            // set Format Date
            setFormatDate(date, format, hasTime) {
                if (date !== undefined && date !== null && date !== '' && format === undefined) {
                    return helper.FORMAT_DATE(date);
                } else if (date !== undefined && date !== null && date !== '' && format !== undefined) {
                    return helper.FORMAT_DATETIME(date, format, hasTime);
                } else return '-';
            },

            formatTime(dates) {
                if (dates !== '') {
                    return helper.FORMAT_TIME_SHORT(dates)
                } else {
                    return '-';
                }
            },

            CloseEdit() {

            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/properties-detail.scss";

</style>


<!--
homeOwnerDetail: {
    firstName,
    lastName,
    email,
    numberOfProperties,
    phone,
    mobile
}

feedbackSum = {
    summaryList: [
        question,

    ]
}

-->
