<template>
  <div>
    <button
      v-on:click="btnTambah()"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#modalSinonim"
    >
      <font-awesome-icon icon="plus" /> Tambah</button
    ><br /><br />
    <v-client-table
      :data="dataSinonim"
      :columns="columns"
      :options="optionsTable"
    >
      <!-- <a slot="action" :href="delete(props.row.id)" slot-scope="props">edit</a> -->
      <div slot="action" slot-scope="props">
        <button
          v-on:click="editData(props.row.id, props.row.words)"
          style="margin-left:5px"
          class="btn btn-md btn-warning btn-sm"
          data-toggle="modal"
          data-target="#modal-form"
        >
          <font-awesome-icon icon="pen" />
        </button>
        <button
          v-on:click="destroy(props.row.id)"
          style="margin-left:5px"
          type="button"
          class="btn btn-danger btn-sm"
        >
          <font-awesome-icon icon="trash" />
        </button>
      </div>
    </v-client-table>

    <div class="modal fade" id="modalSinonim" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Tambah Data Sinonim</h3>
          </div>
          <div class="modal-body">
            <div v-for="(word, index) in wordsInput" v-bind:key="index">
              <div class="form-group">
                <label for="usr">Word {{ word.number }}: </label>
                <div class="row">
                  <div class="col-md-10">
                    <input
                      :name="'word' + word.number"
                      :placeholder="'word ' + word.number"
                      v-model="word.word"
                      style="width:100%"
                      autocomplete="off"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="col-md-1">
                    <button
                      v-on:click="removeWord(index)"
                      v-if="wordsInput.length > 1"
                      class="btn btn-danger btn-sm"
                    >
                      <font-awesome-icon icon="window-close" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center">
              <button
                v-on:click="addWord()"
                class="btn btn-success btn-sm center"
              >
                <font-awesome-icon icon="plus" />
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button
              id="btnSave"
              type="button"
              class="btn btn-primary"
              v-on:click="newData()"
            >
              Save
            </button>
            <button
              id="btnUpdate"
              type="button"
              class="btn btn-primary"
              v-on:click="updateData()"
            >
              Update
            </button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>
import axios from "axios";
// import Loading from 'vue-loading-overlay'
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "SinonimComponent",
  data() {
    return {
      url: "http://127.0.0.1/loko/text-preproccessing/",
      dataSinonim: "",
      columns: ["words", "action"],
      words: [],
      optionsTable: {
        headings: {
          stopword: "Words",
          action: "Action",
        },
        sortable: ["words", "action"],
        filterable: ["words"],
      },
      wordsInput: [
        {
          word: "",
          number: 1,
        },
      ],
      countWords: 1,
      idUpdate: "",
    };
  },

  mounted() {
    this.loadSinonim();
  },

  methods: {
    async loadSinonim() {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
      });
      const response = await axios.get(this.url + "SinonimController");
      this.dataSinonim = response.data;
      loader.hide();
    },

    addWord() {
      this.countWords = this.wordsInput.length;
      this.wordsInput.push({
        word: "",
        number: ++this.countWords,
      });
    },

    removeWord(index) {
      this.wordsInput.splice(index, 1);
      var newWords = [];
      var number = 1;
      this.wordsInput.forEach(function(val) {
        val.number = number;
        newWords.push(val);
        number++;
      });
      this.wordsInput = newWords;
    },

    btnTambah() {
      $("#btnUpdate").hide();
      this.clearForm();
    },

    clearForm() {
      this.wordsInput = [
        {
          word: "",
          number: 1,
        },
      ];
      this.countWords = 1;
    },

    newData() {
      $("#modalSinonim").modal("hide");
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
      });

      var dataInput = [];

      this.wordsInput.forEach(function(val) {
        dataInput.push(val.word);
      });

      dataInput = JSON.stringify(dataInput);

      const newComponent = new URLSearchParams();
      newComponent.append("words", dataInput);

      axios
        .post(this.url + "SinonimController/create", newComponent)
        .then((response) => {
          this.clearForm();
          this.loadSinonim();
          loader.hide();
          this.$swal({
            position: "top-end",
            type: "success",
            title: "Data created successful",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        });
    },

    editData(id, words) {
      this.idUpdate = id;
      $("#btnSave").hide();
      $("#btnUpdate").show();
      words = JSON.parse(words);
      var tempWordsInput = [];
      var count = 1;

      words.forEach(function(val) {
        tempWordsInput.push({
          word: val,
          number: count,
        });
        count++;
      });

      this.wordsInput = tempWordsInput;
      this.countWords = count;

      $("#modalSinonim").modal("show");
    },

    updateData() {
      $("#modalSinonim").modal("hide");
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
      });

      var dataInput = [];

      this.wordsInput.forEach(function(val) {
        dataInput.push(val.word);
      });

      dataInput = JSON.stringify(dataInput);

      const newComponent = new URLSearchParams();
      newComponent.append("words", dataInput);
      newComponent.append("id", this.idUpdate);

      axios
        .post(this.url + "SinonimController/update", newComponent)
        .then((response) => {
          this.clearForm();
          this.loadSinonim();
          loader.hide();
          this.$swal({
            position: "top-end",
            type: "success",
            title: "Data updated successful",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((e) => {
          /* eslint-disable no-console */
          console.log(e);
          /* eslint-enable no-console */
        });
    },

    destroy(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.deleteSinonim(id);
        }
      });
    },

    deleteSinonim(id) {
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: false,
      });

      const newComponent = new URLSearchParams();
      newComponent.append("id", id);

      axios
        .post(this.url + "SinonimController/delete", newComponent)
        .then((response) => {
          loader.hide();
          this.loadSinonim();
          this.$swal({
            position: "top-end",
            type: "success",
            title: "Data deleted successful",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>
