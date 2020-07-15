<template>
  <div class="home mx-auto bg-gray-700 w-2/5 shadow-md rounded">
    <div class="w-full max-w-xs mx-auto">
      <form class="px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <BaseInput />
          <label class="block text-white text-sm font-bold mb-2" for="username">
            E-mail
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="userForm.email"
            type="text"
            placeholder="example@example.com"
          />
        </div>
        <div class="mb-6">
          <label class="block text-white text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="userForm.password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex flex-col items-center justify-center">
          <button
            class="transition-all duration-500 ease-in-out text-white font-semibold  py-2 px-8 rounded shadow focus:outline-none transform hover:-translate-y-1 hover:scale-110 bg-gradient-default-blue-pink"
            @click.prevent="register"
          >
            Register!
          </button>
          <router-link to="/login" class="text-white text-sm"
            >Already have an account? Login!</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      userForm: {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped></style>
