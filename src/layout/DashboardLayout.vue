<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="World Express"
      title="World Express"
      logo="/img/brand/logo-express.png"
      v-if="$store.getters.getSideBar"
    >
      <template slot="links">
        <sidebar-item
          v-for="(item, index) in this.$store.getters.getMenuItem"
          v-bind:key="index"
          v-bind:item="item"
          :link="{name: item.name, icon: item.icon, path:'/' + $store.getters.getUserData.usergroup_name + item.path}"
        />
      </template>

      <!-- <div slot="document">
        <sidebar-item
          :link="{name: 'Getting started', icon: 'ni ni-spaceship', path: 'https://demos.creative-tim.com/vue-argon-dashboard/documentation'}"
        />
        <sidebar-item
          :link="{name: 'Foundation', icon: 'ni ni-palette', path: 'https://demos.creative-tim.com/vue-argon-dashboard/documentation'}"
        />
        <li class="nav-item">
          <a
            class="nav-link"
            href="https://demos.creative-tim.com/vue-argon-dashboard/documentation/components/alerts.html"
          >
            <i class="ni ni-ui-04"></i> Components
          </a>
        </li>
      </div>-->
    </side-bar>

    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div>
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition
  },
  data() {
    return {
      sidebarBackground: "vue",
      sideBar: true
    };
  },
  methods: {
    checkLogin() {
      this.$store.dispatch("checkLogin").then(() => {
        if (!this.$store.getters.getLogin) {
          this.$store.dispatch("doLogout");
        }
      });
    }
  },
  mounted: function() {
    this.checkLogin();
  }
};
</script>
<style lang="scss">
</style>
