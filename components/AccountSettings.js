import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BASE_URL_APP } from '../Utils/Contstant';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerLayout } from 'react-native-gesture-handler';
var userRole = '';
const AccountSettings = props => {
  const [templeGridList, setTempleGridList] = useState([]);
  const [userData, setUserData] = useState(null);
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');

  useEffect(() => {
    const getList = async () => {
      const result = await axios.get('https://api.tirthgaman.com/temple/all');
      setTempleGridList(result.data.temples);
    };
    getList();
  }, []);

  const handleChange = val => {
    drawer.current.closeDrawer();
    props.navigation.navigate(val);
  };

  const getUserDetails = async () => {
    try {
      const data = await AsyncStorage.getItem('userDetails');
      const currentUser = JSON.parse(data);
      userRole = currentUser?.role;
      setUserData(currentUser);
    } catch (e) {
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const onLogout = async (key) => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('userDetails');
      await AsyncStorage.clear();
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
      title: 'Pujari',
      icon: <FontAwesome name={'users'} color={'#FFF'} size={20} />,
      href: 'searchpoojarilist',
      arrowIcon: require('../img/arrowIcon.png'),
    },
    {
      title: 'Temple',
      icon: <FontAwesome name={'fort-awesome'} color={'#FFF'} size={20} />,
      href: 'searchtemplelist',
      arrowIcon: require('../img/arrowIcon.png'),
    },
    {
      title: 'Unexplored Temple',
      icon: <FontAwesome name={'fort-awesome'} color={'#FFF'} size={20} />,
      href: '',
      arrowIcon: require('../img/arrowIcon.png'),
    },
    {
      title: 'Create Temple',
      icon: <FontAwesome name={'fort-awesome'} color={'#FFF'} size={20} />,
      href: 'details',
      arrowIcon: require('../img/arrowIcon.png'),
    },
    {
      title: 'Create Pujari',
      icon: <FontAwesome name={'users'} color={'#FFF'} size={20} />,
      href: 'createPoojari',
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
      title: 'Donations',
      icon: <FontAwesome5 name={'donate'} color={'#FFF'} size={20} />,
      href: 'Donation',
      arrowIcon: require('../img/arrowIcon.png'),
    },
    {
      title: 'Holy Tour',
      icon: <MaterialCommIcons name={'clock-time-four'} color={'#FFF'} size={20} />,
      href: 'holyTour',
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

  const menuList = [
    { label: 'Edit Profile', href: 'updateuserprofile' },
    { label: 'Social Links', href: 'updatesociallinks' },
    { label: 'Change Password', href: 'changepassword' },
  ];

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
            <Text style={styles.sdbrProTtile1}>
              ({userData?.role === 'poojari' ?
                ('pujari') : (userData?.role)
              })
            </Text>
          </View>
          <ImageBackground
            style={styles.sidebarProPatt}
            source={require('../img/sidebarPatt.png')}></ImageBackground>
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.navigationMainContainer}>
        <View>
          {drawerMenuList
            ?.filter(v => userRole === 'user' ? (v?.title !== 'Enquiries' && v?.title !== 'Create Pujari' && v?.title !== 'Create Temple') : userRole === 'temple' ? v?.title !== 'Create Pujari' : userRole === 'poojari' ? v?.title !== 'Create Temple' : v)
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
                }}>
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
      <DrawerLayout
        ref={drawer}
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        drawerType="front"
        drawerBackgroundColor="#fff"
        renderNavigationView={navigationView}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.mainHeaderOuter}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#db4242', '#db4242']}
            style={styles.mainHeader}>
            <View style={styles.backMenuDiv}>
              <TouchableOpacity
                style={styles.backBtnDiv}
                onPress={() => drawer.current.openDrawer()}>
                <Image
                  source={require('../img/menuIcon.png')}
                  style={[styles.arrowBtn, styles.sideMenuIcon]}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Account Settings</Text>
          </LinearGradient>
        </View>
        <ScrollView contentContainerStyle={styles.outerContainer}>
          <View style={styles.mainBoxOuter}>
            <View style={styles.mainBody}>
              <View style={styles.profileCard}>
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
                  <Text style={styles.sdbrProEmail}>{userData?.email}</Text>
                </View>
                <ImageBackground
                  style={styles.sidebarProPatt}
                  source={require('../img/sidebarPatt.png')}></ImageBackground>
              </View>
              <View style={styles.formOuter}>
                {menuList?.map((item, index) => (
                  <View key={index} style={[styles.formGroupDiv]}>
                    <TouchableOpacity
                      style={
                        index === menuList?.length - 1
                          ? styles.sidebarLinkColNoBor
                          : styles.sidebarLinkCol
                      }
                      onPress={() => handleChange(item?.href)}>
                      <View style={styles.formGroupNew}>
                        <Text style={styles.formLabelNew}>{item?.label}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

      </DrawerLayout>
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
  arrowBtn: {
    height: 15,
    width: 10,
    marginRight: 12,
  },
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
  sidebarProImg: {
    width: 70,
    height: 70,
    borderRadius: 70,
    position: 'relative',
    bottom: 1,
  },
  sidebarProTitleDiv: {
    maxWidth: '60%',
  },
  sdbrProTtile: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
  },
  sdbrProTtile1: {
    fontSize: 15,
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
    textTransform: 'capitalize'
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
    display: "flex",
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
});

export default AccountSettings;
