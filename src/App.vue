<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg" style="margin-top:-4.5%">
      <a class="navbar-brand" href="#">Admin Loko</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/" style="color:white">Home</router-link>
          <router-link class="nav-link" to="/faq" style="color:white">FAQ</router-link>
          <router-link class="nav-link" to="/stoplist" style="color:white">Stoplist</router-link>
          <router-link class="nav-link" to="/sinonim" style="color:white">Sinonim</router-link>
        </div>
      </div>
    </nav>
    <br><br>
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
