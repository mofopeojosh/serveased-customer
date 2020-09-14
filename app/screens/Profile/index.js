import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
  ProfilePerformance,
} from '@components';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';

export default function Profile({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [userData] = useState(UserData[0]);
  const dispatch = useDispatch();

  /**
   * @description Simple logout with Redux
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const onLogOut = () => {
    setLoading(true);
    dispatch(AuthActions.authentication(false, response => {}));
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header title={t('profile')} />
      <ScrollView>
        <View style={styles.contain}>
          <ProfileDetail
            image={userData.image}
            textFirst={userData.name}
            point={userData.point}
            textSecond={userData.address}
            textThird={userData.id}
            onPress={() => navigation.navigate('ProfileExanple')}
          />
          <ProfilePerformance
            data={userData.performance}
            style={{marginTop: 20, marginBottom: 20}}
          />
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => {
              navigation.navigate('ProfileEdit');
            }}>
            <Text body1>{t('edit_profile')}</Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{marginLeft: 5}}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            <Text body1>{t('change_password')}</Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{marginLeft: 5}}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => navigation.navigate('ContactUs')}>
            <Text body1>{t('contact_us')}</Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{marginLeft: 5}}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => {
              navigation.navigate('AboutUs');
            }}>
            <Text body1>{t('about_us')}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileItem}
            onPress={() => {
              navigation.navigate('Setting');
            }}>
            <Text body1>{t('setting')}</Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{marginLeft: 5}}
              enableRTL={true}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
        <Button full loading={loading} onPress={() => onLogOut()}>
          {t('sign_out')}
        </Button>
      </View>
    </SafeAreaView>
  );
}
