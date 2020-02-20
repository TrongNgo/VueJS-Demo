import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    routes: [
        {
            name: 'home',
            path: '',
            props: true,
            component: () => import('../views/Home'),
        },
        {
            name: 'detail',
            path: '/detail',
            props: true,
            component: () => import('../views/PropertiesDetail')
        }
    ]
});

export default router;
