import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '@/views/map'
import Shop from "@/views/shop"
import ShopAdmin from "@/views/shopAdmin"
import CommentAdmin from "@/views/commentAdmin.vue";
import ReservationAdmin from "@/views/reservationAdmin.vue";
import Reservation from "@/views/reservation.vue";
import ReservationRecord from "@/views/reservationRecord.vue";
import AccountAdmin from "@/components/user/AccountAdmin.vue"
import Login from "@/components/login/Login.vue"
import Register from "@/components/login/Register.vue"
import Forgot from "@/components/login/ForgotPassword.vue"
import UserInfo from "@/components/login/UserInfo.vue"
import RoomAdmin from "@/views/roomAdmin.vue";
import Home from "@/views/Home.vue";
import VenueInfo from "@/views/VenueInfo.vue";
import UserRecord from "@/views/shopUserRecord.vue";
import reservationAnalysis from "@/components/reservation/reservationAnalysis.vue"
import ChatAdmin from "@/components/chat/ChatAdmin.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/map',
        component: Map
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
        path: '/shop/record',
        component: UserRecord
    },
    {
        path: '/comment/admin',
        component: CommentAdmin
    },
    {
        path: '/reservation',
        component: Reservation
    },
    {
        path: '/reservation/admin',
        component: ReservationAdmin
    },
    {
        path: '/reservation/admin/room',
        component: RoomAdmin
    },
    {
        path: '/reservation/record',
        component: ReservationRecord
    },
    {
        path: '/reservation/admin/analysis',
        component: reservationAnalysis
    },
    {
        path: '/user',
        component: AccountAdmin
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register

    },
    {
        path: '/forgot',
        component: Forgot
    },
    {
        path: '/userInfo',
        component: UserInfo
    },
    {
        path: '/venue_info',
        component: VenueInfo
    },
    {
        path: '/shop/chat/admin',
        component: ChatAdmin
    },
    {
        path: '/*',
        redirect: '/home'
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router