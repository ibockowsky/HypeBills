<template>
  <div class="home mx-auto bg-gray-900 w-11/12 md:w-2/5 shadow-md rounded">
    <div class="w-full max-w-xs mx-auto">
      <div class="px-8 pt-6 pb-8 mb-4" @keyup.enter="login">
        <div class="h-6 text-red-500 text-xs">
          <span v-if="alert">{{ errorInputMessages.formError }}</span>
        </div>
        <div class="mb-4">
          <BaseInput
            label="E-mail"
            type="text"
            placeholder="example@example.com"
            v-model="$v.userForm.email.$model"
            :errorClass="$v.userForm.email.$error"
            :errorContent="errorInputMessages.notEmail"
            @blur="$v.userForm.email.$touch()"
          />
        </div>
        <div class="mb-6">
          <BaseInput
            label="Password"
            type="password"
            placeholder="******************"
            v-model="$v.userForm.password.$model"
            :errorClass="$v.userForm.password.$error"
            :errorContent="errorInputMessages.lowPassword"
            @blur="$v.userForm.password.$touch()"
          />
        </div>
        <div class="flex flex-col items-center justify-center">
          <BaseButton @click.prevent="login">Login!</BaseButton>
          <router-link to="/register" class="text-white text-sm"
            >No account? Register!</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import {
  isStrongPassword,
  errorInputMessages
} from '@/helpers/vuelidateHelpers.js'

export default {
  name: 'Login',
  data: () => ({
    userForm: {
      email: '',
      password: ''
    },
    alert: false,
    errorInputMessages
  }),
  validations: {
    userForm: {
      email: { required, email },
      password: {
        required,
        isStrongPassword
      }
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'user/loginUser'
    }),
    login() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.loginUser(this.userForm)
        this.alert = false
      } else this.alert = true
    }
  }
}
</script>
