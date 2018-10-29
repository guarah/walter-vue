<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="card" height="200px" width="130px">
        <v-card-media v-if="media.image" :src="media.image" class="card-image" height="200px">
          <v-layout column class="media">
            <v-card-title class="info-list-added">
              <v-layout row>
                <v-layout column v-if="media.watched">
                  <v-btn dark icon>
                    <v-icon>visibility</v-icon>
                  </v-btn>
                </v-layout>
                <v-layout column v-if="media.added">
                  <v-btn dark icon>
                    <v-icon>check</v-icon>
                  </v-btn>
                </v-layout>
              </v-layout>
            </v-card-title>
          </v-layout>
        </v-card-media>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      media: {
        type: Object
      }
    }
  }
</script>

<style scoped>
  .card .card-image .info-list-added {
    padding: 0px;
    background: #00000061;
    height: 35px;
    width: 100%;
    border-radius: 3px;
    position: absolute;
    right: 0;
  }
</style>

