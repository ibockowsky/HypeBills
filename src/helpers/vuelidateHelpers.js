import { helpers } from 'vuelidate/lib/validators'

export const isMoneyType = helpers.regex(
  '',
  /^[0-9]+((\.[0-9]{1,2})|(\,[0-9]{1,2}))?$/
)

export const isStrongPassword = helpers.regex(
  '',
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
)

export default { isMoneyType, isStrongPassword }
