<template>
    <el-dialog v-if="dialogLogin" :visible="dialogLogin" :fullscreen="false" class="login-dialog"
        @close="closeLoginPopup()">
        <div class="login-container">
            <div class="login-content">
                <div class="logo">
                    <img src="https://imomi-buyer-dev.azurewebsites.net/images/imomi-logo-gradient-horizontal.svg" alt="imomi logo">
                </div>

                <div class="google-btn">
                    <el-button type="primary">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Icon">
                        <span class="google-btn-content">Sign in with Google</span>
                    </el-button>
                </div>

                <div class="text-either">
                    <span>OR</span>
                </div>

                <div>
                    <el-form ref="form" :model="loginData">
                        <el-form-item>
                            <el-input name ="Email" v-model="loginData.email" placeholder="Email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input name ="Password" v-model="loginData.password" placeholder="Password" show-password></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="sign-up">
                    <span>Sign Up?</span>
                </div>

                <div class="btn-container">
                    <el-button type="primary" round @click="onSubmit(loginData)">Login</el-button>
                    <el-button round @click="onCancel()">Cancel</el-button>
                </div>

            </div>
        </div>
    </el-dialog>
</template>

<script>
    import { mapState } from "vuex";

    import {LOGIN} from "../store/actions.type";

    export default {
        name: "Login",
        props: ['dialogLogin'],
        data() {
            return {
                loginData: {
                    email: '',
                    password: '',
                    appname:'Buyer'
                },
            }
        },
        methods: {
            closeLoginPopup() {
                this.$emit("close-dialog", false);
            },
            onCancel() {
                this.$router.push({name: 'home'});
            },
            onSubmit(loginData) {
                this.$store.dispatch(LOGIN, loginData)
                    .then((data) => {console.log('data', data)})
                    .catch((error) => {
                        console.log('err', error);
                    })
            }
        },
        computed: {
            ...mapState({
                errors: state => state.auth.errors
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/variable";

    .login-container {
        .login-content {
            height: 100%;
            padding: 0 150px;
        }
    }

    .close-btn {
        position: absolute;
        right: 0;
        top: 0;
        padding: 10px;
        cursor: pointer;
    }

    .logo {
        padding-top: 70px;
        padding-bottom: 40px;

        img {
            height: 80px;
        }
    }

    .google-btn {
        img {
            height: 30px;
            background-color: #fff;
            padding: 3px;
            border-radius: 3px;
        }

        .google-btn-content {
            font-size: 1.3em;
            margin-left: 10px;
        }
    }

    .text-either {
        padding: 20px;
        font-size: 1.3em;
    }

    .sign-up {
        padding-bottom: 15px;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    .btn-container {
        padding-bottom: 30px;
    }
</style>

<!--

    -->
