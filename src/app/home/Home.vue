<template>
  <div class="home">

    <div>
      <div class="first">
        <h2>Welcome, {{user.displayName}}!</h2>

        <div class="search-bar">
          <v-text-field class="search-input" label="Search for series, movies..." v-model="searchText"></v-text-field>
          <v-btn v-if="searchedMedias && searchedMedias.length > 0" @click="clearSearchedMedias" class="search-close" flat icon color="black">
            <v-icon>close</v-icon>
          </v-btn>
        </div>

      </div>

      <media-list
        v-if="searchedMedias && searchView"
        listId="searchedMedias"
        title="Results..."
        :medias="searchedMedias"
        @selectedList="onSelectedList($event)"
      />

      <media-list
        v-if="!searchView && suggestions"
        listId="suggestions"
        title="Suggested"
        :medias="suggestions"
        @selectedList="onSelectedList($event)"
      />

      <media-list
        v-if="myMedias"
        listId="myMedias"
        title="My list"
        :medias="myMedias"
        @selectedList="onSelectedList($event)"
      />

      <media-list
        v-if="rewatchMedias"
        listId="rewatchMedias"
        title="Watch again"
        :medias="rewatchMedias"
        @selectedList="onSelectedList($event)"
      />
    </div>

  </div>
</template>

<script>
  import MediaList from '../media/MediaList.vue'
  import MediaDetail from '../media/MediaDetail.vue'

  export default {
    components: {
      MediaList,
      MediaDetail
    },
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
            this.$store.dispatch('media/search/searchMedias', value)
          }, 1000)
        }
      }
    },
    computed: {
      searchedMedias () {
        return this.$store.getters['media/search/searchedMedias']
      },
      suggestions () {
        return this.$store.getters['media/search/suggestions']
      },
      myMedias () {
        return this.$store.getters['media/myMedias']
      },
      rewatchMedias () {
        return this.$store.getters['media/rewatchMedias']
      },
      user () {
        return this.$store.getters.user
      },
      searchView () {
        return this.searchedMedias && this.searchedMedias.length > 0
      },
      selectedMedia () {
        return this.$store.getters['media/selectedMedia']
      }
    },
    methods: {
      clearSearchedMedias () {
        this.searchText = ''
        this.$store.dispatch('media/search/clearSearchedMedias')
      },
      onSelectedList (event) {
        this.go('MediaList', event)
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

