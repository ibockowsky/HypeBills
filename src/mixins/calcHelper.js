export const calcSumByCondition = ({
  array,
  to_sum,
  to_condition,
  condition,
  currency,
  currencies
}) => {
  if (array.length === 0) return 0

  let sum = 0

  if (condition !== undefined && to_condition !== undefined) {
    sum = array.reduce((prev, cur) => {
      if (cur[to_condition] === condition) {
        if (cur.currency !== currency) {
          const exchanged = parseFloat(
            (cur[to_sum] / currencies[cur.currency]).toFixed(2)
          )
          return prev + exchanged
        } else return prev + parseFloat(cur[to_sum])
      } else return prev + 0
    }, 0)
  } else {
    sum = array.reduce((prev, cur) => {
      if (cur.currency !== currency) {
        const exchanged = cur[to_sum] / currencies[cur.currency]
        return prev + parseFloat(exchanged.toFixed(2))
      } else {
        return prev + parseFloat(cur[to_sum])
      }
    }, 0)
  }
  return Number(Math.round(sum + 'e2') + 'e-2')
}

export default { calcSumByCondition }
