export const formatRejectLeave = (list, day) => {
  let object = {}

  const assignReject = (item, key) => {
    return Object.assign({
      [item.isRejected ? key : day.dateString]: {
        customStyles: {
          text: {
            textDecorationLine: 'line-through',
            color: '#E36B6B'
          }
        },
        dayType: item.dayType,
        isRejected: true
      }
    })
  }

  const assignFullDay = (item, key) => {
    return Object.assign({
      [key]: {
        customStyles: {
          container: {
            backgroundColor: '#C0E5FF',
            borderRadius: 10
          }
        },
        dayType: item.dayType,
        isRejected: false
      }
    })
  }

  const assignHalfDay = (item, key) => {
    return Object.assign({
      [key]: {
        customStyles: {
          container: {
            backgroundColor: 'transparent',
            borderColor: '#C0E5FF',
            borderLeftWidth: item.dayType === 1 ? 14 : 0,
            borderRightWidth: item.dayType === 1 ? 0 : 14,
            transform: [{ rotate: '90deg' }],
            borderRadius: 10
          },
          text: { position: 'absolute', transform: [{ rotate: '-90deg' }], paddingBottom: 3.5 }
        },
        dayType: item.dayType,
        isRejected: false
      }
    })
  }

  Object.entries(list).forEach(([key, item]) => {
    if ((!item.isRejected && key === day.dateString) || (item.isRejected && key !== day.dateString)) {
      object = Object.assign(object, assignReject(item, key));
    } else {
      if (item.dayType === 0) {
        object = Object.assign(object, assignFullDay(item, key))
      } else {
        object = Object.assign(object, assignHalfDay(item, key))
      }
    }
  })
  return object
}
