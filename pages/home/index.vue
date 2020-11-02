<template>
<div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link class="nav-link" 
                exact
                :class="{
                  active: tab === 'your_feed'
                }"
                :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }  
                }"
              >Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                exact
                :class="{
                  active: tab === 'global_feed'
                }"
                :to="{
                  name: 'home',
                  query: {
                    tab: 'global_feed'
                  }  
                }"
              >Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link class="nav-link active" 
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: tag
                  } 
                }" 
              >#{{ tag }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div 
          class="article-preview"
          v-for="article in articles"
          :key="article.slug"
        >
          <div class="article-meta">
            <nuxt-link :to="{
              name: 'profile',
              params: {
                username: article.author.username
              }
            }">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link :to="{
              name: 'profile',
              params: {
                  username: article.author.username
                }
              }" 
              class="author"
              >
              {{ article.author.username }}
              </nuxt-link>
              <span class="date"> {{ article.createdAt | date('MMM DD, YYYY') }} </span>
            </div>
            <button 
              class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{
                active: article.favorited
              }"
              @click="onFavorite(article)"
              :disabled="article.favoriteDisabled"
            >
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link 
            class="preview-link"
            :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }"
          >
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link class="tag-pill tag-default"
              v-for="tag in tags"
              :key="tag"
              :to="{
                name: 'home',
                query: {
                  tag: tag,
                  tab: 'tag'
                }
              }" 
            >{{ tag }}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { 
  getArticles, 
  getFeedArticles,
  addFavorite,
  deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  // 默认情况下，query 的改变不会调用asyncData方法。
  // 设置该属性监听query参数, 监听参数改变会调用所有组件方法
  watchQuery: ['page', 'tag', 'tab'],
  // 需要SEO 提高首屏渲染速度
  async asyncData ({ query, store }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const tag = query.tag
    const tab = query.tab || 'global_feed'
    // 判断条件获取 关注文章列表 或 所有列表
    const loadArticles = store.state.user && tab === 'your_feed' 
      ? getFeedArticles
      : getArticles

    // 并行执行异步任务 提高运行效率
    const [ articleRes, tagRes ] = await Promise.all([
      loadArticles({
        // 获取数据数量
        limit,
        // 获取指定数据偏移量
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])

    // 解构数据
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data

    // 添加文章禁用属性
    articles.forEach(article => article.favoriteDisabled = false)

    // 返回对象 利于直观查看数据
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite (article) {
      // 用户未登录
      if(!this.user) {
        this.$router.push('/login')
        return
      }
      // 视图与网络交互功能 做网络延迟禁用处理
      article.favoriteDisabled = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        // 点赞高亮
        article.favorited = false
        // 点赞总数
        article.favoritesCount -= 1
      }
      else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  },
  head () {
    return {
      // 页面标签内容
      title: `Home`,
    }
  }
}
</script>

<style>

</style>