<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit" v-if="user">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment.body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" :disabled="postDisabled">
          Post Comment
        </button>
      </div>
    </form>

    <p v-else >
      <nuxt-link to="/login">Sign in</nuxt-link> or
      <nuxt-link to="/register">sign up</nuxt-link> to add comments on
      this article.
    </p>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">
          {{ comment.createAt | date("MMM DD, YYYY") }}
        </span>
        <span
          class="mod-options"
          v-if="user && comment.author.username === user.username"
          @click.once="onDelete(comment.id)"
        >
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComment, addComment, deleteComment } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "ActicleComment",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      // 文章列表
      comments: [],
      // 记录评论输入文本
      comment: {
        body: "",
      },
      // 评论按钮禁用
      postDisabled: false,
    };
  },
  // 不需要SEO
  async mounted() {
    const { data } = await getComment(this.article.slug);
    this.comments = data.comments;
  },
  methods: {
    // 添加评论
    async onSubmit() {
      if (this.comment.body) {
        this.postDisabled = true;
        const { data } = await addComment(this.article.slug, {
          comment: this.comment,
        });
        this.comments.unshift(data.comment);
        this.comment.body = "";
        this.postDisabled = false;
      }
    },
    // 删除评论
    async onDelete(id) {
      const arr = this.comments;
      await deleteComment(this.article.slug, id);
      arr.splice(
        arr.findIndex((comment) => comment.id === id),
        1
      );
    },
  },
};
</script>

<style>
</style>