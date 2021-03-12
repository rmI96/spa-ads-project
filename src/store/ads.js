import firebase from "firebase/app"
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

class Ad {
    constructor (name, title, description, ownerId, imageSrc = '', promo = false, comments = [], id = null ){
        this.name = name
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.promo = promo
        this.comments = comments
        this.id = id
    }
}

export default {
    state: {
        ads: [],
        myAds: []
    },
    mutations: {
        createAd(state, payload){
            state.ads.push(payload)
        },
        loadAd(state, payload){
            state.ads = payload
        },
        upadeAd(state, {title, description, id}){
            const ad = state.ads.find((e) => {
              return e.id === id
            });

            ad.title = title
            ad.description = description
        },
        setComment(state, {nameUser, comment, id}){

            const ad = state.ads.find((d) => {
                return d.id === id
            })

            ad.comments[Object.keys(ad.comments).length + 1 + 'z'] = {
                name: nameUser,
                comment: comment
            }

        },
        deleteAd(state, {id}){
            const ad = state.ads.find((e) => {
                return e.id === id
            })
            state.ads.splice(state.ads.indexOf(ad), 1);
        }
    },
    actions: {
        async createAd({commit, getters}, payload){

            commit('clearError')
            commit('setLoading', true)

            const image = payload.image

            try{

                const newAd = new Ad(
                    getters.user.name,
                    payload.adTitle,
                    payload.description,
                    getters.user.id,
                    '',
                    payload.promo,
                    []
                    )

                const ad = await firebase.database().ref('ads').push(newAd)
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))

                const fileData = await firebase.storage().ref('ads/' + ad.key + imageExt).put(image)
                const imageSrc = await fileData.ref.getDownloadURL()


                await firebase.database().ref('ads').child(ad.key).update({
                    imageSrc: imageSrc
                })

                commit('setLoading', false)
                commit('createAd', {
                    ...newAd,
                    id: ad.key,
                    imageSrc: imageSrc,
                    comments: {}
                })

                //const ad = await firebase.database().ref('ads').push(newAd)

            } catch (error){

                commit('setError', error)
                commit('setLoading', false)
                throw error

            }
        },

        async fetchAds({commit}){
            commit('clearError')
            commit('setLoading', true)

            const resultAds = []

            try{

                const fbVal = await firebase.database().ref('ads').once('value')
                const ads = fbVal.val()

                if(ads){

                    Object.keys(ads).forEach(key => {
                        const ad = ads[key]
                        resultAds.push(
                            new Ad(
                                ad.name,
                                ad.title,
                                ad.description,
                                ad.ownerId,
                                ad.imageSrc,
                                ad.promo,
                                ad.comments,
                                key
                            )
                        )
                    })

                    commit('loadAd', resultAds)
                }

                commit('setLoading', false)
            }catch (error){
                commit('setError', error)
                commit('setLoading', false)
                console.log(error)
            }
        },

        async updateAd({commit}, {title, description, id}){
            commit('clearError')
            commit('setLoading', true)

            try{

                await firebase.database().ref('ads').child(id).update({
                    title: title,
                    description: description
                })

                commit('upadeAd', {
                    title: title,
                    description: description,
                    id: id
                })
                commit('setLoading', false)
            }catch (error){
                commit('setError', error)
                commit('setLoading', false)
                console.log(error)
            }
        },

        async createComment({commit}, {nameUser, comment, id}){

            commit('clearError')

            try{

                const commernt = {
                    name: nameUser,
                    comment: comment
                }

                await firebase.database().ref('ads/' + id + '/comments/').push(commernt)

                commit('setComment', {nameUser, comment, id})

            } catch (error){

                commit('setError', error)
                throw error

            }
        },

        async deleteAd({commit}, {id}){
            commit('clearError')
            commit('setLoading', true)
            try{
                await firebase.database().ref('ads').child(id).remove()

                commit('deleteAd', {id})
                commit('setLoading', false)
            }catch (error){
                commit('setLoading', false)
                commit('setError', error)
                throw error
            }
        }
    },
    getters: {
        ads (state) {
            return  state.ads
        },
        promoAds (state) {
            return  state.ads.filter(e => e.promo)
        },
        myAds (state, getters) {
            return state.ads.filter((e) => {
                    return e.ownerId === getters.user.id
                })
        },
        idGetAds(state) {
            return  idAd => {
                return state.ads.find(ad => ad.id === idAd)
            }
        }
    }
}
