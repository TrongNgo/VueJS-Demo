<template>
    <div class="booking-container">
        <div class="booking-form">
            <div class="booking-header">
                Book a viewing
            </div>
            <div class="booking-title">
                Let me know when you would like to view the selected properties and I'll handle the rest!
            </div>
            <div class="booking-form">
                <el-form ref="form" :model="form">
                    <el-row>
                        <el-form-item>
                            <el-date-picker type="date" placeholder="Viewing date *" v-model="form.bookingDate"
                                            size="large" format="dd/MM/yyyy" :picker-options="pickerOptions">
                            </el-date-picker>
                            <i v-show="!isDateValidate" class="fa fa-warning"></i>
                            <span v-show="!isDateValidate" class="help is-danger">Viewing date is required.</span>
                        </el-form-item>
                    </el-row>

                    <el-row>
                        <el-form-item>
                            <el-time-picker placeholder="Viewing time" v-model="form.bookingTime" size="large"
                                            format="HH:mm">
                            </el-time-picker>
                        </el-form-item>
                    </el-row>

                    <el-row>
                        <el-form-item>
                            <el-input name="name" v-model="form.bookingName" placeholder="Your name *"
                                      prefix-icon="el-icon-user" size="large"
                                      :class="{'is-danger': isCheckName, 'input': true}">
                                <i v-show="isCheckName" class="fa fa-warning"></i>
                                <span v-show="isCheckName" class="help is-danger">Name is required.</span>
                            </el-input>
                        </el-form-item>
                    </el-row>

                    <el-row>
                        <el-form-item>
                            <el-input name="bookingMobile" v-model="form.bookingMobile" placeholder="Your contact number *"
                                      ref="phone" prefix-icon="el-icon-mobile" size="large"
                                      :class="{'is-danger': isCheckName, 'input': true}">
                                <i v-show="isCheckName" class="fa fa-warning"></i>
                                <span v-show="isCheckName" class="help is-danger">Name is required.</span>
                            </el-input>
                        </el-form-item>
                    </el-row>

                    <el-row>
                        <el-form-item>
                            <el-input name="bookingEmail" v-model="form.bookingEmail" placeholder="Your email *"
                                      ref="phone" prefix-icon="el-icon-message" size="large"
                                      :class="{'is-danger': isCheckName, 'input': true}">
                                <i v-show="isCheckEmail" class="fa fa-warning"></i>
                                <span v-show="(isEmailFormat === false && form.bookingEmail !== '') || isCheckEmail"
                                        class="help is-danger">
                                    Name is required.
                                </span>
                            </el-input>
                        </el-form-item>
                    </el-row>

                    <el-row>
                        <el-form-item>
                            <el-input placeholder="Your Line ID" prefix-icon="el-icon-platform-eleme"
                                v-model="form.bookingLineId" size="large">
                            </el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :span="12" class="btn-container">
                            <div :class="[isButtonActive && getBookingItem.length > 0 && isSaving ? 'btn-add btn' : 'btn-disable btn']"
                                @click="addBooking()">
                                <i v-if="isSaving" class="fas fa-spinner"></i>
                                <span class="done-text">Done</span>
                            </div>
                        </el-col>

                        <el-col :span="12" class="btn-container">
                            <div class="btn btn-cancel" @click="clearForm">
                                <span class="cancel-text">Cancel</span>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Booking",
        computed: {
            ...mapGetters(['getBookingItem'])
        },
        data() {
            return {
                form: {
                    bookingDate: '',
                    bookingTime: '',
                    bookingName: '',
                    bookingMobile: '',
                    bookingEmail: '',
                    bookingLineId: ''
                },

                pickerOptions: {
                    disabledDate(time) {
                        let currentDate = new Date();
                        currentDate.setDate(currentDate.getDate() - 1);
                        return time.getTime() < currentDate;
                    }
                },

                // validation
                isDateValidate: true,

                isCheckName: false,
                isCheckEmail: false,
                isEmailFormat: true,

                isButtonActive: false,
                isSaving: false
            }
        },

        methods: {
            addBooking() {

            },

            clearForm() {

            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/variable.scss";

    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 100%;
    }

    .booking-header {
        font-family: Josefin Sans;
        font-size: 45px;
        height: 45px;
        line-height: 45px;
        color: #6b6b6b;
        font-weight: 400;
    }

    .booking-title {
        width: 100%;
        font-family: Josefin Sans;
        font-size: 1.3em;
        color: #6b6b6b;
        font-weight: 600;
        padding: 15px 0;
        line-height: $line-height-title;
    }

    .btn {
        width: 200px;
        border-radius: 5px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
        text-align: center;
        font-size: 1.5em;
        line-height: 1.3;
        padding: 15px;
    }

    .btn-disable {
        background-color: $button-dark-color;
    }

    .btn-add {
        background-color: $main-color;
    }

    .btn-container {
        @include d-flex-center;
    }

</style>
