<template>
  <div class="home mx-auto bg-gray-900 w-11/12 md:w-2/5 shadow-md rounded">
    <div class="w-full max-w-xs mx-auto">
      <div class="px-8 pt-6 pb-8 mb-4" @keyup.enter="register">
        <BaseInputError v-if="alert.length" :message="alert" />
        <div class="mb-4">
          <BaseInput
            label="Name"
            v-model="$v.userForm.username.$model"
            :errorClass="$v.userForm.username.$error"
            type="text"
            placeholder="John Doe"
          />
          <BaseInputError
            v-if="$v.userForm.username.$error"
            message="Username must contain more than 2 chars"
          />
        </div>
        <div class="mb-4">
          <BaseInput
            label="E-mail"
            v-model="$v.userForm.email.$model"
            :errorClass="$v.userForm.email.$error"
            type="text"
            placeholder="example@example.com"
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
          />
          <template v-if="$v.userForm.password.$error">
            <BaseInputError
              v-if="!$v.userForm.password.required"
              message="Please enter a valid password."
            />
            <BaseInputError
              v-if="!$v.userForm.password.strongPassword"
              message="Password must contain 8 chars, letters, numbers and special chars."
            />
          </template>
        </div>
        <div class="mb-6">
          <BaseInput
            label="Confirm password"
            v-model="$v.userForm.confirmedPassword.$model"
            type="password"
            placeholder="******************"
          />
          <BaseInputError
            v-if="
              $v.userForm.confirmedPassword.$dirty &&
                !$v.userForm.confirmedPassword.sameAsPassword
            "
            message="Passwords must be the same"
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
import { isStrongPassword } from '@/helpers/vuelidateHelpers.js'
export default {
  name: 'Register',
  data() {
    return {
      userForm: {
        username: '',
        email: '',
        password: '',
        confirmedPassword: ''
      },
      alert: ''
    }
  },
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
      if (!this.$v.userForm.$anyError && this.$v.userForm.$anyDirty) {
        this.registerUser(this.userForm)
        this.alert = ''
      } else {
        this.alert = 'The form is not completed'
      }
    }
  }
}
</script>

<style scoped></style>
