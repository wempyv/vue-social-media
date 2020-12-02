<template>
  <div class="section-dashboard">
    <Navigation></Navigation>
    <div class="container">
      <div class="d-flex flex-column mt-3">
        <h5>{{ getHoursCondition }}</h5>
        <div class="profile d-flex">
          <i class="fa fa-user-circle fa-2x"></i>
          <div class="profile-detail ml-1">
            <p class="profile-name">{{ userProfile.name }}</p>
            <p class="profile-job">{{ userProfile.title }}</p>
          </div>
        </div>
        <div class="create-post mt-2">
          <p class="caption mb-0">Create post</p>
          <form @submit.prevent>
            <div class="form-group">
              <textarea
                cols="30"
                rows="2"
                class="form-control"
                v-model.trim="post.content"
              ></textarea>
            </div>
            <div class="form-group">
              <button
                class="btn btn-outline-dark d-flex ml-auto"
                @click="createPost()"
                :disabled="post.content === ''"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="section-posts-content mt-2" v-if="posts.length">
        <h4>New posts</h4>
        <div
          class="post-content shadow-sm p-3 mb-5 bg-white rounded mt-1"
          v-for="post in posts"
          :key="post.id"
        >
          <div class="header-post">
            <p class="username mb-0">{{ post.userName }}</p>
            <p class="created-on">{{ post.createdOn | formatDate }}</p>
          </div>
          <div class="content">
            <p class="post-contents">{{ post.content | trimLength }}</p>
          </div>
          <div class="feature">
            <div class="likes">
              <span class="like">{{ post.likes }}</span>
              <a class="like-icon" @click="likePost(post.id, post.likes)"
                ><i class="far fa-thumbs-up"></i
              ></a>
            </div>
            <div class="comments ml-3">
              <span class="comment">{{ post.comments }}</span>
              <a
                @click="toggleCommentModal(post)"
                class="comment-icon"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                ><i class="far fa-comment"></i
              ></a>
            </div>
            <a
              @click="viewPost(post)"
              class="ml-auto full-post"
              data-toggle="modal"
              data-target="#exampleModalScrollable"
              >View full post</a
            >
          </div>
        </div>
      </div>
      <div class="content-no-result" v-else>
        <p class="text-align-center">There are currently no posts</p>
      </div>

      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <Comments :post="selectedPost"></Comments>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModalScrollable"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalScrollableTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalScrollableTitle">
                Full post
              </h5>
              <button
                @click="closePostModal()"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="full-profile">
                <h5 class="mb-0">{{ fullPost.userName }}</h5>
                <p class="date">{{ fullPost.createdOn | formatDate }}</p>
              </div>
              <div class="full-content mt-2">
                <p class="full-content-caption">{{ fullPost.content }}</p>
              </div>
              <div class="feature">
                <div class="likes">
                  <span class="like">{{ fullPost.likes }}</span>
                  <a class="like-icon"><i class="far fa-thumbs-up"></i></a>
                </div>
                <div class="comments ml-4">
                  <span class="comment mr-1">{{ fullPost.comments }}</span>
                  <a><i class="far fa-comment"></i></a>
                </div>
              </div>
              <div class="comments">
                <hr />
                <p class="comment-content">All Comments</p>
                <div class="comments-value shadow-sm px-2 mt-4" v-for="comment in postComments" :key="comment.id">
                  <p class="comments-name mb-0">{{comment.userName}}</p>
                  <p class="comments-caption mb-0">{{comment.content}}</p>
                  <p class="date mb-0">{{comment.createdOn | formatDate}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Navigation from '../components/Navigation'
import Comments from '../components/Comments'
import { commentsCollection } from '@/firebase'
export default {
  name: 'Dashboard',
  components: {
    Navigation,
    Comments
  },
  data () {
    return {
      comment: '',
      hours: new Date().getHours(),
      post: {
        content: ''
      },
      selectedPost: {},
      fullPost: {},
      postComments: []
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts']),
    getHoursCondition: function () {
      if (this.hours > '01' && this.hours < 11) {
        return 'Good morning'
      } else if (this.hours > 11 && this.hours < 17) {
        return 'Good afternoon'
      } else if (this.hours > 18 && this.hours < 24) {
        return 'Good evening'
      } else {
        return 'something'
      }
    }
  },
  methods: {
    createPost () {
      this.$store.dispatch('createPost', { content: this.post.content })
      this.post.content = ''
    },
    toggleCommentModal (post) {
      this.selectedPost = post
      console.log(this.selectedPost)
    },
    likePost (id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
    },
    async viewPost (post) {
      const docs = await commentsCollection
        .where('postId', '==', post.id)
        .get()

      docs.forEach((doc) => {
        const comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })
      this.fullPost = post
    },
    closePostModal () {
      this.postComments = []
    }
  },
  filters: {
    formatDate (val) {
      if (!val) {
        return '-'
      }
      const date = val.toDate()
      return moment(date).fromNow()
    },
    trimLength (val) {
      if (val.length < 200) {
        return val
      }
      return `${val.substring(0, 200)}...`
    }
  }
}
</script>

<style>
</style>
