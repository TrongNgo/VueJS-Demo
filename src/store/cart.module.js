import {ADD_TO_CART, REMOVE_FROM_CART} from "./actions.type";
import {ADD_CART_END, REMOVE_CART_END} from "./mutations.type";

const state = {
    ListBooking: []
};

const getters = {
    getBookingList() {
        return state.ListBooking;
    }
};

const actions = {
    [ADD_TO_CART]({ commit }, property) {
        commit(ADD_CART_END, property);
    },
    [REMOVE_FROM_CART]({commit}, property) {
        commit(REMOVE_CART_END, property);
    }
};

const mutations = {
    [ADD_CART_END](state, property) {
        state.ListBooking.push(property);
    },
    [REMOVE_CART_END](state, property) {
        state.ListBooking = state.ListBooking.filter(p => p.listingId !== property.listingId);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
