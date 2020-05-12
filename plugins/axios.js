import axiosLib from "axios";
import Vue from "vue";

export default ({ app }) => {
  app.$axios = axiosLib.create({
    baseURL: app.$env.API_ENDPOINT
  });
  app.$axiosOpt = {
    headers: app.$env.API_CLIENT_ID && app.$env.API_CLIENT_SECRET ? {
      "X-IBM-Client-Id": app.$env.API_CLIENT_ID,
      "X-IBM-Client-Secret": app.$env.API_CLIENT_SECRET
    } : {}
  };
  Vue.prototype.$axios = app.$axios;
  Vue.prototype.$axiosOpt = app.$axiosOpt;
};
