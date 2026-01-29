import { Alert } from 'react-native'

export const awaitAlert = ({ title, message, buttons = [], options = {} }) => {
  return new Promise((resolve, reject) => {
    Alert.alert(title, message, buttons.map(button => {
        return { ...button, onPress: () => {resolve(button.onPress())} }
      }),
      { ...options, ...(options.onDismiss && { onDismiss: () => resolve(options.onDismiss()) }) }
    )
  })
}
