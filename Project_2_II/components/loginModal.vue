<template>
    <!-- Button to open modal -->
    <button class="btn btn-primary" @click="showModal = true">Login/Sign Up</button>

    <!-- Modal -->
    <div class="modal" tabindex="-1" role="dialog" :class="{'is-active': showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{modalTitle}}</p>
          <button class="delete" aria-label="close" @click="showModal = false"></button>
        </header>
        <section class="modal-card-body">
          <!-- Login form -->
          <form v-if="isLogin" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" v-model="email" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" v-model="password" required>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link" type="submit">Login</button>
              </div>
            </div>
            <div class="field">
              <p class="has-text-grey">
                <a @click="isLogin = false">Don't have an account? Sign up here.</a>
              </p>
            </div>
          </form>

          <!-- Sign up form -->
          <form v-else @submit.prevent="signup">
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input class="input" type="text" v-model="firstName" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input class="input" type="text" v-model="lastName" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" v-model="email" required>
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" v-model="password" required>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link" type="submit">Sign up</button>
              </div>
            </div>
            <div class="field">
              <p class="has-text-grey">
                <a @click="isLogin = true">Already have an account? Log in here.</a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
</template>
  
  <script>
  import { login, register } from '@/components/api.js';
  export default {
    data() {
      return {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        email2: '',
        password2: ''
      }
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/api/users/login', {
            email: this.email,
            password: this.password
          })
          localStorage.setItem('token', response.data.token)
          window.location.reload()
        } catch (error) {
          alert('Invalid email or password')
        }
      },
      async register() {
        try {
          await axios.post('/users', {
            email: this.email2,
            password: this.password2,
            firstName: this.firstName,
            lastName: this.lastName
          })
          const response = await axios.post('/api/users/login', {
            email: this.email2,
            password: this.password2
          })
          localStorage.setItem('token', response.data.token)
          window.location.reload()
        } catch (error) {
          alert('An error occurred while signing up')
        }
      }
    }
  }
  </script>