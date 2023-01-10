<template>
  <div class="phone-panel">
    <el-form label-width="68px" size="large">
      <el-form-item label="手机号码">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input></el-input>
          <span>
            <el-button size="large" class="code-btn" type="primary">获取验证码</el-button>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.verify-code {
  display: flex;
  .code-btn {
    margin-left: 6px;
  }
}
</style>
