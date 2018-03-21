import store from './store/store'
import firebase from 'firebase'
import * as mediaService from './app/media/MediaService.js'

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
          store.dispatch('listMyMedias', myMedias)
          store.dispatch('defineSuggestions')
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
