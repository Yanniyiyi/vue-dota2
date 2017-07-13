<template>
  <div id="app">
    <Navbar></Navbar>  
    <router-view></router-view>    
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'app',
  components:{
    'Navbar':Navbar
  },
  created(){
    this.$store.dispatch('getAllHeroesInfo');
  },
  data(){
    return {
      
    }
  },
  methods:{

  }
}
</script>

<style>
html,body{
  margin:0;
  background-color: #272839;
  color:#fff;
  height:100%;
}

a, a:hover, a:visited{
  color:#fff;
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%;
}

.component-container{
  padding:1rem;
}
</style>
