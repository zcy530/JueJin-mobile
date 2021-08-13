<template>
  <div class="history-wrap">
    <div class="top-bar">
      <van-nav-bar
        title="历史记录"
        left-text="返回"
        right-text="清空记录"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <van-list
      :finished="finished"
      finished-text="没有更多了"
      v-if="articleList.length > 0"
      class="history-list"
    >
      <van-cell v-for="(article, index) in articleList" :key="index">
        <div class="article" @click="detail(article.article_id)">
          <div class="author">
            <span class="name">{{ article.author_user_info.user_name }}</span>
            <span class="line"></span>
            <span class="date">{{ getTimer(article.article_info.ctime) }}</span>
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
    <div class="no-data" v-else>
      <van-empty description="暂无数据" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  data() {
    return {
      articleList: [],
      finished: false
    }
  },
  created() {
    let history = window.localStorage.getItem('history') || ''
    if (history !== '') {
      this.articleList = JSON.parse(history)
      this.finished = true
    }
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1)
    },
    // 清空历史记录
    onClickRight() {
      if (this.articleList.length === 0) return
      this.$dialog
        .confirm({
          message: '是否清除历史记录'
        })
        .then(() => {
          window.localStorage.removeItem('history')
          this.articleList = []
          this.$notify({
            type: 'success',
            message: '清除成功'
          })
        })
        .catch(() => {
          console.log('取消')
        })
    },
    // 跳转到文章详情页
    detail(id) {
      this.$router.push({
        path: `/article/${id}`
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.history-list {
  margin-top: 56px;
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
