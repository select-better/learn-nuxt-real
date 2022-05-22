<template>
  <div>
    <form class="card comment-form" @submit.prevent="submit">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="formValues.body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="innerUser.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <!-- 评论需不需要转化再说 -->
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{ name: 'profile', parmas: { id: comment.author.username } }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{ name: 'profile', parmas: { id: comment.author.username } }"
        >
          {{ comment.author.username }}</nuxt-link
        >
        <span class="date-posted">{{
          comment.createdAt | date('MMM DD, YYYY')
        }}</span>
        <span class="mod-options">
          <!-- 编辑先不搞 -->
          <!-- <i class="ion-edit"></i> -->
          <i
            class="ion-trash-a"
            v-if="innerUser.username === comment.author.username"
            @click="deleteComment(comment)"
          ></i>
        </span>
      </div>
    </div>
    <!-- <div class="card">
      <div class="card-block">
        <p class="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
      </div>
      <div class="card-footer">
        <a href="" class="comment-author">
          <img
            src="http://i.imgur.com/Qr71crq.jpg"
            class="comment-author-img"
          />
        </a>
        &nbsp;
        <a href="" class="comment-author">Jacob Schmidt</a>
        <span class="date-posted">Dec 29th</span>
        <span class="mod-options">
          <i class="ion-edit"></i>
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div> -->
  </div>
</template>

<script>
import { getComments, submitComments, deleteComments } from '@/api/article'
export default {
  name: 'Detailcomment',
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      formValues: {
        body: '',
      },
    }
  },
  mounted() {
    this.getComments()
  },
  methods: {
    async getComments() {
      const {
        data: { comments },
      } = await getComments(this.result.slug)
      this.comments = comments
      console.log(this.comments, 'this.comments-')
    },
    async submit() {
      await submitComments(this.result.slug, {
        comment: {
          body: this.formValues.body,
        },
      })
      this.formValues.body = ''
      this.getComments()
    },
    async deleteComment(data) {
      await deleteComments(this.result.slug, data.id)
      this.getComments()
    },
  },
  computed: {
    innerUser() {
      return this.user || {}
    },
  },
}
</script>

<style></style>
