<template>
  <div class="home">
    <h2>In Home</h2>
    <div v-if="user">
      <h3><b>User: </b>{{ user.displayName }}</h3>
    </div>
    <router-link to="/Home">Home</router-link>
    <router-link to="/Movie">Movies</router-link>
    <router-link to="/Serie">Series</router-link>
    <router-link to="/Other">Other</router-link>

    <h2>lista de itens</h2>
    <button @click="listar">Listar</button>
    <input type="text" placeholder="Search..." v-model="searchText">
    <app-media-list :medias="medias"></app-media-list>
  </div>
</template>

<script>
  
  import MediaList from '../media/MediaList.vue'
  import * as mediaService from './../media/MediaService.js'
  // import firebase from 'firebase'

  export default {
    name: 'home',
    data: function () {
      return {
        searchText: '',
        time: null
      }
    },
    watch: {
      searchText (value) {
        console.log('writing')
        if (this.time) clearTimeout(this.time)
        if (value.length > 3) {
          this.time = setTimeout(() => {
            console.log('waiting')
            mediaService.search(value).then(result => {
              console.log(result)
              const medias = result && result.results && result.results.length > 0 && result.results.filter(x => x.media_type !== 'person')
                .reduce((acc, val) => {
                  const media = {
                    id: val.id,
                    name: val.name,
                    genre: 'genre',
                    description: val.overview,
                    media_type: val.media_type === 'tv' ? 'serie' : val.media_type,
                    added: false,
                    watched: false,
                    image: 'https://image.tmdb.org/t/p/w300/' + val.poster_path
                  }
                  acc.push(media)
                  return acc
                }, [])
              this.$store.dispatch('searchedMedias', medias)
            })
          }, 1000)
        }
      }
    },
    computed: {
      medias () {
        return this.$store.getters.allMedias
      },
      user () {
        return this.$store.getters.user
      }
    },
    components: {
      appMediaList: MediaList
    },
    methods: {
      listar () {
        this.$store.dispatch('listAllMedias')
      }
    }
}
</script>
