import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index.vue'
import Map from '@/views/map'
import MapAdmin from '@/views/mapAdmin.vue'
import Shop from "@/views/shop"
import ShopAdmin from "@/views/shopAdmin"
import Comment from '@/views/comment.vue'
import CommentAdmin from "@/views/commentAdmin.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Shop
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
    },
    {
        path: '/shop/admin',
        component: ShopAdmin
    },
    {
        path: '/comment',
        component: Comment
    },
    {
        path: '/comment/admin',
        component: CommentAdmin
    }
]

const router=new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

export default router