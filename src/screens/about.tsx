import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {AntDesign, FontAwesome, FontAwesome5} from '../helper/icons';
import AntDesignI from 'react-native-vector-icons/AntDesign';
import Header from '../components/header';
import {horizontalScale, moderateScale, verticalScale} from '../helper/size';
import {COLORS} from '../helper/colors';
import globalStyles from '../styles';

const About: React.FC = (props: any) => {
  const [selectedLang, setSelectedLang] = useState<string>('2');
  return (
    <View style={styles.container}>
      <Header back navigation={props.navigation} title={'About'} about={'NA'} />
      <Text
        style={{
          fontSize: moderateScale(20),
          alignSelf: 'center',
          marginHorizontal: horizontalScale(15),
          marginTop: verticalScale(10),
        }}>
        {selectedLang == '1' ? hindiContent : englishContent}
      </Text>

      <TouchableOpacity
        onPress={() => {
          if (selectedLang == '1') {
            setSelectedLang('2');
          } else {
            setSelectedLang('1');
          }
        }}>
        <Text
          style={{
            fontSize: moderateScale(15),
            alignSelf: 'center',
            marginHorizontal: horizontalScale(15),
            marginTop: verticalScale(10),
          }}>
          {selectedLang == '1' ? 'English' : 'हिंदी'}
        </Text>
      </TouchableOpacity>

      <View
        style={[
          globalStyles.rowSpAround,
          {bottom: verticalScale(120), position: 'absolute'},
        ]}>
        <TouchableOpacity
          style={styles.socialItem}
          onPress={() => {
            Linking.openURL('https://www.linkedin.com/in/sohil-shaikh28/');
          }}>
          <AntDesign
            name="linkedin-square"
            size={moderateScale(25)}
            color={COLORS.color1}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialItem}
          onPress={() => {
            Linking.openURL('https://github.com/sohil1998');
          }}>
          <FontAwesome5
            name="github"
            size={moderateScale(25)}
            color={COLORS.color1}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialItem}
          onPress={() => {
            Linking.openURL(
              'https://youtube.com/@sohil_dev_?si=uweura3C0sJpL6KO',
            );
          }}>
          <AntDesign
            name="youtube"
            size={moderateScale(25)}
            color={COLORS.color1}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialItem}
          onPress={() => {
            Linking.openURL(
              'https://www.instagram.com/sohil_dev_?igsh=MXoyZXBjNW5nZ3o2',
            );
          }}>
          <AntDesign
            name="instagram"
            size={moderateScale(25)}
            color={COLORS.color1}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialItem}
          onPress={() => {
            Linking.openURL(
              'https://x.com/SohilShaikh2819?t=LgCHdG2k5TlrFmmV8y_0BQ&s=08',
            );
          }}>
          <AntDesign
            name="twitter"
            size={moderateScale(25)}
            color={COLORS.color1}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: moderateScale(15),
          color: COLORS.color1,
          bottom: verticalScale(60),
          position: 'absolute',
        }}>
        1.0
      </Text>

      <Text style={styles.createdBy}>Created by Sohil</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  socialItem: {
    marginHorizontal: horizontalScale(15),
  },
  createdBy: {
    position: 'absolute',
    bottom: verticalScale(10),
    fontSize: moderateScale(15),
  },
});

export default About;

const englishContent =
  'Our app prioritizes your privacy. We do not collect any of your data. Instead, we simply display WhatsApp status photos and videos that are already present in your file manager.';

const hindiContent =
  'हमारा ऐप आपकी गोपनीयता को प्राथमिकता देता है। हम आपके किसी भी डेटा को संग्रहित नहीं करते। बजाय इसके, हम आपके फ़ाइल मैनेजर में पहले से मौजूद WhatsApp स्टेटस फ़ोटो और वीडियो को सीधे प्रदर्शित करते हैं।';
