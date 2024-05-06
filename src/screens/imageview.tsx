import React from 'react';
import {Image, View} from 'react-native';
import Footer from '../components/footer';
import {horizontalScale, verticalScale} from '../helper/size';
import Share from 'react-native-share';
import Header from '../components/header';

function ImageView(props: any): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <Header back={'Back'} navigation={props.navigation} />
      <View
        style={{
          paddingBottom: verticalScale(110),
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
          source={{uri: props.route.params.image}}
        />
      </View>
      <Footer
        onPress={() => {
          const shareOptions = {
            title: 'Share Single Image',
            url: props.route.params.image,
            failOnCancel: false,
          };
          Share.open(shareOptions);
        }}
      />
    </View>
  );
}

export default ImageView;
