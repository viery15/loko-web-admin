<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
  margin-top: 60px;
}

#VueTables_th--pertanyaan {
    width : 30%;
}

#VueTables_th--hasil_pertanyaan {
    width : 20%;
}

#VueTables_th--jawaban {
    width : 40%;
}

#VueTables_th--action {
    width : 10%;
}

</style>
