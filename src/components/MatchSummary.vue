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
  props:['matchSummary'],
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
<style>
