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
            <source :src='`/media${media.path}`' :type="`video/${media.type}`">
            <track v-for="sub in subs" :key="sub.name" kind="captions" :src="`/media${sub.path}`" :srclang="sub.name" :label="sub.label" :default="sub.default">
        </video>
      </div>
      <div v-else>
        <ul>
          <li v-for="file in files" :key="file.name"><a :href="`?p=${encodeURIComponent(file.path)}`">{{ file.name }}</a></li>
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
      subs: [],
      files: []
    }
  },
  async mounted () {
    const path = `/api?p=${encodeURIComponent(this.$route.query.p || '/')}`;
    const files = (await this.$axios.get(path)).data;
    const media = files.filter(f => f.type === "dir" || f.type === "mp4" || f.type === "mkv");
    console.log({ path, files });
    if (media.length === 1 && media[0].type !== "dir") {
      this.media = media[0];
      this.subs = files.filter(f => f.type === "wtt");
      if (this.subs.length > 0) {
        this.subs[0].default = true;
      }
    } else {
      this.media = null;
      this.subs = []
    }
    this.files = media;
  }
}
</script>
