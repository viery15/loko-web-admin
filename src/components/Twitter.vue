<template>
  <div>
    <v-client-table :data="dataTwitter" :columns="columns" :options="optionsTable"></v-client-table>
  </div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
import axios from "axios";
// import Loading from 'vue-loading-overlay'
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Twiter",
  data() {
    return {
      dataTwitter: "",
      url: "https://loko-preprocessing.herokuapp.com/",
      columns: ['pengirim','pertanyaan', 'jawaban', 'tanggal', 'url'],
        optionsTable: {
            headings: {
                pertanyaan: 'Pertanyaan',
                jawaban: 'Jawaban',
                pengirim: 'Pengirim',
                url: 'URL',
                tanggal: 'Tanggal',
            },
            sortable: ['pertanyaan', 'jawaban', 'pengirim', 'url', 'tanggal'],
            filterable: ['pertanyaan','jawaban', 'pengirim', 'url', 'tangal']
        },
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
      const response = await axios.get(this.url + "TwitterController");
      this.dataTwitter = response.data;

      loader.hide();
    }
  }
};
</script>
