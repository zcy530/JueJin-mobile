<template>
  <!-- 底部tabbar -->
  <van-tabbar v-model="tabActive" @change="onChange">
    <van-tabbar-item icon="home-o">热门</van-tabbar-item>
    <van-tabbar-item icon="new-o">最新</van-tabbar-item>
    <van-tabbar-item icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabActive: 0
    }
  },
  created() {
    this.tabActive = this.active
  },
  methods: {
    // 底部tabbar切换
    onChange(index) {
      let current = this.$route.path
      let route = ''
      let sort = ''
      // 热门
      if (index === 0) {
        sort = 'hot'
      }
      // 最新
      if (index === 1) {
        sort = 'new'
      }
      // 我的
      if (index === 2) {
        sort = ''
        route = '/mine'
      }

      if (this.$route.name === 'Mine') {
        route = '/'
      } else {
        // 如果当前不在[我的]页, 路由需要赋值为当前页面路径
        if (route !== '/mine') {
          route = current
        }
      }
      this.$router.push(`${route}${sort !== '' ? `?sort=${sort}` : ''}`)
    }
  }
}
</script>

<style lang="scss" >
</style>
