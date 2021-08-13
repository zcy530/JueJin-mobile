<template>
  <!-- 公共头部 -->
  <div class="main-header">
    <div class="logo" @click="home">
      <img src="../assets/images/logo.svg" alt="" />
    </div>
    <div class="search">
      <van-search v-model="search" placeholder="探索掘金" />
    </div>
    <div class="login">
      <!-- 判断是否登录 -->
      <div class="avatar" v-if="isLogin"></div>
      <van-button v-else plain type="info" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      isLogin: window.localStorage.getItem('isLogin') || '',
      userName: window.localStorage.getItem('userName') || ''
    }
  },
  methods: {
    // 首页
    home() {
      this.$router.push('/')
    },
    // 登录
    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" >
.main-header {
  padding: 0 2%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  .logo {
    display: flex;
    align-items: center;
  }
  .search {
    margin-left: 20px;
    width: 50%;
  }
  .login {
    button {
      height: 31px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 100px;
      margin-left: 10px;
      background-image: url('../assets/images/avatar.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border: 0.5px solid #f4f4f4;
    }
  }
}
</style>
