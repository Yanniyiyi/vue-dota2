<template>
  <div class="component-container">
    <el-table
      id= "result-table"
      :data="searchResult"
      border
      v-loading="loading"
      element-loading-text="Loading...."
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="personaname"
        label="Name"
        sortable
       >
        <template scope="scope">
          <div class="wrapper">
             <img :src="scope.row.avatarfull" alt="">
             <span style="margin-left: 10px">{{ scope.row.personaname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="last_match_time"
        label="Last match time"
        sortable
        >
        <template scope="scope">
          {{ scope.row.last_match_time ? (scope.row.last_match_time).slice(0,-5).replace(/T|Z/g,' ') : ''}}
        </template>
      </el-table-column>
      <el-table-column>
      <template scope="scope">
        <el-button
          @click.native.prevent="viewUserProfile(scope.$index, searchResult)"
          type="text"
          size="small">
          View
        </el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'searchResult',
  created(){
    this.search();
  },
  watch:{
    'keyword':'search'
  },
  data(){
    return {
      searchResult:[],
      loading:false
    }
  },
  computed:{
    keyword(){
      return this.$store.state.searchKeyWord;
    }
  },
  methods:{
    search(){
      this.loading = true;
      if(this.keyword){
         this.$axios.get('https://api.opendota.com/api/search?q='+this.$store.state.searchKeyWord).then((response) => {
          this.searchResult = response.data;
          this.loading = false;
        });
      }
    },
    viewUserProfile(index, result){
      this.$store.dispatch('setPlayerId',result[index].account_id);
      this.$router.push('PlayerProfile');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #result-table{
    text-align: left;
  }
  .wrapper{
    display: flex;
    align-items: center;
  }
  img{
    height: 29px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .4);
    margin-left:0 auto;
  }
</style>
