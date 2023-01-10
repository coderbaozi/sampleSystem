<template>
  <div class="menu-panel">
    <div class="menu-logo">
      <img src="@/assets/img/menu-logo.svg" />
      <span v-show="!isFold" class="logo-slogan">后台管理</span>
    </div>
    <div class="menu-instance">
      <el-menu
        :collapse="isFold"
        :default-active="defaultActive"
        text-color="#b7bdc3"
        background-color="#001529"
        active-text-color="#fff">
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="'' + item.id">
            <template #title>
              <!-- 字符串转组件 -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subItem in item.children">
              <el-menu-item :index="'' + subItem.id" @click="handleItemClick(subItem)">{{ subItem.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useLoginStore from '@/store/login/login'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

// 获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const props = defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 处理item点击
const router = useRouter()
const handleItemClick = (item: any) => {
  const url = item.url
  router.push(url)
}

// Menu的默认菜单
const route = useRoute()

const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style scoped lang="less">
.menu-panel {
  height: 100vh;
  background: #001529;
}
.menu-logo {
  display: flex;
  align-items: center;
  padding: 8px 18px;
  img {
    width: 30px;
    height: 30px;
    color: #fff;
    margin-right: 12px;
  }
  .logo-slogan {
    color: #e5eaf3;
    user-select: none;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  .el-menu-item:hover {
    color: #fff;
  }
  .el-menu-item.is-active {
    background-color: #409eff;
  }
}
</style>
