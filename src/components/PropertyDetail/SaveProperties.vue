<template>
    <div class="edit-container">
        <div class="edit-form">
            <div class="header">
                <el-row>
                    <el-col :span="12" class="header-left">
                        <h2 class="main-head">{{IsEdit == true? 'Edit Property':'Add New Property'}}</h2>
                    </el-col>
<!--                    <el-col :span="12" class="header-right" v-if="editingPropertyDetails.isActive || getRole == 'Staff'">-->
                    <el-col :span="12" class="header-right" v-if="editingPropertyDetails.isActive">
                        <el-switch v-model="editingPropertyDetails.IsPublish"
                                   :active-text="editingPropertyDetails.IsPublish == false?'Unpublished':'Published'">
                        </el-switch>
                    </el-col>
                </el-row>
            </div>

            <div class="edit-body">
                <p class="prop-id">Property ID: {{IsEdit == true? wp_postid: ''}}</p>

                <!--   Staff: Marketing and Sales Apartment          -->
                <div>
                    <p class="header-path">Marketing & Sales</p>

                    <el-row :gutter="100">
                        <!-- Select Box  -->
                        <el-col :span="12">
                            <div class="header-field">Special Tags</div>
                            <el-select v-model="editingPropertyDetails.tagsId" placeholder="Select" clearable>
                                <el-option v-for="item in BindingData.propertiesTagList"
                                           :key="item.list" :label="item.listValue" :value="item.listKey">
                                    {{item.listValue}}
                                </el-option>
                            </el-select>
                        </el-col>

                        <el-col :span="12">
                            <div class="header-field">New or Resale</div>
                            <el-select v-model="editingPropertyDetails.resaleId" placeholder="Select" clearable>
                                <el-option v-for="item in BindingData.propertiesResaleList"
                                          :key="item.list" :label="item.listValue" :value="item.listKey">
                                    {{item.listValue}}
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>

                <p class="header-path">General Information</p>

                <!--     gutter between 2 col           -->
                <el-row :gutter="100">
                    <el-col :span="12">
                        <div class="header-field">
                            Unit Number
                        </div>
                        <el-input name="unit-number" placeholder="Unit Number" size="small"  maxlength="30"
                                  v-model="editingPropertyDetails.unitnumber">
                        </el-input>
<!--                        <span v-show="ValidateArr.IsUnitNumber == false" class="help is-danger">{{ValidateArrMessage.IsUnitNumber}}</span>-->
                    </el-col>

                    <el-col :span="12">
                        <div class="header-field">Floor Number</div>
                        <el-input name="floor-number" placeholder="Floor Number" size="small" maxlength="10"
                                  v-model="editingPropertyDetails.floornumber">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="100">
                    <el-col :span="12">
                        <div class="header-field">Name of Project</div>
                            <!--
                              - filterable
                              - remote: whether options are loaded from server
                              - remote-method: 	custom remote search method
                                -->
                            <el-select v-model="editingPropertyDetails.projectName" placeholder="e.g. Villa Asoke"
                                       filterable  remote  :remote-method="GetProjectName"
                                       :loading="ProjectNameLoading" :class="{'input': true, 'is-danger': ValidateArr.IsPropertyName == false}"
                                       @change="onProjectChanged">
                                <el-option v-for="item in BindingData.projectList" :key="item.listId"
                                           :label="item.listKey" :value="item.listKey">
                                    {{item.listValue}}
                                </el-option>
                            </el-select>
<!--                        <i v-show="ValidateArr.IsPropertyName == false" class="fa fa-warning"></i>-->
<!--                        <span v-show="ValidateArr.IsPropertyName == false" class="help is-danger">Name of Project is required.</span>-->
                    </el-col>

                    <!--  Must be disabled => b/c it's following the datae of projectName  -->
                    <el-col :span="12">
                        <div class="header-field">Type of Property {{editingPropertyDetails.propertiesType}} </div>
                        <el-select v-model="editingPropertyDetails.propertiesType" disabled placeholder=""
                                   :remote-method="GetPropertyType" :loading="PropertyTypeLoading"
                                   :class="{'input': true, 'is-danger': ValidateArr.IsPropertyType == false}"
                                   @change="ChangePropertiesType">
                            <el-option v-for="item in BindingData.propertiesTypeList" :key="item.listValue"
                                       :label="item.listValue" :value="item.listKey" >
                                {{item.listValue}}
                            </el-option>
                        </el-select>
