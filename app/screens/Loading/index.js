import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Images, useTheme} from '@config';
import {Image, Text} from '@components';
import styles from './styles';

export default function Loading({navigation}) {
  const {colors} = useTheme();

  const onProcess = () => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 500);
  };
  useEffect(() => {
    onProcess();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image source={Images.logo} style={styles.logo} resizeMode="cover" />
        <Text title1 semibold style={{marginTop: 10}}>
          Serveased
        </Text>
      </View>
      <ActivityIndicator
        size="large"
        color={colors.text}
        style={{
          position: 'absolute',
          top: 260,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </View>
  );
}
