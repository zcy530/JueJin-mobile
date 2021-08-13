<template>
  <div class="index-page">
    <!-- 头部 -->
    <m-header></m-header>
    <!-- 分割线 -->
    <van-divider style="margin: 0" />
    <!-- 分类 -->
    <van-sticky>
      <div class="category">
        <!-- 一级 -->
        <div class="category-wrap">
          <ul class="sflex level1">
            <li
              v-for="(item, index) in categories"
              :key="item.category_id"
              :title="item.category_name"
              :class="[index === active ? 'active' : '']"
              @click="handleCategory(index)"
            >
              {{ item.category_name }}
            </li>
          </ul>
        </div>
      </div>
    </van-sticky>

    <!-- 二级 -->
    <div class="category2">
      <ul
        v-if="categories.length > 0 && categories[active].children"
        class="sflex level2"
      >
        <li
          :class="active2 === -1 ? 'active' : ''"
          @click="handleCategory2(-1)"
        >
          全部
        </li>
        <li
          v-for="(child, index2) in categories[active].children"
          :key="index2"
          :class="active2 === index2 ? 'active' : ''"
          @click="handleCategory2(index2)"
        >
          {{ child.category_name }}
        </li>
      </ul>
    </div>
    <!-- 文章列表 -->
    <div class="article-list">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
        class="article-wrap"
      >
        <van-cell v-for="(article, index) in articleList" :key="index">
          <div class="article" @click="detail(article.article_id)">
            <div class="author">
              <span class="name">{{ article.author_user_info.user_name }}</span>
              <span class="line"></span>
              <span class="date">{{
                getTimer(article.article_info.ctime)
              }}</span>
            </div>
            <div class="cflex tags">
              <span class="tag">{{
                article.category_info.first_category_name
              }}</span>
              <span class="tag">{{
                article.category_info.second_category_name
              }}</span>
            </div>
            <div class="title">
              {{ article.article_info.title }}
            </div>
            <div class="info">
              <div class="left">
                <div class="intro">
                  {{ article.article_info.brief_content }}
                </div>
                <div class="cflex stastic">
                  <div class="cflex">
                    <div class="cflex praise">
                      <van-icon name="good-job-o" />
                      <span>{{ article.article_info.digg_count }}</span>
                    </div>
                    <div class="cflex praise msg">
                      <van-icon name="chat-o" />
                      <span>{{
                        article.article_info.comment_count
                          ? article.article_info.comment_count
                          : '评论'
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="image" v-if="article.article_info.cover_image">
                <img :src="article.article_info.cover_image" alt="" />
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>

    <!-- 底部tabbar -->
    <m-footer :active="tabActive"></m-footer>
  </div>
</template>

<script>
import mHeader from '@/components/mHeader'
import mFooter from '@/components/mFooter'
import { getCategories, getArticles } from '../../fake-api'
export default {
  name: 'Index',
  components: { mHeader, mFooter },
  data() {
    return {
      value: '', // 搜索关键词
      categories: [],
      tabActive: 0, // 底部菜单
      active: 0, // 一级选中
      active2: -1, // 二级选中
      categoryId: 0, // 分类id
      sortBy: 'hot', // 排序
      offset: 0, // 页码
      limit: 10, // 条数
      articleList: [], // 文章列表
      loading: false,
      finished: false,
      route: '' // 跳转路径
    }
  },
  watch: {
    $route() {
      // 路由改变, 根据路由参数重新获取数据
      this.init()
    }
  },

  created() {
    this.sortBy = this.$route.query.sort || ''
    this.tabActive = this.sortBy === 'hot' ? 0 : this.sortBy === 'new' ? 1 : 0
    this.getCategories()
  },

  methods: {
    // 查询分类
    getCategories() {
      // 查询分类列表
      getCategories().then(res => {
        if (res.code === 0) {
          let list = res.data.categories
          list.map(item => {
            switch (item.category_name) {
              case '后端':
                item.category_title = 'backend'
                break
              case '前端':
                item.category_title = 'frontend'
                break
              case 'Android':
                item.category_title = 'android'
                break
              case 'iOS':
                item.category_title = 'ios'
                break
              default:
                item.category_title = ''
                break
            }
          })
          this.categories = list
          this.init()
        }
      })
    },

    // 根据地址栏参数查询文章列表
    init() {
      let first = this.$route.params.first || ''
      let second = this.$route.params.second || ''
      let pageTitle = ''
      switch (first) {
        case 'backend':
          pageTitle = '后端'
          break
        case 'frontend':
          pageTitle = '前端'
          break
        case 'android':
          pageTitle = 'Android'
          break
        case 'ios':
          pageTitle = 'iOS'
          break

        default:
          pageTitle = ''
          break
      }
      this.categories.map((item, index) => {
        // 选中的一级
        if (item.category_name === pageTitle) {
          this.active = index
          this.categoryId = item.category_id
          // 选中的二级
          if (item.children && second !== '') {
            item.children.map((item2, index2) => {
              if (item2.category_name === second) {
                this.active2 = index2
                this.categoryId = item2.category_id
              }
            })
          }
        }
      })
      this.sortBy = this.$route.query.sort || 'hot'
      this.offset = 0
      this.articleList = []
      this.getArticles()
    },

    // 点击一级
    handleCategory(index) {
      this.active = index
      this.active2 = -1

      if (this.active === 0) {
        // 推荐
        this.route = '/'
      } else {
        this.route = `/${this.categories[this.active].category_title}`
      }

      this.$router.push(
        `${this.route}${this.sortBy ? `?sort=${this.sortBy}` : ''}`
      )
    },

    // 点击二级
    handleCategory2(index) {
      this.active2 = index
      let categoryData = {}
      // 一级
      let level1 = this.categories[this.active]
      // 二级
      let level2 = this.categories[this.active].children[this.active2]
      let new_route = ''
      // 点击"全部"以外的二级
      if (index > -1) {
        categoryData = level2
        new_route = `/${level1.category_title}${
          level2.category_name ? `/${level2.category_name}` : ''
        }${this.sortBy ? `?sort=${this.sortBy}` : ''}`
      } else {
        // 点击全部
        categoryData = level1
        new_route = `/${level1.category_title}${
          this.sortBy ? `?sort=${this.sortBy}` : ''
        }`
      }
      this.categoryId = categoryData.category_id
      this.$router.push({
        path: new_route
      })
    },

    // 获取文章列表
    getArticles() {
      this.loading = true
      getArticles(this.categoryId, this.sortBy, this.offset, this.limit).then(
        res => {
          if (res.code === 0) {
            this.loading = false
            // 合并新加载的数据
            this.articleList = [...this.articleList, ...res.data.articles]
          }
          if (this.articleList.length >= res.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      )
    },

    // 跳转到文章详情页
    detail(id) {
      this.$router.push({
        path: `/article/${id}`
      })
    },

    // 上拉加载
    onLoad() {
      this.offset++
      this.getArticles()
    }
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  width: 100%;
  overflow: hidden;
  padding-bottom: 50px;

  .category {
    width: 100%;
    background: #ffffff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    .category-wrap {
      width: 100%;
      overflow-x: auto;
      ul.level1 {
        height: 46px;
        font-size: 1rem;
        padding-left: 0.625rem;

        transition: all 0.2s;
        transform: translateZ(0);
        li {
          padding: 0 1.25rem;
          color: #71777c;
        }
        .active {
          color: #007fff;
        }
      }
    }
  }

  .category2 {
    width: 100%;
    background: #f4f5f5;
    padding: 0.625rem 0 0 1.5rem;
    ul.level2 {
      flex-wrap: wrap;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        background-color: #fff;
        border-radius: 1rem;
        font-size: 1rem;
        color: #8a9aa9;
        padding: 0 0.83rem;
        margin-right: 1rem;
        margin-bottom: 1rem;
      }
      .active {
        background-color: #007fff;
        color: #fff;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%), 0 1px 2px 0 rgb(0 0 0 / 5%);
      }
    }
  }

  .article-list {
    .article-wrap {
      padding: 6px 0 0;
      .article {
        position: relative;
        margin-bottom: 5px;
        .author {
          display: flex;
          align-items: center;
          .name {
            word-break: break-all;
            font-size: 14px;
            line-height: 22px;
            color: #4e5969;
          }
          .line {
            width: 1px;
            height: 14px;
            background: #e5e6eb;
            margin: 0 8px;
          }
          .date {
            line-height: 14px;
            font-size: 14px;
            color: #86909c;
          }
        }
        .tags {
          position: absolute;
          top: auto;
          right: 0px;
          bottom: -2px;
          .tag {
            height: 24px;
            flex-shrink: 0;
            margin-left: 8px;
            padding: 0 8px;
            background: #fafafa;
            border-radius: 2px;
            font-size: 14px;
            line-height: 22px;
            color: #4e5969;
          }
        }
        .title {
          font-weight: 700;
          font-size: 18px;
          line-height: 24px;
          color: #1d2129;
          word-break: break-all;
          margin-top: 14px;
          margin-bottom: 12px;
        }
        .info {
          display: flex;
          .left {
            .intro {
              height: 88px;
              color: #4e5969;
              margin-bottom: 14px;
              font-size: 14px;
              line-height: 22px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
            }
            .stastic {
              justify-content: space-between;
              .praise {
                font-size: 14px;
                line-height: 20px;
                color: #86909c;
                margin-right: 26px;
                span {
                  margin-left: 4px;
                }
              }
            }
          }
          .image {
            min-width: 120px;
            width: 120px;
            height: 88px;
            margin-left: 10px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .sflex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .cflex {
    display: flex;
    align-items: center;
  }
}
</style>

