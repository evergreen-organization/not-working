import Moment from 'moment'

export const formatWFHRecord = (dates) => {
  let record = {}
  list.map((date) => {
    let formattedDate = Moment(date, "M/D/YYYY").format("YYYY-MM-DD")
    record = Object.assign(
      record,
      Object.assign({
        [formattedDate]: {
          customStyles: {
            container: {
              backgroundColor: '#F1F1F1',
              borderRadius: 10,
            },
          },
        },
      })
    )
  })
  return record
}