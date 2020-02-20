import CategoryService from "../services/category.service";
import {FILTER_CATEGORY} from "./actions.type";
import {FILTER_END, FILTER_START} from "./mutations.type";

const state = {
    filterList: {},
    isLoading: false
};

const getters = {
    filterList(state) {
        return state.filterList;
    }
};

const actions = {

    [FILTER_CATEGORY]({commit}) {
        commit(FILTER_START);
        return CategoryService.get()
            .then(result => {
                commit(FILTER_END, result.data);
            })
            .catch(error => {
                throw new Error(error);
            });
    }
};

const mutations = {
    [FILTER_START](state) {
        state.isLoading = true;
    },
    [FILTER_END](state, listCategory) {
        state.isLoading = false;
        state.filterList = listCategory[0];
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
