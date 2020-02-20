import ApiService from "../services/api.service";
import JwtService from "../services/jwt.service";

import {LOGIN} from "./actions.type";
import {SET_AUTH, SET_ERROR} from "./mutations.type";
import LoginsModel from "../models/logins-model";
import config from "../helpers/config";

// set state
const state = {
    loginResult:  new LoginsModel(),
    errors: null,
    isAuthenticated: !JwtService.getToken()
};

// like service: store data
const getters = {
    currentUser(state) {
        return state.loginResult;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
};

// configure action
const actions = {
    [LOGIN](context, loginData) {
        return new Promise(resolve => {
            ApiService.put(`${config.login_url}` + "login/email", loginData)
                .then( data => {
                    // response an object
                    // isSuccess: false
                    // status: 404
                    // result: null
                    // error: [{name: "NotFound", message: "Please register your account"}]
                    context.commit(SET_AUTH, data.loginResult);
                    resolve(data);
                })
                .catch( response => {
                    context.commit(SET_ERROR, response.errors);
                });
        });
    }
}

// configure mutations
const mutations = {
    [SET_AUTH](state, loginResult) {
        state.isAuthenticated = true
        state.loginResult = new LoginsModel(loginResult.displayName, loginResult.role, loginResult.token,
            loginResult.memberId);
        state.errors = {};
        JwtService.saveToken(state.user.token);
    },
    [SET_ERROR](state, error) {
        state.errors = error;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
