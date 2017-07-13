<template>
  <div style="width:300px">
    <div>
      <p>{{item.dname}} <span><img src="https://api.opendota.com/apps/dota2/images/tooltips/gold.png" style="height:10px;margin-right:4px">{{ item.cost }}</span></p>
      <p>{{ item.notes }}</p>
    </div>

    <div>
      <p>{{ item.desc }}</p>
      <p>{{ item.lore }}</p>
    </div>
    <div>
      <p v-for="attr in item.attrib"><span>{{attr.header}}</span><span>{{attr.value}}</span>
      <span v-if="attr.footer">{{attr.footer}}</span></p>
    </div>

    <div>
      <span v-if="item.mc"><img src="https://api.opendota.com/apps/dota2/images/tooltips/mana.png" style="height:10px;margin-right:4px">{{ item.mc }}</span>
      <span v-if="item.cd"><img src="https://api.opendota.com/apps/dota2/images/tooltips/cooldown.png" style="height:10px;margin-right:4px">{{ item.cd }}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'itemtooltip',
  props:['item'],
  data () {
    return {
      
    }
  },
  methods:{
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
