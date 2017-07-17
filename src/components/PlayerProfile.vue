<template>
  <div>
  <div v-loading.body.lock="fullscreenLoading" v-if='fullscreenLoading' style="height:100%"></div>  
  <div class="component-container" v-if="playerAccount && playerWL && recentMatches">
    <el-row>
      <el-col :span="4">
        <div class="avatar-container">
           <img :src="playerAccount.profile.avatarfull" alt="">
        </div>
      </el-col>
      <el-col :span="20">
        <div class="name">
          <h1 id="playerName">{{ playerAccount.profile.personaname }}</h1>
          <a :href="playerAccount.profile.profileurl" target="_blank">Steam Profile Link</a>
        </div>
        <div class="profile-wrapper">
          <div class="profile">
            <div class="summary-data">
              <span>Win</span>
              <span class="success">{{ playerWL.win}}</span>
            </div>
            <div class="summary-data">
              <span>Lose</span>
              <span class="success">{{ playerWL.lose}}</span>
            </div>
            <div class="summary-data">
              <span>Matches</span>
              <span class="success">{{ totalMatches }}</span>
            </div>
            <div class="summary-data">
              <span>WinRate</span>
              <span class="success">{{ winRate }}</span>
            </div>
            <div class="summary-data">
              <span>Esimated MMR</span>
              <span class="success">{{ playerAccount.mmr_estimate.estimate}}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row >
    <el-col :xs="24" :sm="24" :md="24" :lg="24"><div>
      <div><h3><i class="el-icon-caret-right"></i> Averages/Maximums<span> in last 20 matches</span></h3></div>
      <div class="summary-data" v-for="(item, key) in highestInfo">
        <span>Average {{ key.toUpperCase() }}</span>
        <span>{{ averageInfo[key] }}</span>
        <span>Highest {{ key.toUpperCase() }}</span>
        <div class="range">
           <span class="success">{{ item.number + " ( +" + (item.number - averageInfo[key]) + " )"}}</span>
           <span><img :src="item.hero.icons.hero_sm_icon" alt=""></span>
        </div>
       
      </div>
    </div>
    </el-col>
  </el-row>
  <el-row>
  <el-col :span="24">
      <el-tabs value="first">
        <el-tab-pane label="Overview" name="first">
          <keep-alive>
             <Overview></Overview>
          </keep-alive> 
        </el-tab-pane>
        <el-tab-pane label="Heros" name="second">
          <keep-alive>
             <Heroes></Heroes>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="Totals" name="third">
          <keep-alive>
             <Totals></Totals>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="Peers" name="fourth">
          <keep-alive>
             <Peers></Peers>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
  </el-col>
</el-row>

</div>
  </div>
  
</template>

<script>
import Overview from './Overview'
import Totals from './Totals'
import Heroes from './Heroes'
import Peers from './Peers'

