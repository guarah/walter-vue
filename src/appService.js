import store from './store/store'
import firebase from 'firebase'
import * as mediaService from './store/modules/media/mediaService'

function loadInicialMedias () {
  const user = firebase.auth().currentUser
  if (user) {
    store.dispatch('setUser', user)
    mediaService.getMyMedias(user)
      .then(response => {
        if (response.ok) {
          let myMedias = []
          for (var i in response.data) {
            myMedias.push(response.data[i])
          }
          store.dispatch('media/listMyMedias', myMedias)
          store.dispatch('media/search/defineSuggestions')
        }
      })
      .catch(error => {
        alert(error)
        console.log('Error', error)
      })
  }
}

export {
  loadInicialMedias
}
