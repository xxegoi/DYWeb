<template>
    <el-menu default-active="" unique-opened router >
      <template v-for="item in menuList" >
          <template v-if="item.isSubMenu">
            <el-submenu index="" :key="item.title">
              <template slot="title">
                <span>{{item.title}}</span>
              </template>
            <el-menu-item v-for="menu in item.subMenu" :index="menu.path" :key="menu.title">
                {{menu.title}}
            </el-menu-item>
          </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.path" :key="item.title">
                {{item.title}}
            </el-menu-item>
          </template>
      </template>
    </el-menu>
</template>

<script>
    export default {
        name:'asidemenu',
        props:{
            menuList:{
                type:Array
            }
        }
    }
</script>

<style scoped>
    a{
      text-decoration: blink;
    }
    .el-menu{
        border:0px;
    }
</style>