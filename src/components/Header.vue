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
<!--                        <router-link-->
<!--                                class="nav-link"-->
<!--                                active-class="active"-->
<!--                                exact-->
<!--                                :to="{name: 'add-property'}">-->
<!--                            Add a Property-->
<!--                        </router-link>-->
                    </li>
                    <li class="nav-item">
                        <a>Become an Agent</a>
<!--                        <router-link-->
<!--                                class="nav-link"-->
<!--                                active-class="active"-->
<!--                                exact-->
<!--                                :to="{name: 'become-agent'}">-->
<!--                            Become an Agent-->
<!--                        </router-link>-->
                    </li>
                    <li class="nav-item">
                        <a>My Shortlist</a>
<!--                        <router-link-->
<!--                                class="nav-link"-->
<!--                                active-class="active"-->
<!--                                exact-->
<!--                                :to="{name: 'my-shortlist'}">-->
<!--                            My Shortlist-->
<!--                        </router-link>-->
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            active-class="active"
                            exact
                            :to="{name: 'login'}">
                            Log In
                        </router-link>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "Header",
        components: {
        },
        data() {
            return {
                searchData: {
                    keyword: ''
                },

                onLoginPopup: false
            }
        },
        methods: {
            onFilterChanged() {
                console.log(this.searchData);
            },

            openLoginPopup() {
                this.onLoginPopup = true;
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
