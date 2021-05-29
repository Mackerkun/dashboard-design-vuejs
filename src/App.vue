<template>
  <div id="app">
    <header>
      <Navbar />
    </header>
    <Sidenav />
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  import Sidenav from '@/components/Sidenav.vue'

  export default {
    name: 'App',
    components: {
      Navbar,
      Sidenav
    }
  }
</script>

<style>
  #app {
    font-family: 'Poppins', sans-serif;
  }

  header, main, footer {
    padding-left: 0;
  }

  @media only screen and (min-width: 600px) {
    header, main, footer {
      padding-left: 50px;
    }
  }
</style>
