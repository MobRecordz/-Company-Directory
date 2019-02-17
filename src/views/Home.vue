<template>
  <div class="home">
    <div class="controls">
      <b-button variant="primary" v-b-toggle.create>Добавить компанию</b-button>
    </div>

    <create-company :state="true"></create-company>

    <company-table
      :companyArray="getAllCompanies"
      :totalRows="getTotalRows"
      v-if="getAllCompanies.length > 0"
    ></company-table>

    <b-card class="empty w-75" v-else>
      В этой таблице пока ничего нет.
    </b-card>
  </div>
</template>

<script>
import createCompany from "@/components/create-company.vue";
import companyTable from "@/components/company-table.vue";

export default {
  name: "home",
  components: {
    companyTable,
    createCompany
  },
  watch: {
    getTotalRows(val) {
      this.totalRows = val;
    }
  },
  computed: {
    getAllCompanies() {
      return this.$store.getters.companies;
    },
    getTotalRows() {
      return this.$store.getters.companies.length;
    }
  },
  created() {
    this.$store.dispatch("initStore");
  }
};
</script>

<style scoped lang="scss">
.controls {
  width: 75vw;
  margin: 1vh auto;
}

.empty {
  margin: 0 auto;
}
</style>
