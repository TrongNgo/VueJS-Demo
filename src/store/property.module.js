import {FETCH_PROPERTY_DETAIL} from "./actions.type";
import config from "../helpers/config";
import ApiService from "../services/api.service";
import {FETCH_PROPERTY_DETAIL_START, FETCH_PROPERTY_DETAIL_END} from "./mutations.type";

const state = {
    isDetailLoading: false,
    details: {}
};

const getters = {
    details() {
        return state.details;
    }
};

const actions = {
    [FETCH_PROPERTY_DETAIL]({commit}, propId) {
        commit(FETCH_PROPERTY_DETAIL_START);
        const url = config.property_details_url + propId + '/details';
        return ApiService.get(url)
            .then((response) => {
                commit(FETCH_PROPERTY_DETAIL_END, response.data.result);
            }).catch(error => {
                throw new Error(error);
            });
    }
};

const mutations = {
    [FETCH_PROPERTY_DETAIL_START](state) {
        state.isDetailLoading = true;
    },
    [FETCH_PROPERTY_DETAIL_END](state, details) {
        state.isDetailLoading = true;
        state.details = details;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
