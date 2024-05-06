import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helper/size.tsx';
import globalStyles from '../styles.tsx';
import {AntDesign, Ionicons} from '../helper/icons.tsx';
import {COLORS} from '../helper/colors.tsx';

function Header(props: any): React.JSX.Element {
  return (
    <View
      style={[
        globalStyles.rowSpbtn,
        {
          backgroundColor: 'black',
          padding: horizontalScale(10),
          paddingHorizontal: horizontalScale(10),
          //   position: 'absolute',
          //   top: 0,
          width: '100%',
          paddingVertical: verticalScale(20),
          borderBlockColor: COLORS.color4,
          borderBottomWidth: moderateScale(1),
        },
      ]}>
      <View style={[globalStyles.rowStyle]}>
        {props?.back && (
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{marginRight: horizontalScale(10)}}>
            <Ionicons
              name="arrow-back"
              size={moderateScale(25)}
              color={COLORS.color4}
            />
          </TouchableOpacity>
        )}

        {props?.title && (
          <Text
            style={{
              fontSize: moderateScale(25),
              color: 'white',
            }}>
            {props?.title || 'Feed'}
          </Text>
        )}
      </View>

      {props.about == 'NA' ? null : (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('About');
          }}>
          <AntDesign
            name="infocirlceo"
            size={moderateScale(25)}
            color={COLORS.color4}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Header;
