<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
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
            username: article.author.username,
          },
        }"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createAt | date("MMM DD,YYYY") }}</span>
    </div>
    <!-- 文章作者不是用户 -->
    <template v-if="!isUser">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
          active: article.author.following,
        }"
        @click="onFollow"
        :disabled="followDisabled"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ !(article.author.following && user) ? "Follow" : "UnFollow" }}
        {{ article.author.username }} <span class="counter"></span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited,
        }"
        @click="onFavorite"
        :disabled="favoriteDisabled"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>

    <template v-else>
      <nuxt-link
        class="btn btn-sm btn-outline-secondary"
        :to="{
          name: 'editor',
          params: {
            slug: article.slug
          }
        }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      &nbsp;&nbsp;
      <button
        class="btn btn-outline-danger btn-sm"
        @click="delArticle"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import { followUser, unfollowUser } from "@/api/user";
import { addFavorite, deleteFavorite, deleteArticle } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      followDisabled: false,
      favoriteDisabled: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    isUser() {
      return this.user ? this.article.author.username === this.user.username : false;
    },
  },
  methods: {
    async onFollow() {
      const author = this.article.author;
      // 用户未登录
      if(!this.user) {
        this.$router.push('/login')
        return
      }
      // 用户已登录
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
    async onFavorite() {
      const article = this.article;
      // 用户未登录
      if(!this.user) {
        this.$router.push('/login')
        return
      }
      
      // 视图与网络交互功能 做网络延迟禁用处理
      this.favoriteDisabled = true;
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
      this.favoriteDisabled = false;
    },
    async delArticle () {
      await deleteArticle(this.article.slug)
      this.$router.push('/')
    }
  },
};
</script>

<style>
</style>