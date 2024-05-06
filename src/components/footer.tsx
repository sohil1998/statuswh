import React from 'react';
import {TouchableOpacity} from 'react-native';
import globalStyles from '../styles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helper/size.tsx';
import {COLORS} from '../helper/colors.tsx';
import {FontAwesome} from '../helper/icons.tsx';

function Footer(props: any): React.JSX.Element {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props?.multiSelect) {
          props.onPress1();
        } else {
          props.onPress();
        }
      }}
      style={[
        globalStyles.rowSpbtn,
        {
          backgroundColor: COLORS.color2,
          padding: horizontalScale(10),
          paddingHorizontal: horizontalScale(10),
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: verticalScale(20),
          borderTopColor: COLORS.color4,
          borderTopWidth: moderateScale(1),
        },
      ]}>
      {props?.multiSelect ? (
        <FontAwesome
          name="close"
          size={moderateScale(25)}
          color={COLORS.color4}
        />
      ) : (
        <FontAwesome
          name="share"
          size={moderateScale(25)}
          color={COLORS.color4}
        />
      )}
    </TouchableOpacity>
  );
}

export default Footer;
