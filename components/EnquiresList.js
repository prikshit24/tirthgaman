import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
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
  Modal,
  TextInput,
  Platform,
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DrawerLayout } from 'react-native-gesture-handler';
import ReadMore from 'react-native-read-more-text';

var userRole = '';
var userId = '';
var accessToken = '';
var totalRecords = 0;
var { height, width } = Dimensions.get('window');
const EnquiresList = props => {
  const searchRef = useRef();
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [morningStart, setMorningStart] = useState(false);
  const [filteredDate, setFilteredDate] = useState('');
  const [enquiresList, setEnquiresList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [totalCount, setTotalCount] = useState('');
  const [deleted, setDeleted] = useState(false);

  const getUserDetails = async () => {
    try {
      const data = await AsyncStorage.getItem('userDetails');
      accessToken = await AsyncStorage.getItem('accessToken');
      const currentUser = JSON.parse(data);
      userId = currentUser?._id;
      userRole = currentUser?.role;
      setUserData(currentUser);
    } catch (e) {
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleChange = val => {
    drawer.current.closeDrawer();
    props.navigation.navigate(val);
  };
  const enquiresFiltered = enquiresList
    ?.filter(v => (search === '' ? v : v?.name?.includes(search)))
    .filter(item =>
      filteredDate !== ''
        ? item?.date?.toString().split('T')[0] ===
        filteredDate?.toISOString().split('T')[0]
        : item,
    );

  const onLogout = async key => {
    try {
      await AsyncStorage.removeItem(key);
      await AsyncStorage.removeItem('userDetails');
      await AsyncStorage.clear();
      props.navigation.navigate('login');
      return true;
    } catch (exception) {
      return false;
    }
  };

  const getEnquireList = async val => {
    try {
      setLoading(true);
      await axios({
        method: 'post',
        url: `${BASE_URL_APP}/enquiry/filter?page=${pageNo}&limit=10`,
        data: { id: userId },
      }).then(res => {
        setEnquiresList(res?.data?.results?.enquiries);
        setTotalCount(res?.data?.totalResults)
        totalRecords = res?.data?.totalResults;
        if (res?.data?.results?.next) {
          setHasNext(true);
        }
        setLoading(false);
      });
    } catch (e) {
      console.log(e?.message);
      setLoading(false);
    }
  };
  const handleDeleteEnquire = async val => {
    try {
      await axios({
        method: 'post',
        url: `${BASE_URL_APP}/enquiry/remove?id=${val}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(res => {
        console.log('Delete Response', res);
        if (res?.data?.status === 200) {
          // setEnquiresList(enquiresList.filter((item) => item._id !== val ));
          setDeleted(!deleted)
        }
      });
    } catch (e) {
      console.log(e?.message);
    }
  };

  useEffect(() => {
    if (accessToken !== '') {
      getEnquireList(accessToken);
    }
  }, [accessToken, deleted]);

  useEffect(() => {
    try {
      if (pageNo > 1) {
        setButtonLoading(true);
        axios({
          method: 'post',
          url: `${BASE_URL_APP}/enquiry/filter?page=${pageNo}&limit=10`,
          data: { id: userId },
        }).then(res => {
          if (res?.data?.results?.next) {
            setHasNext(true);
          }
          if (res?.data?.results?.previous) {
            setHasNext(false);
          }
          setEnquiresList(prev => [...prev, ...res?.data?.results?.enquiries]);
          setButtonLoading(false);
        });
      }
    } catch (e) {
      setButtonLoading(false);
      console.log(e?.message);
    }
  }, [pageNo]);

  const getData = async () => {
    setPageNo(prev => prev + 1);
  };

  const handleDelete = val => {
    Alert.alert('Delete', 'Are you sure you want to delete this enquiry?', [
      {
        text: 'Cancel',
        onPress: () => { },
      },
      {
        text: 'Delete',
        onPress: () => {
          handleDeleteEnquire(val);
        },
      },
    ]);
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

  function onMorningStartTimeSelected(event, value) {
    setFilteredDate(value);
    setMorningStart(false);
    setVisible(false);
  }
  const clearFilter = () => {
    setFilteredDate('');
  };

  const renderTruncatedFooter = (handlePress) => {
    return (
      <View style={{ position: 'relative', marginBottom: '7%' }} >
        <Text style={{
          color: '#633549',
          marginTop: 3,
          fontFamily: 'Montserrat-Regular',
          fontWeight: '700',
          marginHorizontal: '3%',
          position: 'absolute',
          right: 0
        }
        } onPress={handlePress} >
          Read more
        </Text >
      </View>

    );
  }

  const renderRevealedFooter = (handlePress) => {
    return (
      <View style={{ position: 'relative', marginBottom: '7%' }} >
        <Text style={{
          color: '#633549',
          marginTop: 3,
          fontFamily: 'Montserrat-Regular',
          fontWeight: '700',
          position: 'absolute',
          right: 10

        }} onPress={handlePress}>
          Show less
        </Text>
      </View>

    );
  }

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {buttonLoading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
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
            <Text style={styles.headerTitle}>Enquiries</Text>
          </LinearGradient>
        </View>
        <ScrollView contentContainerStyle={styles.outerContainer}>
          <View style={styles.mainBoxOuter}>
            <View style={styles.mainBody}>
              <View>
                <View style={styles.formOuter}>
                  <View style={[styles.MainTitleDiv]}>
                    <Text style={[styles.mainTitleText2, styles.textEarthyRed]}>
                      Enquiries
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.filterContainer}>
                  <View style={[styles.formGroup, styles.mt20]}>
                    <TextInput
                      style={[styles.formControl, styles.formControlIcon]}
                      ref={searchRef}
                      placeholder=" Search.."
                      placeholderTextColor="#444"
                      value={search}
                      onChangeText={txt => {
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
                <View>
                  <Text style={{ color: '#62354a', marginBottom: 10, fontWeight: '600' }}>
                    Total enquiries:{totalCount}
                  </Text>
                  {filteredDate !== '' && (
                    <View style={styles.filterWrapper}>
                      <Text>
                        Showing by Date :{' '}
                        {filteredDate?.toISOString().split('T')[0]}
                      </Text>
                      <TouchableOpacity onPress={clearFilter}>
                        <Text>
                          <MaterialCommIcons
                            name="filter-remove"
                            color={'#db4242'}
                            size={22}
                          />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <View>
                  <FlatList
                    keyExtractor={item => item.id}
                    data={enquiresFiltered}
                    ListFooterComponent={
                      enquiresFiltered?.length > 0 && hasNext && renderFooter()
                    }
                    renderItem={({ item, index }) => {
                      return (
                        <View key={item?._id} style={styles.containerWrapper}>
                          <View style={styles.header}>
                            <Text>#{index + 1}</Text>
                            <Text>
                              <TouchableOpacity
                                onPress={() => handleDelete(item?._id)}>
                                <MaterialCommIcons
                                  name="delete-outline"
                                  color="#db4242"
                                  size={24}
                                />
                              </TouchableOpacity>
                            </Text>
                          </View>
                          <View style={[styles.formGroupDiv]}>
                            <View style={styles.formGroupNew}>
                              <Text style={styles.formLabelNew}>Date</Text>
                              <Text style={styles.formLabelNew2}>
                                {item?.date?.split('T')[0]}
                              </Text>
                            </View>
                            <View style={styles.formGroupNew}>
                              <Text style={styles.formLabelNew}>Name</Text>
                              <Text style={styles.formLabelNew2}>
                                {item?.name}
                              </Text>
                            </View>
                            <View style={styles.formGroupNew}>
                              <Text style={styles.formLabelNew}>Email</Text>
                              <Text style={styles.formLabelNew2}>
                                {item?.email}
                              </Text>
                            </View>
                            <View style={styles.formGroupNew}>
                              <Text style={styles.formLabelNew}>Phone</Text>
                              <Text style={styles.formLabelNew2}>
                                {item?.phone}
                              </Text>
                            </View>
                            <View style={styles.formGroupNew}>
                              <Text style={styles.formLabelNew}>Message</Text>
                              <View style={{ marginHorizontal: '5%', maxWidth: '70%' }}>
                                <ReadMore
                                  numberOfLines={1}
                                  renderTruncatedFooter={renderTruncatedFooter}
                                  renderRevealedFooter={renderRevealedFooter}
                                >
                                  <Text style={styles.formLabelNew2}>
                                    {item?.message}
                                  </Text>
                                </ReadMore>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                  {loading && (
                    <ActivityIndicator size="small" color="#db4242" />
                  )}
                  {enquiresFiltered?.length === 0 && (
                    <Text>No Enquiries Found</Text>
                  )}
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
                          setMorningStart(!morningStart);
                        }}>
                        <Text style={{ fontSize: 18, color: '#000' }}>
                          Sort by Date
                        </Text>
                      </TouchableOpacity>
                      {morningStart && (
                        <DateTimePicker
                          value={filteredDate || new Date()}
                          mode={'date'}
                          display={
                            Platform.OS === 'ios' ? 'spinner' : 'default'
                          }
                          onChange={onMorningStartTimeSelected}
                        />
                      )}
                      <TouchableOpacity
                        style={{
                          Width: '100%',
                          height: 50,
                          borderBottomWidth: 0.5,
                          justifyContent: 'center',
                          paddingLeft: 20,
                        }}
                        onPress={() => {
                          let temList = enquiresFiltered?.sort((a, b) =>
                            a.name > b.name ? 1 : -1,
                          );
                          setEnquiresList(temList);
                          setVisible(false);
                        }}>
                        <Text style={{ fontSize: 18, color: '#000' }}>
                          Sort by A-Z
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
      </DrawerLayout>
    </View >
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
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
    paddingVertical: 24,
    paddingHorizontal: 16,
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  formGroupNew: {
    paddingHorizontal: 2,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
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
    paddingBottom: 10,
    fontWeight: '700',
  },
  formLabelNew2: {
    fontSize: 15,
    color: '#444',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
    paddingBottom: 10,
    paddingLeft: '3%',
    marginRight: '6%',
    paddingRight: '5%',
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
    borderRadius: 10,
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
  },
  socialContainer: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: -(10 / 2),
  },
  social: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10 / 2,
    marginHorizontal: 10 / 2,
  },
  socialTitle: {
    color: 'white',
    fontSize: 14,
  },
  filterContainer: {
    flex: 1,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 0,
    minWidth: '100%',
    position: 'relative',
    marginRight: 0,
  },
  srchIcon: {
    position: 'absolute',
    left: 15,
    top: 12,
  },
  filtrButton: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  formControlIcon: {
    paddingLeft: 46,
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
  containerWrapper: {
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#d9d9d9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    color: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  filterWrapper: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default EnquiresList;
