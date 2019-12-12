import VueRouter from 'vue-router'
import ProductList from './components/ProductList.vue';
import Authorization from './components/Authorization.vue';
import Registration from './components/Registration.vue';
import Enter from './components/Enter.vue';

export default new VueRouter ({
    routes: [
        {
            path: '',
            component: Enter
        },
        {
            path: '/authorization',
            component: Authorization
        },
        {
            path: '/registration',
            component: Registration
        },
        {
            path: '/products',
            component: ProductList
        }
    ],
    mode: 'history'
})
