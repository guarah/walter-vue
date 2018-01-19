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
    <app-media-list :medias="medias"></app-media-list>
  </div>
</template>

<script>
  
  import MediaList from '../media/MediaList.vue'
  // import firebase from 'firebase'

  export default {
    name: 'home',
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
