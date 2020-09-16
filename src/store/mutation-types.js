export const ALERTS = 'alerts/'
export const BILLS = 'bills/'
export const DEALS = 'deals/'
export const USER = 'user/'

export const ADD_ALERT = 'addAlert'
export const REMOVE_ALERT = 'removeAlert'
export const A_ADD_ALERT = `${ALERTS}${ADD_ALERT}`
export const A_REMOVE_ALERT = `${ALERTS}${REMOVE_ALERT}`

export const GET_BILLS = 'getBills'
export const SET_BILLS = 'setBills'
export const ADD_BILL = 'addBill'
export const REMOVE_BILL = 'removeBill'
export const UPDATE_BILL = 'updateBill'
export const ADD_ITEM_TO_BILL = 'addItemToBill'
export const B_GET_BILLS = `${BILLS}${GET_BILLS}`
export const B_ADD_BILL = `${BILLS}${ADD_BILL}`
export const B_REMOVE_BILL = `${BILLS}${REMOVE_BILL}`
export const B_ADD_ITEM_TO_BILL = `${BILLS}${ADD_ITEM_TO_BILL}`

export const SET_DEALS = 'SET_DEALS'
export const GET_DEALS = 'getDeals'
export const ADD_DEAL = 'addDeal'
export const REMOVE_DEAL = 'removeDeal'
export const UPDATE_DEAL = 'updateDeal'
export const GET_DEAL = 'getDeal'
export const GET_TOTAL_OUTGOINGS = 'getTotalOutgoings'
export const GET_TOTAL_INCOMINGS = 'getTotalIncomings'
export const GET_CURRENT_HOLD = 'getCurrentHold'
export const GET_PROBABLE_INCOME = 'getProbableIncome'
export const GET_TOTAL_EARNINGS = 'getTotalEarnings'
export const D_GET_DEALS = `${DEALS}${GET_DEALS}`
export const D_ADD_DEAL = `${DEALS}${ADD_DEAL}`
export const D_REMOVE_DEAL = `${DEALS}${REMOVE_DEAL}`
export const D_UPDATE_DEAL = `${DEALS}${UPDATE_DEAL}`
export const D_GET_DEAL = `${DEALS}${GET_DEAL}`
export const D_GET_TOTAL_OUTGOINGS = `${DEALS}${GET_TOTAL_OUTGOINGS}`
export const D_GET_TOTAL_INCOMINGS = `${DEALS}${GET_TOTAL_INCOMINGS}`
export const D_GET_CURRENT_HOLD = `${DEALS}${GET_CURRENT_HOLD}`
export const D_GET_PROBABLE_INCOME = `${DEALS}${GET_PROBABLE_INCOME}`
export const D_GET_TOTAL_EARNINGS = `${DEALS}${GET_TOTAL_EARNINGS}`

export const SET_USER = 'SET_USER'
export const SET_USER_DATA = 'SET_USER_DATA'
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA'
export const SET_CURRENCIES = 'SET_CURRENCIES'
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
export const LOGIN_USER = 'loginUser'
export const REGISTER_USER = 'registerUser'
export const LOGOUT_USER = 'logoutUser'
export const GET_USER_DATA = 'getUserData'
export const GET_CURRENCIES = 'getCurrencies'
export const CHANGE_DEFAULT_CURRENCY = 'changeDefaultCurrency'
export const GET_USER_ID = 'getUserId'
export const IS_LOGGED_IN = 'isLoggedIn'
export const GET_BASE_CURRENCY = 'getBaseCurrency'
export const U_GET_USER_DATA = `${USER}${GET_USER_DATA}`
export const U_LOGIN_USER = `${USER}${LOGIN_USER}`
export const U_REGISTER_USER = `${USER}${REGISTER_USER}`
export const U_LOGOUT_USER = `${USER}${LOGOUT_USER}`
export const U_GET_USER_ID = `${USER}${GET_USER_ID}`
export const U_IS_LOGGED_IN = `${USER}${IS_LOGGED_IN}`
export const U_GET_BASE_CURRENCY = `${USER}${GET_BASE_CURRENCY}`
export const U_CHANGE_DEFAULT_CURRENCY = `${USER}${CHANGE_DEFAULT_CURRENCY}`