<!--                        <i v-show="ValidateArr.IsPropertyType == false" class="fa fa-warning"></i>-->
<!--                        <span v-show="ValidateArr.IsPropertyType == false" class="help is-danger">Type of Property is required.</span>-->
                    </el-col>
                </el-row>

                <!--  Split following the Group of Location
                   City:
                        - NewYork
                   Country
                        - Thailand
                   -->
                <el-row :gutter="100">
                    <el-col :span="12">
                        <div class="header-field">Location</div>
                        <el-select v-model="editingPropertyDetails.Location" placeholder="" filterable
                                   :remote-method="GetLocationMethod" :loading="LocationLoading"
                                   @change="SelectedLocation" disabled>
                            <el-option-group v-for="group in BindingData.location"
                                             :key="group.groupName" :label="group.groupName">
                                <el-option v-for="item in group.items"
                                           :key="item.listId" :label="item.listValue" :value="item.listValue">
                                </el-option>
                            </el-option-group>
                        </el-select>
                        <i v-show="ValidateArr.IsLocation == false" class="fa fa-warning"></i>
                        <span v-show="ValidateArr.IsLocation == false" class="help is-danger">Location is required.</span>
                    </el-col>

                    <el-col :span="12" v-if="(editingPropertyDetails.tranType == 'Both' || editingPropertyDetails.tranType == 'Rent') || ((editingPropertyDetails.tranType == 12 || editingPropertyDetails.tranType == 2))">
                        <div class="header-field">Rented out until</div>
                        <el-datae-picker type="date" placeholder="Rented out until" format="dd/MM/yyyy" size="small"
                                         v-model="editingPropertyDetails.expriDate" :picker-options="PickerOptions"
                                         style="width:100%;">
                        </el-datae-picker>
                    </el-col>
                </el-row>

                <!-- Property Owner -->
                <el-row style="margin-bottom:5px;">
                    <el-col> <h4 class="price-section">Property Owner</h4> </el-col>
                </el-row>
                <el-row :gutter="100">
                    <el-col :span="12">
                        <div class="header-field">Name of Property Owner</div>
                        <el-select v-model="editingPropertyDetails.ownerName" placeholder="e.g. Mr. Omi" filterable  remote
                                   :remote-method="GetOwnerName" :loading="OwnerNameLoading"
                                   :class="{'input': true, 'is-danger': ValidateArr. IsOwner == false}"
                                   @change="onOwnerChanged">
                            <el-option v-for="item in BindingData.ownerList" :key="item.listValue"
                                       :label="item.listValue" :value="item.listKey">
                                {{item.listValue}}
                            </el-option>
                        </el-select>
                        <i v-show="ValidateArr.IsOwner == false" class="fa fa-warning"></i>
                        <span v-show="ValidateArr.IsOwner == false" class="help is-danger">Name of Property Owner is required.</span>
                    </el-col>
                </el-row>

                <el-row :gutter="100">
                    <el-col :span="12">
                        <div class="header-field">Phone</div>
                        <el-input name="ownerPhone" placeholder="Phone number" :disabled="true"
                                  v-model="editingPropertyDetails.homeOwnerPhone" size="small" maxlength="20"
                                  @change="CheckPhone"
                                  :class="{'input': true, 'is-danger': ValidateArr.IsPhoneFormat == false}">
                        </el-input>
                        <i v-show="ValidateArr.IsPhoneFormat == false" class="fa fa-warning"></i>
                        <!-- <span v-show="(ValidateArr.IsRequirePhoneOrMobile == false)" class="help is-danger">{{ValidateArr.IsRequirePhoneOrMobile == false ?'Please enter phone or mobile number.':''}}</span> -->
                        <span v-show="(ValidateArr.IsPhoneFormat == false && editingPropertyDetails.homeOwnerPhone)" class="help is-danger">
                            {{ValidateArr.IsPhoneFormat == false && editingPropertyDetails.homeOwnerPhone ?'Please enter a valid phone number - only number, plus (+) and bracket ( ) .':''}}
                        </span>
                    </el-col>

                    <el-col :span="12">
                        <div class="header-field">Mobile</div>
                        <el-input name="ownerMobile" placeholder="Mobile number" :disabled="true"
                                  v-model="editingPropertyDetails.homeOwnerMobile"  size="small" maxlength="20"
                                  @change="CheckMobile"
                                  :class="{'input': true, 'is-danger': ValidateArr.IsMobileFormat == false}">
                        </el-input>
                        <i v-show="ValidateArr.IsMobileFormat == false" class="fa fa-warning"></i>
                        <!-- <span v-show="(ValidateArr.IsRequirePhoneOrMobile == false)" class="help is-danger">{{ValidateArr.IsRequirePhoneOrMobile == false ?'Please enter phone or mobile number.':''}}</span> -->
                        <span v-show="(ValidateArr.IsMobileFormat == false && editingPropertyDetails.homeOwnerMobile)" class="help is-danger">
                            {{ValidateArr.IsMobileFormat == false && editingPropertyDetails.homeOwnerMobile ?'Please enter a valid mobile number - only number, plus (+) and bracket ( ) .':''}}
                        </span>
                    </el-col>
                </el-row>

                <!-- Price -->
                <el-row style="margin-bottom:5px;">
                    <el-col>
                        <h4 class="price-section">Price</h4>
                    </el-col>
                </el-row>
                <el-row :gutter="100">
