<template>
  <div class="main-content bg-default">
    <!-- Navbar -->
    <base-nav
      class="navbar-top navbar-horizontal navbar-dark"
      containerClasses="px-4 container"
      expand
    >
      <router-link slot="brand" class="navbar-brand" to="/">
        <img src="/img/brand/logo-ex-light.png" />
      </router-link>

      <template v-slot="{closeMenu}">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="/img/brand/green.png" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                @click="closeMenu"
                class="navbar-toggler"
                aria-label="Toggle sidenav"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <!-- Navbar items -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/login">
              <i class="ni ni-key-25"></i>
              <span class="nav-link-inner--text">{{ $store.getters.getAuthCaption.link_login}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/register">
              <i class="ni ni-circle-08"></i>
              <span class="nav-link-inner--text">{{ $store.getters.getAuthCaption.link_register}}</span>
            </router-link>
          </li>
        </ul>
        <div>
          <ul class="navbar-nav select-language ml-auto">
            <li class="nav-item">
              <a
                v-bind:style="thActive"
                class="language nav-link"
                v-on:click="changeLanguage('TH')"
                target="_self"
              >TH</a>
            </li>

            <li class="nav-item">
              <a
                v-bind:style="enActive"
                class="language nav-link"
                v-on:click="changeLanguage('EN')"
                target="_self"
              >EN</a>
            </li>
          </ul>
        </div>
      </template>
    </base-nav>
    <!-- Header -->
    <div class="header bg-gradient-info py-6 py-lg-7">
      <div class="container"></div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-default" points="2560 0 2560 100 0 100" />
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--4 pb-6">
      <slide-y-up-transition mode="out-in" origin="center top">
        <router-view></router-view>
      </slide-y-up-transition>
    </div>
    <footer class="py-5">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <div class="copyright text-center text-xl-left text-muted">
              &copy; {{year}}
              <a
                href="http://wgtgps.net/"
                class="font-weight-bold ml-1"
                target="_blank"
              >World GPS Tracker Part., Ltd.</a>
            </div>
          </div>
          <div class="col-xl-6">
            <ul class="nav nav-footer justify-content-center justify-content-xl-end">
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com"
                  class="nav-link"
                  target="_blank"
                >{{ $store.getters.getAuthCaption.link_about}}</a>
              </li>
              <li class="nav-item">
                <a
                  href="http://blog.creative-tim.com"
                  class="nav-link"
                  target="_blank"
                >{{ $store.getters.getAuthCaption.link_contact}}</a>
              </li>
              <li class="nav-item">
                <a
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md"
                  class="nav-link"
                  target="_blank"
                >{{ $store.getters.getAuthCaption.link_faq}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
  name: "auth-layout",
  components: {
    SlideYUpTransition
  },
  data() {
    return {
      year: new Date().getFullYear(),
      showMenu: false,
      enActive: "",
      thActive: "",
      active: {
        color: "tomato",
        fontSize: "16px"
      }
    };
  },
  methods: {
    changeLanguage(lang) {
      if (lang == "EN") {
        this.enActive = this.active;
        this.thActive = "";
      } else {
        this.thActive = this.active;
        this.enActive = "";
      }
      localStorage.setItem("language", lang);
      this.$store.dispatch("updateLanguage", lang);
    }
  },
  mounted: function() {
    if (localStorage.getItem("language") == "EN") {
      this.enActive = this.active;
      this.thActive = "";
    } else {
      this.thActive = this.active;
      this.enActive = "";
    }
  }
};
</script>
<style>
.language {
  color: white;
}
.active {
  color: tomato;
}
</style>