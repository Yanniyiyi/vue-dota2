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
        label="Hero"
        sortable="custom"
        width="250"
       >
        <template scope="scope">
          <div class="wrapper" style=" display: flex;
    align-items: center;">
             <img v-lazy="scope.row.hero_img" alt="" style="width:40%" >
             <span style="margin-left: 10px">{{ scope.row.hero_name }}</span>
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
        prop="win_rate"
        label="Win Rate"
        sortable="custom"
        >
         <template scope="scope">
             <span style="margin-left: 10px">{{ scope.row.win_rate + '%' }}</span>
        </template>
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
  name: 'heroes',
  created(){
    this.getHeroesData();
  },
  data () {
    return {  
      loading:true,
      dataCache:{},
      heroesData:[],
      heroes: this.$store.state.heroes,
      pageSize: 15,
      currentPage: 1,
    }
  },
  computed:{
    total(){
      return this.heroesData.length;
    },
    playerId(){
      return this.$store.state.playerId
    },
    tableData(){
      return this.heroesData.slice(this.startIndex,this.endIndex);
    },  
    startIndex(){
      return (this.currentPage - 1) * this.pageSize; 
    },
    endIndex(){
      return this.startIndex + this.pageSize;
    }
  },
  methods:{
    getHeroesData(){
      this.$axios.get('https://api.opendota.com/api/players/' + this.playerId + '/heroes').then((response) => {
          response.data.forEach((data) => {
            this.getHeroInfo(data);
            this.calculateWinRate(data);
          });
          this.heroesData = response.data;
          this.loading = false;
      });
    },
    getHeroInfo(data){
         let hero = this.heroes[data.hero_id];
         data.hero_name = hero.localized_name;
         data.hero_img = 'https://api.opendota.com' + hero.img;
    },
    calculateWinRate(data){
       data.win_rate = data.games == 0 ? 0 : ((data.win / data.games) * 100).toFixed(2);
       data.with_win_rate = data.with_games == 0 ? 0.00 : ((data.with_win / data.with_games) * 100) .toFixed(2);
       data.against_win_rate = data.against_games == 0 ? (0.00).toFixed(2) : ((data.against_win / data.against_games) * 100).toFixed(2);
    },
    handleSort( { column, prop, order }){
      if(order){
        let dataCopy = [].concat(this.heroesData);
        this.heroesData = this.dataCache[order] ? this.dataCache[order] : this.dataCache[order] =  [].concat(dataCopy.sort(this.createSortMethod(prop, order)));
      }else{
        this.heroesData = [].concat(this.dataCache['descending']);
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
    }
  }
}
</script>

<style scoped>
.wrapper{
   
}
img{
    width: 40%;
}
<style>
