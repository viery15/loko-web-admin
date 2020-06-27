<template>
  <div>
    <v-client-table :data="dataHistory" :columns="columns" :options="optionsTable"></v-client-table>
  </div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
import axios from "axios";
// import Loading from 'vue-loading-overlay'
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "History",
  data() {
    return {
      dataHistory: [],
      url: "https://loko-preprocessing.herokuapp.com/",
      columns: ["user_id", "nama", "input", "tanggal"],
      optionsTable: {
        headings: {
          nama: "Nama",
          input: "Input",
          tanggal: "Tanggal"
        },
        sortable: ["nama", "input", "tanggal"],
        filterable: ["nama", "input", "tanggal"]
      }
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false
      });
      const response = await axios.get(this.url + "HistoryController");
      this.dataTwitter = response.data;

      loader.hide();
    }
  }
};
</script>