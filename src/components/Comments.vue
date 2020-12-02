<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Comment</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          id="close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form @submit.prevent>
        <div class="modal-body">
          <textarea
            class="form-control border-0"
            placeholder="Add comment ....."
            v-model.trim="comment"
          ></textarea>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="addComment()"
            :disabled="comment == ''"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { commentsCollection, postsCollection, auth } from '@/firebase'
export default {
  props: ['post'],
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    async addComment () {
      // CREATE COMMENT
      await commentsCollection.add({
        createdOn: new Date(),
        content: this.comment,
        postId: this.post.id,
        userId: auth.currentUser.uid,
        userName: this.$store.state.userProfile.name
      })

      this.comment = ''

      // UPDATE COMMENT COUNT ON POST
      await postsCollection.doc(this.post.id).update({
        comments: parseInt(this.post.comments) + 1
      })
    }
  }
}
</script>

<style>
</style>
