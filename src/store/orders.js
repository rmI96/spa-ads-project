import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

class Order{
    constructor(name, phone, adId, done = false, id = null) {
        this.name = name
        this.phone = phone
        this.adId = adId
        this.done = done
        this.id = id
    }
}

export default {
    state: {
        orders: []
    },
    mutations: {
       loadOrders(state, payload){
           state.orders = payload
       }
    },
    actions: {
        async createOrder({commit}, payload){

            const order = new Order(
                payload.name,
                payload.phone,
                payload.id,
            )

            try{
                await firebase.database().ref('/users/' + payload.ownerId + '/orders').push(order)
            }catch (error){
                commit('setError', error)
                throw error
            }

        },
        async getOrder({commit, getters}){
            commit('clearError')
            commit('setLoading', true)

            const resultOrders = []

            try{

                const ordersVal = await firebase.database().ref('/users/' + getters.user.id +  '/orders/').once('value')
                const orders = ordersVal.val()


                if(orders){

                    Object.keys(orders).forEach(key => {
                        const o = orders[key]
                        resultOrders.push(
                            new Order(
                                o.name,
                                o.phone,
                                o.adId,
                                o.done
                            )
                        )
                    })

                    commit('loadOrders', resultOrders)
                }


                commit('setLoading', false)
            }catch (error){
                commit('setError', error)
                commit('setLoading', false)
                throw error
            }
        }
    },
    getters: {
        orders(state){
            return state.orders
        }
    }
}