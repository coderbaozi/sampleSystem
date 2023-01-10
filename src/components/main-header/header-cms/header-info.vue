<template>
  <div class="header-info">
    <!-- 操作icon -->
    <div class="header-operations">
      <span>
        <span class="dot"></span>
        <el-icon><Message></Message></el-icon>
      </span>
      <span>
        <el-icon><ChatDotRound></ChatDotRound></el-icon>
      </span>
      <span>
        <el-icon><Search></Search></el-icon>
      </span>
    </div>

    <!-- 个人信息 -->
    <div class="info-panel">
      <el-dropdown>
        <span class="el-dropdown-link">
          <div class="info-instance">
            <el-avatar :size="30" src="https://img1.imgtp.com/2023/01/06/JVQCYLMG.jpg"></el-avatar>
            <span class="username">Admin</span>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose></CircleClose></el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled></InfoFilled></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><Unlock></Unlock></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LOGIN_TOKEN } from '@/constant'
import { localCache } from '@/utils/cache'
import { ChatDotRound, InfoFilled, Message, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const handleExitClick = () => {
  localCache.deleteCatch(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}

.info-instance {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .username {
    margin-left: 6px;
  }
}
.header-operations {
  display: inline-flex;
  margin-left: 20px;
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
    i {
      font-size: 20px;
    }
    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background-color: red;
      border-radius: 100%;
    }
  }

  // dropdown渲染在app外面
  // .info-panel {
  //   :global(.el-dropdown-menu__item) {
  //     line-height: 36px !important;
  //     padding: 6px 22px;
  //   }
  // }
}
</style>
