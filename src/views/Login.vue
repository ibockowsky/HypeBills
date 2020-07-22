<template>
  <div class="home mx-auto bg-gray-900 w-2/5 shadow-md rounded">
    <div class="w-full max-w-xs mx-auto">
      <div class="px-8 pt-6 pb-8 mb-4" @keyup.enter="login">
        <BaseInputError v-if="alert.length" :message="alert" />
        <div class="mb-4">
          <BaseInput
            label="E-mail"
            v-model="$v.userForm.email.$model"
            type="text"
            placeholder="example@example.com"
            :errorClass="$v.userForm.email.$error"
            @blur="$v.userForm.email.$touch()"
          />
          <BaseInputError
            v-if="$v.userForm.email.$error"
            message="Please enter a valid email."
          />
        </div>
        <div class="mb-6">
          <BaseInput
            label="Password"
            v-model="$v.userForm.password.$model"
            type="password"
            placeholder="******************"
            :errorClass="$v.userForm.password.$error"
            @blur="$v.userForm.password.$touch()"
          />
          <template v-if="$v.userForm.password.$error">
            <BaseInputError
              v-if="!$v.userForm.password.required"
              message="Please enter a valid password."
            />
            <BaseInputError
              v-if="!$v.userForm.password.strongPassword"
              message="It must contain 8 chars, letters, numbers and special chars."
            />
          </template>
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
import { required, email, strongPassword } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data() {
    return {
      userForm: {
        email: '',
        password: ''
      },
      alert: ''
    }
  },
  validations: {
    userForm: {
      email: { required, email },
      password: {
        required,
        strongPassword(password) {
          return (
            /[a-z]/.test(password) && //checks for a-z
            /[0-9]/.test(password) && //checks for 0-9
            /\W|_/.test(password) && //checks for special char
            password.length >= 8
          )
        }
      }
    }
  },
  methods: {
    login() {
      if (!this.$v.userForm.$anyError && this.$v.userForm.$anyDirty) {
        this.$store.dispatch('user/loginUser', this.userForm)
        this.alert = ''
      } else {
        this.alert = 'The form is not completed'
      }
    }
  }
}
</script>
