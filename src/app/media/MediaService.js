import Vue from 'vue'
import { API_TMDB_KEY } from '../../constants'

function getMyMedias (user) {
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
      return new Promise((resolve, reject) => {
        const medias = transformMedias(responseJson)
        if (medias) resolve(medias)
        reject(Error)
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

function transformMedias (mediasJson) {
  console.log(mediasJson)
  return mediasJson && mediasJson.results && mediasJson.results.length > 0 && mediasJson.results.filter(x => x.media_type !== 'person')
    .reduce((acc, val) => {
      const media = {
        id: val.id,
        name: val.media_type === 'tv' ? val.name : val.title,
        genre: 'genre',
        description: val.overview,
        media_type: val.media_type === 'tv' ? 'serie' : val.media_type,
        added: false,
        watched: false,
        image: val.poster_path ? `https://image.tmdb.org/t/p/w300/${val.poster_path}` : null
      }
      acc.push(media)
      return acc
    }, [])
}

function getSuggestions () {
  return fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_TMDB_KEY}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return new Promise((resolve, reject) => {
        const medias = transformMedias(responseJson)
        if (medias) resolve(medias)
        reject(Error)
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

export {
  addToList,
  getMyMedias,
  removeFromList,
  search,
  getSuggestions
}
