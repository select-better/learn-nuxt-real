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
                <nuxt-link
                  class="nav-link"
                  href=""
                  :class="{ disabled: !user, active: tab === 'your_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      page: 1,
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  href=""
                  :class="{ disabled: !user, active: tab === 'global_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      page: 1,
                      tab: 'global_feed',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  href=""
                  :class="{ disabled: !user, active: tab === 'tag' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      page: 1,
                      tab: 'tag',
                      tag: tag,
                    },
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <template v-if="articlesCount">
            <div
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link :to="{ path: `/profile/${article.author.username}` }"
                  ><img :src="article.author.image"
                /></nuxt-link>
                <nuxt-link
                  :to="{ path: `/profile/${article.author.username}` }"
                  class="info"
                >
                  <a class="author">{{ article.author.username }}</a>
                  <span class="date">{{
                    article.createdAt | date('MMM DD, YYYY')
                  }}</span>
                </nuxt-link>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="[
                    article.favorited ? 'active' : '',
                    article.favoriteDisabled ? 'disabled' : '',
                  ]"
                  @click="onFavorite(article)"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link
                :to="{ path: `/detail/${article.slug}` }"
                class="preview-link"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
          </template>
          <div class="article-preview" v-else>暂时没有收藏文章</div>
          <nav>
            <ul class="pagination" v-if="articlesCount">
              <li
                class="page-item"
                v-for="item in totalPage"
                :key="item"
                :class="{
                  active: item === page,
                }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: $route.query.tab,
                    },
                  }"
                >
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                :to="{
                  name: 'home',
                  query: { page: 1, tag: item, tab: 'tag' },
                  tab: item,
                }"
              >
                {{ item }}
              </nuxt-link>
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
  removeFavorite,
} from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
// let lastPage = null
export default {
  name: 'HomePage',
  async asyncData({ query: { tag, page, tab }, store }) {
    const innerPage = Number.parseInt(page || 1)
    const limit = 1
    // 但这里需要请求两个接口，实话说不太好, 但是不求的话也拿不到tags
    const [articleRes, tagRes] = await Promise.all([
      tab === 'your_feed' && store.state.user
        ? getFeedArticles({
            offset: (innerPage - 1) * limit,
            limit: limit,
          })
        : getArticles({
            offset: (innerPage - 1) * limit,
            limit: limit,
            tag,
          }),
      getTags(),
    ])

    const { articles, articlesCount } = articleRes.data
    articles.forEach((item) => (item.favoriteDisabled = false))
    const { tags } = tagRes.data
    return {
      articles,
      articlesCount,
      page: innerPage,
      limit,
      tags,
      tag,
      tab: tab || 'global_feed',
    }
  },
  // 监听page
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit) || 1
    },
    ...mapState(['user']),
  },
  methods: {
    async onFavorite(article) {
      if (article.favoriteDisabled) {
        return
      }
      article.favoriteDisabled = true
      // 可以通过result来看
      const result = await (article.favorited
        ? removeFavorite(article.slug)
        : addFavorite(article.slug))
      // 可以将一些有用的字段进行便利
      article.favorited = result.data.article.favorited
      article.favoritesCount = result.data.article.favoritesCount
      article.favoriteDisabled = false
    },
  },
}
</script>

<style></style>
