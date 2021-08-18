<template>
  <div id="app">
    <notifications></notifications>
    <router-view />
  </div>
</template>

<script>
import store from "./vuex/store";
export default {
  store,
  updated: function() {
    this.$store.dispatch("updateLanguage", localStorage.getItem("language"));
  }
};
</script>

<style>
#app {
  font-family: "Pridi", serif;
  font-family: "Kanit", sans-serif;
  font-size: 18px;
}
</style>