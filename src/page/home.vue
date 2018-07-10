<template>
  <el-container class="full_container">
    <el-header>
      <h3 @click="toggleAside">Vadmin Default Layout</h3>
    </el-header>
    <el-container class="main_container">
      <el-aside :style="asideStyle">
        <el-menu router>
          <el-menu-item v-for="item in menu" :index=item.path>
            <icon icon="ambulance"/>
            {{collapse ? null : item.title}}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {
    
  },
  data () {
    return {
      collapse:false
    }
  },
  computed: {
    asideStyle () {
      return {
        width: `${this.collapse ? '60' : '200'}px`
      }
    },
    menu(){
      return new Array(20).fill({
        title:"导航",
        path:"link"
      })
    }
  },
  mounted(){},
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

