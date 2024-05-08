import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
  ScrollView,
  RefreshControl,
  AppState,
  StatusBar,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNFetchBlob from 'rn-fetch-blob';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helper/size.tsx';
import Header from '../components/header';
import {COLORS} from '../helper/colors.tsx';
import Footer from '../components/footer.tsx';
import Share from 'react-native-share';
import {
  checkManagePermission,
  requestManagePermission,
} from 'manage-external-storage';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Feed(props: any): React.JSX.Element {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    initialFunctions('NA');
    return () => {
      subscription.remove();
    };
  }, []);

  const initialFunctions = (val: string) => {
    getFiles();
    if (val == 'fromBackground') {
      null;
    } else {
      requestCameraPermission();
    }
  };

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'active') {
      initialFunctions('fromBackground');
    }
    setAppState(nextAppState);
  };

  const getFiles = () => {
    // const path = `${RNFetchBlob.fs.dirs.SDCardDir}/Android/media/com.whatsapp/WhatsApp/Media/.Statuses`;
    const path =
      Platform.Version <= '28'
        ? `${RNFetchBlob.fs.dirs.SDCardDir}/WhatsApp/Media/.Statuses`
        : `${RNFetchBlob.fs.dirs.SDCardDir}/Android/media/com.whatsapp/WhatsApp/Media/.Statuses`;

    RNFetchBlob.fs
      .ls(path)
      .then(data => {
        setFiles(data.filter(i => regex.test(i)));
        setIsLoading(false);
        console.log('data => ', data);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const regex =
    /\.(jpg|jpeg|png|gif|bmp|webp|tif|tiff|svg|mp4|avi|mov|wmv|flv|mkv|webm|mpeg|mpg|3gp|3g2)$/;

  const handleFileSelect = (file: string) => {
    const isSelected = selectedFiles.some(f => f === file);
    if (isSelected) {
      setSelectedFiles(prev => prev.filter(f => f !== file));
    } else {
      setSelectedFiles(prev => [...prev, file]);
    }
  };

  const requestCameraPermission = async () => {
    checkManagePermission().then(isManagePermitted => {
      console.log(isManagePermitted);
      if (!isManagePermitted) {
        requestManagePermission().then(isManagePermitted => {
          console.log(isManagePermitted);
        });
      }
    });
  };

  const renderFileItem = ({item}: {item: string}) => {
    const fileUri =
      Platform.Version <= '28'
        ? `file://${RNFetchBlob.fs.dirs.SDCardDir}/WhatsApp/Media/.Statuses/${item}`
        : `file://${RNFetchBlob.fs.dirs.SDCardDir}/Android/media/com.whatsapp/WhatsApp/Media/.Statuses/${item}`;

    return (
      <TouchableOpacity
        style={{
          margin: horizontalScale(5),
          borderWidth: horizontalScale(2),
        }}
        onLongPress={() => {
          if (!multiSelect) {
            handleFileSelect(item);
          }
          setMultiSelect(true);
        }}
        onPress={() => {
          if (multiSelect) {
            handleFileSelect(item);
          } else {
            props.navigation.navigate('ImageView', {
              image: fileUri,
            });
          }
        }}>
        <Image
          style={{
            width: horizontalScale(110),
            height: verticalScale(110),
            borderColor: '',
          }}
          source={{uri: fileUri}}
        />
        {selectedFiles.some(f => f === item) ? (
          <View
            style={{
              width: horizontalScale(20),
              height: verticalScale(20),
              position: 'absolute',
              bottom: verticalScale(5),
              right: horizontalScale(5),
              backgroundColor: COLORS.color3,
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: moderateScale(15),
                color: 'white',
              }}>
              ✓
            </Text>
          </View>
        ) : (
          <>
            {multiSelect ? (
              <View
                style={{
                  width: horizontalScale(20),
                  height: verticalScale(20),
                  position: 'absolute',
                  bottom: verticalScale(5),
                  right: horizontalScale(5),
                  backgroundColor: 'grey',
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}></View>
            ) : null}
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setIsLoading(true);
              initialFunctions('NA');
            }}
            enabled
          />
        }
        style={{flex: 1, backgroundColor: COLORS.color1}}>
        <StatusBar animated={true} backgroundColor={COLORS.color2} />
        <Header navigation={props.navigation} title={'Feed'} />
        <View>
          {files?.length == 0 ? (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                  width: horizontalScale(200),
                  height: verticalScale(200),
                }}
                source={require('../../assets/no_data.png')}
              />
              <Text
                style={{
                  fontSize: moderateScale(20),
                  alignSelf: 'center',
                  marginTop: verticalScale(10),
                  color: COLORS.color4,
                  paddingHorizontal: horizontalScale(50),
                }}>
                Either you don't have the data or you haven't granted the
                required permissions.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  requestCameraPermission();
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(20),
                    alignSelf: 'center',
                    marginTop: verticalScale(10),
                    color: COLORS.color4,
                    paddingHorizontal: horizontalScale(50),
                    textDecorationLine: 'underline',
                  }}>
                  Click here to grant permission.
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={files}
              numColumns={3}
              renderItem={renderFileItem}
              keyExtractor={item => `${item}`}
              contentContainerStyle={{
                alignSelf: 'center',
                paddingBottom: verticalScale(150),
              }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
      {multiSelect && (
        <Footer
          multiSelect={multiSelect && selectedFiles?.length == 0}
          onPress={() => {
            if (multiSelect && selectedFiles?.length > 0) {
              const dataWithUrl: string[] = [];
              selectedFiles.map(i => {
                dataWithUrl.push(
                  // `file://${RNFetchBlob.fs.dirs.SDCardDir}/Android/media/com.whatsapp/WhatsApp/Media/.Statuses/${i}`,
                  Platform.Version <= '28'
                    ? `file://${RNFetchBlob.fs.dirs.SDCardDir}/WhatsApp/Media/.Statuses/${i}`
                    : `file://${RNFetchBlob.fs.dirs.SDCardDir}/Android/media/com.whatsapp/WhatsApp/Media/.Statuses/${i}`,
                );
              });
              const shareOptions = {
                title: 'Share Single Image',
                urls: dataWithUrl,
                failOnCancel: false,
              };
              Share.open(shareOptions);
            } else {
              const shareOptions = {
                title: 'Share Single Image',
                url: props.route.params.image,
                failOnCancel: false,
              };
              Share.open(shareOptions);
            }
          }}
          onPress1={() => {
            setMultiSelect(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Feed;