<!--  v-if else                  -->
                    <el-col :span="12" v-if="editingPropertyDetails.propertiesType == 'Apartment' || editingPropertyDetails.propertiesType == 33">
                        <div class="header-field">Rent or Sale? </div>
                        <el-select v-model="editingPropertyDetails.tranType" placeholder="Select">
                            <el-option label="Rent" value="2">
                                Rent
                            </el-option>
                        </el-select>
                        <i v-show="ValidateArr.IsTranType == false" class="fa fa-warning"></i>
                        <span v-show="ValidateArr.IsTranType == false" class="help is-danger">Rent or Sale is required.</span>
                    </el-col>
                    <el-col :span="12" v-else>
                        <div class="header-field">Rent or Sale? </div>
                        <el-select v-model="editingPropertyDetails.tranType" placeholder="Select">
                            <el-option v-for="(item,index) in BindingData.transactionTypeList"
                                       :key="index" :label="item.listValue" :value="item.listKey">
                                {{item.listValue}}
                            </el-option>
                        </el-select>

                        <i v-show="ValidateArr.IsTranType == false" class="fa fa-warning"></i>
                        <span v-show="ValidateArr.IsTranType == false" class="help is-danger">Rent or Sale is required.</span>
                    </el-col>


                    <el-col :span="12" v-if="(editingPropertyDetails.tranType == 'Both' || editingPropertyDetails.tranType == 'Sale') || ((editingPropertyDetails.tranType == 12 || editingPropertyDetails.tranType == 6))">
                        <div class="header-field" >Selling Price (THB)</div>
                        <el-input name="saleprice" placeholder="Selling Price (THB)"  size="small"
                                  v-model="editingPropertyDetails.saleprice" @change="Checknumber('saleprice','IsSalePriceFormat')"
                                  :class="{'input': true, 'is-danger': ValidateArr.IsSalePrice == false}">
                        </el-input>

                        <i v-show="ValidateArr.IsSalePrice == false || ValidateArr.IsSalePriceFormat == false" class="fa fa-warning"></i>
                        <span v-show="ValidateArr.IsSalePrice == false || ValidateArr.IsSalePriceFormat == false" class="help is-danger">
                            {{ValidateArr.IsSalePriceFormat == false?'Price is required.':'Please enter number.'}}
                        </span>
                    </el-col>
                    <el-col :style="{ 'margin-top': editingPropertyDetails.tranType ==  'Both' || editingPropertyDetails.tranType ==  12?'15px':'0px' }" :span="12" v-if="(editingPropertyDetails.tranType ==  'Both' || editingPropertyDetails.tranType == 'Rent') || ((editingPropertyDetails.tranType == 12 || editingPropertyDetails.tranType == 2))">
                        <div class="header-field" >Rental Price (THB) per month</div>
                        <el-input name="rentprice" placeholder="Rental Price (THB) per month" size="small"
                                  v-model="editingPropertyDetails.rentprice" @change="Checknumber('rentprice','IsRentPriceFormat')"
                                  :class="{'input': true, 'is-danger': ValidateArr.IsRentPrice == false}">
                        </el-input>

                        <i v-show="ValidateArr.IsRentPrice == false || ValidateArr.IsRentPriceFormat == false" class="fa fa-warning"></i>
                        <span v-show="ValidateArr.IsRentPrice == false || ValidateArr.IsRentPriceFormat == false" class="help is-danger">
                            {{ValidateArr.IsRentPrice == false?'Price is required.':'Please enter number.'}}
                        </span>
                    </el-col>
                </el-row>

