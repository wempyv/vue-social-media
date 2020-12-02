import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

// REALTIME FIREBASE
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  const postsArray = []
  snapshot.forEach(doc => {
    const post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })
  store.commit('setPosts', postsArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: []
  },
  mutations: {
    setUserProfile (state, val) {
      state.userProfile = val
    },
    setPosts (state, val) {
      state.posts = val
    }
  },
  actions: {

    // FETCH USER PROFILE
    async fetchUserProfile ({
      commit
    }, user) {
      const userProfile = await fb.userCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())
      // Change Route to dashboard
      router.push('/')
    },

    // SIGN IN
    async login ({
      dispatch
    }, form) {
      const {
        user
      } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      dispatch('fetchUserProfile', user)
    },

    // SIGN UP
    async signup ({
      dispatch
    }, form) {
      const {
        user
      } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      await fb.userCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      })

      dispatch('fetchUserProfile', user)
    },

    // LOGOUT
    async logout ({
      commit
    }) {
      await fb.auth.signOut()
      commit('setUserProfile', {})
      router.push('/login')
    },

    // CREATE POST
    async createPost ({
      state,
      commit
    }, post) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },

    // LIKES POST
    async likePost ({
      commit
    }, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) {
        return
      }

      // Create post likes
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      // update post like count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })
    },

     // Update Profile
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      // update user object
      const userRef = await fb.userCollection.doc(userId).update({
        name: user.name,
        title: user.title
      })

      dispatch('fetchUserProfile', { uid: userId })

      // update all posts by user
      const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name
        })
      })

      // update all comments by user
      const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
      commentDocs.forEach(doc => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    }
  },

  modules: {}
})

export default store
