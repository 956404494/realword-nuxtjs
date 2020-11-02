<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <div class="list-error">
            <ul class="error-messages" ng-show="$ctrl.errors">
              <div class="ng-scope" 
                v-for="(messages, name) in errs"
                :key="name"
                >
                <li class="ng-binding ng-scope" 
                  v-for="message in messages"
                  :key="message"
                >
                  {{ name }} {{ message }}
                </li>
              </div>
            </ul>
          </div>
          <form
            @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="article.title"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  v-model="article.description"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagText"
                  @keydown.enter="addTag"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill ng-binding ng-scope"
                    v-for="tag in article.tagList"
                    :key="tag"
                  >
                    <i class="ion-close-round" @click="deleteTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, updateArticle, createArticle } from "@/api/article";
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      tagText: "",
    };
  },
  async asyncData({ params }) {
    let result = params.slug ? await getArticle(params.slug) : {};
    const { article } = result.data
      ? result.data
      : {
          article: {
            title: "",
            description: "",
            body: "",
            tagList: [],
          },
        };
    return {
      article,
      slug: params.slug,
      errs: {}
    };
  },
  methods: {
    addTag (e) {
      // 阻止表单提交
      e.preventDefault()
      const value = this.tagText.trim();
      if (value) {
        this.article.tagList.push(value);
        this.tagText = "";
      }
    },
    deleteTag (tag) {
      const tagList = this.article.tagList;
      tagList.splice(tagList.indexOf(tag), 1);
    },
    async onSubmit() {
      const postArticle = this.slug ? updateArticle : createArticle;
      try {
        const { data } = await postArticle({
          article: this.article
        }, this.slug)
        this.$router.push(`/article/${data.article.slug}`)
      } catch (err) {
        // console.dir(err)
        this.errs = err.response.data.errors
      }
    },
  },
  head () {
    return {
      // 页面标签内容
      title: `Editor`,
    }
  }
};
</script>

<style>
</style>