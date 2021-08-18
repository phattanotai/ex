<template>
  <card shadow type="secondary">
    <div slot="header" class="bg-white border-0">
      <div class="row align-items-center">
        <div class="col-8">
          <h3 class="mb-0">My account</h3>
        </div>
        <div class="col-4 text-right">
          <a href="#!" class="btn btn-sm btn-primary">Settings</a>
        </div>
      </div>
    </div>
    <template>
      <form @submit.prevent>
        <h6 class="heading-small text-muted mb-4">User information</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="row">
              <div class="col-lg-6">
                <base-input
                  alternative
                  label="Name"
                  placeholder="Name"
                  input-classes="form-control-alternative"
                  v-model="userFormData.users_name"
                />
              </div>
              <div class="col-lg-6">
                <base-input
                  alternative
                  label="Tel"
                  placeholder="Tel"
                  input-classes="form-control-alternative"
                  v-model="userFormData.users_tel"
                />
              </div>
              <div class="col-lg-6">
                <base-input
                  alternative
                  label="Email address"
                  placeholder="jesse@example.com"
                  input-classes="form-control-alternative"
                  v-model="userFormData.users_email"
                />
              </div>
              <div class="col-lg-6">
                <base-input
                  alternative
                  label="Last name"
                  placeholder="Last name"
                  input-classes="form-control-alternative"
                  v-model="userFormData.lastName"
                />
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4" />
        <!-- Address -->
        <h6 class="heading-small text-muted mb-4">Contact information</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <base-input alternative label="Address">
                <textarea
                  rows="4"
                  class="form-control form-control-alternative"
                  placeholder="Home Address"
                  v-model="userFormData.users_address"
                ></textarea>
              </base-input>
            </div>
            <div class="col-lg-6">
              <model-select
                :options="optionsRegion"
                v-model="userFormData.users_region"
                placeholder="Province/District/Subdistrict"
              ></model-select>
            </div>
            <div class="col-lg-12">
              <model-select
                :options="options"
                v-model="userFormData.users_city"
                placeholder="Province/District/Subdistrict"
              ></model-select>
            </div>
          </div>
        </div>
        <hr class="my-4" />
        <!-- Description -->
        <!-- <h6 class="heading-small text-muted mb-4">About me</h6>
        <div class="pl-lg-4">
          <div class="d-flex justify-content-between">
            <base-button size="sm" type="info" v-on:click="saveUserData" class="mr-4">Save</base-button>
          </div>
          <div class="form-group">
            <base-input alternative label="About Me">
              <textarea
                rows="4"
                class="form-control form-control-alternative"
                placeholder="A few words about you ..."
              >A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
            </base-input>
          </div>
        </div>-->
      </form>
    </template>
  </card>
</template>

<script>
import { USER } from "../../assets/Type/Type.js";
import { ModelSelect } from "vue-search-select";
export default {
  name: "users-form",
  components: {
    ModelSelect
  },
  data: function() {
    return {
      userFormData: USER,
      options: [{ value: "", text: "" }],
      optionsRegion: [
        { value: "1", text: "ภาคเหนือ" },
        { value: "2", text: "ภาคกลาง" },
        { value: "3", text: "ภาคตะวันออกเฉียงเหนือ" },
        { value: "4", text: "ภาคตะวันตก" },
        { value: "5", text: "ภาคตะวันออก" },
        { value: "6", text: "ภาคใต้" }
      ]
    };
  },
  props: {
    formType: {
      type: String,
      default: "profile",
      description: "users-form type (profile, edit)"
    }
  },
  methods: {
    saveUserData() {
      console.log(this.userFormData);
    },
    getValue(data) {
      let value = null;
      this.optionsRegion.filter(function(i) {
        if (i.text === data) {
          value = i.value;
        }
      });
      return value;
    },
    getText(data) {
      let text;
      if (data === null || data === undefined) {
        data = "5300";
      }
      this.optionsRegion.filter(function(i) {
        if (i.value === data) {
          text = i.text;
        }
      });
      return text;
    }
  },
  mounted: function() {
    if (this.formType === "profile") {
      this.userFormData = this.$store.getters.getUserData;
      console.log(this.userFormData);
      this.options = [
        {
          value: this.userFormData.users_city,
          text: this.userFormData.users_city
        }
      ];
    }
  }
};
</script>

<style>
</style>