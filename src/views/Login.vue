<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-5">
            <h2>{{ $store.getters.getAuthCaption.label_login}}</h2>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="ชื่อผู้ใช้"
              addon-left-icon="ni ni-single-02"
              v-model="loginData.username"
            ></base-input>
            <base-input
              class="input-group-alternative"
              placeholder="รหัสผ่าน"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="loginData.password"
              v-on:keyup.enter="doLogin()"
            ></base-input>

            <base-checkbox v-model="loginData.remember" class="custom-control-alternative">
              <span class="text-muted">{{ $store.getters.getAuthCaption.label_remember}}</span>
            </base-checkbox>

            <div class="text-center">
              <base-button
                icon="ni ni-key-25"
                @click="doLogin()"
                class="my-4 btn-login"
              >{{ $store.getters.getAuthCaption.btn_login}}</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/repassword" class="text-light">
            <small>{{ $store.getters.getAuthCaption.link_repassword}}</small>
          </router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light">
            <small>{{ $store.getters.getAuthCaption.link_register}}</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AlertService from "../service/AlertService";
export default {
  name: "login",
  data() {
    return {
      loginData: {
        username: "",
        password: "",
        remember: false
      },
      loginNull: {
        username: false,
        password: true
      }
    };
  },
  methods: {
    doLogin() {
      if (this.loginData.username == "") {
        AlertService.warning(
          this.$store.getters.getAuthCaption.msg_username_null
        );
      } else if (this.loginData.password == "") {
        AlertService.warning(
          this.$store.getters.getAuthCaption.msg_password_null
        );
      } else {
        this.$store.dispatch("doLogin", this.loginData);
      }
    },
    doFetchRememberData() {
      this.$store.dispatch("fetchRememberData");
    }
  },
  mounted: function() {
    this.doFetchRememberData();
    this.loginData = this.$store.getters.getRememberData;
  }
};
</script>
<style>
.btn-login {
  background-image: linear-gradient(to right, #1a4ca1, #1843af) !important;
  border: none;
}
.msg {
  color: crimson;
}
</style>
