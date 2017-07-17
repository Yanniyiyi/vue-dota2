<template>
  <div class="component-container">
    <div class="block" v-if="total > pageSize">
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
      @sort-change="handleSort"
      >
      <el-table-column
        prop="personaname"
        label="PLAYER"
        sortable="custom"
        width="250"
       >
        <template scope="scope">
          <div class="wrapper" style=" display: flex;
    align-items: center;">
             <img v-lazy="scope.row.avatar" alt="" style="height:29px; box-shadow: 0 0 5px rgba(0, 0, 0, .4);
    margin-left:0 auto;" >
    <a  @click.prevent="viewUser(scope.row.account_id)" style="margin-left: 10px; color:#6BF; text-decoration:none"> {{ scope.row.personaname }}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="games"
        label="MP"
        sortable="custom"
        width="100"
        >
      </el-table-column>
       <el-table-column
        prop="with_games"
        label="With"
        width="150"
        sortable="custom"
        >
      </el-table-column>
       <el-table-column
        label="With Win Rate"
        sortable="custom"
        >
        <template scope="scope">
             <span style="margin-left: 10px">{{ scope.row.with_win_rate + '%' }}</span>
        </template>
      </el-table-column>
       <el-table-column
        prop="against_games"
        label="Against"
        width="150"
        sortable="custom"
        >
      </el-table-column>
       <el-table-column
        prop="against_win_rate"
        label="Against Win Rate"
        sortable="custom"
        >
        <template scope="scope">
             <span style="margin-left: 10px">{{ scope.row.against_win_rate + '%'  }}</span>
        </template>
      </el-table-column>
     <!--  <el-table-column
        prop="against_win_rate"
        label="Against Win Rate"
        sortable="custom"
        >
        <template scope="scope">
             <span style="margin-left: 10px">{{ scope.row.against_win_rate + '%'  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="against_win_rate"
        label="Against Win Rate"
        sortable="custom"
        >
        <template scope="scope">
             <span style="margin-left: 10px">{{ scope.row.against_win_rate + '%'  }}</span>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="block" v-if="total > pageSize">
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
  name: 'Peers',
  created(){
    this.getPeersData();
  },
  watch:{
    '$route':'getPeersData'
  },
  data () {
    return {
      loading: true,
      peers : [],
      dataCache:{},
      pageSize: 15,
      currentPage: 1
    }
  },
  computed:{
    accountId(){
      return this.$route.params.accountId;
    },
    total(){
      return this.peers.length;
    },
    tableData(){
      return this.peers.slice(this.startIndex,this.endIndex);
    },  
    startIndex(){
      return (this.currentPage - 1) * this.pageSize; 
    },
    endIndex(){
      return this.startIndex + this.pageSize;
    }
  },
  methods:{
    resetDataCache(){
      this.dataCache = {};
    },
    getPeersData(){
      this.resetDataCache();
      this.$axios.get('https://api.opendota.com/api/players/' + this.accountId  + '/peers').then( (response) => {
          response.data.forEach((data) => {
            this.calculateWinRate(data);
          });
        this.peers = response.data;
        this.loading = false;
      });
    },
    calculateWinRate(data){
       data.with_win_rate = data.with_games == 0 ? 0.00 : ((data.with_win / data.with_games) * 100) .toFixed(2);
        data.against_win_rate = data.against_games == 0 ? (0.00).toFixed(2) : ((data.against_win / data.against_games) * 100).toFixed(2);
    },
    handleSort( { column, prop, order }){
      if(order){
        this.peers = this.dataCache[order] ? this.dataCache[order] : this.dataCache[order] = this.peers.slice().sort(this.createSortMethod(prop, order));
      }else{
        this.peers = this.dataCache['descending'];
      }
    },
    createSortMethod(prop,order){
      if(order == 'descending'){
        return function(a,b){
          return b[prop] - a[prop];
        };
      }else{
        return function(a,b){
          return a[prop] - b[prop];
        };
      }
    },
    viewUser(accountId){
      this.$router.push({name:'PlayerProfile', params:{'accountId': accountId}});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
