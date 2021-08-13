<template>
  <div>
    <m-header></m-header>
    <div class="user-page" v-if="isLogin">
      <div class="avatar-bg">
        <div class="user-name">
          <p>您好！{{ userName }}</p>
        </div>
      </div>
      <div class="history" @click="history">
        历史记录<van-icon name="arrow" />
      </div>
      <div class="logout" @click="logout">
        退出登录<van-icon name="arrow" />
      </div>
    </div>
    <div class="user-page" v-else>
      <van-empty description="请登录查看" />
    </div>
    <m-footer :active="2"></m-footer>
  </div>
</template>

<script>
import mHeader from '@/components/mHeader'
import mFooter from '@/components/mFooter'

export default {
  name: 'Mine',
  components: { mHeader, mFooter },
  data() {
    return {
      isLogin: window.localStorage.getItem('isLogin') || '',
      userName: window.localStorage.getItem('userName') || ''
    }
  },
  methods: {
    // 历史记录
    history() {
      this.$router.push('/history')
    },
    // 退出登录
    logout() {
      this.$dialog
        .confirm({
          message: '是否退出登录'
        })
        .then(() => {
          window.localStorage.removeItem('isLogin')
          window.localStorage.removeItem('userName')
          this.isLogin = false
          this.userName = ''
          this.$router.go(0)
          this.$notify({
            type: 'success',
            message: '退出成功'
          })
        })
        .catch(() => {
          console.log('取消')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-page {
  padding: 20px;
  .avatar-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    .user-name {
      color: #1e80ff;
      font-size: 16px;
      font-weight: 700;
    }
  }
  .history,
  .logout {
    padding: 5px 20px;
    height: 48px;
    line-height: 48px;
    border-bottom: 0.5px solid #f4f4f4;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-icon {
      color: #999;
    }
  }
}
</style>
