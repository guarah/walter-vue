import Vue from 'vue'
import { API_TMDB_KEY } from '../../constants'

function getAddedMedias (user) {
  return new Promise((resolve, reject) => {
    Vue.http.get(`${user.uid}/addedMedias.json`)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

function addToList (user, media) {
  return new Promise((resolve, reject) => {
    Vue.http.put(`${user.uid}/addedMedias/${media.id}.json`, media)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

function removeFromList (user, media) {
  return new Promise((resolve, reject) => {
    Vue.http.delete(`${user.uid}/addedMedias/${media.id}.json`, media)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

function search (searchText) {
  const query = searchText.replace('', '+')
  return fetch(`https://api.themoviedb.org/3/search/multi?page=1&api_key=${API_TMDB_KEY}&query=${query}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.error(error)
    })
}

export {
  addToList,
  getAddedMedias,
  removeFromList,
  search
}
