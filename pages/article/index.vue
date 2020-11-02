<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{ article.title }}</h1>

      <ArticleMeta :article="article" />

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body"></div>
    </div>

    <hr />

    <div class="article-actions">
      <ArticleMeta :article="article" />
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">
        <ArticleComment :article="article"></ArticleComment>
      </div>

    </div>

  </div>

</div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComment from './components/article-comment'
export default {
  name: 'ArticleIndex',
  components: {
    ArticleMeta,
    ArticleComment
  },
  // 考虑首屏渲染以及SET
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    // 将markdown转换成HTML格式
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  head () {
    return {
      // 页面标签内容
      title: `${this.article.title}`,
      // 利于SEO
      meta: [
        { hid: 'description', name: 'description', content: this.article.description}
      ]
    }
  }
}
</script>

<style>

</style>