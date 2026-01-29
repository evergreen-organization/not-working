import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'
import WarningIcon from 'assets/icon/warning.png'
import { text } from '@storybook/addon-knobs'
import { Detail3 } from '../components/Detail3';
import {
  popUp3Details,
  warningList
} from '../utils';
import { PopUpItem } from './index';

const item={
  title: text('title', 'ERROR: IAM Challenge Questions Not Completed'),
  titleIcon: WarningIcon,
  details: <Detail3 detailList={popUp3Details} warningList={warningList}/>

}
storiesOf('screens/adidAwareness/popUpItem', module).addDecorator((getStory) => <View
  style={{ flex: 1 }}>{getStory()}</View>).add('Default', () => (
  <PopUpItem
    item={item}
  />
))
