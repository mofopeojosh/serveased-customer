import React, {useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  Tag,
  Image,
  PlaceItem,
  CardList,
  Button,
} from '@components';
import {useTranslation} from 'react-i18next';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Utils from '@utils';
import styles from './styles';
import {PlaceListData} from '@data';

export default function ProductDetail({navigation}) {
  const {t} = useTranslation();
  const deltaY = new Animated.Value(0);
  const {colors} = useTheme();

  const [collapseHour, setCollapseHour] = useState(true);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [information] = useState([
    {
      id: '1',
      icon: 'user',
      title: 'Vendor',
      type: 'map',
      information: 'Elizabeth Arden',
    },
    {
      id: '2',
      icon: 'shopping-cart',
      title: 'Orders',
      type: 'phone',
      information: '500',
    },
    {
      id: '3',
      icon: 'shopping-bag',
      title: 'In Stock',
      type: 'email',
      information: '30',
    },
  ]);
  const [list] = useState(PlaceListData);
  const [relate] = useState(PlaceListData);
  const [features] = useState([
    {id: '1', icon: 'wifi', name: 'Vitamin C', checked: true},
    {id: '2', icon: 'bath', name: 'Cleanser'},
    {id: '3', icon: 'paw', name: 'Beauty Bag'},
    {id: '4', icon: 'bus', name: 'Serum'},
  ]);

  const onOpen = (item) => {
    Alert.alert(
      'Listar',
      `${t('do_you_want_open')} ${item.title} ?`,
      [
        {
          text: t('cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('done'),
          onPress: () => {
            switch (item.type) {
              case 'web':
                Linking.openURL(item.information);
                break;
              case 'phone':
                Linking.openURL('tel://' + item.information);
                break;
              case 'email':
                Linking.openURL('mailto:' + item.information);
                break;
              case 'map':
                Linking.openURL(
                  'http://maps.apple.com/?ll=37.484847,-122.148386',
                );
                break;
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const onCollapse = () => {
    Utils.enableExperimental();
    setCollapseHour(!collapseHour);
  };

  const onBook = () => {
    // Utils.enableExperimental();
    // setCollapseHour(!collapseHour);
  };

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}>
        <Image source={Images.room1} style={{flex: 1}} />
      </Animated.View>
      <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
        {/* Header */}
        <Header
          title=""
          renderLeft={() => {
            return (
              <Icon name="arrow-left" size={20} color={BaseColor.whiteColor} />
            );
          }}
          renderRight={() => {
            return (
              <Icon name="images" size={20} color={BaseColor.whiteColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate('PreviewImage');
          }}
        />
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          scrollEventThrottle={8}>
          <View style={{height: 255 - heightHeader}} />
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            <View style={{marginTop: 10, marginBottom: 5, ...styles.lineSpace}}>
              <Text title1 semibold>
                6 Piece Perfume Gift
              </Text>
              <Icon name="heart" color={colors.primaryLight} size={24} />
            </View>
            <View style={styles.lineSpace}>
              <View>
                <Text caption1 grayColor>
                  {t('health_beauty')}
                </Text>
                <TouchableOpacity
                  style={styles.rateLine}
                  onPress={() => navigation.navigate('Review')}>
                  <Tag
                    rateSmall
                    style={{marginRight: 5}}
                    onPress={() => navigation.navigate('Review')}>
                    4.5
                  </Tag>
                  <StarRating
                    disabled={true}
                    starSize={10}
                    maxStars={5}
                    rating={4.5}
                    fullStarColor={BaseColor.yellowColor}
                    on
                  />
                  <Text footnote grayColor style={{marginLeft: 5}}>
                    (609)
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text caption1 grayColor>
                  {t('price')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  N30,000
                </Text>
              </View>
              {/*<Tag status>{t('featured')}</Tag>*/}
            </View>
            <Button
              style={{marginTop: 20}}
              full
              onPress={() => {
                onBook();
              }}>
              {t('buy_now')}
            </Button>
            {information.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.line}
                  key={item.id}
                  onPress={() => onOpen(item)}>
                  <View
                    style={[
                      styles.contentIcon,
                      {backgroundColor: colors.border},
                    ]}>
                    <Icon
                      name={item.icon}
                      size={16}
                      color={BaseColor.whiteColor}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text caption2 grayColor>
                      {item.title}
                    </Text>
                    <Text footnote semibold style={{marginTop: 5}}>
                      {item.information}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={[styles.contentDescription, {borderColor: colors.border}]}>
            <Text body2 style={{lineHeight: 20}}>
              Maintain your fresh-faced summer glow with our 6-piece gift set,
              curated with all the luxe Weekend essentials. It evokes a refreshed feeling of
              spring with its clean, distinct aromas. The base notes are
              composed of iris, vanilla, amber, sandalwood and Tibetan musk,
              which situate this  with a comforting yet sharp mood. Finishing it off are the top notes
              of dewy magnolia, bergamot, linden blossom, lilac and mandarin,
              rounding off the sweet, powdery mood of this fragrance
            </Text>
          </View>
          <Text
            title3
            semibold
            style={{
              paddingHorizontal: 20,
              paddingBottom: 5,
              paddingTop: 15,
            }}>
            {t('features')}
          </Text>
          <View style={[styles.wrapContent, {borderColor: colors.border}]}>
            {features.map((item) => {
              return (
                <Tag
                  icon={
                    <Icon
                      name={item.icon}
                      size={12}
                      color={colors.accent}
                      solid
                      style={{marginRight: 5}}
                    />
                  }
                  chip
                  key={item.id}
                  style={{
                    marginTop: 8,
                    marginRight: 8,
                  }}>
                  {item.name}
                </Tag>
              );
            })}
          </View>
          <Text
            title3
            semibold
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}>
            {t('featured')}
          </Text>
          <FlatList
            contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={list}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <PlaceItem
                grid
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                location={item.location}
                phone={item.phone}
                rate={item.rate}
                category={item.category}
                rateStatus={item.rateStatus}
                numReviews={item.numReviews}
                onPress={() =>
                  navigation.navigate({
                    name: 'PlaceDetail',
                    key: Date.now().toString(),
                  })
                }
                onPressTag={() => navigation.navigate('Review')}
                style={{marginLeft: 15}}
              />
            )}
          />
          <Text
            title3
            semibold
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}>
            {t('related')}
          </Text>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            data={relate}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <CardList
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                rate={item.rate}
                style={{marginBottom: 15}}
                onPress={() =>
                  navigation.navigate({
                    name: 'PlaceDetail',
                    key: Date.now().toString(),
                  })
                }
                onPressTag={() => navigation.navigate('Review')}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
