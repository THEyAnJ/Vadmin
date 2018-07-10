<template>
  <div class="province_container">
    <div id="map" ref="map_container"></div>
    <div v-show="provinceVisable" ref="demo" id="ripple"></div>
    <span v-show="provinceVisable" ref="line1" id="line1" class="selecttip itemline"></span>
    <span v-show="provinceVisable" ref="line2" id="line2" class="selecttip itemline"></span>
    <div id="proitem" ref="proitem" v-show="provinceVisable" class="selecttip iteminfo">
      <div class="iteminfo-text" ref="provinceInfo">
        <span class="pname">{{provinceName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china';
import {animate} from '@/controller/common'
export default {
  components: {
    
  },
  data () {
    return {
      provinceVisable:false,
      provinceName:null,
      provinceData:{},
      containerWidth:null,
      map_option:{
        title : {
          text: '',
          subtext: '',
          sublink: '',
          left: 'center',
          top: 'top',
          textStyle: {
              color: '#fff'
          }
        },
        grid:{
          top:'50%',
        },
        geo: {
          map: "china",
          label: {
              emphasis: {
                  show: true,
                  textStyle:{
                      color:"#fff",
                      fontSize:16,
                  },
              }
          },
          itemStyle: {
              normal: {
                  areaColor: '#142e85',
                  borderColor: '#111',
              },
              emphasis: {
                  areaColor: '#175ce7',
              }
          }
        },
        series:[]
      },
      province_option:{
        title : {
          text: '',
          subtext: '',
          sublink: '',
          left: 'center',
          top: 'top',
          textStyle: {
              color: '#fff'
          }
        },
        grid:{
          top:'50%',
        },
        geo: {
          map: null,
          label: {
              emphasis: {
                  show: true,
                  textStyle:{
                      color:"#fff",
                      fontSize:16,
                  },
              }
          },
          itemStyle: {
              normal: {
                  areaColor: '#142e85',
                  borderColor: '#111',
              },
              emphasis: {
                  areaColor: '#175ce7',
              }
          }
        },
        series:[]
      }
    }
  },
  computed: {

  },
  mounted(){
    let _this=this
    this.myChart = echarts.init(document.getElementById('map'))
    this.myChart.showLoading();
    this.init()
    this.myChart.hideLoading();
  },
  methods: {
    // 点击时重置样式
    leaveAnimation(){
        let _this=this
        _this.$refs.line1.style.width='0'
        _this.$refs.line2.style.width='0'
        _this.$refs.proitem.style.height='0'
        _this.$refs.proitem.style.opacity=0
    },
    /**
     * 点击省份进入动画
     * @param  {[type]} pixel         [省份标签/圆点显示位置]
     * @param  {[type]} line1Deg      [line1偏转角度]
     * @param  {[type]} line1Width    [line1宽度]
     * @param  {[type]} proitemOffset [省份显示板距离容器左侧的距离]
     * @param  {[type]} proitemWidth [省份显示板宽度]
     * @param  {[type]} proitemHeight [省份显示板高度]
     * @return {[type]}               [NULL]
     */
    enterAnimation(pixel,line1Deg,line1Width,proitemOffset,proitemWidth,proitemHeight,top=0,left=0){
        let _this=this
        const LeftOffset=Math.abs(Math.cos(line1Deg/360*2*Math.PI))*line1Width
        const TopOffset=Math.abs(Math.sin(line1Deg/360*2*Math.PI))*line1Width
        const isLeft=Math.abs(line1Deg) > 90
        const line2Width=isLeft ? pixel[0]-LeftOffset-proitemOffset : _this.containerWidth-(pixel[0]+LeftOffset)-proitemOffset
        // 圆点位置
        _this.$refs.demo.style.left=(pixel[0]+left)+'px'
        _this.$refs.demo.style.top=(pixel[1]+top)+'px'
        // line1起始位置
        _this.$refs.line1.style.left=(pixel[0]+left)+'px'
        _this.$refs.line1.style.top=(pixel[1]+top)+'px'
        _this.$refs.line1.style.transform='rotate('+line1Deg+'deg)'
        if(isLeft){
            // line2起始位置
            _this.$refs.line2.style.left=(pixel[0]+left-LeftOffset)+'px'
            _this.$refs.line2.style.transform='rotate(-180deg)'
            // 省份显示板位置
            _this.$refs.proitem.style.left=proitemOffset+left+'px'
            _this.$refs.proitem.style.top=(pixel[1]-TopOffset+top)+'px'
        }else{
            // line2起始位置
            _this.$refs.line2.style.left=(pixel[0]+left+LeftOffset)+'px'
            _this.$refs.line2.style.transform='rotate(0deg)'
            // 省份显示板位置
            _this.$refs.proitem.style.left=_this.containerWidth-proitemOffset-proitemWidth+left+'px'
            _this.$refs.proitem.style.top=(pixel[1]-TopOffset+1+top)+'px'
        }
        _this.$refs.line2.style.top=(pixel[1]-TopOffset+top)+'px'

        animate(_this.$refs.line1,{
            width:line1Width+'px'
        },() => {
            animate(_this.$refs.line2,{
                width: line2Width+'px'
            },() => {
                animate(_this.$refs.proitem,{
                    height: proitemHeight+"px",
                    opacity:1
                })
            })
        })
        _this.provinceVisable=true
    },
    init(){
        let _this=this
        this.containerWidth=this.$refs.map_container.offsetWidth
        this.myChart.setOption(this.map_option);
        this.myChart.on('click', function (params) {
            if(params.name!=="台湾" && params.name!=="南海诸岛" && params.name!=="香港" && params.name!=="澳门"){
                _this.provinceName=params.name
                _this.leaveAnimation()
                if (params.componentType === 'geo') {
                    const pixel=this.convertToPixel("geo", this.getModel().getComponent("geo").coordinateSystem.getRegion(params.name).center)
                    if("西藏" === params.name || "青海" === params.name){
                        _this.enterAnimation(pixel,-135,120,20,180,120)
                    }else if("海南" == params.name){
                        _this.enterAnimation(pixel,-60,160,20,180,120)
                    }else if("新疆" == params.name){
                        _this.enterAnimation(pixel,-115,120,20,180,120)
                    }else{
                        _this.enterAnimation(pixel,-75,120,20,180,120)
                    } 
                }
            }
        })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../style/animate.css';
  .province_container{
      position: relative;
      padding:0;
      height: 100%;
      background: url('../assets/img/bg.png') no-repeat;
      background-size: cover;
      #map{
        height: 100%;
      }
      #ripple{
          background-color: #fff;
          width: 8px;
          position: absolute;
          height: 8px;
          border-radius: 50%;
          -webkit-animation: ripple 3s linear infinite;
          transition: .5s linear opacity;
          -webkit-transition: .5s linear opacity;
      }
      .selecttip.itemline {
          border-top: 1px solid #39aaeb;
          width: 0px;
          position: absolute;
          -moz-transform-origin: 0% 0%;
          -webkit-transform-origin: 0% 0%;
          -o-transform-origin: 0% 0%;
          transform-origin: 0% 0%;
      }
      .selecttip.iteminfo {
          text-align: center;
          color: #fff;
          font-size: 30px;
          line-height: 120px;
          position: absolute;
          height: 0px;
          width: 180px;
          opacity: 0;
          float: right;
          background: url('../assets/img/label-bc.png') no-repeat;
          background-size: 100% 100%;
          -moz-transform-origin: 0% 0%;
          -webkit-transform-origin: 0% 0%;
          -o-transform-origin: 0% 0%;
          transform-origin: 0% 0%;
          .iteminfo-text {
              float: left;
              width: 100%;
              height: 100%;
          }
          .pname {
              color: white;
              font-size: 16px;
              line-height: 120px;
              display: block;
          }
      }
      
  }
</style>

