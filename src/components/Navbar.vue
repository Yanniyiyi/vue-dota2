<template>
  <div id="navbar">
    <el-menu theme="dark" :default-active="activeIndex"  class="el-menu-demo"  mode="horizontal">
      <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
      <el-menu-item index="2">
        <el-input
          placeholder="Your dota2 player id"
          icon="search"
          v-model="search"
          :on-icon-click="setSearchKeyWord">
        </el-input>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data(){
    return {
      activeIndex: '1',
      search:this.keyword
    }
  },
  computed:{
    keyword(){
      return this.$store.state.searchKeyWord;
    }
  },
  methods:{
    setSearchKeyWord(){
      this.$store.dispatch('setSearchKeyWord',this.search);
      //this.$router.push('SearchResult');
      //{ name: 'user', params: { userId: 123 }}
      this.$router.push({ name: 'Search', params:{keyword: this.search}});
    }
  }
}
</script>
<style scoped>
  
</style>

