// import axios from 'axios'
import router from '../router';
import ApolloClient from '../service/Apolloconf';
import AlertService from '../service/AlertService';
import CalculateService from '../service/CalculateService';
import {
    LANGUAGE_TH,
    LANGUAGE_EN
} from '../assets/caption/authCaption';
import {
    AM_MENU,
    US_MENU,
    CH_MENU
} from '../assets/caption/menuCaption';
import {
    LOGIN,
    ChECKLOGIN,
    REGISTER
} from '.././documents/auth.js';
import {
    USER
} from '../assets/Type/Type.js';




export default {
    state: {
        accessToken: null,
        loggingIn: false,
        userData: USER,
        rememberData: {
            remember: false,
            username: '',
            password: ''
        },
        sideBar: true,
        language: LANGUAGE_TH,
        menuItem: '',
        fromUrl: {
            name: 'Dashboard',
            path: '/'
        }
    },
    mutations: {
        loginStart: (state) => {
            state.loggingIn = true;
        },
        loginStop: (state) => {
            state.loggingIn = false;
        },
        setLanguage: (state, data) => {
            if (data.language == 'EN') {
                state.language = LANGUAGE_EN;

                if (data.id === 1) {
                    state.menuItem = US_MENU.MENU_EN;
                } else if (data.id === 2) {
                    state.menuItem = AM_MENU.MENU_EN;
                } else {
                    state.menuItem = CH_MENU.MENU_EN;
                }
            } else {
                state.language = LANGUAGE_TH;
                if (data.id === 1) {
                    state.menuItem = US_MENU.MENU_TH;
                } else if (data.id === 2) {
                    state.menuItem = AM_MENU.MENU_TH;
                } else {
                    state.menuItem = CH_MENU.MENU_TH;
                }
            }
        },
        updateAccessToken: (state, accessToken) => {
            state.accessToken = accessToken;
        },
        setUserData: (state, data) => {
            state.userData = data;
        },
        setRememberData: (state, data) => {
            state.rememberData = data;
        },
        logout: (state) => {
            state.accessToken = null;
        },
        setSideBar: (state) => {
            state.sideBar = !state.sideBar;
        },
        setFromUrl: (state, url) => {
            state.fromUrl = url;
        },
    },
    actions: {
        doLogin(context, loginData) {
            const variables = {
                username: loginData.username,
                password: loginData.password,
            }
            ApolloClient.query({
                query: LOGIN,
                variables: variables
            }).then(gqlResult => {
                const {
                    data
                } = gqlResult
                if (data.doLogin[0].accessToken) {
                    context.commit('loginStart');
                    const rememberData = {};
                    rememberData.remember = loginData.remember;
                    if (loginData.remember) {
                        rememberData.username = CalculateService.base64_encode(loginData.username);
                        rememberData.password = CalculateService.base64_encode(loginData.password);
                    } else {
                        rememberData.username = '';
                        rememberData.password = '';
                    }
                    localStorage.setItem('rememberData', JSON.stringify(rememberData));
                    context.commit('setRememberData', rememberData);

                    localStorage.setItem('accessToken', data.doLogin[0].accessToken);
                    localStorage.setItem('userData', CalculateService.base64_encode(JSON.stringify(data.doLogin[0].userData[0])));

                    context.commit('updateAccessToken', data.doLogin[0].accessToken);
                    context.commit('setUserData', data.doLogin[0].userData[0]);
                    AlertService.success(this.getters.getAuthCaption.success_login);
                    router.push('/' + this.getters.getUserData.usergroup_name + '/');
                } else {
                    AlertService.warning(this.getters.getAuthCaption.warning_login);
                    context.commit('loginStop');
                }
            }).catch((error) => {
                context.commit('updateAccessToken', null);
                context.commit('loginStop');

                AlertService.error(this.getters.getAuthCaption.error_login + error);
            });

        },
        doRegister(context, registerData) {
            return new Promise((resolve, reject) => {
                const userData = {
                    users_name: registerData.name,
                    users_email: registerData.email,
                    password: registerData.password,
                    username: registerData.username,
                };
                ApolloClient.mutate({
                    mutation: REGISTER,
                    variables: {
                        userDataInput: userData
                    }
                }).then(gqlResult => {
                    const {
                        data
                    } = gqlResult

                    if (data.doRegister[0].isRegister) {
                        AlertService.success(this.getters.getAuthCaption.success_register);
                        resolve(true);
                    } else {
                        if (data.doRegister[0].isUsername) {
                            AlertService.WARNING(this.getters.getAuthCaption.warning_isUsername);
                        }
                        AlertService.WARNING(this.getters.getAuthCaption.warning_register);
                        resolve(false);
                    }

                }).catch((error) => {
                    AlertService.error(this.getters.getAuthCaption.error_register + error);
                    reject();
                });
            });
        },
        fetchAccessToken(context) {
            context.commit('updateAccessToken', localStorage.getItem('accessToken'));
        },
        doLogout(context) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userData');

            context.commit('logout');
            router.push('/login');
            // window.location.replace("/login");

            if (this.getters.getLogin) {
                AlertService.info(this.getters.getAuthCaption.success_logout);
            }
            context.commit('loginStop');
        },
        fetchRememberData(context) {
            context.commit('setRememberData', JSON.parse(localStorage.getItem('rememberData')));
        },
        fetchFromUrl(context, url) {
            context.commit('setFromUrl', url);
        },
        fetchUserData(context) {
            const data = localStorage.getItem('userData');
            if (data) {
                context.commit('setUserData', JSON.parse(CalculateService.base64_decode(data)));
            }
        },
        checkLogin(context) {
            return new Promise((resolve, reject) => {
                if (!this.getters.getLogin) {
                    ApolloClient.query({
                        query: ChECKLOGIN
                    }).then(gqlResult => {
                        const {
                            data
                        } = gqlResult
                        if (data.checkLogin[0].isToken) {
                            context.commit('loginStart');
                            resolve();
                        }
                    }).catch((error) => {
                        console.log(error);
                        AlertService.error(this.getters.getAuthCaption.error_checkLogin + error);
                        reject();
                    });
                }
            });
        },
        toggleSidebar(context) {
            context.commit('setSideBar');
        },
        updateLanguage(context, lang) {
            const d = context.getters.getUserData;
            let id = 0;
            if (d) {
                id = d.usergroup_id;
            }
            const data = {
                language: lang,
                id: id
            }
            context.commit('setLanguage', data);
        }
    },
    getters: {
        getSideBar(state) {
            return state.sideBar;
        },
        getAuthCaption(state) {
            return state.language;
        },
        getMenuItem(state) {
            return state.menuItem;
        },
        getToken(state) {
            return state.accessToken;
        },
        getLogin(state) {
            return state.loggingIn;
        },
        getUserData(state) {
            return state.userData;
        },
        getFromUrl(state) {
            return state.fromUrl;
        },
        getRememberData(state) {
            const data = {};
            data.remember = state.rememberData.remember;
            data.username = '';
            data.password = '';
            if (state.rememberData.remember) {
                data.username = CalculateService.base64_decode(state.rememberData.username);
                data.password = CalculateService.base64_decode(state.rememberData.password);
            }
            return data;
        }
    }
};