import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '@/views/map'
import MapAdmin from '@/views/mapAdmin.vue'
import Shop from "@/views/shop"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Map
    },
    {
        path: '/map',
        component: Map
    },
    {
        path: '/map/admin',
        component: MapAdmin
    },
    {
        path: '/shop',
        component: Shop
    }
]

const router=new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

export default router