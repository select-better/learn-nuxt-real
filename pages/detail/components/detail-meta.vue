<template>
  <div class="article-meta">
    <nuxt-link :to="{ name: 'profile', params: { id: result.username } }"
      ><img :src="result.author.image"
    /></nuxt-link>
    <div class="info">
      <nuxt-link :to="{ name: 'profile', params: { id: result.username } }">
        {{ result.author.username }}
      </nuxt-link>
      <span class="date">{{ result.createdAt | date('MMM DD,YYYY') }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="[result.favorited ? 'active' : '']"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ result.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
