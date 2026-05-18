import { View } from 'react-native';
import { Text } from 'components';
import { styles } from './styles';
import React from 'react';
import { BoldTextWithBTag } from 'molecules';

const variants = {
  numberList: 'number',
  characterList: 'characterList',
  bulletList: 'bulletList',
  romansList: 'romansList',
  textList: 'textList',
};

export const DynamicConstant = ({ details, titleStyle, labelStyle, prefixStyle, isTitleBold = true, translate }) => {
  const renderTextList = textList => {
    return textList?.map((item, index) => (
      <View key={item.id}>
        <View style={styles.vwTextList}>
          <View>
            {/*<Text style={styles.lblNumber}>{item.label}</Text>*/}
            <BoldTextWithBTag
              text={translate ? translate(item.label) : item.label}
              style={labelStyle ? labelStyle : styles.lblNumber}
            />
          </View>
        </View>
        {item.data && renderNestedLists(item.type, item.data)}
      </View>
    ));
  };

  const renderNumberList = numberList => {
    return numberList?.map((item, index) => {
      const isLast = index === numberList.length - 1;

      return (
        <View key={item.id}>
          <View style={[styles.vwNumberList, isLast && { marginBottom: 0 }]}>
            <View style={[styles.vwNumber, prefixStyle]}>
              <Text style={styles.lblNumber}>{index + 1}.</Text>
            </View>
            <View style={styles.vwNumberText}>
              <BoldTextWithBTag
                text={translate ? translate(item.label) : item.label}
                style={labelStyle ? labelStyle : styles.lblNumber}
              />
            </View>
          </View>
          {item.data && renderNestedLists(item.type, item.data)}
        </View>
      );
    });
  };

  const renderBulletList = bulletList => {
    return bulletList?.map(item => (
      <View key={item.id}>
        <View style={styles.vwBulletList}>
          <Text style={styles.lblBullet}>&#8226;</Text>
          <View style={styles.vwBulletText}>
            {/*<Text style={styles.lblNumber}>{item.label}</Text>*/}
            <BoldTextWithBTag
              text={translate ? translate(item.label) : item.label}
              style={labelStyle ? labelStyle : styles.lblNumber}
            />
          </View>
        </View>
        {item.data && renderNestedLists(item.type, item.data)}
      </View>
    ));
  };

  const renderCharacterList = characterList => {
    return characterList?.map((item, index) => (
      <View key={item.id}>
        <View style={styles.vwCharacterList}>
          <View style={styles.vwNumber}>
            <Text style={styles.lblNumber}>{(index + 10).toString(36)}.</Text>
          </View>
          <View style={styles.vwNumberText}>
            {/*<Text style={styles.lblNumber}>{item.label}</Text>*/}
            <BoldTextWithBTag
              text={translate ? translate(item.label) : item.label}
              style={labelStyle ? labelStyle : styles.lblNumber}
            />
          </View>
        </View>
        {item.data && renderNestedLists(item.type, item.data)}
      </View>
    ));
  };

  const lookup = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ];

  const toRomanNumeral = num =>
    lookup.reduce((acc, [k, v]) => {
      acc += k.repeat(Math.floor(num / v));
      num = num % v;
      return acc;
    }, '');

  const renderRomanList = romansList => {
    return romansList?.map((item, index) => (
      <View key={item.id}>
        <View style={styles.vwRomansList}>
          <View style={styles.vwRomans}>
            <Text style={styles.lblRomans}>{toRomanNumeral(index + 1)}.</Text>
          </View>
          <View style={styles.vwRomansText}>
            {/*<Text style={styles.lblNumber}>{item.label}</Text>*/}
            <BoldTextWithBTag
              text={translate ? translate(item.label) : item.label}
              style={labelStyle ? labelStyle : styles.lblNumber}
            />
          </View>
        </View>
        {item.data && renderNestedLists(item.type, item.data)}
      </View>
    ));
  };

  const renderNestedLists = (type, item) => {
    if (!VIEW_FINDER[type]) {
      return null;
    }
    return <View style={{ marginHorizontal: 10, marginBottom: 10 }}>{VIEW_FINDER[type](item)}</View>;
  };

  const VIEW_FINDER = {
    [variants.characterList]: renderCharacterList,
    [variants.bulletList]: renderBulletList,
    [variants.numberList]: renderNumberList,
    [variants.romansList]: renderRomanList,
    [variants.textList]: renderTextList,
  };

  const renderDetails = data => {
    return data?.lists?.map(list => (
      <View key={list.id}>
        {list.title && (
          <Text bold={isTitleBold} style={[styles.title, titleStyle]}>
            {translate ? translate(list.title) : list.title}
          </Text>
        )}
        {list.details &&
          list.details.map(details => {
            if (!VIEW_FINDER[details.type]) {
              return null;
            }
            return VIEW_FINDER[details.type](details.data);
          })}
      </View>
    ));
  };

  return <View>{renderDetails(details)}</View>;
};

DynamicConstant.variants = variants;
