<template>
  <nav
    class="navbar"
    :class="[
            {'navbar-expand-md': expand},
            {'navbar-transparent': transparent},
            {[`bg-${type}`]: type}
         ]"
  >
    <div :class="containerClasses">
      <slot name="brand">
        <base-button
          class="d-lg-block d-none"
          size="sm"
          type="info"
          @click="toggleSidebar()"
          v-if="showButtonToggle"
        >
          <i class="fas fa-align-justify"></i>
        </base-button>
        <router-link
          :to="$store.getters.getFromUrl.path"
          class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
        >{{$store.getters.getFromUrl.name}}</router-link>
        <router-link
          :to="$route.path"
          class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
        >
          <span class="navbar-text">/</span>
        </router-link>

        <router-link
          :to="$route.path"
          :active="isActive"
          class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
        >{{$route.name}}</router-link>
      </slot>

      <!-- <navbar-toggle-button
        v-if="showToggleButton"
        :toggled="toggled"
        :target="contentId"
        @click.native.stop="toggled = !toggled"
      >
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>-->

      <div
        class="collapse navbar-collapse"
        :class="{show: toggled}"
        :id="contentId"
        v-click-outside="closeMenu"
      >
        <slot :close-menu="closeMenu"></slot>
      </div>
    </div>
  </nav>
</template>
<script>
// import NavbarToggleButton from "./NavbarToggleButton";

export default {
  name: "base-nav",
  components: {
    // NavbarToggleButton
  },
  props: {
    type: {
      type: String,
      default: "",
      description: "Navbar type (e.g default, primary etc)"
    },
    title: {
      type: String,
      default: "",
      description: "Title of navbar"
    },
    contentId: {
      type: [String, Number],
      default: Math.random().toString(),
      description:
        "Explicit id for the menu. By default it's a generated random number"
    },
    containerClasses: {
      type: [String, Object, Array],
      default: "container-fluid"
    },
    transparent: {
      type: Boolean,
      default: false,
      description: "Whether navbar is transparent"
    },
    expand: {
      type: Boolean,
      default: false,
      description: "Whether navbar should contain `navbar-expand-lg` class"
    },
    showToggleButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toggled: false,
      showButtonToggle: this.showToggleButton,
      isActive: true
    };
  },
  methods: {
    closeMenu() {
      this.toggled = false;
    },
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    }
  },
  mounted: function() {},
  updated: function() {
    if (document.body.clientWidth < 800) {
      this.showButtonToggle = false;
    } else {
      this.showButtonToggle = true;
    }
  }
};
</script>
<style>
</style>
