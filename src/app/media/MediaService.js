import Vue from 'vue'

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

export {
  addToList,
  getAddedMedias,
  removeFromList
}
