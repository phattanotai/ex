<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <!-- <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                        <div class="btn-wrapper text-center">
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                                <span class="btn-inner--text">Github</span>
                            </a>
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div>
        </div>-->
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-5">
            <h2>ลงชื่อเข้าใช้ระบบ</h2>
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
            <base-input
              class="input-group-alternative"
              placeholder="รหัสผ่านอีกครั้ง"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="loginData.repassword"
              v-on:keyup.enter="doLogin()"
            ></base-input>
            <div class="text-center">
              <base-button
                icon="ni ni-key-25"
                @click="doLogin()"
                class="my-4 btn-login"
              >เปลี่ยนรหัสผ่าน</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/login" class="text-light">
            <small>Login into your account</small>
          </router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light">
            <small>Create new account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginData: {
        username: "",
        password: "",
        repassword: "",
        remember: false
      }
    };
  },
  methods: {
    doLogin() {
      this.$store.dispatch("doLogin", this.loginData);
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
</style>
