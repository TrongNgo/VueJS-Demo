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
                    <li class="nav-item">Add a Property</li>
                    <li class="nav-item">Become an Agent</li>
                    <li class="nav-item">My Shortlist</li>
                    <li class="nav-item" @click="openLoginPopup()">Log In</li>
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
    $main-color: #006ed2;

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
                padding: 16px;
                margin: 0 20px;

                &:last-of-type {
                    margin-right: 0;
                }
            }

            .nav-item {
                list-style: none;
                position: relative;
                cursor: pointer;

                &:hover {
                    outline: none;
                    border-bottom: 2px solid $main-color;
                }

                &:focus-within {
                    outline: none;
                    border-bottom: 2px solid $main-color;
                }
            }
        }
    }
</style>
