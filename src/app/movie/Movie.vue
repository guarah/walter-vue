<template>
  <div class="movies">
    <h2>In Movies</h2>
    <router-link to="/Home">Home</router-link>
  </div>
</template>

<script>
  export default {
    // Do not forget this little guy
    name: 'movies',
    // share common functionality with component mixins
    mixins: [],
    // compose new components
    extends: {},
    // component properties/variables
    props: {
      bar: {}, // Alphabetized
      foo: {},
      fooBar: {}
    },
    // variables
    data () {
      return {
        msg: 'Welcome to Your Vue.js PWA'
      }
    },
    computed: {},
    // when component uses other components
    components: {},
    // methods
    watch: {},
    methods: {},
    // component Lifecycle hooks
    beforeCreate () {},
    mounted () {}
}
</script>

<style scoped>
  .movies { /* ... */ }
</style>
