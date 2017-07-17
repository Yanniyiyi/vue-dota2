<template>
  <div class="component-container">
    <div class="block" v-if="searchResult.length > pageSize">
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
    <el-table
      id= "result-table"
      :data="tableData"
      border
      v-loading="loading"
      element-loading-text="Loading...."
      style="width: 100%"
      
      >
      <el-table-column
        prop="personaname"
        label="Name"
        sortable
       >
        <template scope="scope">
          <div class="search-result-wrapper">
             <img v-lazy="scope.row.avatarfull" alt="" >
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
          @click.native.prevent="viewUserProfile(scope.$index, tableData)"
          type="text"
          size="small">
          View
        </el-button>
      </template>
    </el-table-column>
    </el-table>
 <div class="block" v-if="searchResult.length > pageSize">
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
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
      currentPage: 1,
      searchResult:[],
      sortedResult:[],
      loading:false,
      total:0,
      pageSize:15
    }
  },
  computed:{
    tableData(){
      return this.searchResult.slice(this.startIndex,this.endIndex);
    },  
    startIndex(){
      return (this.currentPage - 1) * this.pageSize; 
    },
    endIndex(){
      return this.startIndex + this.pageSize;
    },
    keyword(){
      return this.$route.params.keyword;
    }
  },
  methods:{
    search(){
      this.loading = true;
      this.$store.dispatch('setSearchKeyWord',this.keyword);
      if(this.keyword){
         this.$axios.get('https://api.opendota.com/api/search?q='+this.keyword).then((response) => {
          this.searchResult = response.data;
          // this.sortedResult = this.searchResult
          this.total = this.searchResult.length;
          this.loading = false;
        });
      }
    },
    viewUserProfile(index, result){
      this.$store.dispatch('setPlayerId',result[index].account_id);
      this.$router.push({name:'PlayerProfile', params:{'accountId': result[index].account_id}});
    },
    // handleSortChange({column, prop, order}){
    //   if(column && prop && order){
    //     this.sortedResult = this.searchResult;
    //   }
    //   this.sortedResult.sort(this.createCompareMethod(prop,order));
    // },
    // createCompareMethod(prop,order){
    //   if(order === "descending"){
    //     return function(a,b){
    //       b[prop] - a[prop];
    //     };
    //   }else{
    //     return function(a,b){
    //       a[prop] - b[prop];
    //     };
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #result-table{
    text-align: left;
  }
  .search-result-wrapper{
    display: flex;
    align-items: center;
  }
  .search-result-wrapper img{
    height: 29px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .4);
    margin-left:0 auto;
  }
</style>
