import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from '@/views/index.vue'
import Map from '@/views/map'
import MapAdmin from '@/views/mapAdmin.vue'
import Shop from "@/views/shop"
import ShopAdmin from "@/views/shopAdmin"
import Comment from '@/views/comment.vue'
import CommentAdmin from "@/views/commentAdmin.vue";
import ReservationAdmin from "@/views/reservationAdmin.vue";
import Reservation from "@/views/reservation.vue";
import User from "@/components/user/AccountAdmin.vue"
import Login from "@/components/login/Login.vue"
import Register from "@/components/login/Register.vue"
import RoomAdmin from "@/views/roomAdmin.vue";
import Home from "@/views/Home.vue";
import Sustech from "@/views/Sustech.vue";
import UserRecord from "@/views/shopUserRecord.vue";
import Appointment from "@/views/Appointment.vue";

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
        path: '/shop/record',
        component: UserRecord
    },
    {
        path: '/comment',
        component: Comment
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
        path: '/reservation/room/admin',
        component: RoomAdmin
    },
    {
        path: '/user',
        component: User
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
        path: '/sustech',
        component: Sustech
    },
    {
        path: '/appoint',
        component: Appointment
    },
    {
        path: '*',
        redirect: '/home'
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router