 // import * as fb from 'firebase'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

class User {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload){
            state.user = payload
        }
    },
    actions: {

        async registerUser({commit}, {email, password, name}){

            commit('clearError')
            commit('setLoading', true)

            try{

                const user = await firebase.auth().createUserWithEmailAndPassword(email, password)

                await firebase.auth().currentUser.updateProfile({
                    displayName: name
                })

                commit('setUser', new User(user.user.uid, user.user.displayName))
                commit('setLoading', false)

            }catch (error){

                commit('setLoading', false)
                commit('setError', error)
                throw error

            }

        },

        async loginUser({commit}, {email, password}){

            commit('clearError')
            commit('setLoading', true)

            try{

                const user = await firebase.auth().signInWithEmailAndPassword(email, password)

                commit('setUser', new User(user.user.uid, user.user.displayName))
                commit('setLoading', false)

            }catch (error){

                commit('setLoading', false)
                commit('setError', error)
                throw error

            }

        },

        async autoLoginUser({commit}, payload){

            commit('setUser', new User(payload.uid, payload.displayName))
            return true

        },

        onLogout({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
        }

    },
    getters: {

        user(state){
            return state.user
        },

        isUserLogIn(state){
            return state.user !== null
        }


    }
}