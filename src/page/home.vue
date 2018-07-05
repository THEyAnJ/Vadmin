<template>
  <el-container class="full_container">
    <el-header>
      <h3 @click="toggleAside">Vadmin Default Layout</h3>
    </el-header>
    <el-container class="main_container">
      <el-aside :style="asideStyle">
        <el-menu router>
          <el-menu-item v-for="item in menu" :index=item.path><i class="el-icon-menu"></i>{{item.title}}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <userInfo :userInfo="userInfo"></userInfo>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components: {
    userInfo: () => import('../components/home/userInfo'),
  },
  data () {
    return {
      menu:[],
      collapse:false
    }
  },
  computed: {
    ...mapState({
      userInfo:state => state.userInfo
    }),
    asideStyle () {
      return {
        width: `${this.collapse ? '60' : '200'}px`
      }
    }
  },
  mounted(){
    let menu=new Array(20).fill({
        title:"导航",
        path:"home"
      })
    this.menu.push(...menu)
  },
  methods: {
    toggleAside(){
      this.collapse=!this.collapse
    }
  }
}
</script>

<style lang="less" scoped>
  .full_container{
    height: 100%;
    .main_container{
      height: calc(~"(100% - 60px)");
    }
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    .el-menu{
      min-height: 100%;
    }
  }
  
  .el-main {
    background-color: #E9EEF3;
    position: relative;
  }
</style>