export default {
  name: 'PlayerProfile',
  components:{
    'Overview':Overview,
    'Totals':Totals,
    'Heroes':Heroes,
    'Peers':Peers
  },
  created(){
    this.getPlayerProfile();
  },
  watch:{
    '$route':'getPlayerProfile'
  },
  data () {
    return {
        gameMode:[
          'Unknow','All pick','Captains mode','Random draft','Single draft',
          'All random','Intro','The Diretide',' Reverse captains mode','Greeviling',
          'Tutorial','Mid only','Least played','New player pool','Compendium matchmaking',
          'Custom','Captains draft','Balanced draft','Ability draft','Event','All random death match',
          '1 vs. 1 solo mid','Ranked all pick'
        ],
        laneName:[null,'Safe','Mid','Off'],
        heroes: this.$store.state.heroes,
        fullscreenLoading:true,
        playerAccount: null,
        playerWL: null,
        recentMatches:null,
        highestInfo: {
          assists: {
            number: 0,
            hero: ''
          },
          kills: {
            number: 0,
            hero: ''
          },
          deaths:{
            number: 0,
            hero: ''
          },
          gpm:{
            number: 0,
            hero: ''
          },
          xpm:{
            number: 0,
            hero: ''
          },
          lh:{
            number: 0,
            hero: ''
          },
          hd:{
            number: 0,
            hero: ''
          },
          hh:{
            number: 0,
            hero: ''
          },
          td:{
            number: 0,
            hero: ''
          }
        },
        
    }
  },
  computed:{
    accountId(){
      return this.$route.params.accountId;
    },
    totalMatches(){
      return this.playerWL.win + this.playerWL.lose;
    },
    winRate(){
      return ((this.playerWL.win / this.totalMatches) * 100).toFixed(2) + "%";
    },
    averageInfo(){
      this.resetHighestInfo();
      let totalAssists = 0;
      let totalKills = 0;
      let totalDeaths = 0;
      let totalGPM = 0;
      let totalXPM = 0;
      let totalHd = 0;
      let totalTd = 0;
      let totalHh = 0;
      let totalLh = 0;
      this.recentMatches.forEach((match) => {
         let assists = match.assists;
         let kills = match.kills;
         let deaths = match.deaths;
         let gpm = match.gold_per_min;
         let xpm = match.xp_per_min;
         let hd = match.hero_damage;
         let td = match.tower_damage;
         let hh = match.hero_healing;
         let lh = match.last_hits;     

         if(assists > this.highestInfo.assists.number){
          this.highestInfo.assists.number = assists;
          this.highestInfo.assists.hero = match.hero;
         }

         if(kills > this.highestInfo.kills.number){
          this.highestInfo.kills.number = kills;
          this.highestInfo.kills.hero = match.hero;
         }

         if(deaths > this.highestInfo.deaths.number){
          this.highestInfo.deaths.number = deaths;
          this.highestInfo.deaths.hero = match.hero;
         }

         if(gpm > this.highestInfo.gpm.number){
          this.highestInfo.gpm.number = gpm;
          this.highestInfo.gpm.hero = match.hero;
         }

         if(xpm > this.highestInfo.xpm.number){
          this.highestInfo.xpm.number = xpm;
          this.highestInfo.xpm.hero = match.hero;
         }

         if(hd > this.highestInfo.hd.number){
          this.highestInfo.hd.number = hd;
          this.highestInfo.hd.hero = match.hero;
         }

         if(td > this.highestInfo.td.number){
          this.highestInfo.td.number = td;
          this.highestInfo.td.hero = match.hero;
         }

         if(hh > this.highestInfo.hh.number){
          this.highestInfo.hh.number = hh;
          this.highestInfo.hh.hero = match.hero;
         }

         if(lh > this.highestInfo.lh.number){
          this.highestInfo.lh.number = lh;
          this.highestInfo.lh.hero = match.hero;
         }
         totalAssists += assists;
         totalKills += kills;
         totalDeaths += deaths;
         totalLh += lh;
         totalTd += td;
         totalHd += hd;
         totalXPM += xpm;
         totalGPM += gpm;
         totalHh += hh;
      });
      return {
        assists : Math.round(totalAssists/20),
        kills: Math.round(totalKills/20),
        deaths: Math.round(totalDeaths/20),
        xpm : Math.round(totalXPM/20),
        gpm: Math.round(totalGPM/20),
        lh : Math.round(totalLh/20),
        td: Math.round(totalTd/20),
        hd : Math.round(totalHd/20),
        hh : Math.round(totalHh/20)
      }
    },
  },
  methods:{
    resetHighestInfo(){
      this.highestInfo = null;
      this.highestInfo = {
          assists: {
            number: 0,
            hero: ''
          },
          kills: {
            number: 0,
            hero: ''
          },
          deaths:{
            number: 0,
            hero: ''
          },
          gpm:{
            number: 0,
            hero: ''
          },
          xpm:{
            number: 0,
            hero: ''
          },
          lh:{
            number: 0,
            hero: ''
          },
          hd:{
            number: 0,
            hero: ''
          },
          hh:{
            number: 0,
            hero: ''
          },
          td:{
            number: 0,
            hero: ''
          }
        }
    },
    getPlayerAccount(){
      return this.$axios.get('https://api.opendota.com/api/players/' + this.accountId);
    },
    getPlayerWinLose(){
      return this.$axios.get('https://api.opendota.com/api/players/' + this.accountId + '/wl');
    },
    getRecentMatches(){
      return this.$axios.get('https://api.opendota.com/api/players/' + this.accountId + '/recentMatches')
    },
    formatMatchesData(matches){  
       matches.forEach((match) => {
          match.hero = this.findHeroById(match.hero_id);
          match.hero.icons = this.generateHeroIconsUrl(match.hero);
          match.player_team = this.generatePlayerTeam(match.player_slot);
          match.player_result = this.generatePlayerResult(match.player_slot,match.radiant_win);
          match.skill_level = this.generateSkillLevel(match.skill);
          match.formatted_duration =  this.generateDurationTime(match.duration);
          match.started_date = this.generateStartedTime(match.start_time);
          match.game_mode = this.generateGameMode(match.game_mode);
          match.lane_name = this.generateLaneName(match.lane_role);
       });
       return matches;
    },
    findHeroById(heroId){
        return this.heroes[heroId];
    },
    generateHeroIconsUrl(hero){
      let icon_url = 'https://api.opendota.com';
      return { hero_sm_icon: icon_url + hero.icon,
      hero_full_icon: icon_url + hero.img }
    },
    generatePlayerTeam(playerSlot){
      return playerSlot >= 128 ? 'Dire' : 'Radiant';
    },
    generatePlayerResult(playerSlot,radiantWin){
      return playerSlot >= 128 ? !radiantWin : radiantWin;
    },
    generateSkillLevel(skill){
        switch(skill){
          case 1:
          return 'Normal Skill';
          break;
          case 2:
          return 'High Skill';
          break;
          case 3:
          return 'Very High Skill';
          break;
          default:
          return '';
        }
    },
    generateDurationTime(seconds)
    {   
      // Hours, minutes and seconds
      let hrs = ~~(seconds / 3600);
      let mins = ~~((seconds % 3600) / 60);
      let secs = seconds % 60;
      // Output like "1:01" or "4:03:59" or "123:03:59"
      let ret = "";
      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    },
    generateStartedTime(seconds){
      return (new Date(seconds * 1000)).toISOString().slice(0,10).replace(/T|Z/g," ");
    },
    generateGameMode(gamemode){
      let mode = this.gameMode[gamemode];
      return mode ? mode : 'Unknown';
    },
    generateLaneName(laneRole){
      let name = this.laneName[laneRole];
      return name ? name : this.laneName[0];
    },
    getPlayerProfile(){
      this.dispatchPlayerId(this.accountId);
      this.$axios.all([this.getPlayerAccount(), this.getPlayerWinLose(),
       this.getRecentMatches()]).then(this.$axios.spread(
        (accountResponse, wlResponse, recentMatchesResponse, peersDataResponse) =>{

          this.playerAccount = accountResponse.data;

          this.playerWL = wlResponse.data;

          this.recentMatches = this.formatMatchesData(recentMatchesResponse.data);

          this.dispatchRecentMatchesData(this.recentMatches);



          this.fullscreenLoading = false;
        }));
    },
    dispatchRecentMatchesData(data){
        this.$store.dispatch('setRecentMatechesData',data);
    },
    dispatchPlayerId(accountId){
        this.$store.dispatch('setPlayerId',accountId);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .success{
    color:#13CE66;
  }
  

  .summary-data{
    display: inline-block;
  }

  .summary-data span{
    display: block;
    margin-bottom: 0.2rem;
    margin-right: 1.8rem;
    text-align: center;
  }
  .range{
    display: flex;
    align-items: center;
    justify-content: center;  
  }

  .range span{
    margin-right: 0;
  }

  .range span img{
    width: 1.5rem;
  }

  .profile-wrapper{
    height: 100%;
  }

  .profile{
    position:absolute;
    bottom: 1.3rem;
    font-weight: bold;
  }

  #playerName {
    font-size: 1.5rem;
  }

</style>
