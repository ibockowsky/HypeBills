import axios from 'axios'

const getCurrencies = () => {
  axios.get(`https://api.exchangeratesapi.io/latest`).then(response => {
    console.log(response)
  })
}

export { getCurrencies }
