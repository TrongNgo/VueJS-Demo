import Vue from 'vue';
import Vuex from 'vuex';

import home from './home.module';
import auth from './auth.module';
import category from './category.module';
import property from './property.module';
import cart from './cart.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        home,
        auth,
        category,
        property,
        cart
    }
});
