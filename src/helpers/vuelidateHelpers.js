import { required, helpers } from 'vuelidate/lib/validators'

export const isMoneyType = helpers.regex(
  '',
  /^[0-9]+((\.[0-9]{1,2})|(\,[0-9]{1,2}))?$/
)

export const isStrongPassword = helpers.regex(
  '',
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
)

export const isInteger = value => {
  return Number.isInteger(value)
}

export const errorInputMessages = {
  empty: 'This input can not be empty.',
  notNumber: 'This input must be a number.',
  notInteger: 'This input must be an integer.',
  lowPassword: 'Password is too low. Use stronger.',
  notTheSame: 'Passwords are not the same.',
  notEmail: 'This input is not an email.',
  formError: 'The form is not completed.'
}

export const dealFormValidate = {
  title: { required },
  size: {},
  date: { required },
  retail: { required, isMoneyType },
  payout: { required, isMoneyType },
  currency: { required },
  where: {},
  status: { required }
}

export default {
  isMoneyType,
  isStrongPassword,
  isInteger,
  dealFormValidate,
  errorInputMessages
}
