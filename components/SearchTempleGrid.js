import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  DrawerLayoutAndroid,
  Modal,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import UserApi from '../Axios/UserApi';
import TempleMap from './TempleMap';
import MapViewComponent from './MapViewComponent';
import { BASE_URL_APP } from '../Utils/Contstant';
var { height, width } = Dimensions.get('window');
const SearchTempleGrid = props => {
  const [templeGridList, setTempleGridList] = useState([]);
  const [templeOldGridList, setTempleOldGridList] = useState([]);
  const [search, setSearch] = useState();
  const [visible, setVisible] = useState(false);
  const searchRef = useRef();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState(null);
  const activeRoute = props.navigation.state.routeName;
  const onSearch = text => {
    if (text === '') {
      setTempleGridList(templeOldGridList);
    } else {
      let temList = templeGridList.filter(item => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setTempleGridList(temList);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const decoded = await AsyncStorage.getItem('userDetails');
        const decodedToken = JSON.parse(decoded);

        // const firstName = await AsyncStorage.getItem('firstName');
        // console.log('firstName', firstName)
        setUserData(decodedToken);

        // const lastName = await AsyncStorage.getItem('lastName');
        // console.log('lastName', lastName)
      } catch (error) {
        console.error('error', error);
      }
    })();
  }, []);

  useEffect(() => {
    const getList = async () => {
      const result = await UserApi.get('/temple/all');
      console.log('result', result);
      setTempleGridList(result.data.temples);
      setTempleOldGridList(result.data.temples);
    };
    getList();
  }, []);

  const onCardClick = id => {
    props.navigation.navigate('templedetail', {
      id: id,
    });
  };

  const handleClick = () => {
    props.navigation.navigate('dashboard');
  };
  const gridPage = () => {
    props.navigation.navigate('searchpoojarigrid');
  };
  const listPage = () => {
    props.navigation.navigate('searchpoojarilist');
  };
  const templeGridPage = () => {
    props.navigation.navigate('searchtemplegrid');
  };
  const templeGridListPage = () => {
    props.navigation.navigate('searchtemplelist');
  };
  const holyTourClick = () => {
    props.navigation.navigate('holyTour');
  };
  const DonationClick = () => {
    props.navigation.navigate('Donation');
  };

  const onLogout = async key => {
    try {
      await AsyncStorage.removeItem(key);
      await AsyncStorage.removeItem('userDetails');
      await AsyncStorage.clear();
      // props?.setHitRender(!props?.hitRender)
      props.navigation.navigate('login');
      return true;
    } catch (exception) {
      return false;
    }
  };

  const drawer = React.useRef(null);
  const [drawerPosition, setDrawerPosition] = React.useState('left');


  const handleProfile = () => {
    props.navigation.navigate('userprofile');
  };

  const navigationView = () => (
    <View style={[styles.navigationContainer]}>
      <View style={[styles.sidebarTopCol]}>
        <TouchableOpacity onPress={handleProfile}>
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
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.navigationMainContainer}>
        <View>
          <View>
            <TouchableOpacity
              style={styles.sidebarLinkCol}
              onPress={handleClick}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#db4242', '#db4242']}
                  style={[styles.sidebarLinkIcon]}>
                  <FontAwesome name={'home'} color={'#FFF'} size={20} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Dashboard</Text>
              </View>
              <Image
                source={require('../img/arrowIcon.png')}
                style={[styles.sidebarLinkArrow]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarLinkCol} onPress={gridPage}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#db4242', '#db4242']}
                  style={[styles.sidebarLinkIcon]}>
                  <FontAwesome name={'users'} color={'#FFF'} size={20} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Pujari</Text>
              </View>
              <Image
                source={require('../img/arrowIcon.png')}
                style={[styles.sidebarLinkArrow]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarLinkCol}
              onPress={templeGridPage}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#db4242', '#db4242']}
                  style={[styles.sidebarLinkIcon]}>
                  <FontAwesome name={'fort-awesome'} color={'#FFF'} size={20} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Temple</Text>
              </View>
              <Image
                source={require('../img/arrowIcon.png')}
                style={[styles.sidebarLinkArrow]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarLinkCol}
              onPress={DonationClick}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#db4242', '#db4242']}
                  style={[styles.sidebarLinkIcon]}>
                  <FontAwesome5 name={'donate'} color={'#FFF'} size={20} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Donations</Text>
              </View>
              <Image
                source={require('../img/arrowIcon.png')}
                style={[styles.sidebarLinkArrow]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarLinkCol}
              onPress={holyTourClick}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#db4242', '#db4242']}
                  style={[styles.sidebarLinkIcon]}>
                  <MaterialCommIcons
                    name={'clock-time-four'}
                    color={'#FFF'}
                    size={20}
                  />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Holy Tour</Text>
              </View>
              <Image
                source={require('../img/arrowIcon.png')}
                style={[styles.sidebarLinkArrow]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sidebarLinkCol}
              onPress={() => onLogout('accessToken')}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#db4242', '#db4242']}
                  style={[styles.sidebarLinkIcon]}>
                  <FontAwesome name={'sign-out'} color={'#FFF'} size={20} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Logout</Text>
              </View>
              <Image
                source={require('../img/arrowIcon.png')}
                style={[styles.sidebarLinkArrow]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
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
            <Text style={styles.headerTitle}>Temple</Text>
          </LinearGradient>
        </View>
        <ScrollView contentContainerStyle={styles.outerContainer}>
          <View style={styles.mainBoxOuter}>
            <View
              style={{
                width: width,
                height: Dimensions.get('window').height - 400,
              }}>
              <TempleMap templeList={templeGridList} search={search} />
            </View>
            <View style={styles.fixInfoDiv}>
              <View style={[styles.spaceBetween, styles.marginBottom]}></View>
              <View style={[styles.mainHdng, styles.spaceBetween]}>
                <View style={[styles.columnTwo]}>
                  <View style={[styles.MainTitleDiv]}>
                    <View style={[styles.spaceBetween, styles.marginBottom]}>
                      <View style={styles.formGroup}>
                        <View style={styles.formGroupIcon}>
                          <Image style={styles.srchIcon} />
                          <TextInput
                            style={[styles.formControl, styles.formControlIcon]}
                            ref={searchRef}
                            placeholder=" Search.."
                            placeholderTextColor="#444"
                            value={search}
                            onChangeText={txt => {
                              onSearch(txt);
                              setSearch(txt);
                            }}
                          />
                          <FontAwesome
                            name="search"
                            size={22}
                            color="#db4242"
                            style={styles.srchIcon}
                          />
                          {search == '' ? null : (
                            <TouchableOpacity
                              style={{ marginRight: 15 }}
                              onPress={() => {
                                searchRef.current.clear();
                                setSearch('');
                              }}></TouchableOpacity>
                          )}
                          <TouchableOpacity
                            style={styles.filtrButton}
                            onPress={() => setVisible(true)}>
                            <MaterialCommIcons
                              name="filter-outline"
                              size={24}
                              color="#db4242"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.gridWrapper}>
                    <Text style={styles.mainTitleText}>Search Results</Text>
                    <View style={styles.grid}>
                      <TouchableOpacity
                        style={styles.lstGrdView}
                        onPress={templeGridPage}>
                        <MaterialCommIcons
                          name="view-grid-outline"
                          size={24}
                          color={
                            activeRoute === 'searchtemplegrid' ? '#db4242' : ''
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.lstGrdView}
                        onPress={templeGridListPage}>
                        <MaterialCommIcons
                          name="format-list-bulleted"
                          size={24}
                          color={
                            activeRoute === 'searchtemplelist' ? '#db4242' : ''
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.mt10]}>
                    <Text style={styles.textBlue}>
                      <FontAwesome5 name="om" size={20} />
                      <Text> {templeGridList.length}</Text>
                      <Text
                        style={[
                          styles.uperCaseNo,
                          styles.mainTitle,
                          styles.greyText,
                        ]}>
                        Temple Found
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.prpertyList]}>
                <View
                  style={styles.proprtyCardItem}
                  backgroundColor={'#ffffff'}>
                  <View style={styles.proprtyCardCol}>
                    <FlatList
                      numColumns={2}
                      keyExtractor={item => item.id}
                      data={templeGridList}
                      renderItem={({ item }) => {
                        return (
                          <View style={[styles.proprtyCardcol1]}>
                            <TouchableOpacity
                              onPress={() => onCardClick(item._id)}>
                              <View style={[styles.pymntMedia]}>
                                {item.templeImages.templePictures.length > 0 ? (
                                  <Image
                                    source={{
                                      uri: `${BASE_URL_APP}/files/${item.templeImages.templePictures[0]}`,
                                    }}
                                    style={[styles.prptyImg]}
                                  />
                                ) : (
                                  <Image
                                    source={require('../img/templeDetailBanner.jpg')}
                                    style={[styles.prptyImg]}
                                  />
                                )}
                              </View>
                              <View style={[styles.gridTxtBg]}>
                                <Text style={[styles.mediumTitle, styles.pt8]}>
                                  {item.title}
                                </Text>
                                <View
                                  style={[styles.locatnTextBig, styles.py7]}>
                                  <Image
                                    source={require('../img/locImg.png')}
                                    style={[styles.locationIcon]}
                                  />
                                  <Text style={styles.subTitle2}>
                                    {item.location.state}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={visible}
                  onRequestClose={() => setVisible(!visible)}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#00000080',
                    }}>
                    <View
                      style={{
                        width: '80%',
                        height: 150,
                        borderRadius: 10,
                        backgroundColor: '#ffffff',
                      }}>
                      <TouchableOpacity
                        style={{
                          Width: '100%',
                          height: 50,
                          borderBottomWidth: 0.5,
                          justifyContent: 'center',
                          paddingLeft: 20,
                        }}
                        onPress={() => {
                          let temList = templeGridList.sort((a, b) =>
                            a.title > b.title ? 1 : -1,
                          );
                          setTempleGridList(temList);
                          setVisible(false);
                        }}>
                        <Text style={{ fontSize: 18, color: '#000' }}>
                          Sort by name
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          Width: '100%',
                          height: 50,
                          borderBottomWidth: 0.5,
                          justifyContent: 'center',
                          paddingLeft: 20,
                        }}
                        onPress={() => {
                          let temList = templeGridList.sort((a, b) =>
                            a.location.state > b.location.state ? 1 : -1,
                          );
                          setTempleGridList(temList);
                          setVisible(false);
                        }}>
                        <Text style={{ fontSize: 18, color: '#000' }}>
                          Sort by State
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          Width: '100%',
                          height: 50,
                          justifyContent: 'center',
                          paddingLeft: 20,
                        }}
                        onPress={() => {
                          setTempleGridList(templeOldData);
                          setVisible(false);
                        }}>
                        <Text style={{ fontSize: 18, color: '#000' }}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[styles.fixInfoBtnsDiv]}>
          <View style={styles.innerFlex}>
            <TouchableOpacity
              style={styles.btmNavFix}
              onPress={() => props.navigation.navigate('dashboard')}>
              <FontAwesome
                name={'home'}
                color={'#633549'}
                size={24}
              />
              <Text
                style={[
                  styles.TextStyle,
                  activeRoute === 'dashboard'
                    ? styles.textLightRed
                    : styles.textRed,
                ]}>
                Home
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.innerFlex}>
            <TouchableOpacity
              style={styles.btmNavFix}
              onPress={() => props.navigation.navigate('searchtemplelist')}>
              <FontAwesome
                name={'fort-awesome'}
                color={'#633549'}
                size={24}
              />
              <Text
                style={[
                  styles.TextStyle,
                ]}>
                Temple
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.innerFlex}>
            <TouchableOpacity
              style={styles.btmNavFix}
              onPress={() => props.navigation.navigate('searchpoojarilist')}>
              <FontAwesome
                name={'users'}
                color={'#633549'}
                size={24}
              />
              <Text
                style={[
                  styles.TextStyle,
                  activeRoute === 'searchpoojarilist'
                    ? styles.textLightRed
                    : styles.textRed,
                ]}>
                Pujari
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.innerFlex}>
            <TouchableOpacity
              style={styles.btmNavFix}
              onPress={() => props.navigation.navigate('accountsettings')}>
              <FontAwesome
                name={'user'}
                color={'#633549'}
                size={24}
              />
              <Text
                style={[
                  styles.TextStyle,
                  activeRoute === 'accountsettings'
                    ? styles.textLightRed
                    : styles.textRed,
                ]}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerLayoutAndroid>
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
  blackText: {
    color: '#000000',
  },
  greyText: {
    fontSize: 16,
    color: '#633549',
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
  backMenuDiv: {
    position: 'absolute',
    left: 16,
    top: 50,
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
  sdbrProTtile1: {
    fontSize: 15,
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
    textTransform: 'capitalize'
  },
  headerTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
    marginTop: 9,
  },
  mainBody: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flex: 1,
  },
  mainTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
  },
  subTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 22,
  },
  locatnTextBig: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subTitle2: {
    fontSize: 13,
    paddingLeft: 6,
    fontFamily: 'Montserrat-Regular',
    color: '#db4242',
  },
  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  mapDivOuter: {
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    minHeight: '100%',
    height: 250,
  },
  srchLogoDiv: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 110,
    height: 110,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 1,
    elevation: 6,
    left: '50%',
    top: '50%',
    marginLeft: -55,
    marginTop: -55,
  },
  mapItem: {
    maxWidth: '100%',
  },
  mapBody: {
    backgroundColor: '#ffffff',
    position: 'relative',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
  },
  fixInfoDiv: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: -30,
  },
  marginBottom: {
    marginBottom: 8,
  },
  dotIcon: {
    backgroundColor: '#9a0000',
    width: 6,
    height: 6,
    borderRadius: 6,
    marginRight: 6,
  },
  shipTextBig: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  shipTextSmall: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  shipTextBold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  shipTextRed: {
    color: '#9a0000',
  },
  shipTextGrey: {
    color: '#b8b9ba',
  },
  shipTextDark: {
    color: '#33373a',
  },
  formTitleDiv: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 1,
  },

  fixInfoBtnsDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
    marginLeft: -5,
    marginRight: -5,
  },
  srchFilterDiv: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: -12,
  },
  fltSlctCoL: {
    position: 'relative',
    marginVertical: 10,
    backgroundColor: '#f6d2d2',
    borderRadius: 30,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  srchTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#533242',
  },
  fltCrossIcon: {
    marginLeft: 12,
  },
  innerFlex: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 3,
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
  btnTransparent: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#9a0000',
  },
  TextStyle: {
    fontSize: 12,
    color: '#633549',
    margin: 5,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  btmNavFix: {
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    width: 30,
    height: 30,
    textAlign: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  textBlue: {
    color: '#db4242',
  },
  textGrey: {
    color: '#676974',
  },

  navigationContainer: {
    flex: 1,
    minHeight: '100%',
  },

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
    paddingHorizontal: 18,
    paddingVertical: 12,
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
  formGroup: {
    marginBottom: 0,
    minWidth: '100%',
    position: 'relative',
    marginRight: 0,
  },
  formLabel: {
    fontSize: 16,
    color: '#221e1f',
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: 10,
  },
  formControl: {
    color: '#221e1f',
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    backgroundColor: '#f4f4f4',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  formGroupIcon: {
    position: 'relative',
  },
  formControlIcon: {
    paddingLeft: 46,
  },
  showHideIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
    width: 16,
    height: 20,
  },
  srchIcon: {
    position: 'absolute',
    left: 15,
    top: 13,
  },
  filtrButton: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  bgOutrBox: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },

  mainHdng: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  MainTitleDiv: {},
  mainTitleText: {
    fontSize: 19,
    color: '#db4242',
    fontFamily: 'Montserrat-Bold',
  },
  mediumTitle: {
    fontSize: 16,
    color: '#633549',
    fontFamily: 'Montserrat-SemiBold',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
  },
  mainTtlBrdr: {
    backgroundColor: '#f6d2d2',
    position: 'absolute',
    width: 96,
    height: 5,
    left: 0,
    bottom: 3,
    zIndex: -1,
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uperCase: {
    textTransform: 'uppercase',
  },
  uperCaseNo: {
    fontFamily: 'Montserrat-Medium',
  },
  mt10: {
    marginTop: 10,
  },
  py7: {
    paddingBottom: 7,
    paddingTop: 7,
  },
  pb10: {
    paddingBottom: 10,
  },
  pt5: {
    paddingTop: 5,
  },
  pt8: {
    paddingTop: 8,
  },
  lstGrdCol: {
    flexDirection: 'row',
  },
  listIcon: {
    backgroundColor: '#f4f4f4',
    marginLeft: 10,
  },

  proprtyCardItem: {
    marginTop: 24,
  },
  proprtyCardCol: {
    marginHorizontal: -12,
    position: 'relative',
  },
  proprtyDefault: {
    backgroundColor: '#000000',
    position: 'absolute',
    right: 0,
    top: 10,
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 20,
    zIndex: 1,
  },
  proprtyCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proprtyCardcol1: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },

  prptyImg: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  prptyFtrIcon: {
    paddingRight: 3,
    fontSize: 12.5,
  },
  prptyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  prptyPriceSm: {
    fontSize: 15,
  },
  wishListIcon: {
    width: 17,
    height: 15,
    marginTop: 10,
    paddingTop: 10,
  },
  gridTxtBg: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
    marginTop: -20,
    minHeight: 110,
  },
  grid: {
    display: 'flex',
    flex: 1,
    padding: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  gridWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  lstGrdView: {
    marginLeft: 5,
  },
  textLightRed: {
    color: '#db4242',
  },
  textRed: {
    color: '#633549',
  },
});

export default SearchTempleGrid;
