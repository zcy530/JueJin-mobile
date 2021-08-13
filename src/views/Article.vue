<template>
  <div class="article-wrap">
    <!-- 头部 -->
    <m-header></m-header>
    <div class="article-main">
      <div class="author-info">
        <div class="info">
          <div class="avatar">
            <img :src="avatar" alt="" />
          </div>
          <div class="detail">
            <div class="user-name">
              {{ user_name }}
            </div>
            <div class="label">掘金 · {{ getTimer(ctime) }}</div>
          </div>
        </div>
        <button class="follow">关注</button>
      </div>
      <div class="article-title">{{ title }}</div>
      <div class="content" v-html="article_content"></div>
      <div class="mask">
        文章标签：
        <span>{{ category_info.first_category_name }}</span>
        <span>{{ category_info.second_category_name }}</span>
      </div>

      <van-divider />

      <!-- 评论 -->
      <div class="add-comment">
        <input type="text" placeholder="输入评论..." />
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
        class="comment-list"
      >
        <van-cell v-for="(comment, index) in commentList" :key="index">
          <div class="comment-item">
            <div class="avatar">
              <img :src="comment.user_info.avatar_large" alt="" />
            </div>
            <div class="comment-info">
              <div class="top">
                <span class="user-name">{{ comment.user_info.user_name }}</span>
              </div>
              <div
                class="comment"
                v-html="comment.comment_info.comment_content"
              ></div>
              <div class="options">
                <div class="time">
                  {{ getTimer(comment.comment_info.ctime) }}
                </div>
                <div class="digg"><van-icon name="good-job-o" /></div>
                <div class="digg"><van-icon name="chat-o" />回复</div>
              </div>
              <div class="comment-reply">
                <div
                  class="reply-item"
                  v-for="reply in comment.reply_infos"
                  :key="reply.reply_id"
                >
                  <div class="avatar">
                    <img :src="reply.user_info.avatar_large" alt="" />
                  </div>
                  <div class="comment-info">
                    <div class="top">
                      <span class="user-name">{{
                        reply.user_info.user_name
                      }}</span>
                    </div>
                    <div
                      class="comment"
                      v-html="reply.reply_info.reply_content"
                    ></div>
                    <div class="options">
                      <div class="time">
                        {{ getTimer(reply.reply_info.ctime) }}
                      </div>
                      <div class="digg"><van-icon name="good-job-o" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="digg-count">
        <van-icon name="good-job-o" />
        <span>
          {{ digg_count }}
        </span>
      </div>
      <div class="line"></div>
      <div class="digg-count comment-count">
        <van-icon name="chat-o" />
        <span>
          {{ comment_count }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import mHeader from '@/components/mHeader'
import { getArticleById, getCommentsByArticleId } from '../../fake-api'

export default {
  name: 'Article',
  components: { mHeader },
  data() {
    return {
      article: {},
      articleId: '', // 文章id
      avatar: '', // 头像
      user_name: '', // 作者
      title: '', // 文章标题
      ctime: '', // 发布时间
      article_content: '', // 文章内容
      category_info: {}, // 文章标签
      digg_count: '', // 点赞数
      comment_count: '', // 评论数
      commentList: [],
      offset: 0, // 页码
      limit: 10, // 条数
      loading: false,
      finished: false
    }
  },
  created() {
    this.articleId = this.$route.params.id || ''
    this.getArticleById()
  },
  methods: {
    // 根据文章id获取文章详情
    getArticleById() {
      getArticleById(this.articleId).then(res => {
        if (res.code === 0) {
          this.article = res.data.article
          this.avatar = this.article.author_user_info.avatar_large || ''
          this.user_name = this.article.author_user_info.user_name || ''
          this.title = this.article.article_info.title || ''
          this.ctime = this.article.article_info.ctime || ''
          this.article_content = this.article.article_content || ''
          this.category_info = this.article.category_info
          this.digg_count = this.article.article_info.digg_count
          this.comment_count = this.article.article_info.comment_count
        }
        // 获取文章评论
        this.getCommentsByArticleId()
        // 保存历史记录
        this.saveHistory()
      })
    },

    // 获取文章评论
    getCommentsByArticleId() {
      this.loading = true
      getCommentsByArticleId(this.articleId, this.offset, this.limit).then(
        res => {
          this.loading = false
          if (res.code === 0) {
            this.commentList = [...this.commentList, ...res.data.comments]
          }
          if (this.commentList.length >= res.total) {
            // 加载完成
            this.finished = true
          }
        }
      )
    },

    // 上拉加载
    onLoad() {
      this.offset++
      this.getCommentsByArticleId()
    },

    // 保存历史记录
    saveHistory() {
      // 添加到历史记录中
      let historyData = window.localStorage.getItem('history') || ''
      let arr = []
      if (historyData !== '') {
        arr = JSON.parse(historyData)
        let saved = arr.filter(
          item => item.article_id === this.article.article_id
        )
        if (saved.length === 0) {
          arr.push(this.article)
        }
      } else {
        arr.push(this.article)
      }
      window.localStorage.setItem('history', JSON.stringify(arr))
    }
  }
}
</script>

<style lang="scss" scoped>
.article-wrap {
  width: 100%;
  background: #f4f5f5;
  margin-bottom: 48px;
  overflow: hidden;

  .article-main {
    margin-top: 20px;
    padding: 10px 20px;
    background: #ffffff;
    .author-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 100px;
          overflow: hidden;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .detail {
          .user-name {
            font-size: 14px;
            font-weight: 600;
            color: #2e3135;
            margin-bottom: 6px;
          }
          .label {
            font-size: 12px;
            color: #8a9aa9;
          }
        }
      }

      .follow {
        padding: 0;
        width: 55px;
        height: 26px;
        font-size: 13px;
        outline: none;
        border: 1px solid #6cbd45;
        background: #ffffff;
        color: #6cbd45;
      }
    }

    .article-title {
      font-size: 18px;
      font-weight: 700;
      margin-top: 20px;
    }
    .mask {
      display: flex;
      align-items: center;
      margin: 10px 0;
      font-size: 15px;
      span {
        color: #666;
        margin-right: 10px;
      }
    }
    .add-comment {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      background: #fafbfc;
      padding: 15px 0;
      margin: 20px auto;
      input {
        width: 80%;
        height: 40px;
        border: none;
        text-indent: 1em;
        background-color: #fff;
        border: 1px solid #f1f1f1;
        border-radius: 3px;
      }
    }
    .comment-list {
      .comment-item {
        display: flex;
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 100px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .comment-info {
          width: calc(100% - 42px);
          margin-left: 10px;
          .top {
            display: flex;
            align-items: center;
            .user-name {
              font-size: 14px;
              color: #333;
            }
          }
          .comment {
            color: #505050;
          }
          .options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            .time {
              cursor: default;
              color: #8a9aa9;
            }
            .digg {
              color: #8a93a0;
              display: flex;
              align-items: center;
              .van-icon {
                margin-right: 6px;
                font-size: 16px;
              }
              &:first-child {
                margin-left: 20px;
              }
            }
          }
        }
        .reply-item {
          display: flex;
          margin-top: 10px;
        }
      }
    }
  }
  .footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    margin-top: 0;
    height: 47px;
    z-index: 1;
    background: #fff;
    border-top: 1px solid #ebebeb;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .digg-count {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 500;
      color: #8a93a0;
      .van-icon {
        font-size: 16px;
      }
      span {
        margin-left: 6px;
      }
    }
    .line {
      width: 1px;
      height: 2rem;
      background-color: #ebebeb;
    }
  }
}
</style>
