<template>
  <div id="navbar">
    <el-menu theme="dark" :default-active="activeIndex"  class="el-menu-demo"  mode="horizontal">
      <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
      <el-menu-item index="2">
        <el-input
          placeholder="Your dota2 player id"
          icon="search"
          v-model="keyword"
          :on-icon-click="setSearchKeyWord">
        </el-input>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  created(){
    this.keyword = this.$store.state.searchKeyWord;
  },
  data(){
    return {
      activeIndex: '1',
      keyword: ''
    }
  },
  methods:{
    setSearchKeyWord(){
      this.$store.dispatch('setSearchKeyWord',this.keyword);
      this.$router.push('SearchResult');
    }
  }
}
</script>
<style scoped>
  
</style>

