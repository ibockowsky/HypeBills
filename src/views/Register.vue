<template>
  <div class="home mx-auto bg-gray-900 w-11/12 md:w-2/5 shadow-md rounded">
    <div class="w-full max-w-xs mx-auto">
      <div class="px-8 pt-6 pb-8 mb-4" @keyup.enter="register">
        <div class="h-6 text-red-500 text-xs">
          <span v-if="alert">{{ errorInputMessages.formError }}</span>
        </div>
        <div class="mb-4">
          <BaseInput
            label="Name"
            type="text"
            placeholder="John Doe"
            v-model="$v.userForm.username.$model"
            :errorClass="$v.userForm.username.$error"
            :errorContent="errorInputMessages.empty"
          />
        </div>
        <div class="mb-4">
          <BaseInput
            label="E-mail"
            type="text"
            placeholder="example@example.com"
            v-model="$v.userForm.email.$model"
            :errorClass="$v.userForm.email.$error"
            :errorContent="errorInputMessages.notEmail"
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
          />
        </div>
        <div class="mb-6">
          <BaseInput
            label="Confirm password"
            type="password"
            placeholder="******************"
            v-model="$v.userForm.confirmedPassword.$model"
            :errorClass="$v.userForm.confirmedPassword.$error"
            :errorContent="errorInputMessages.notTheSame"
          />
        </div>
        <div class="flex flex-col items-center justify-center">
          <BaseButton @click.prevent="register">Register!</BaseButton>
          <router-link to="/login" class="text-white text-sm">
            Already have an account? Login!
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import {
  isStrongPassword,
  errorInputMessages
} from '@/helpers/vuelidateHelpers.js'
export default {
  name: 'Register',
  data: () => ({
    userForm: {
      username: '',
      email: '',
      password: '',
      confirmedPassword: ''
    },
    alert: false,
    errorInputMessages
  }),
  validations: {
    userForm: {
      email: { required, email },
      username: { required, minLength: minLength(2) },
      password: {
        required,
        isStrongPassword
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    ...mapActions({
      registerUser: 'user/registerUser'
    }),
    register() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.registerUser(this.userForm)
        this.alert = false
      } else this.alert = true
    }
  }
}
</script>

<style scoped></style>
