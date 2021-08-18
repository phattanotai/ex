<template>
  <div>
    <base-nav class="navbar-top navbar-dark" id="navbar-main" :show-toggle-button="true" expand>
      <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
        <div class="form-group mb-0">
          <base-input
            placeholder="Search"
            class="input-group-alternative"
            alternative
            addon-right-icon="fas fa-search"
          ></base-input>
        </div>
      </form>
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
          <span class="navbar-text">|</span>
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
      <ul class="navbar-nav align-items-center d-none d-md-flex" style="margin-right: 6%;">
        <li class="nav-item dropdown">
          <base-dropdown class="nav-link pr-0">
            <div class="media align-items-center" slot="title">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" src="/img/theme/team-1-800x800.jpg" />
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm font-weight-bold">{{ userData.users_name}}</span>
              </div>
            </div>

            <template style="margin-right:100px">
              <router-link to="/public/profile" class="dropdown-item">
                <i class="ni ni-single-02 text-green"></i>
                <span>{{ $store.getters.getAuthCaption.menu_profile}}</span>
              </router-link>
              <div class="dropdown-divider"></div>

              <a style="cursor: pointer;" v-on:click="logout()" class="dropdown-item">
                <i class="ni ni-user-run text-red"></i>
                <span>{{ $store.getters.getAuthCaption.menu_logout}}</span>
              </a>
            </template>
          </base-dropdown>
        </li>
      </ul>
    </base-nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      userData: "",
      enActive: "",
      thActive: "",
      active: {
        color: "tomato",
        fontSize: "16px"
      }
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      this.$store.dispatch("doLogout");
    },
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
    this.$store.dispatch("fetchUserData");
    this.userData = this.$store.getters.getUserData;
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
