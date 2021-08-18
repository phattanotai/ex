<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"></base-header>
  </div>
</template>
<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import BTooltipDirective from "bootstrap-vue/es/directives/tooltip";
Vue.use(VueClipboard);
export default {
  directives: {
    "b-tooltip": BTooltipDirective
  },
  data() {
    return {};
  },
  methods: {
    onCopy() {
      this.$notify({
        type: "success",
        title: "Copied to clipboard"
      });
    }
  }
};
</script>
<style></style>
