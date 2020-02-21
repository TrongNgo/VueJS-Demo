import ApiService from "../services/api.service";
import JwtService from '../services/jwt.service';
import config from "../helpers/config";

import {
    FETCH_PROPERTY_DETAIL,
    FETCH_SUMMARY_SCORE,
    FETCH_PROPERTY_DETAIL_FOR_EDIT
} from "./actions.type";

import {
    FETCH_PROPERTY_DETAIL_START,
    FETCH_PROPERTY_DETAIL_END,
    FETCH_SUMMARY_SCORE_END,
    FETCH_PROPERTY_DETAIL_FOR_EDIT_END
} from "./mutations.type";

const state = {
    isDetailLoading: false,
    details: {},
    feedbackSum: {},

    propertyDetails: {},

    // map
    classMapInfo: 'mapContent'
};

const getters = {
    // map
    getClassMapInfo(state) {
      return state.classMapInfo;
    },

    details() {
        return state.details;
    },

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
    },

    [FETCH_SUMMARY_SCORE]({commit}, propId) {
        let url = config.search_url + propId + '/feedback/summary';
        if (JwtService.getToken()) {
            ApiService.setHeader();
            return ApiService.get(url)
                .then((response) => {
                    commit(FETCH_SUMMARY_SCORE_END, response.data);
                })
                .catch(error => {
                    throw new Error(error);
                })
        } else {
            //
        }
    },

    [FETCH_PROPERTY_DETAIL_FOR_EDIT]({commit}, propId) {
        let url = config.property_details_url + propId + "/details?response-for=edit";
        if (JwtService.getToken()) {
            ApiService.setHeader();
            return ApiService.get(url)
                .then((response) => {
                    commit(FETCH_PROPERTY_DETAIL_FOR_EDIT_END, response.data.result);
                })
                .catch(error => {
                    throw new Error(error);
                })
        }
    }
};

const mutations = {
    setClassMapInfo (state, payload) {
        return state.ClassMapInfo = payload;
    },

    [FETCH_PROPERTY_DETAIL_START](state) {
        state.isDetailLoading = true;
    },
    [FETCH_PROPERTY_DETAIL_END](state, details) {
        state.isDetailLoading = true;
        state.details = details;
    },

    // Feedback
    [FETCH_SUMMARY_SCORE_END](state, feedbackSum) {
        state.feedbackSum = feedbackSum;
    },

    // Property Details For Edit
    [FETCH_PROPERTY_DETAIL_FOR_EDIT_END](state, propertyDetails) {
        state.propertyDetails = propertyDetails;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
