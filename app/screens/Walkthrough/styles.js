import {StyleSheet} from 'react-native';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  wrapper: {
    width: '100%',
    height: 350,
  },
  contentPage: {
    bottom: 0,
  },
  contentActionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  img: {
    width: Utils.scaleWithPixel(350),
    height: Utils.scaleWithPixel(200),
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textSlide: {
    textAlign: 'center',
    marginTop: 30,
  },
});
