<template>
  <div>

    <button v-on:click="tambah" class="btn btn-primary" data-toggle="modal" data-target="#modalStoplist"><font-awesome-icon icon="plus"/> Tambah</button><br><br>
    <v-client-table
        :data="dataStoplist"
        :columns="columns"
        :options="optionsTable">
        <!-- <a slot="action" :href="delete(props.row.id)" slot-scope="props">edit</a> -->
        <div slot="action" slot-scope="props">
            <button v-on:click="editData(props.row.id)" style="margin-left:5px" class="btn btn-md btn-warning btn-sm" data-toggle="modal" data-target="#modal-form"><font-awesome-icon icon="pen"/></button>
            <button v-on:click="destroy(props.row.id)" style="margin-left:5px" type="button" class="btn btn-danger btn-sm"><font-awesome-icon icon="trash"/></button>
        </div>

    </v-client-table>

    <div class="modal fade" id="modalStoplist" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Data Stoplist</h3>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="comment">Stoplist</label>
                            <input type="text" class="form-control" v-model="stoplist">
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
  name: 'Stoplist',
  data(){
      return {
        dataStoplist : [],
        url : 'https://loko-preprocessing.herokuapp.com/',
        columns: ['stopword', 'action'],
        optionsTable: {
            headings: {
                stopword: 'stopword',
                action: 'Action',
            },
            sortable: ['stopword', 'action'],
            filterable: ['stopword']
        },
        stoplist : '',
        selectedId: '',
      }
  },

  mounted(){
      this.loadStoplist()
      this.resetForm()
  },

  methods: {
      async loadStoplist(){
        let loader = this.$loading.show({

            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: false,

        });
        const response = await axios.get(this.url+'StoplistController')
        this.dataStoplist = response.data

        loader.hide()
      },

      newData(){
        $('#modalStoplist').modal('hide');
        let loader = this.$loading.show({

            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: false,

        });

        const newComponent = new URLSearchParams()
        newComponent.append('stopword', this.stoplist)

        axios.post(this.url+'StoplistController/create', newComponent)
        .then((response) => {
            this.resetForm()
            this.loadStoplist()
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
        this.stoplist = this.dataStoplist.find(x => x.id === id).stopword
        this.selectedId = id
        
        $('#modalStoplist').modal('show');
      },

      updateData(){
        $('#modalStoplist').modal('hide');
        let loader = this.$loading.show({

            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: false,

        });

        const newComponent = new URLSearchParams()
        newComponent.append('stopword', this.stoplist)
        newComponent.append('id', this.selectedId)

        axios.post(this.url+'StoplistController/update', newComponent)
        .then((response) => {
            this.loadStoplist()
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
            this.deleteStoplist(id)
            
        }
        })
      },

      deleteStoplist(id) {
        let loader = this.$loading.show({

            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: false,

        });

        axios.delete(this.url+'StoplistController/delete/' + id)
        .then(response => {
            loader.hide()
            this.loadStoplist()
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
        this.stoplist = ""
        $('#btnSave').show()
        $('#btnUpdate').hide()
      }
  }
  
}
</script>