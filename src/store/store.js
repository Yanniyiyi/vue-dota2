import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import itemids from '../itemids.json'
import items from '../items.json'
import heroes from '../heroes.json'

Vue.use(Vuex)


export default new Vuex.Store({
	state:{
		heroes:heroes,
		items: items,
		itemids: itemids,
		playerId:null,
		searchKeyWord: '147428472',
		searchResult: null,
		heroesInfo: [],
		recentMatches:[],
		radiantPlayers:[],
		direPlayers:[],
		expandedMatchId:0
	},
	mutations:{
		SET_SEARCH_KEYWORD(state, keyword){
			state.searchKeyWord = keyword;
		},
		SET_PLAYER_ID(state,playerId){
			state.playerId = playerId;
		},
		SET_PLAYER_DATA(state,playerData){
			state.playerData = playerData;
		},
		GET_ALL_HEROES_INFO(state,heroesInfo){
			state.heroesInfo = heroesInfo;
		},
		SET_RECENT_MATCHES_DATA(state,recentMatches){
			state.recentMatches = recentMatches;
		},
		SET_RADIANT_PLAYERS(state,players){
			state.radiantPlayers = players;
		},
		SET_DIRE_PLAYERS(state,players){
			state.direPlayers = players;
		},
		SET_EXPANDED_MATCH_ID(state,matchId){
			state.expandedMatchId = matchId;
		}
	},
	actions:{
		setSearchKeyWord(context, keyword){
			context.commit('SET_SEARCH_KEYWORD',keyword);
		},
		setPlayerId(context,playerId){
			context.commit('SET_PLAYER_ID',playerId);
		},
		getAllHeroesInfo(context){
			axios.get('https://api.opendota.com/api/heroes').then((response) => {
				context.commit('GET_ALL_HEROES_INFO',response.data);
			});
		},
		setRecentMatechesData(context,recentMatches){
			context.commit('SET_RECENT_MATCHES_DATA',recentMatches);
		},
		setRadiantPlayers(context, players){
			context.commit('SET_RADIANT_PLAYERS',players);
		},
		setDirePlayers(context, players){
			context.commit('SET_DIRE_PLAYERS',players);
		},
		setExpandedMatchId(context,matchId){
			context.commit('SET_EXPANDED_MATCH_ID',matchId);
		}
	}
})