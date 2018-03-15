<template>
  <div class="home">

    <div class="first">
      <h2>Welcome, {{user.displayName}}!</h2>

      <div class="search-bar">
        <v-text-field class="search-input" label="Search for series, movies..." v-model="searchText"></v-text-field>
        <v-btn v-if="searchedMedias.length > 0" @click="clearSearchedMedias" class="search-close" flat icon color="black">
          <v-icon>close</v-icon>
        </v-btn>
      </div>

    </div>

    <app-media-list title="Results..." v-if="searchView" :medias="searchedMedias"></app-media-list>

    <app-media-list title="Suggested" v-if="!searchView && suggestions.length > 0" :medias="suggestions"></app-media-list>

    <app-media-list title="My list" v-if="myMedias.length > 0" :medias="myMedias"></app-media-list>

    <!-- Rewatch -->
    <app-media-list title="Watch again" v-if="rewatchMedias.length > 0" :medias="rewatchMedias"></app-media-list>

    <!-- <v-bottom-nav absolute :value="true" :active.sync="e1" color="transparent">
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
    </v-bottom-nav> -->

  </div>
</template>

<script>
  import MediaList from '../media/MediaList.vue'

  export default {
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
            this.$store.dispatch('searchMedias', value)
          }, 1000)
        }
      }
    },
    computed: {
      searchedMedias () {
        return this.$store.getters.searchedMedias
      },
      suggestions () {
        return this.$store.getters.suggestions
      },
      myMedias () {
        return this.$store.getters.myMedias
      },
      rewatchMedias () {
        return this.$store.getters.rewatchMedias
      },
      user () {
        return this.$store.getters.user
      },
      searchView () {
        return this.searchedMedias.length > 0
      }
    },
    components: {
      appMediaList: MediaList
    },
    methods: {
      go (where) {
        this.$router.push({name: where})
      },

      clearSearchedMedias () {
        this.searchText = ''
        this.$store.dispatch('clearSearchedMedias')
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

  .search-bar {
    position: relative;
  }

  .search-close {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>

