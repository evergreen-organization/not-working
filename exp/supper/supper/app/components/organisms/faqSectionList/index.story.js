import React from 'react'
import {View} from 'react-native'
import { storiesOf } from '@storybook/react-native'
import {
  FAQSectionList
} from './index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdidImage from 'assets/adid/adid-1.png'
import { colors } from 'configs';
const faqData =[
  {
    id: 1,
    title: 'IAM Challenge Questions',
    data: [
      {
        image: [AdidImage, AdidImage],
        question: 'How does this new security feature work?',
        answer: 'The challenge questions and answers provide an extra layer of security to further authenticate your identity when you reset your AD ID password or unlock AD ID with us.'
      },
      {
        question: 'How do I set up my challenge questions and answers?',
        answer: 'It’s really simple! Login to IAM portal with your AD credential. Just select your preferred question and provide an answer from each group. There will be three groups in total.'
      },
      {
        image: [AdidImage],
        question: 'How does this new security feature work?',
        answer: 'The challenge questions and answers provide an extra layer of security to further authenticate your identity when you reset your AD ID password or unlock AD ID with us.'
      },
      {
        question: 'How do I set up my challenge questions and answers?',
        answer: 'It’s really simple! Login to IAM portal with your AD credential. Just select your preferred question and provide an answer from each group. There will be three groups in total.'
      }
    ],
  },
  {
    id: 2,
    title: 'IAM Challenge Questions',
    data: [
      {
        image: [AdidImage],
        question: 'How does this new security feature work?',
        answer: 'The challenge questions and answers provide an extra layer of security to further authenticate your identity when you reset your AD ID password or unlock AD ID with us.'
      },
      {
        question: 'How do I set up my challenge questions and answers?',
        answer: 'It’s really simple! Login to IAM portal with your AD credential. Just select your preferred question and provide an answer from each group. There will be three groups in total.'
      },
      {
        image: [AdidImage],
        question: 'How does this new security feature work?',
        answer: 'The challenge questions and answers provide an extra layer of security to further authenticate your identity when you reset your AD ID password or unlock AD ID with us.'
      },
      {
        question: 'How do I set up my challenge questions and answers?',
        answer: 'It’s really simple! Login to IAM portal with your AD credential. Just select your preferred question and provide an answer from each group. There will be three groups in total.'
      }
    ],
  }
]

storiesOf('molecules/faqSectionList', module).addDecorator((getStory) => <SafeAreaProvider>
  <View style={{paddingHorizontal:12 }}>
    {getStory()}

  </View>
</SafeAreaProvider>).add('Default', () => (
  <FAQSectionList
data={faqData}
  />
))
