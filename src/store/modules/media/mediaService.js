import { API_TMDB_KEY } from '../../../lib/constants'
import { http } from '../../apiService'
import { NO_RESULTS } from '../../mutation-types'

function getMyMedias (user) {
  return new Promise((resolve, reject) => {
    http.get(`${user.uid}/addedMedias.json?auth=${user.token}`)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

function addToList (user, media) {
  return new Promise((resolve, reject) => {
    http.put(`${user.uid}/addedMedias/${media.id}.json?auth=${user.token}`, media)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

function removeFromList (user, media) {
  return new Promise((resolve, reject) => {
    http.delete(`${user.uid}/addedMedias/${media.id}.json?auth=${user.token}`, media)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

function setWatched (user, media) {
  return new Promise((resolve, reject) => {
    http.patch(`${user.uid}/addedMedias/${media.id}.json?auth=${user.token}`, { watched: true })
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

function unSetWatched (user, media) {
  return new Promise((resolve, reject) => {
    http.patch(`${user.uid}/addedMedias/${media.id}.json?auth=${user.token}`, { watched: false })
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
        if (responseJson.total_results === 0) {
          resolve(NO_RESULTS)
        }
        const medias = transformMedias(responseJson)
        if (medias) resolve(medias)
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

function transformMedias (mediasJson) {
  console.log('oi', mediasJson)
  return mediasJson && mediasJson.results && mediasJson.results.length > 0 && mediasJson.results.filter(x => x.media_type !== 'person')
    .reduce((acc, val) => {
      const media = {
        id: val.id,
        name: val.media_type === 'tv' ? val.name : val.title,
        vote_average: val.vote_average,
        description: val.overview,
        media_type: val.media_type === 'tv' ? 'serie' : val.media_type,
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
  getSuggestions,
  setWatched,
  unSetWatched
}
