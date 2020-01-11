<template>
  <div class="faq">
    <button v-on:click="tambah" class="btn btn-primary" data-toggle="modal" data-target="#myModal"><font-awesome-icon icon="plus"/> Tambah</button><br><br>
    <v-client-table
        :data="dataFaq"
        :columns="columns"
        :options="optionsTable">
        <!-- <a slot="action" :href="delete(props.row.id)" slot-scope="props">edit</a> -->
        <div slot="action" slot-scope="props">
            <button v-on:click="editData(props.row.id)" style="margin-left:5px" class="btn btn-md btn-warning btn-sm" data-toggle="modal" data-target="#modal-form"><font-awesome-icon icon="pen"/></button>
            <button v-on:click="destroy(props.row.id)" style="margin-left:5px" type="button" class="btn btn-danger btn-sm"><font-awesome-icon icon="trash"/></button>
        </div>

    </v-client-table>

    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Data FAQ</h3>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="comment">Pertanyaan</label>
                            <textarea class="form-control" rows="3" v-model="pertanyaan"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="comment">Jawaban</label>
                            <textarea class="form-control" rows="3" v-model="jawaban"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="btnSave" type="button" class="btn btn-primary" v-on:click="newData()">Save</button>
                    <button id="btnUpdate" type="button" class="btn btn-primary" v-on:click="updateData()">Update</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>
import axios from 'axios'
// import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'Faq',
  data(){
      return {
        dataFaq : [],
        url : 'https://loko-main-proccess.herokuapp.com/',
        columns: ['pertanyaan', 'hasil_pertanyaan', 'jawaban', 'action'],
        optionsTable: {
            headings: {
                name: 'Pertanyaan',
                variable_name: 'Hasil Pertanyaan',
                html_basic: 'jawaban',
                action: 'Action',
            },
            sortable: ['jawaban', 'pertanyaan', 'hasil_pertanyaan', 'action'],
            filterable: ['pertanyaan', 'hasil_pertanyaan','jawaban']
        },
        pertanyaan : '',
        jawaban : '',
        selectedId: '',
      }
  },

  mounted(){
      this.loadFaq()
      this.resetForm()
  },

  methods: {
      async loadFaq(){
        let loader = this.$loading.show({

            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: false,

        });
        const response = await axios.get(this.url+'FaqController')
        this.dataFaq = response.data

        loader.hide()
      },

      newData(){
        $('#myModal').modal('hide');
        let loader = this.$loading.show({

            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: false,

        });

        const newComponent = new URLSearchParams()
        newComponent.append('pertanyaan', this.pertanyaan)
        newComponent.append('jawaban', this.jawaban)

        axios.post(this.url+'FaqController/create', newComponent)
        .then((response) => {
            this.resetForm()
            this.loadFaq()
            loader.hide()
            this.$swal({
                position: 'top-end',
                type: 'success',
                title: 'Data created successful',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch((e) => {
            /* eslint-disable no-console */
            console.log(e)
            /* eslint-enable no-console */
        })
      },

      tambah(){
        this.resetForm()
      },

      editData(id){
        $('#btnSave').hide()
        $('#btnUpdate').show()
        this.pertanyaan = this.dataFaq.find(x => x.id === id).pertanyaan
        this.jawaban = this.dataFaq.find(x => x.id === id).jawaban
        this.selectedId = id
        
        $('#myModal').modal('show');
      },

      updateData(){
        $('#myModal').modal('hide');
        let loader = this.$loading.show({

            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: false,

        });

        const newComponent = new URLSearchParams()
        newComponent.append('pertanyaan', this.pertanyaan)
        newComponent.append('jawaban', this.jawaban)
        newComponent.append('id', this.selectedId)

        axios.post(this.url+'FaqController/update', newComponent)
        .then((response) => {
            this.loadFaq()
            this.resetForm()
            loader.hide()
            this.$swal({
                position: 'top-end',
                type: 'success',
                title: 'Data updated successful',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch((e) => {
            /* eslint-disable no-console */
            console.log(e)
            /* eslint-enable no-console */
        })

      },

      destroy(id){
          this.$swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {

            if (result.value) {
              this.deleteComponent(id)
              
            }
          })
      },

      deleteComponent(id) {
        let loader = this.$loading.show({

            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: false,

        });

        axios.delete(this.url+'FaqController/delete/' + id)
        .then(response => {
            loader.hide()
            this.loadFaq()
            this.$swal({
                position: 'top-end',
                type: 'success',
                title: 'Data deleted successful',
                showConfirmButton: false,
                timer: 1500
            })
        })
      },

      resetForm(){
        this.pertanyaan = ""
        this.jawaban = ""
        $('#btnSave').show()
        $('#btnUpdate').hide()
      }
  }
  
}
</script>