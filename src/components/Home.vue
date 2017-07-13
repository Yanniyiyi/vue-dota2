<template>
    <section class="hero-container">
      <div class="hero-content">
        <h1>Speical Thanks to</h1>
        <a href="https://www.opendota.com/" class="btn" target="_blank"> OpenDota API</a>
      </div>
    </section>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      playerId : null
    }
  },
  methods:{
    searchById(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero-container{
  background-image:url("../assets/bg.jpg");
  height:calc(100% - 60px);
  width: 100%;
  background-size:cover;
  position:relative;
  align-items: center;
  font-size:  1.5rem;
}

.hero-content{
  position:absolute;
  left:5%;
  top:50%;
  transform: translateY(-50%);
  color:#FAB8B3;
  text-align: center;
  margin: 0 auto;
}

.btn{
  color:#FAB8B3;
  padding: 1rem 1.3rem;
  display: inline-block;
  border:5px solid #FAB8B3;
  background: transparent;
  text-decoration: none;
  transition: all 0.3s;
}

.btn:hover{
  background-color: rgba(255,255,255,0.2);
}</style>
