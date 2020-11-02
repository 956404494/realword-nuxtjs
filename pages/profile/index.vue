<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="!isUser"
              :class="{
                active: profile.following,
              }"
              @click="onFollow"
              :disabled="followDisabled"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ profile.following ? "UnFollow" : "Follow" }}
              {{ profile.username }}
            </button>
            <nuxt-link
              class="btn btn-sm btn-outline-secondary action-btn"
              v-else
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'home',
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      username: profile.username,
                    },
                    query: {
                      tab: 'home',
                    },
                  }"
                  exact
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'favorites',
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      favorited: profile.username
                    },
                    query: {
                      tab: 'favorites',
                    },
                  }"
                  exact
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">
                  {{ article.createAt | date("MMM DD, YYYY") }}
                </span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
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
                  slug: article.slug,
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getProfile, 
  followUser, 
  unfollowUser } from "@/api/user";
import { 
  getFeedArticles, 
  getArticles, 
  addFavorite, 
  deleteFavorite } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "UserProfile",
  watchQuery: ["tab"],
  async asyncData({ params, query }) {
    const tab = query.tab || "home";
    const data = tab === "home" ? { author: params.username } : { favorited: params.username };

    // 并行执行异步任务 获取用户资料及文章列表
    const [profileRes, articleRes] = await Promise.all([
      getProfile(params.username),
      getArticles(data),
    ]);

    // 解构数据
    const { profile } = profileRes.data;
    const { articles } = articleRes.data;

    articles.forEach((article) => (article.favoriteDisabled = false));

    return {
      profile,
      followDisabled: false,
      tab,
      articles,
    };
  },
  computed: {
    ...mapState(["user"]),
    isUser() {
      return this.user ? this.profile.username === this.user.username : false;
    },
  },
  methods: {
    async onFollow() {
      // 用户未登录
      if(!this.user) {
        this.$router.push('/login')
        return
      }
      const author = this.profile;
      this.followDisabled = true;
      // 关注用户
      if (!author.following) {
        await followUser(author.username);
        author.following = true;
      }
      // 取消关注用户
      else {
        await unfollowUser(author.username);
        author.following = false;
      }
      this.followDisabled = false;
    },
    async onFavorite(article) {
      // 用户未登录
      if(!this.user) {
        this.$router.push('/login')
        return
      }
      // 视图与网络交互功能 做网络延迟禁用处理
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug);
        // 点赞高亮
        article.favorited = false;
        // 点赞总数
        article.favoritesCount -= 1;
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
  head () {
    return {
      // 页面标签内容
      title: `Profile - ${this.profile.username}`,
    }
  }
};
</script>

<style>
</style>