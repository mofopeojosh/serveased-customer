import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Images, useTheme, BaseColor} from '@config';
import {Image, Text, Icon, Button} from '@components';
import styles from './styles';

export default function Loading({navigation}) {
  const {colors} = useTheme();

  const onProcess = () => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 500);
  };
  useEffect(() => {
    // onProcess();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        <View style={[styles.serviceCircleIcon, {backgroundColor: 'green'}]}>
          <Icon name="check" size={50} color={BaseColor.greenColor} solid />
        </View>
        <Text title2 semibold style={{paddingTop: 10}}>
          Your just booked an appointment!
        </Text>
        <Text
          headline
          grayColor
          style={{
            paddingTop: 10,
            paddingLeft: 20,
            paddingRight: 20,
            textAlign: 'center',
          }}>
          Your vendor will confirm your booking soon. Enjoy!
        </Text>
      </View>
    </View>
  );
}
