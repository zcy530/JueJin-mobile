<template>
  <div class="login-box">
    <div class="main">
      <h1>欢迎~</h1>
      <div class="form">
        <van-tabs v-model="active">
          <van-tab title="登录" class="login-form">
            <login-form></login-form>
          </van-tab>
          <van-tab title="注册">
            <register-form @handleLogin="handleLogin"></register-form>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
// 登录表单组件
import LoginForm from '../components/LoginForm.vue'
// 注册表单组件
import RegisterForm from '../components/RegisterForm.vue'
export default {
  data() {
    return {
      active: 0 // tab标签
    }
  },
  components: { LoginForm, RegisterForm },
  methods: {
    // 切换登录
    handleLogin() {
      this.active = 0
    }
  }
}
</script>

<style scoped>
.login-box {
  width: 100%;
  height: 100vh;
  background: #a1caff;
}

.main {
  padding: 5rem 1rem 0;
}

.login-box h1 {
  padding: 0;
  margin: 0;
  margin: 0 0 3rem 20px;
  color: #333;
}

.form {
  background: #ffffff;
  padding: 2rem 1rem;
  border-radius: 2rem;
}
.login-form {
  margin-top: 1rem;
}
</style>

<style lang="scss">
.login-box {
  .van-tab__text {
    font-size: 1rem;
  }
  .van-field__left-icon .van-icon,
  .van-field__right-icon .van-icon {
    font-size: 1.2rem;
  }
  .van-button {
    margin-top: 2rem;
  }
  .van-cell {
    margin-top: 20px;
  }
}
</style>
