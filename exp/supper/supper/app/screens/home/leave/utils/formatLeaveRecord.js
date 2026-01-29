import Moment from 'moment';
import { colors } from 'configs';

export const formatLeaveRecord = (list) => {
  let record = {};
  list.map((item) => {
    let formattedDate = Moment(item.date, 'M/D/YYYY').format('YYYY-MM-DD');
    if (item.leaveCode === 'PPH1') {
      record = Object.assign(
        record,
        Object.assign({
          [formattedDate]: {
            customStyles: {
              container: {
                borderBottomWidth: 1.5,
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5,
                borderColor: '#505050'
              }
            }
          }
        })
      );
    } else {
      if (item.dayType === 0) {
        record = Object.assign(
          record,
          Object.assign({
            [formattedDate]: {
              customStyles: {
                container: {
                  backgroundColor: item.color,
                  borderRadius: 10
                }
              }
            }
          })
        );
      } else {
        //record[formattedDate]?.customStyles?.container?.borderColor = same day applied, eg. first half & second half applied separately
        const bgColor = record[formattedDate]?.customStyles?.container?.borderColor ?? "transparent";
        record = Object.assign(
          record,
          Object.assign({
            [formattedDate]: {
              customStyles: {
                container: {
                  backgroundColor: bgColor,
                  borderColor: item.color,
                  borderLeftWidth: item.dayType === 1 ? 16 : 0,
                  borderRightWidth: item.dayType === 1 ? 0 : 16,
                  transform: [{ rotate: '90deg' }],
                  borderRadius: 10
                },
                text: { position: 'absolute', transform: [{ rotate: '-90deg' }], paddingBottom: 3.5 } //paddingBottom: manually adjust text position
              }
            }
          })
        );
      }
    }
  });
  return record;
};

export const formatPendingLeaveRecord = (list) => {
  let record = {};
  list.map((item) => {
    let formattedDate = Moment(item.leaveDate, 'M/D/YYYY').format('YYYY-MM-DD');
    if (item.dayType === 0) {
      record = Object.assign(
        record,
        Object.assign({
          [formattedDate]: {
            customStyles: {
              container: {
                backgroundColor: item.color,
                borderRadius: 10
              }
            },
            dayType: item.dayType,
            isRejected: false
          }
        })
      );
    } else {
      const bgColor = record[formattedDate]?.customStyles?.container?.borderColor ?? "transparent";
      record = Object.assign(
        record,
        Object.assign({
          [formattedDate]: {
            customStyles: {
              container: {
                backgroundColor: bgColor,
                borderColor: item.color,
                borderLeftWidth: item.dayType === 1 ? 16 : 0,
                borderRightWidth: item.dayType === 1 ? 0 : 16,
                transform: [{ rotate: '90deg' }],
                borderRadius: 10
              },
              text: { position: 'absolute', transform: [{ rotate: '-90deg' }], paddingBottom: 3.5 }
            },
            dayType: item.dayType,
            isRejected: false
          }
        })
      );
    }
  });
  return record;
};

export const formatApplyLeaveRecord = (list) => {
  let record = {};
  list.map((item) => {
    let formattedDate = Moment(item.date, 'M/D/YYYY').format('YYYY-MM-DD');
    if (item.leaveCode === 'PPH1') {
      record = Object.assign(
        record,
        Object.assign({
          [formattedDate]: {
            customStyles: {
              container: {
                borderBottomWidth: 1.5,
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5,
                borderColor: '#505050'
              }
            },
            dayType: 0,
            isBlocked: true,
            type: 'H'
          }
        })
      );
    } else {
      if (item.dayType === 0) {
        record = Object.assign(
          record,
          Object.assign({
            [formattedDate]: {
              customStyles: {
                container: {
                  backgroundColor: '#E1E1E1',
                  borderRadius: 10,

                },
                text: {
                  color: Moment(formattedDate) < Moment(Date()) ? colors.white : null
                }
              },

              dayType: 0,
              isBlocked: true,
              type: 'A'
            }
          })
        );
      } else {
        const bgColor = record[formattedDate]?.customStyles?.container?.borderColor ?? "transparent";
        record = Object.assign(
          record,
          Object.assign({
            [formattedDate]: {
              customStyles: {
                container: {
                  backgroundColor: bgColor,
                  borderColor: "#E1E1E1",
                  borderLeftWidth: item.dayType === 1 ? 16 : 0,
                  borderRightWidth: item.dayType === 1 ? 0 : 16,
                  transform: [{ rotate: '90deg' }],
                  borderRadius: 10
                },
                text: { position: 'absolute', transform: [{ rotate: '-90deg' }], paddingBottom: 3.5 }
              },
              dayType: item.dayType,
              isBlocked: true,
              type: 'A'
            }
          })
        );
      }
    }
  });
  return record;
};

export const formatEmergencyLeave = (date) => {
  let object = {};
  for (let i = 0; i < 7; i++) {
    object = Object.assign(
      object,
      Object.assign({
        [Moment(date).add(i, 'days').format('YYYY-MM-DD')]: {
          customStyles: {
            text: {
              textDecorationLine: 'line-through'
            }
          },
          dayType: 0,
          isBlocked: true,
          type: 'E'
        }
      })
    );
  }
  return object;
};

export const formatOffDates = (list) => {
  let record = {};
  list.map((item) => {
    let formattedDate = Moment(item.offDate, 'M/D/YYYY').format('YYYY-MM-DD');
    record = Object.assign(
      record,
      Object.assign({
        [formattedDate]: {
          customStyles: {
            text: {
              color: '#d9e1e8'
            }
          },
          dayType: 0,
          isBlocked: true,
          type: 'O'
        }
      })
    );
  });
  return record;
};

export const formatReliefLeaveRecord = (list) => {
  let record = {};
  list.map((item) => {
    let formattedDate = Moment(item.date, 'M/D/YYYY').format('YYYY-MM-DD');
    record = Object.assign(
      record,
      Object.assign({
        [formattedDate]: {
          customStyles: {
            text: {
              textDecorationLine: 'line-through'
            }
          },
          dayType: 0,
          isBlocked: true,
          type: 'R'
        }
      })
    );
  });
  return record;
};
