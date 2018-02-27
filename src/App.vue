<template>
  <div id="app">
    <IntroForm ></IntroForm>
    <AppInside ></AppInside>
  </div>
</template>

<script>

import IntroForm from './components/IntroForm'
import AppInside from './components/AppInside'

export default {
  name: 'app',
  computed: {

  },
  components: {
    IntroForm,
    AppInside
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
