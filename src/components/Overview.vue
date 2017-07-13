<template>
  <div>
    <el-table
    :data="recentMatches"
    style="width: 100%">
    <el-table-column type="expand" >
      <template scope="scope">
        <div style="background-color:#272839">
           <Match :match-id="scope.row.match_id"></Match> 
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="Hero"
    >
      <template scope="scope">
        <div class="wrapper">
          <img :src="scope.row.hero.icons.hero_full_icon" alt="">
          <p style="margin-left: 5px">{{ scope.row.hero.localized_name }}<br/>
          {{scope.row.player_team}} {{ scope.row.is_roaming ? ' / Roaming' : (scope.row.lane_name ? ' / ' + scope.row.lane_name : '') }}</p>
        </div> 
      </template>
    </el-table-column>
    <el-table-column
      label="MATCH"
      prop="match_id"
      sortable
      >
      <template scope="scope">
        <div class="wrapper">
          <p >{{ scope.row.match_id }}<br/>
          {{ scope.row.game_mode }}</p>
        </div> 
      </template>
    </el-table-column>
    <el-table-column
      label="RESULT"
      >
      <template scope="scope">
        <div class="wrapper">
          <p>{{ scope.row.player_result ? 'Win' : 'Loss' }}<br/>
          {{ scope.row.skill_level }}</p>
        </div> 
      </template>
    </el-table-column>
    <el-table-column
      label="DURATION"
      prop="duration"
      sortable
     >
     <template scope="scope">
        <div class="wrapper">
          <p>{{ scope.row.formatted_duration}}<br/>
          {{ scope.row.started_date }}</p>
        </div> 
      </template>
    </el-table-column>
     <el-table-column
      label="KILLS"
      prop="kills"
      width="100"
      sortable
     >
     
    </el-table-column>
     <el-table-column
      label="DEATHS"
      prop="deaths"
      width="120"
      sortable
     >
     
    </el-table-column>
     <el-table-column
      label="ASSISTS"
      prop="assists"
      width="120"
      sortable
     >
     
    </el-table-column>

  </el-table>
  </div>
</template>

<script>
import Match from './Match'
export default {
    components:{
      'Match':Match
    },
    data() {
      return {

      }
    },
    computed:{
      recentMatches(){
        return this.$store.state.recentMatches;
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    display: flex;
    align-items: center;
  }
  img{
    width: 40%;
  }
</style>

