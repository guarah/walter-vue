<template>
  <div class="home">

    <div class="first">
      <h2>Home</h2>
      <div v-if="user">
        <h3><b>User: </b>{{ user.displayName }}</h3>
      </div>

      <v-text-field label="Search" v-model="searchText"></v-text-field>
    </div>

    <app-media-list :medias="medias" class="media-list-home"></app-media-list>

    <v-bottom-nav absolute :value="true" :active.sync="e1" color="transparent">
      <v-btn flat color="teal" value="home" @click="go('Home')">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="movie" @click="go('Movie')">
        <span>Movies</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="serie" @click="go('Serie')">
        <span>Series</span>
        <v-icon>place</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="other" @click="go('Other')">
        <span>Others</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>

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
        time: null,
        e1: 'home'
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
                    image: val.poster_path ? `https://image.tmdb.org/t/p/w300/${val.poster_path}` : null
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
      go (where) {
        this.$router.push({name: where})
      }
    }
}
</script>

<style scoped>
  .home {
    width: 100%;
  }
  .first {
    margin: auto;
    width: 90%;
  }
  .media-list-home {
    height: 56vh;
    overflow: auto;
    overflow-x: hidden;
  }
</style>

