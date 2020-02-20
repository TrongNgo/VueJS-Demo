<template>
    <div>
        <el-row class="wrapper" justify="between" align="center">
            <el-col :md="2" :xs="12" class="logo">
                <img src="https://imomi-buyer-dev.azurewebsites.net/images/imomi-logo-gradient-horizontal.svg" alt="">
            </el-col>
            <el-col :md="8" :xs="12" class="search-box">
                <el-input placeholder="Search anything (project, street, area etc.)"
                          @change="onFilterChanged()"
                          v-model="searchData.keyword">
                </el-input>
            </el-col>

            <el-col :md="14" :xs="24" class="top-menu">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a>Add a Property</a>
                    </li>
                    <li class="nav-item">
                        <a>Become an Agent</a>
                    </li>
                    <li class="nav-item" @click="dialogShortList = true">
                        <a :class="dialogShortList ? 'active' : ''">
                            My Shortlist ({{ this.getBookingList.length }})
                        </a>
                    </li>
                    <li class="nav-item" @click="dialogLogin = true">
                        <a :class="dialogLogin ? 'active' : ''">Login</a>
                    </li>
                </ul>
            </el-col>
        </el-row>

        <!-- Login -->
        <Login :dialogLogin="dialogLogin" @close-dialog="closeLoginPopup"></Login>
        <MyShortList :dialogShortList="dialogShortList" @close-shortList="closeShortList"></MyShortList>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Login from "./Login";
    import MyShortList from "./Cart/MyShortList";

    export default {
        name: "Header",
        components: {
            Login,
            MyShortList
        },
        data() {
            return {
                searchData: {
                    keyword: ''
                },

                dialogLogin: false,
                dialogShortList: false,

                shortList: 0
            }
        },
        computed: {
            ...mapGetters(['getBookingList'])
        },
        mounted() {
        },
        methods: {
            onFilterChanged() {
                console.log(this.searchData);
            },

            closeLoginPopup(value) {
                this.dialogLogin = value;
            },
            closeShortList(value) {
                this.dialogShortList = value;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/variable";

    .wrapper {
        padding: 10px 0;
    }

    .logo {
        text-align: left;
    }

    .search-box {
        /deep/ .el-input {
            text-align: left;
            input {
                border-radius: 30px !important;
                max-width: 300px;
            }
        }
    }

    .top-menu {
        ul {
            float: right;
            list-style: none;
            margin: 0;
            font-family: Josefin Sans;

            li {
                float: left;
                margin: 0 20px;

                &:last-of-type {
                    margin-right: 0;
                }
            }

            .nav-item {
                list-style: none;
                position: relative;
                cursor: pointer;

                a {
                    display: block;
                    padding: 16px;
                    text-decoration: none;
                    color: inherit;

                    &:hover {
                        outline: none;
                        border-bottom: 2px solid $main-color;
                    }

                    &:focus-within {
                        outline: none;
                        border-bottom: 2px solid $main-color;
                    }
                }

                .active {
                    border-bottom: 2px solid $main-color;
                }
            }
        }
    }
</style>
