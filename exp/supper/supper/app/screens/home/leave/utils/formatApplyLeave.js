export const formatApplyLeaveOnCalendar = (selectedDaysOnCalendar, leaveRecord, day, dayTypeIndex) => {
  let object = {}
  const selectedColor = "#C0E5FF"
  const blockedColor = "#E1E1E1"
  if (leaveRecord[day.dateString] && leaveRecord[day.dateString].isBlocked) {
    if (leaveRecord[day.dateString].dayType === 0 || dayTypeIndex === 0 || leaveRecord[day.dateString].dayType === dayTypeIndex) {
      if (leaveRecord[day.dateString].type === "E") return { problem: "No short notice and emergency leave" }
      if (leaveRecord[day.dateString].type === "A") return { problem: "Date is already applied" }
      if (leaveRecord[day.dateString].type === "H") return { problem: "It's holiday" }
      if (leaveRecord[day.dateString].type === "R") return { problem: "Relief is on leave" }
      if (leaveRecord[day.dateString].type === "O") return { problem: "It's off day" }
    }
    else {
      Object.assign(object, selectedDaysOnCalendar)

      if (leaveRecord[day.dateString].dayType === 2) {
        if (leaveRecord[day.dateString].newLeaveDayType) {
          object = {
            [day.dateString]: {
              customStyles: {
                container: {
                  backgroundColor: "transparent",
                  borderRightWidth: 15,
                  borderRightColor: blockedColor,
                  transform: [{ rotate: "90deg" }],
                  borderRadius: 10
                },
                text: { position: "absolute", transform: [{ rotate: "-90deg" }], paddingBottom: 3.5 },
              },
              dayType: 2,
              isBlocked: true,
              type: "A",
            },
          }
        } else {
          object = {
            [day.dateString]: {
              customStyles: {
                container: {
                  backgroundColor: selectedColor,
                  borderRightWidth: 15,
                  borderRightColor: blockedColor,
                  transform: [{ rotate: "90deg" }],
                  borderRadius: 10
                },
                text: { position: "absolute", transform: [{ rotate: "-90deg" }], paddingBottom: 3.5 },
              },
              dayType: 2,
              isBlocked: true,
              type: "A",
              newLeaveDayType: 1,
            },
          }
        }
      } else {
        if (leaveRecord[day.dateString].newLeaveDayType) {
          object = {
            [day.dateString]: {
              customStyles: {
                container: {
                  backgroundColor: "transparent",
                  borderLeftWidth: 15,
                  borderLeftColor: blockedColor,
                  transform: [{ rotate: "90deg" }],
                  borderRadius: 10
                },
                text: { position: "absolute", transform: [{ rotate: "-90deg" }], paddingBottom: 3.5 },
              },
              dayType: 1,
              isBlocked: true,
              type: "A",
            },
          }
        } else {
          object = {
            [day.dateString]: {
              customStyles: {
                container: {
                  backgroundColor: selectedColor,
                  borderLeftWidth: 15,
                  borderLeftColor: blockedColor,
                  transform: [{ rotate: "90deg" }],
                  borderRadius: 10
                },
                text: { position: "absolute", transform: [{ rotate: "-90deg" }], paddingBottom: 3.5 },
              },
              dayType: 1,
              isBlocked: true,
              type: "A",
              newLeaveDayType: 2,
            },
          }
        }
      }
      return object
    }
  }
  else {
    Object.assign(object, selectedDaysOnCalendar)
    if (
      selectedDaysOnCalendar[day.dateString] !== undefined &&
      selectedDaysOnCalendar[day.dateString].type === "NA" &&
      selectedDaysOnCalendar[day.dateString].dayType === dayTypeIndex
    ) {
      object = Object.assign(
        object,
        Object.assign({
          [day.dateString]: {
            customStyles: {
              container: {
                backgroundColor: "transparent",
              },
            },
            dayType: dayTypeIndex,
            type: "cancelled",
          },
        })
      )
    } else {
      if (dayTypeIndex === 0) {
        object = Object.assign(
          object,
          Object.assign({
            [day.dateString]: {
              customStyles: {
                container: {
                  backgroundColor: selectedColor,
                  borderRadius: 10
                },
              },
              dayType: dayTypeIndex,
              type: "NA",
            },
          })
        )
      } else {
        object = Object.assign(
          object,
          Object.assign({
            [day.dateString]: {
              customStyles: {
                container: {
                  backgroundColor: "transparent",
                  borderColor: selectedColor,
                  borderLeftWidth: dayTypeIndex === 1 ? 16 : 0,
                  borderRightWidth: dayTypeIndex === 1 ? 0 : 16,
                  transform: [{ rotate: "90deg" }],
                  borderRadius: 10
                },
                text: { position: "absolute", transform: [{ rotate: "-90deg" }], paddingBottom: 3.5 },
              },
              dayType: dayTypeIndex,
              type: "NA",
            },
          })
        )
      }
    }
    return object
  }
}

export const formatApplyLeave = (selectedDays, day, dayTypeIndex) => {
  let object = {}
  Object.assign(object, selectedDays)
  if (selectedDays[day.dateString] !== undefined && selectedDays[day.dateString].dayType === dayTypeIndex) {
    object = Object.assign(object, delete object[day.dateString])
  } else {
    object = Object.assign(object, Object.assign({ [day.dateString]: { dayType: dayTypeIndex } }))
  }
  return object
}
