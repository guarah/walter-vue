<template>
  <div class="home">
    <h2>In Home</h2>
    <router-link to="/Movie">Movies</router-link>
    <router-link to="/Serie">Series</router-link>
    <router-link to="/Other">Other</router-link>
  </div>
</template>

<script>
  export default {
    // Do not forget this little guy
    name: 'home',
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
  .home { /* ... */ }
</style>
