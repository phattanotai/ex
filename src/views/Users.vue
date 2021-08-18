<template>
  <div>
    <base-header type="gradient-success" class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"></base-header>
    <div class="container-fluid mt--9">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div class="d-flex justify-content-between">
                <base-button size="sm" type="info" class="mr-4">Connect</base-button>
                <base-button size="sm" type="info" class="mr-4">Connect</base-button>
                <base-button size="sm" type="info" class="mr-4">Connect</base-button>
                <base-button size="sm" type="default" class="float-right">Message</base-button>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <users-table></users-table>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <projects-table type="dark" title="Dark Table"></projects-table>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <projects-table title="Light Table"></projects-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProjectsTable from "./Tables/ProjectsTable";
import UsersTable from "./Tables/UsersTable";
export default {
  name: "tables",
  components: {
    ProjectsTable,
    UsersTable
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style></style>
