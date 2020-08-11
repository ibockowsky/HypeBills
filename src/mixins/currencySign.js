export const currencySign = {
  methods: {
    currencySign: currency_name => {
      let currency_symbols = {
        USD: '$', // US Dollar
        EUR: '€', // Euro
        CRC: '₡', // Costa Rican Colón
        GBP: '£', // British Pound Sterling
        ILS: '₪', // Israeli New Sheqel
        INR: '₹', // Indian Rupee
        JPY: '¥', // Japanese Yen
        KRW: '₩', // South Korean Won
        NGN: '₦', // Nigerian Naira
        PHP: '₱', // Philippine Peso
        PLN: 'zł', // Polish Zloty
        PYG: '₲', // Paraguayan Guarani
        THB: '฿', // Thai Baht
        UAH: '₴', // Ukrainian Hryvnia
        VND: '₫' // Vietnamese Dong
      }
      console.log(currency_name)
      if (currency_symbols[currency_name] !== undefined) {
        return currency_symbols[currency_name]
      }
    }
  }
}