<!--  Bed/ bath room count              -->
                <el-row>
                    <el-col> <h4 class="price-section">Living Space</h4> </el-col>
                </el-row>
                <el-row :gutter="100">
                    <el-col :span="12">
                        <div class="header-field">Number of Bedrooms</div>
                        <el-input name="bedroom" placeholder="Number of Bedrooms" size="small" maxlength="10"
                                  v-model="editingPropertyDetails.bedroom" @change="Checknumber('bedroom','IsBedFormat')"
                                  :class="{'input': true, 'is-danger': ValidateArr.IsBed == false}">
                        </el-input>
                        <span v-show="ValidateArr.IsBed == false || ValidateArr.IsBedFormat == false" class="help is-danger">
                            {{ValidateArr.IsBed == false?'Number of Bedrooms is required.':'Please enter number and the maximum is 99.'}}
                        </span>
                    </el-col>

                    <el-col :span="12">
                        <div class="header-field">Number of Bathrooms</div>
                        <el-input name="bathroom" placeholder="Number of Bathrooms"  size="small" maxlength="10"
                                  @change="Checknumber('bathroom','IsBathFormat')"  v-model="editingPropertyDetails.bathroom"
                                  :class="{'input': true, 'is-danger': ValidateArr.IsBath == false}">
                        </el-input>
                        <i v-show="ValidateArr.IsBath == false || ValidateArr.IsBathFormat == false" class="fa fa-warning"></i>
                        <span v-show="ValidateArr.IsBath == false || ValidateArr.IsBathFormat == false" class="help is-danger">
                            {{ValidateArr.IsBath == false?'Number of Bathrooms is required.':'Please enter number and the maximum is 99.'}}
                        </span>
                    </el-col>
                </el-row>

                <el-row :gutter="100">
                    <el-col :span="12">
                        <div class="header-field">Size (sqm)</div>
                        <el-input name="area" placeholder="Size (sqm)" size="small" maxlength="10"
                                  v-model="editingPropertyDetails.area" @change="Checknumber('area','IsSizeFormat',true)"
                                  :class="{'input': true, 'is-danger': ValidateArr.IsArea == false}">
                        </el-input>
                        <i v-show="ValidateArr.IsArea == false || ValidateArr.IsSizeFormat == false" class="fa fa-warning"></i>
                        <span v-show="ValidateArr.IsArea == false  || ValidateArr.IsSizeFormat == false" class="help is-danger">
                            {{ValidateArr.IsArea == false?'Size is required.':'Please enter number and the maximum is 9999.9999'}}
                        </span>
                    </el-col>
                </el-row>
                <el-row :gutter="100">
                    <el-col :span="12">
                        <div class="header-field">Size (sqm)</div>
                        <el-input name="area" placeholder="Size (sqm)"  size="small" maxlength="10"
                                  v-model="editingPropertyDetails.area" @change="Checknumber('area','IsSizeFormat',true)"
                                  :class="{'input': true, 'is-danger': ValidateArr.IsArea == false}">
                        </el-input>
                        <i v-show="ValidateArr.IsArea == false || ValidateArr.IsSizeFormat == false" class="fa fa-warning"></i>
                        <span v-show="ValidateArr.IsArea == false  || ValidateArr.IsSizeFormat == false" class="help is-danger">
                            {{ValidateArr.IsArea == false?'Size is required.':'Please enter number and the maximum is 9999.9999'}}
                        </span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <h4 class="header-path">Images </h4>
                        <div class="desc-head">Add or modify photos of your property</div>
                        <div class="desc-head">{{editingPropertyDetails.imageList == undefined ?0:editingPropertyDetails.imageList.length}} added</div>
                    </el-col>
                    <el-col class="clear" :span="12" style="text-align:right;padding-top:30px;" >
                        <span @click="RemoveImageAll">
                            <i class="fas fa-times" style="font-size:18px;color:rgb(212, 97, 91);"></i>
                            Remove All
                        </span>
                    </el-col>
                </el-row>

                <!--    drag - drop image               -->
                <el-row>
                    <el-col>
                        <div style="text-align: left;">
                            <ul class="el-upload-list el-upload-list--picture-card">
                                <draggable v-model="editingPropertyDetails.imageList" class="dragArea">
                                    <li :tabindex="index" class="el-upload-list__item is-success animated"
                                        v-for="(element, index) in editingPropertyDetails.imageList" :key="index"
                                        v-bind:class="{flash: false}">
                                        <img :src="element.url" alt="" class="el-upload-list__item-thumbnail ">
                                        <a class="el-upload-list__item-name">
                                            <i class="el-icon-document"></i>
                                        </a>
                                        <label class="el-upload-list__item-status-label">
                                            <i class="el-icon-upload-success el-icon-check"></i>
                                        </label>

                                        <i class="el-icon-close"></i>
                                        <span class="el-upload-list__item-actions">
                                            <span class="el-upload-list__item-view">
                                                <i class="el-icon-view" @click="handlePictureCardPreview(element)"></i>
                                            </span>
                                            <span class="el-upload-list__item-delete">
                                                <i class="el-icon-delete" @click="handleRemove(element)"></i>
                                            </span>
                                        </span>
                                    </li>
                                </draggable>
                            </ul>
                        </div>

                        <!-- Upload Image
                            action: API_url
                            on-success:	hook function when uploaded successfully
                            list-type: 	type of fileList. Ex: 	text/picture/picture-card
                        -->
                        <div class="uploadInput">
                            <el-upload class="uploadInner" style="margin-top: 30px;text-align: left;"
                                       :action="ApiUpload" :on-success="UploadImage"
                                       list-type="picture-card" :multiple="true"
                                       :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                                       :file-list="editingPropertyDetails.imageList">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>

                        <!-- Erro: When click to view Image  -->
                        <el-dialog :visible.sync="dialogImageVisible">
                            <img width="100%" :src="dialogImageUrl" alt />
                        </el-dialog>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <h4 class="header-path">Unit Features</h4>
                        <div class="desc-head">Select all the features that your unit offers</div>
                    </el-col>
                </el-row>

                <el-row style="margin: 10px 0 0 0">
                    <el-col class="selected" :span="12" style="text-align:left;">
                        {{editingPropertyDetails.unitFeatures == null?0: editingPropertyDetails.unitFeatures.length}} selected
                    </el-col>
                    <el-col class="clear" :span="12" style="text-align:right;">
                        <span @click="ClearAllAttribute('unitFeatures')">
                            <i class="fas fa-times" style="font-size:18px;color:rgb(212, 97, 91);"></i>
                            Clear All
                        </span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-checkbox-group v-model="editingPropertyDetails.unitFeatures" style="text-align:left;">
                        <el-row>
                            <el-col v-for="(item, index) in BindingData.specifications"  :key="index"
                                    style="margin-top:10px;" :span="5">
                                <el-checkbox-button :label="item.attributeName">{{item.displayName}}</el-checkbox-button>
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                </el-row>

                <el-row>
                    <el-col>
                        <h4 class="header-path">Unique Features</h4>
                        <div class="desc-head">Select all the unique features that your unit offers</div>
                    </el-col>
                </el-row>

                <el-row style="margin: 10px 0 0 0;">
                    <el-col class="selected" :span="12" style="text-align:left;">
                        {{editingPropertyDetails.floorLevel != '' &&  editingPropertyDetails.unitType.lenght > 0?2:(editingPropertyDetails.floorLevel == '' &&  editingPropertyDetails.unitType.lenght > 0)||(editingPropertyDetails.floorLevel != '' &&  editingPropertyDetails.unitType.lenght == 0)?1:0 }} selected

                    </el-col>
                    <el-col class="clear" :span="12" style="text-align:right;">
                        <span @click="ClearAllAttribute('unitType,floorLevel,viewType')">
                            <i class="fas fa-times" style="font-size:18px;color:rgb(212, 97, 91);"></i>
                            Clear All
                        </span>
                    </el-col>
                </el-row>

                <!--  choose multiple   -->
                <el-row >
                    <div class="sub-unique" style="text-align:left;">Floor Level</div>
                    <el-checkbox-group v-model="editingPropertyDetails.floorLevel" style="text-align:left;">
                        <el-row>
                            <el-col style="margin-top:10px;" :span="5"  v-for="(item,index) in BindingData.floorLevel"  :key="index">
                                <el-checkbox-button :label="item">{{item}}</el-checkbox-button>
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                </el-row>

                <el-row>
                    <div class="sub-unique" style="text-align:left;">Unit Type</div>

                    <el-checkbox-group v-model="editingPropertyDetails.unitType" style="text-align:left;">
                        <el-row>
                            <el-col style="margin-top:10px;" :span="5"  v-for="(item,index) in BindingData.unitType"  :key="index">
                                <el-checkbox-button :label="item.attributeName">{{item.displayName}}</el-checkbox-button>
                            </el-col>
                        </el-row>
                    </el-checkbox-group>
                </el-row>

                <!--  choose only one   -->

                <el-row>
                    <div class="sub-unique" style="text-align:left;">View Type</div>
                    <el-radio-group v-model="editingPropertyDetails.viewType" style="text-align:left;">
                        <el-row>
                            <el-col style="margin-top:10px;" :span="5"  v-for="(item,index) in BindingData.viewType"  :key="index">
                                <el-radio-button :label="item">{{item}}</el-radio-button>
                            </el-col>
                        </el-row>
                    </el-radio-group>
                </el-row>
            </div>

            <div class="footer">
                <hr>
                <el-button round large type="primary" class="save-edit-form" @click="Save" :disabled="isSaving">
                    <i v-if="!isSaving" class="fas fa-check" style="font-size:18px;color:#fff;margin-right:5px;"></i>
                    <i v-if="isSaving" class="fas fa-spinner icon-spinner" spin pulse></i>
                    <span>Save</span>
                </el-button>
                <el-button round large class="cancel-edit-form" @click="CloseDialog">Cancel</el-button>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import draggable from 'vuedraggable';

    import config from "../../helpers/config";
    import mapping from "../../helpers/mapping";
    import {FETCH_PROPERTY_DETAIL_FOR_EDIT} from "../../store/actions.type";

    export default {
        name: "SaveProperties",
        props: ['ListId','IsEdit'],
        components: {
            draggable
        },
        data() {
            return {
                wp_postid: '',

                previousPropertyDetails: {},
                editingPropertyDetails:{},
                BindingData: {},

                // filter - searching
                ProjectNameLoading: false,
                PropertyTypeLoading: false,
                LocationLoading: false,
                OwnerNameLoading: false,


                // image
                ApiUpload: config.baseUrl +config.image_url,
                dialogImageVisible: false,
                dialogImageUrl: '',

                // validate
                ValidateArr: {},


                isSaving: false,

            }
        },
        computed: {
          ...mapGetters(['propertyDetails'])
        },
        async mounted() {
            await this.MapData()

        },
        methods: {
            // render Data when open Edit Dialog
            async MapData() {
                // For Edit
                if (this.IsEdit) {
                    this.$store.dispatch(FETCH_PROPERTY_DETAIL_FOR_EDIT);

                    let mappingPropertyDetails = mapping.MAPPING_EDIT_SEVER_TO_CLIENT(this.propertyDetails, this.IsEdit);
                    this.editingPropertyDetails = mappingPropertyDetails.ViewData;
                    this.previousPropertyDetails = mappingPropertyDetails.ViewData;

                    this.wp_postid = this.propertyDetails.listing.wp_postid;
                    this.BindingData = mappingPropertyDetails.bindingData;

                    self.GetProjectName(self.EditData.projectName);
                    self.GetPropertyType('"'+self.EditData.propertiesType.listValue+'"');
                    self.GetOwnerName('"'+self.EditData.ownerName.listValue+'"');

                    let _trans = self.EditData.tranType == null?'':self.EditData.tranType.listValue;
                    self.GetTransactionType(_trans);
                    self.GetLocationMethod('"'+self.EditData.Location+'"');
                    await self.GetPropertyTags('');
                    await self.GetPropertyResale('');
                } else {
                    // add New Property

                }
            },
            ChangePropertiesType() {
                if(this.editingPropertyDetails.propertiesType === 33 || this.editingPropertyDetails.propertiesType === 'Apartment') {
                    this.editingPropertyDetails.tranType = "Rent"
                }
            },

            // Search - Filter
            // Call Api to search Customer
            GetProjectName() {

            },
            onProjectChanged() {

            },
            // Property type
            GetPropertyType() {

            },

            // Location
            SelectedLocation() {

            },
            GetLocationMethod() {

            },

            // Onwer
            GetOwnerName() {

            },
            onOwnerChanged() {

            },

            // Phone
            CheckPhone() {

            },
            Checknumber() {

            },
            RemoveImageAll() {

            },

            // Drag - Drop Image
            handlePictureCardPreview(file) {
                console.log('e', file);
            },
            handleRemove(file) {
                console.log('e', file);
            },
            UploadImage() {

            },
            ClearAllAttribute() {

            },

            // close Dialog
            CloseDialog() {

            }

        }

    }
</script>

<style scoped>

</style>
