<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div v-if="media">
        {{ media.name }}
        <video id="video" class="video-js vjs-default-skin" controls preload="none" width="100%" height="300" data-setup="{}">
            <source :src='`/media${media.name}`' :type="`video/${media.type}`">
        </video>
      </div>
      <div v-else>
        <ul>
          <li v-for="file in files" :key="file.name"><a :href="`?p=${file.name}`">{{ file.name }}</a></li>
        </ul>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import * as axios from "@nuxtjs/axios";

export default {
  data () {
    return {
      media: null,
      files: []
    }
  },
  async mounted () {
    const files = await this.$axios.$get(`/api${this.$route.query.p || '/'}`);
    console.log({ p: this.$route.query.p, files });
    if (files.length === 1 && files[0].type !== "dir") {
      this.media = files[0];
    } else {
      this.media = null;
    }
    this.files = files;
  }
}
</script>
