<template>
    <l-map class="mini-map" :zoom="zoom" :minZoom="3" :center="center" ref="map" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
</template>

<script>
import {LMap,LTileLayer} from 'vue2-leaflet';
export default {
  components: {
    // userInfo: () => import('../components/home/userInfo'),
    LMap,
    LTileLayer
  },
  data () {
    return {
      loading: false,
      zoom: 11,
      center: [39.914492, 116.404269],
      // 高德地图1  {地址01,02,03,04}
      url: "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      // 高德地图2  {地址01,02,03,04}
      // url: "http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
      // google 地图1
      // url: "http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0",
      // google 地图2
      // url: "http://mt1.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galile",
      // 百度地图
      // url: "http://online0.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20160426&scaler=1&p=0",
      // url: "http://online2.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20160321&scaler=2&p=0",
      // OpenStreetMap地图
      // url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      // 初始地图
      // url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    }
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
  @import "~leaflet/dist/leaflet.css";
</style>

