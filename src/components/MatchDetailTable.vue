<template>
    <div>
    <el-table
    :data="players"
    border
    fit
    style="width: 100%">
    <el-table-column
      label="PLAYER"
      fixed
      width="300"
      >
      <template scope="scope">
        <div class="wrapper" style="display:flex;align-items: center;">
          <img :src="getHeroImgById(scope.row.hero_id)" alt="" style="width:40%">
          <span style="margin-left: 10px">{{ scope.row.personaname ? scope.row.personaname : 'Anonymous' }}</span>
        </div>
        </template>
    </el-table-column>
     <el-table-column
      label="LVL"
      width="100"
      sortable
      prop='level'>
    </el-table-column>
     <el-table-column
      label="K"
      width="100"
      sortable
      prop='kills'>
    </el-table-column>
     <el-table-column
      label="D"
      width="100"
      sortable
      prop='deaths'>

    </el-table-column>
     <el-table-column
      label="A"
      width="100"
      sortable
      prop='assists'>

    </el-table-column>
     <el-table-column
      label="GPM"
      width="100"
      sortable
      prop='gold_per_min'>
    </el-table-column>
    <el-table-column
      label="XPM"
      width="100"
      sortable
       prop='xp_per_min'>
    </el-table-column>
    <el-table-column
      label="LH"
      width="100"
      sortable
      prop='last_hits'>
    </el-table-column>
     <el-table-column
      label="DN"
      width="100"
      sortable
      prop='denies'>
    </el-table-column>
     <el-table-column
      label="HD"
     width="100"
     sortable
     prop='hero_damage' >
      <template scope="scope">
          <span>{{(scope.row.hero_damage / 1000).toFixed(1) + 'k'}}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="HH"
       width="100"
       sortable
       prop='hero_healing'>
      <template scope="scope">
          <span >{{scope.row.hero_healing == 0 ? '-' : scope.row.hero_healing }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="TD"
      width="100"
      sortable
      prop="tower_damage">
      
    </el-table-column>
    <el-table-column
      label="G"
      width="100"
      prop="total_gold"
      sortable
     >
     <template scope="scope">
          <span >{{(scope.row.total_gold / 1000).toFixed(1) + 'k'}}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="ITEMS"
      width="600">
      <template scope="scope">
      <div style="display:flex;align-items: center;">
         <div v-for="i in 6">
           <el-tooltip effect="dark" placement="left">
            <div slot="content">
              <ItemTooltip :item ="scope.row['item_' + (i - 1)]"></ItemTooltip>
            </div>
            <img v-if="scope.row['item_' + (i - 1)]" v-lazy="'https://api.opendota.com' + scope.row['item_' + (i - 1)].img" alt="scope.row['item_' + (i - 1)].img" style="width:70%"/>
           </el-tooltip>
         </div>       
      </div>      
      </template>
    </el-table-column>
    
  </el-table>
  </div>
</template>

<script>
import ItemTooltip from './ItemTooltip'
export default {
  name: 'matchdetailtable',
  props:['players'],
  components:{
    'ItemTooltip': ItemTooltip
  },
  data () {
    return {
        heroes: this.$store.state.heroes,
        items: this.$store.state.items,
        itemids: this.$store.state.itemids
      }
  },
  computed:{
    // players(){
    //   return this.isRadiant ? this.$store.state.matchCache[this.matchId].radiantPlayers : this.$store.state.matchCache[this.matchId].direPlayers
    // }
  },
  methods:{
    getHeroImgById(heroId){
      return 'https://api.opendota.com' + this.heroes[heroId].img
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper{
    display: flex ;
    align-items: center;
  }
  .wrapper img{
    width: 70%;
  }
<style>
