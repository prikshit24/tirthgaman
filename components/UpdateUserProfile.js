import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
  DrawerLayoutAndroid,
  Pressable,
  Dimensions,
  ToastAndroid,
  Linking,
  ActivityIndicator,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ToastManager, { Toast } from 'toastify-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BASE_URL_APP } from '../Utils/Contstant';

var userId = '';
var userRole = '';
const UpdateUserProfile = (props) => {
  const [templeGridList, setTempleGridList] = useState([]);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [uploadProfileImage, setUploadProfileImage] = useState({});
  const [errors, setErrors] = useState({
    email: true,
  });
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const getUserDetails = async () => {
    try {
      const data = await AsyncStorage.getItem('userDetails');
      const currentUser = JSON.parse(data);
      userId = currentUser?._id;
      userRole = currentUser?.role;

      console.log('Role', currentUser?.role)

      setUserData(prev => ({
        ...prev,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        profilePicture: currentUser?.profilePicture,
        email: currentUser.email,
        phone: currentUser.phone,
      }));
    } catch (e) {
      // read error
    }
  };

  console.log("USER detail", userId, userRole);

  useEffect(() => {
    getUserDetails();
  }, []);
  const handleChange = val => {
    drawer.current.closeDrawer();
    props.navigation.navigate(val);
  };

  const onLogout = async key => {
    try {
      await AsyncStorage.removeItem(key);
      await AsyncStorage.removeItem('userDetails');
      await AsyncStorage.clear();
      // // props?.setHitRender(!props?.hitRender)
      props.navigation.navigate('login');
      return true;
    } catch (exception) {
      return false;
    }
  };


  const drawerMenuList = [
    {
      title: 'Dashboard',
      icon: <FontAwesome name={'home'} color={'#FFF'} size={20} />,
      href: 'dashboard',
      arrowIcon: require('../img/arrowIcon.png'),
    },
    {
      title: 'Profile',
      icon: <FontAwesome name={'address-book'} color={'#FFF'} size={20} />,
      href: 'userprofile',
      arrowIcon: require('../img/arrowIcon.png'),
    },
    {
      title: 'Enquiries',
      icon: <FontAwesome name={'support'} color={'#FFF'} size={20} />,
      href: 'enquires',
      arrowIcon: require('../img/arrowIcon.png'),
    },
    {
      title: 'Account Settings',
      icon: <FontAwesome name={'user'} color={'#FFF'} size={20} />,
      href: 'accountsettings',
      arrowIcon: require('../img/arrowIcon.png'),
    },
    {
      title: 'Logout',
      icon: <FontAwesome name={'sign-out'} color={'#FFF'} size={20} />,
      href: 'accessToken',
      arrowIcon: require('../img/arrowIcon.png'),
    },
  ];

  const uploadFile = async (profileImage) => {
    const data = new FormData();
    data.append('file', {
      name: profileImage.fileName,
      type: profileImage.type,
      uri:
        Platform.OS === 'ios'
          ? photo.uri.replace('file://', '')
          : profileImage.uri,
    });

    const res = await fetch(`${BASE_URL_APP}/uploads/single`, {
      method: 'POST',
      body: data,
    });
    const result = await res.json();
    return result?.data;
  };

  const updateUserAsynData = async val => {
    await AsyncStorage.setItem('userDetails', JSON.stringify(val));
    getUserDetails();
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let body = null;
      let uploadedFileUri = '';
      if (uploadProfileImage?.base64 !== undefined) {
        uploadedFileUri = await uploadFile(uploadProfileImage);
        body = { ...userData, profilePicture: uploadedFileUri };
      } else {
        body = { ...userData };
      }
      delete body.email;
      delete body.phone;
      if (uploadProfileImage?.base64 === undefined) {
        delete body.profilePicture;
      }
      await axios({
        method: 'post',
        url: `${BASE_URL_APP}/${userRole}/updateProfile?id=${userId}`,
        data: body,
      }).then(res => {
        console.log('response of update user', res)
        setLoading(false);
        if (res?.data?.status === 200) {
          updateUserAsynData(res?.data?.updatedUser);
          alert(res?.data?.message);
          props.navigation.navigate('userprofile');
        }
      });
    } catch (e) {
      console.log('ERROR =>', e)
      alert("Something went wrong, can't update user");
      setLoading(false);
    }
  };

  const uploadUserImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Cancelled image Selection');
        setUploadProfileImage({});
      } else if (response.errorCode == 'permission') {
        setToastMsg('permission not satisfied');
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage);
      } else if (response.assets[0].fileSize > 10485760) {
        alert('Maxium image size exceeded', 'Please choose image under 10MB', [
          { text: 'OK' },
        ]);
      } else {
        setUploadProfileImage(response?.assets[0]);
      }
    });
  };

  const navigationView = () => (
    <View style={[styles.navigationContainer]}>
      <View style={[styles.sidebarTopCol]}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#db4242', '#db4242']}
          style={styles.sidebarProOuter}>
          <View style={styles.sidebarProMediaDiv}>
            <View style={styles.sidebarProMedia}>
              {userData?.profilePicture ? (
                <Image
                  source={{
                    uri: `${BASE_URL_APP}/files/${userData?.profilePicture}`,
                  }}
                  style={[styles.sidebarProImg]}
                />
              ) : (
                <Image
                  source={{ uri: "https://api.tirthgaman.com/files/avatar.png" }}
                  style={[styles.sidebarProImg]}
                />
              )}
            </View>
          </View>
          <View style={styles.sidebarProTitleDiv}>
            <Text style={styles.sdbrProTtile}>
              {userData?.firstName} {userData?.lastName}
            </Text>
          </View>
          <ImageBackground
            style={styles.sidebarProPatt}
            source={require('../img/sidebarPatt.png')}></ImageBackground>
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.navigationMainContainer}>
        <View>
          {drawerMenuList?.filter(v => userRole === 'user' ? (v?.title !== 'Enquiries' && v?.title !== 'Create Pujari' && v?.title !== 'Create Temple') : userRole === 'temple' ? v?.title !== 'Create Pujari' : userRole === 'poojari' ? v?.title !== 'Create Temple' : v)
            ?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.sidebarLinkCol}
                onPress={() => {
                  if (item.title === 'Logout') {
                    onLogout(item?.href);
                  } else {
                    handleChange(item?.href);
                    drawer.current.closeDrawer();
                  }
                }}
              >
                <View style={[styles.sidebarLinkLeft]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#db4242', '#db4242']}
                    style={[styles.sidebarLinkIcon]}>
                    <Text>{item.icon}</Text>
                  </LinearGradient>
                  <Text style={styles.sidebarLinkText}>{item?.title}</Text>
                </View>
                <Image
                  source={item?.arrowIcon}
                  style={[styles.sidebarLinkArrow]}
                />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ToastManager />
      {/* <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}> */}
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.mainHeaderOuter}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#db4242', '#db4242']}
          style={styles.mainHeader}>
          {/* <View style={styles.backMenuDiv}>
            <TouchableOpacity
              style={styles.backBtnDiv}
              onPress={() => drawer.current.openDrawer()}>
              <Image
                source={require('../img/menuIcon.png')}
                style={[styles.arrowBtn, styles.sideMenuIcon]}
              />
            </TouchableOpacity>
          </View> */}
          <View style={styles.backMenuDiv}>
            <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderRadius: 13, backgroundColor: '#fff' }} onPress={() => { props.navigation.navigate('accountsettings') }}>
              <Image source={require('../img/rightArrow1.jpg')} style={[styles.arrowBtn, styles.arrowBtnLight]} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Account Settings</Text>
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.outerContainer}>
        <View style={styles.mainBoxOuter}>
          <View style={styles.mainBody}>
            <View style={[styles.sidebarTopCol]}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#db4242', '#db4242']}
                style={[styles.sidebarProOuter1, styles.flexCenter]}>
                <View style={[styles.sidebarProMediaDiv1]}>
                  <TouchableOpacity onPress={() => uploadUserImage()}>
                    <View style={styles.sidebarProMedia1}>
                      {uploadProfileImage.base64 ? (
                        <Image
                          source={{
                            uri:
                              'data:image/png;base64,' +
                              uploadProfileImage.base64,
                          }}
                          style={[styles.sidebarProImg1]}
                        />
                      ) : userData?.profilePicture ? (
                        <Image
                          source={{
                            uri: `${BASE_URL_APP}/files/${userData?.profilePicture}`,
                          }}
                          style={[styles.sidebarProImg1]}
                        />
                      ) : (
                        <Image
                          source={{ uri: "https://api.tirthgaman.com/files/avatar.png" }}
                          style={[styles.sidebarProImg1]}
                        />
                      )}
                    </View>
                    <View style={styles.editButton}>
                      <FontAwesome
                        name={'upload'}
                        color={'#990000'}
                        size={15}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.wrapperContainer}>
              <View style={[styles.MainTitleDiv]}>
                <Text style={[styles.mainTitleText2, styles.textEarthyRed]}>
                  Edit Profile
                </Text>
                <View style={styles.mainTtlBrdr}></View>
              </View>
              <View style={[styles.formGroup, styles.mt20]}>
                <Text style={[styles.formLabel, styles.textEarthyRed]}>
                  First Name
                </Text>
                <View style={styles.formGroupIcon}>
                  <TextInput
                    style={styles.formControl}
                    onChangeText={text => {
                      setUserData(prev => ({ ...prev, firstName: text }));
                    }}
                    value={userData?.firstName}
                    placeholder=""
                    placeholderTextColor="#fbfbfb"
                  />
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, styles.textEarthyRed]}>
                  Last Name
                </Text>
                <View style={styles.formGroupIcon}>
                  <TextInput
                    style={styles.formControl}
                    onChangeText={text => {
                      setUserData(prev => ({ ...prev, lastName: text }));
                    }}
                    value={userData?.lastName}
                    placeholder=""
                    placeholderTextColor="#fbfbfb"
                  />
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, styles.textEarthyRed]}>
                  Email
                </Text>
                <View style={styles.formGroupIcon}>
                  <TextInput
                    style={styles.formControlDisabled}
                    value={userData?.email}
                    keyboardType="email-address"
                    placeholder=""
                    editable={false}
                    placeholderTextColor="#fbfbfb"
                  />
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, styles.textEarthyRed]}>
                  Phone
                </Text>
                <View style={styles.formGroupIcon}>
                  <TextInput
                    style={styles.formControlDisabled}
                    editable={false}
                    value={userData?.phone}
                    placeholder=""
                    placeholderTextColor="#fbfbfb"
                  />
                </View>
              </View>
              <View style={styles.formGroup}>
                <TouchableOpacity
                  style={styles.btnGradientDiv}
                  onPress={handleSubmit}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#db4242', '#db4242']}
                    style={[styles.btnDefault, styles.btnFull, styles.mt20]}>
                    <Text style={styles.TextStyle}>
                      {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        'Update'
                      )}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* </DrawerLayoutAndroid> */}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
    //minHeight: '100%',
    fontFamily: 'Montserrat-Regular',
  },
  posRltv: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
    fontFamily: 'Montserrat-Regular',
  },
  bglastImg: {
    position: 'absolute',
    left: 10,
    bottom: -30,
    width: '100%',
    height: '30%',
    zIndex: -99,
  },
  mt20: {
    marginTop: 30,
  },
  blackText: {
    color: '#000000',
  },
  textEarthyRed: {
    color: '#62354a',
  },
  greyText: {
    fontSize: 16,
    color: '#777777',
  },
  mainBoxOuter: {
    flex: 1,
  },
  mainHeader: {
    backgroundColor: '#970000',
    minWidth: '100%',
    paddingTop: 34,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mainHeaderOuter: {},
  backMenuDiv: {
    position: 'absolute',
    left: 16,
    top: 36,
  },
  backBtnDiv: {
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // arrowBtn: {
  //   height: 15,
  //   width: 10,
  //   marginRight: 12,
  // },
  arrowBtn: {
    height: 17,
    width: 12,
  },
  arrowBtnLight: {
    height: 19,
    width: 10,
  },
  sideMenuIcon: {
    height: 20,
    width: 25,
  },
  arrowText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Montserrat-Regular',
  },
  headerTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
  },
  mainBody: {
    flex: 1,
  },
  btnFixContainer: {
    paddingBottom: 60,
  },
  mainTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
  },
  subTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 22,
  },
  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  successMedia: {
    marginBottom: 20,
  },
  sucessIcon: {
    width: 200,
    height: 220,
  },
  btnDefault: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#680001',
    borderColor: '#680001',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    position: 'relative',
    minWidth: 280,
  },
  btnFull: {
    minWidth: '100%',
  },
  TextStyle: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
  },
  textRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  whtTextColor: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Montserrat-Regular',
  },
  whtTextBoldColor: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
  },
  loginLink: {
    marginLeft: 6,
  },
  whtLink: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
  },
  customTabsDiv: {
    position: 'relative',
  },
  customTabsLine: {
    backgroundColor: '#f2f2f2',
    position: 'absolute',
    width: '86%',
    height: 3,
    left: '7%',
    top: 20,
    right: '7%',
  },
  customTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  customTabCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customTabCount: {
    backgroundColor: '#e5e9ec',
    width: 40,
    height: 40,
    paddingVertical: 7,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    borderRadius: 40,
    alignItems: 'center',
    textAlign: 'center',
  },
  customTabCountFill: {
    backgroundColor: '#0e558d',
    color: '#ffffff',
  },
  customTabText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
  },
  formTitleDiv: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 1,
  },
  formTitleText: {
    fontSize: 18,
    color: '#333333',
    fontFamily: 'Montserrat-Bold',
  },
  frmTtlBrdr: {
    backgroundColor: '#0e558d',
    position: 'absolute',
    width: 96,
    height: 5,
    left: 0,
    bottom: 3,
    opacity: 0.24,
    zIndex: -1,
  },
  formGroupDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  formGroupNew: {
    paddingHorizontal: 2,
    position: 'relative',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  formGroupSimple: {
    alignItems: 'flex-start',
    paddingTop: 0,
  },
  formLabelNew: {
    fontSize: 15,
    color: '#633549',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
    fontWeight: '700',
  },
  formLabelNew2: {
    fontSize: 12,
    color: '#444',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
    paddingBottom: 10,
  },
  noAbsolute: {
    position: 'relative',
    paddingHorizontal: 0,
    left: 0,
    top: 0,
  },
  formControlNew: {
    fontSize: 14,
    color: '#434450',
    height: 38,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    fontFamily: 'Montserrat-Regular',
    minWidth: '100%',
    shadowOpacity: 0,
    borderRadius: 5,
  },
  inputIcon: {
    position: 'absolute',
    right: 20,
    top: 25,
  },
  textAreaContainer: {
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 4,
    minWidth: '100%',
    fontFamily: 'Montserrat-Regular',
    borderRadius: 8,
  },
  textArea: {
    height: 80,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: '#434450',
    fontFamily: 'Montserrat-Regular',
  },
  disFormDataDiv: {
    flexDirection: 'row',
    marginBottom: 16,
    marginHorizontal: -6,
  },
  disFormData: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    position: 'relative',
    alignItems: 'center',
  },
  disIcon: {
    marginRight: 12,
  },
  disText: {
    fontSize: 14,
    color: '#434450',
    fontFamily: 'Montserrat-Regular',
  },
  fixBtnDiv: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerFlex: {
    flex: 1,
    justifyContent: 'center',
  },
  amtTextLabel: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
  },
  amtText: {
    fontSize: 16,
    color: '#990000',
    fontFamily: 'Montserrat-Bold',
  },

  navigationContainer: {
    flex: 1,
    minHeight: '100%',
  },
  navigationMainContainer: {},
  sidebarProOuter: {
    position: 'relative',
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sidebarProOuter1: {
    position: 'relative',
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sidebarProPatt: {
    position: 'absolute',
    backgroundSize: 'cover',
    alignItems: 'center',
    resizeMode: 'cover',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    opacity: 0.34,
  },
  sidebarProMediaDiv1: {
    width: 150,
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 90,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 16,
  },
  sidebarProMedia1: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 138,
    height: 138,
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 78,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  sidebarProImg: {
    width: 70,
    height: 70,
    borderRadius: 70,
    position: 'relative',
    bottom: 1,
  },
  sidebarProImg1: {
    width: '100%',
    height: '100%',
    borderRadius: 78,
  },
  sidebarProTitleDiv: {
    maxWidth: '60%',
  },
  sdbrProTtile: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
  },
  sidebarLinkCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sidebarLinkLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarLinkIcon: {
    width: 40,
    height: 40,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sidebarLinkImg: {
    width: 20,
    height: 20,
  },
  sidebarLinkText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Montserrat-SemiBold',
  },
  sidebarLinkArrow: {
    width: 10,
    height: 17,
  },
  MainTitleDiv: {},
  mainTitlInr: {
    color: '#221e1f',
    fontFamily: 'Montserrat-SemiBold',
  },
  mainTitleText: {
    fontSize: 19,
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  mainTitleText2: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  mainTitleText3: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    marginVertical: 8,
  },
  mediumTitle: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  mainTtlBrdr: {
    backgroundColor: '#f8d9d9',
    position: 'absolute',
    width: 96,
    height: 5,
    left: 0,
    bottom: 3,
    opacity: 1,
    zIndex: -1,
  },

  dropdown1BtnStyle: {
    width: '100%',
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  dropdown1BtnTxtStyle: { color: '#999', textAlign: 'left', fontSize: 15 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: 16,
  },

  green: {
    color: 'green',
  },
  formOuter: {
    flexDirection: 'column',
    borderRadius: 8,
    marginVertical: 14,
    marginHorizontal: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#62354a',
    paddingVertical: 34,
    paddingHorizontal: 24,
  },
  sdbrProEmail: {
    color: '#fff',
    marginTop: 5,
    fontSize: 15,
  },
  sidebarLinkColNoBor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  formGroup: {
    marginBottom: 16,
    minWidth: '100%',
  },
  formLabelDark: {
    fontSize: 16,
    color: '#aaaaaa',
    fontFamily: 'Montserrat-Regular',
  },
  formControlDark: {
    color: '#434450',
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    paddingBottom: 12,
    paddingHorizontal: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
    fontFamily: 'Montserrat-Regular',
    minWidth: '100%',
  },
  formGroupIcon: {
    position: 'relative',
  },
  formControlIcon: {
    paddingRight: 36,
  },
  showHideIcon: {
    position: 'absolute',
    right: 8,
    top: -28,
    width: 24,
    height: 15,
  },
  btnDefault: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#680001',
    borderColor: '#680001',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    position: 'relative',
    minWidth: 280,
  },
  TextStyle: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
  },
  wrapperContainer: {
    marginTop: 20,
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  formLabel: {
    fontSize: 15,
    color: '#221e1f',
    fontWeight: '600',
    paddingBottom: 5,
  },
  formControl: {
    color: '#221e1f',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Regular',
    minWidth: '100%',
  },
  formControlDisabled: {
    color: '#221e1f',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#ddd',
    fontFamily: 'Montserrat-Regular',
    minWidth: '100%',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  sidebarProMediaDiv: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 90,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 16,
  },
  sidebarProMedia: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 78,
    height: 78,
    borderRadius: 78,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  editButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#990000',
    borderRadius: 78,
    height: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UpdateUserProfile;
