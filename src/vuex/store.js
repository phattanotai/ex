import Vue from 'vue';
import Vuex from 'vuex';

// import usersModule from './usersModule/'
import authModule from './authModule';

Vue.use(Vuex)


let store = new Vuex.Store({
    modules: {
        login: authModule

    }
});

global.store = store;
export default store;