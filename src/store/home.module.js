import {FETCH_PROPERTIES} from './actions.type';
import {FETCH_START, FETCH_END} from './mutations.type';
import ApiService from '../services/api.service';
// import config from "../helpers/config";

const state = {
    properties: [],
    propertiesCount: 0,
    isLoading: false
};

const getters = {
    propertiesCount(state) {
        return state.propertiesCount;
    },
    properties(state) {
        return state.properties;
    },
    isLoading(state) {
        return state.isLoading;
    },
};

const actions = {
    [FETCH_PROPERTIES]({commit}, params) {
        const {pageSize} = params;

        if (pageSize <= 4) {
            const count = 12;

            commit(FETCH_START);
            return new Promise((resolve, reject) => {
                return ApiService.post('/omi-properties/search?body-format=SearchParam', {pageSize: count})
                    .then(({data}) => {
                        resolve(data);
                        commit(FETCH_END, {properties: data.results.map((item) => item.document), propertiesCount: data.count});
                    }).catch(error => {
                        reject(error);
                        throw new Error(error);
                    });
            })

        } else {
            state.isLoading = false;
        }

    },
};

const mutations = {
    [FETCH_START](state) {
        state.isLoading = true;
    },
    [FETCH_END](state, { properties, propertiesCount }) {
        if (properties && properties.length) {
            state.properties.push(...properties);
            state.propertiesCount = propertiesCount;
            state.isLoading = false;
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
