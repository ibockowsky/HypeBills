import Dinero from 'dinero.js'

export const calcSumByCondition = ({
  array,
  toSum,
  toCondition,
  condition,
  currency,
  currencies
}) => {
  if (array.length === 0) return 0

  let sum = 0

  if (condition !== undefined && toCondition !== undefined) {
    sum = array.reduce((prev, cur) => {
      if (cur[toCondition] === condition) {
        if (cur.currency !== currency) {
          const amountValue = parseToAmount(cur[toSum])
          const exchanged = Dinero({ amount: amountValue }).divide(
            currencies[cur.currency]
          )
          return prev.add(exchanged)
        } else {
          const amountValue = parseToAmount(cur[toSum])
          return prev.add(Dinero({ amount: amountValue }))
        }
      } else return prev.add(Dinero({ amount: 0 }))
    }, Dinero({ amount: 0 }))
  } else {
    sum = array.reduce((prev, cur) => {
      if (cur.currency !== currency) {
        const amountValue = parseToAmount(cur[toSum])
        const exchanged = Dinero({ amount: amountValue }).divide(
          currencies[cur.currency]
        )
        return prev.add(exchanged)
      } else {
        const amountValue = parseToAmount(cur[toSum])
        return prev.add(Dinero({ amount: amountValue }))
      }
    }, Dinero({ amount: 0 }))
  }
  return sum
}

export const parseToAmount = value => {
  const oldValue = value.toString()
  if (oldValue.includes(',') || oldValue.includes('.')) {
    const newValue = oldValue.replace(',', '').replace('.', '')
    return parseInt(newValue)
  } else {
    return parseInt(oldValue) * 100
  }
}

export default { calcSumByCondition, parseToAmount }
