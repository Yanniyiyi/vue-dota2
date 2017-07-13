<template>
  <div class="component-container">
    <el-row>
      <el-col :span="24">
        <div><h3><i class="el-icon-caret-right"></i> In All Matches</h3></div>
        <div class="summary-data" v-for="(item, key) in totals">
        <span>{{ key.toUpperCase().replace(/_/g,' ') }}</span>
        <span class="success">{{ item }}</span>
      </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    created(){
      this.getTotals();
    },
    data() {
      return {
        attrs:[
          'kills','deaths','assists','last_hits','denies','duration','level',
          'hero_damage','tower_damage','hero_healing','stuns','tower_kills','neutral_kills',
          'courier_kills','purchase_tpscroll','purchase_ward_observer','purchase_ward_sentry',
          'purchase_gem','purchase_rapier','pings'
        ],
        totals: null,
      }
    },
    methods:{
      getTotals(){
        this.$axios.get('https://api.opendota.com/api/players/' + this.$store.state.playerId + '/totals').then((response) => {
            this.totals = this.formatTotalsData(response.data);
        });
      },
      formatTotalsData(data){
        let totals = this.convertToTotalDataToObj(data);
        totals.duration = this.formatDuration(totals.duration);
        return totals;
      },
      formatDuration(seconds){
        let days = Math.floor(seconds / (3600*24));
        seconds = Math.floor(seconds % (3600*24));
        let hrs = Math.floor(seconds / 3600);
        seconds = Math.floor(seconds % 3600);
        let mins  =  Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return days+"d "+hrs+'h '+mins+'m '+seconds + "s ";
      },
      convertToTotalDataToObj(data){
        let totals = {};
        data.forEach((item) => {
          if(this.attrs.indexOf(item.field) > -1){
            if(item.field === 'pings')
            item.field = 'map_pings'
            totals[item.field] = Math.round(item.sum);
          } 
        });
        return totals;
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
  .summary-data{
    display: inline-block;
    margin:1em;
  }

  .success{
    color:#13CE66;
  }

  .summary-data span{
    font-weight: bold;
    display: block;
    margin-bottom: 0.2rem;
    margin-right: 1.8rem;
    text-align: left;
  }
</style>

