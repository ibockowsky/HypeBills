<template>
  <div class="home mx-auto bg-gray-700 w-2/5 shadow-md rounded">
    <div class="w-full max-w-xs mx-auto">
      <form class="px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <BaseInput
            label="E-mail"
            v-model="userForm.email"
            type="text"
            placeholder="example@example.com"
          />
        </div>
        <div class="mb-6">
          <BaseInput
            label="Password"
            v-model="userForm.password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex flex-col items-center justify-center">
          <BaseButton @click.prevent="login">Login!</BaseButton>
          <router-link to="/register" class="text-white text-sm"
            >No account? Register!</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/loginUser', this.userForm)
    }
  }
}
</script>
