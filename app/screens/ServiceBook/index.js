import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  TextInput,
} from '@components';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';

export default function ProfileEdit({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [id, setId] = useState(UserData[0].id);
  const [name, setName] = useState(UserData[0].name);
  const [email, setEmail] = useState(UserData[0].email);
  const [address, setAddress] = useState(UserData[0].address);
  const [image] = useState(UserData[0].image);
  const [loading, setLoading] = useState(false);

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('book_service')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.contain}>
          {/*<View>*/}
          {/*  <Image source={image} style={styles.thumb} />*/}
          {/*</View>*/}
          <Text title2 semibold style={{marginBottom: 10}}>
            Rejuvenee Spa and Wellness
          </Text>
          <Text headline semibold grayColor style={{marginBottom: 20}}>
            N30,000 - N40,000
          </Text>
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Time
            </Text>
          </View>
          <TextInput
            onChangeText={text => setName(text)}
            placeholder={t('input_name')}
            value="9:00 AM"
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('email')}
            </Text>
          </View>
          <TextInput
            onChangeText={text => setEmail(text)}
            placeholder={t('input_email')}
            value="ayolana@gmail.com"
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              Add more details
            </Text>
          </View>
          <TextInput
            onChangeText={text => setEmail(text)}
            placeholder=""
            value=""
            style={{height: 40}}
          />
        </ScrollView>
        <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
          <Button
            loading={loading}
            full
            onPress={() => {
              navigation.navigate('BookingSuccess');
            }}>
            {t('book_now')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
