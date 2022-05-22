<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ result.title }}</h1>
        <DetailMeta :result="result" />
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p v-html="result.body"></p>
          <h2 id="introducing-ionic">Introducing RealWorld.</h2>
          <p>{{ result.description }}</p>
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <DetailMeta :result="result" />
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <DetailCommit :result="result" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import DetailMeta from './components/detail-meta.vue'
import DetailCommit from './components/detail-commit.vue'
export default {
  name: 'Detail',
  async asyncData({ params }) {
    const {
      data: { article },
    } = await getArticle(params.slug)
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    console.log(article)
    return {
      result: article,
    }
  },
  components: { DetailMeta, DetailCommit },
  // 设置头
  head() {
    return {
      title: `${this.result.title}-realword`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.result.description,
        },
      ],
    }
  },
}
</script>

<style></style>
