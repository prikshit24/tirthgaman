import React, { useState, useEffect } from 'react';
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
  FlatList,
  ToastAndroid,
  BackHandler,
  Alert,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL_APP } from '../Utils/Contstant';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
// import axios from 'axios';

var userId = '';

const Dashboard = (props) => {

  // console.log('PROPS', props);


  const [featuredTemple, setFeaturedTemple] = useState([]);
  const [popularCity, setPopularCity] = useState([]);
  const [featuredPandit, setFeaturedPandit] = useState([]);
  // console.log('featuredPandit', featuredPandit)
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState('');

  // console.log('TOKEN ==>>', token);

  const [hitPage, setHitPage] = useState(false);

  const openDrawer = () => {
    // setHitPage(!hitPage)
    drawer.current.openDrawer();
    // openDrawer();
  }

  const handleClick = () => {
    setHitPage(!hitPage)
    // alert(111)
    drawer.current.closeDrawer();
    // closeDrawer();
    props.navigation.navigate('dashboard');
  };

  const gridPage = () => {
    drawer.current.closeDrawer();
    // closeDrawer();
    props.navigation.navigate('searchpoojarilist');
  };
  const templeGridPage = () => {
    drawer.current.closeDrawer();
    // closeDrawer();
    props.navigation.navigate('searchtemplelist');
  };

  const createpoojariClick = () => {
    drawer.current.closeDrawer();
    // closeDrawer();
    props.navigation.navigate('createPoojari');
  };
  const detailsClick = () => {
    drawer.current.closeDrawer();
    // closeDrawer();
    props.navigation.navigate('details');
  };

  const holyTourClick = () => {
    drawer.current.closeDrawer();
    // closeDrawer();
    props.navigation.navigate('holyTour');
  };
  const DonationClick = () => {
    drawer.current.closeDrawer();
    // closeDrawer();
    props.navigation.navigate('Donation');
  };
  const handleProfile = () => {
    if (token !== null && token !== '') {
      props.navigation.navigate('userprofile');
    } else {
      props.navigation.navigate('login')
    }
    drawer.current.closeDrawer();
  };

  // useEffect(() => {
  (async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Token 1st', token)
      setToken(token)
    } catch (error) {
    }
  })()
  // }, [])

  const activeRoute = props.navigation.state.routeName;

  useEffect(() => {
    (async () => {
      try {
        const details = await AsyncStorage.getItem('userDetails');
        const userDetails = JSON.parse(details);
        setUserData(userDetails)
      } catch (error) {
      }
    })();
  }, [token, hitPage, props?.token]);

  const vedasData = [
    {
      id: '1',
      image: require('../img/rigveda_img.png'),
      description:
        'The Rigveda is the oldest known Vedic Sanskrit text. Its early layers are among the oldest extant texts in any Indo-European language.',
      name: 'Rig-Veda',
    },
    {
      id: '2',
      image: require('../img/YajurVeda.png'),
      description:
        'An ancient Vedic Sanskrit text, it is a compilation of ritual-offering formulas that were said by a priest while an individual performed ritual actions such as those before the yajna fire.',
      name: 'Yajur-Veda',
    },
    {
      id: '3',
      image: require('../img/samVeda.png'),
      description:
        'It is an ancient Vedic Sanskrit text, and part of the scriptures of Hinduism. One of the four Vedas, it is a liturgical text which consists of 1,875 verses.',
      name: 'Sama-Veda',
    },
    {
      id: '4',
      image: require('../img/rigveda_img.png'),
      description:
        'The language of the Atharvaveda is different from Vedic Sanskrit, preserving pre-Vedic Indo-European archaisms. It is a collection of 730 hymns with about 6,000 mantras, divided into 20 books.',
      name: 'Athar-Veda',
    },
  ];

  const getfeaturedTempledata = async () => {
    let data2 = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    try {
      fetch(`${BASE_URL_APP}/feature/temples`, data2).then(result => {
        result.json().then(resp => {
          console.log('feature temple Response =>', resp)
          if (resp.status === 200) {
            setFeaturedTemple(resp?.featuredTemples);
          } else {
            console.log();
          }
        });
      });
    } catch (error) {
      console.error('feature temple error', error)
    }
  };
  const getPopularCitydata = () => {
    let data2 = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(`${BASE_URL_APP}/temple/exploreByCity`, data2).then(
      result => {
        result.json().then(resp => {
          console.log('temple/exploreByCity Response =>', resp)
          if (resp.state === 200) {
            setPopularCity(resp?.temples);
          }
        });
      },
    );
  };

  const getfeaturedPanditdata = () => {
    let data2 = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(`${BASE_URL_APP}/feature/poojaries`, data2).then(result => {
      result.json().then(resp => {
        console.log('feature/poojaries Response =>', resp)
        if (resp.status === 200) {
          setFeaturedPandit(resp?.featuredTemples);
        } else {
          console.log();
        }
      });
    });
  };

  useEffect(() => {
    console.log('dashboard data useEffect run');
    getfeaturedTempledata();
    getPopularCitydata();
    getfeaturedPanditdata();
  }, [])

  const onCardClick = id => {
    props.navigation.navigate('templedetail', {
      id: id,
    });
  };
  const onCardClick3 = id => {
    props.navigation.navigate('pujariDetail', {
      id: id,
    });
  };

  const onPopularCityClick = (name) => {
    props.navigation.navigate('searchtemplelist', {
      cityName: name,
    });
  }

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('userDetails');
      await AsyncStorage.clear();
      drawer.current.closeDrawer();
      props.navigation.navigate('login');
      return true;
    } catch (exception) {
      return false;
    }
  };

  const handleBottomProfile = () => {
    setHitPage(!hitPage)
    setTimeout(() => {
      if (token !== null && token !== '') {
        props.navigation.navigate('accountsettings')
      } else {
        props.navigation.navigate('login')
      }
    }, 300);
  }

  const drawer = React.useRef(null);
  const [drawerPosition, setDrawerPosition] = React.useState('left');

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
                {userData?.role === 'poojari' ?
                  ('pujari') : (userData?.role)
                }
              </Text>
            </View>
            <ImageBackground
              style={styles.sidebarProPatt}
              source={require('../img/sidebarPatt.png')}></ImageBackground>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <View>
            <TouchableOpacity
              style={styles.sidebarLinkCol}
              onPress={() => handleClick()}>
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
            <TouchableOpacity style={styles.sidebarLinkCol} onPress={() => gridPage()}>
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
              onPress={() => templeGridPage()}>
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
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 18,
                paddingVertical: 12,
                // borderBottomWidth: 1,
                borderWidth: 2,
                borderColor: '#db4242',
                // borderBottomColor: '#f0f0f0',
              }}
              onPress={() => drawer.current.closeDrawer()}
            >
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#db4242', '#db4242']}
                  style={[styles.sidebarLinkIcon]}>
                  <FontAwesome name={'fort-awesome'} color={'#FFF'} size={20} />
                </LinearGradient>
                <Text style={{
                  fontSize: 16,
                  color: '#db4242',
                  fontFamily: 'Montserrat-SemiBold',
                }}>Unexplored Temple</Text>
              </View>
              {/* <Image
                source={require('../img/arrowIcon.png')}
                style={[styles.sidebarLinkArrow]}
              /> */}
            </TouchableOpacity>
            {userData?.role === 'temple' && (
              <TouchableOpacity
                style={styles.sidebarLinkCol}
                onPress={() => detailsClick()}>
                <View style={[styles.sidebarLinkLeft]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#db4242', '#db4242']}
                    style={[styles.sidebarLinkIcon]}>
                    <FontAwesome name={'fort-awesome'} color={'#FFF'} size={20} />
                  </LinearGradient>
                  <Text style={styles.sidebarLinkText}>Create Temple</Text>
                </View>
                <Image
                  source={require('../img/arrowIcon.png')}
                  style={[styles.sidebarLinkArrow]}
                />
              </TouchableOpacity>
            )}
            {userData?.role === 'poojari' && (
              <TouchableOpacity
                style={styles.sidebarLinkCol}
                onPress={() => createpoojariClick()}>
                <View style={[styles.sidebarLinkLeft]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#db4242', '#db4242']}
                    style={[styles.sidebarLinkIcon]}>
                    <FontAwesome name={'users'} color={'#FFF'} size={20} />
                  </LinearGradient>
                  <Text style={styles.sidebarLinkText}> Create Pujari</Text>
                </View>
                <Image
                  source={require('../img/arrowIcon.png')}
                  style={[styles.sidebarLinkArrow]}
                />
              </TouchableOpacity>
            )}
            {token !== null && token !== '' ?
              <>
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
                  onPress={() => onLogout()}>
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
              </>
              :
              <TouchableOpacity
                style={styles.sidebarLinkCol}
                onPress={() => props.navigation.navigate('login')}>
                <View style={[styles.sidebarLinkLeft]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#db4242', '#db4242']}
                    style={[styles.sidebarLinkIcon]}>
                    <FontAwesome name={'sign-in'} color={'#FFF'} size={20} />
                  </LinearGradient>
                  <Text style={styles.sidebarLinkText}>Login</Text>
                </View>
                <Image
                  source={require('../img/arrowIcon.png')}
                  style={[styles.sidebarLinkArrow]}
                />
              </TouchableOpacity>
            }
          </View>
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
        <View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#db4242', '#db4242']}
            style={styles.mainHeader}>
            <View style={styles.backMenuDiv}>
              <TouchableOpacity
                style={styles.backBtnDiv}
                onPress={() => openDrawer()}>
                <Image
                  source={require('../img/menuIcon.png')}
                  style={[styles.arrowBtn, styles.sideMenuIcon]}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Tirth Gaman</Text>
          </LinearGradient>
        </View>
        <ScrollView contentContainerStyle={styles.outerContainer}>
          <View>
            <View style={styles.fixSrchDiv}>
              <View >
                <View style={{
                  marginTop: -40,
                  paddingTop: 30,
                  height: 280,
                }}>
                  <View style={{ marginTop: 7, marginBottom: 10 }}>
                    <View style={[styles.columnTwo]}>
                      <View style={[styles.MainTitleDiv]}>
                        <Text style={styles.mainTitleText2}>Featured Temple</Text>
                      </View>
                    </View>
                  </View>
                  <Swiper loop={false} showsButtons showsPagination={false} >
                    {
                      featuredTemple.map((data, index) => {
                        return (
                          <TouchableOpacity key={index} onPress={() => onCardClick(data._id)} style={{ position: 'relative', top: 15 }} >
                            <View>
                              <ImageBackground style={[styles.cityImg1]} source={
                                data?.templeImages?.coverImages?.length > 0 ?
                                  {
                                    uri: `${BASE_URL_APP}/files/${data?.templeImages?.coverImages?.[0]}`,
                                  }
                                  : require('../img/templeDetailBanner.jpg')
                              }  >
                                <Text style={{
                                  fontSize: 13, color: '#fff', fontWeight: '600', textAlign: 'center', marginTop: '32%'
                                }}  >
                                  {data?.title}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                  <Ionicons name={'location-outline'} color={'#FFF'} size={20} />
                                  <Text
                                    style={{
                                      fontSize: 13, color: '#fff', fontWeight: '600', alignItems: 'center'
                                    }} >
                                    {data?.location?.city},
                                    {data?.location?.state}
                                  </Text>
                                </View>
                              </ImageBackground>
                            </View>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </Swiper>
                </View>
              </View>
            </View>

            <View style={[styles.polularCityDiv, styles.pb40, styles.pt10]}>
              <View style={[styles.mainHdng, styles.pb20, styles.spaceBetween]}>
                <View style={[styles.columnTwo]}>
                  <View style={[styles.MainTitleDiv]}>
                    <Text style={styles.mainTitleText22}>Popular Cities</Text>
                  </View>
                </View>
              </View>
              <View>
                <FlatList
                  horizontal
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  data={popularCity}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 18,
                        }}
                        onPress={() => onPopularCityClick(item?.location?.city)}>
                        {item?.templeImages?.coverImages?.length > 0 ? (
                          <Image
                            source={{
                              uri: `${BASE_URL_APP}/files/${item?.templeImages?.coverImages?.[0]}`,
                            }}
                            style={[styles.cityImg]}
                          />
                        ) : (
                          <Image
                            source={require('../img/pp_delhi.jpg')}
                            style={[styles.cityImg]}
                          />
                        )}
                        <Text style={[styles.cityHdng]}>
                          {item?.location?.city}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: -30 }}>
              <View style={[styles.mainHdngFP, styles.spaceBetween]}>
                <View style={[styles.columnTwo]}>
                  <View style={[styles.MainTitleDiv]}>
                    <Text style={{
                      color: '#633549',
                      fontSize: 21,
                      fontWeight: '600',
                      marginHorizontal: '7%'
                    }}>Featured Pujari </Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={{ marginHorizontal: '3%' }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  data={featuredPandit?.length > 0 && featuredPandit}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => onCardClick3(item._id)}>
                        <View
                          style={{
                            backgroundColor: '#633549',
                            marginTop: 24,
                            marginRight: 10,
                            borderRadius: 20,
                            paddingBottom: '5%',
                            maxWidth: 200,
                            minHeight: 205,
                          }}
                        >
                          {item?.poojariImages?.coverImages?.length > 0 ? (
                            <Image
                              source={{
                                uri: `${BASE_URL_APP}/files/${item?.poojariImages?.poojariImages?.[0]}`,
                              }}
                              style={[styles.prptyImg]}
                            />
                          ) : (
                            <Image
                              source={require('../img/templePandit.jpg')}
                              style={[styles.prptyImg]}
                            />
                          )}
                          <View>
                            <Text
                              style={[
                                styles.mediumTitle,
                                styles.pt8,
                                styles.textWhite,
                              ]}>
                              {item?.name}
                            </Text>
                            <Text
                              style={[styles.subTitle2, styles.textWhiteeee]}>
                              {item?.location?.city},{item?.location?.state}
                            </Text>
                          </View>
                          <Image
                            style={[styles.locationIcon2]}
                            source={require('../img/location-white.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            <View style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              zIndex: -1,
              marginTop: -40,
              paddingTop: 30,
              height: 280,
              overflow: 'hidden',
              marginBottom: "5%"
            }}>
              <View style={[styles.mainHdng, styles.spaceBetween, styles.mt40]}>
                <View style={[styles.columnTwo]}>
                  <View style={[styles.MainTitleDiv]}>
                    <Text style={{
                      fontSize: 22,
                      color: '#633549',
                      fontWeight: '500',
                      marginHorizontal: '3.5%'
                    }}>Vedas</Text>
                  </View>
                </View>
                <View style={[styles.columnTwo]}>
                  <TouchableOpacity style={styles.lstGrdView}>
                    <Text
                      style={[styles.seeAll, styles.textWhite]}
                      onPress={() =>
                        props.navigation.navigate('searchtemplegrid')
                      }>
                      See All <Text style={[styles.incrsSize]}>&raquo;</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Swiper
                showsButtons
                loop={false}
                showsPagination={false}
                style={[]}>
                {vedasData.map((data, index) => {
                  return (
                    <TouchableOpacity key={index}>
                      <View>
                        <View style={{ alignItems: 'center' }}>
                          <ImageBackground
                            style={{ width: 50, height: 55 }}
                            source={data?.image}></ImageBackground>
                          <View style={{ maxWidth: '80%' }}>
                            <Text
                              style={[
                                styles.mediumTitle,
                                styles.pt8,
                                styles.ttextred,
                              ]}>
                              {data?.name}{' '}
                            </Text>
                            <Text
                              style={[
                                styles.locatnTextBig,
                                styles.py7,
                                styles.textblack,
                              ]}>
                              {data?.description}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </Swiper>
            </View>

            <View style={[styles.polularCityDiv, styles.pb40, styles.pt10]}>
              <View style={[styles.mainHdng, styles.spaceBetween]}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome5 name="om" size={20} color="#db4242" />
                  <Text style={{
                    fontSize: 15,
                    color: '#633549',
                    fontWeight: '500',
                    marginLeft: 10
                  }}>EDUCATION FOR ALL RUBAL CHILDREN</Text>
                </View>
              </View>
              <View style={[styles.mainHdng, styles.spaceBetween]}>
                <View style={{ marginBottom: 5 }}>
                  <View style={[styles.MainTitleDiv]}>
                    <Text style={{
                      fontSize: 22,
                      color: '#db4242',
                      fontWeight: '500',
                    }}>
                      We Are Hindu & We Believe In Rama-Krishna & all Vedic Teachings.
                    </Text>
                  </View>
                </View>
              </View>

              <Text
                style={{ color: '#000', fontSize: 15 }}>
                We are a Hindu that belives in Lord Rama and Vishnu Deva the followers and We are a Hindu that belives in Lord Rama and Vishnu Deva.
              </Text>


              <View style={{ position: 'relative', marginTop: 10, }}>


                <ImageBackground source={require('../img/templeDetailBanner.jpg')} style={{ height: 150, opacity: 0.5 }}>
                </ImageBackground>
              </View>
              <View style={{
                backgroundColor: '#62354a',
                padding: '4%',
              }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '5%', width: 160 }}>
                    <Image source={require('../img/CrcleTick.png')} style={[styles.landLodImg2]} />
                    <Text
                      style={{ color: '#fff', fontSize: 16 }}
                      onPress={() => props.navigation.navigate('charDhaam', { token: token })}
                    >
                      Char Dhaam
                    </Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../img/CrcleTick.png')} style={[styles.landLodImg2]} />
                    <Text
                      style={{ color: '#fff', fontSize: 16 }}
                      onPress={() => props.navigation.navigate('jyotirlinga', { token: token })}
                    >
                      12 Jyotirlinga
                    </Text>
                  </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '3%' }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '5%', width: 160 }}>
                    <Image source={require('../img/CrcleTick.png')} style={[styles.landLodImg2]} />
                    <Text
                      style={{ color: '#fff', fontSize: 16 }}
                      onPress={() => props.navigation.navigate('shaktipeeth', { token: token })}
                    >
                      52 Shaktipeeth
                    </Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../img/CrcleTick.png')} style={[styles.landLodImg2]} />
                    <Text
                      style={{ color: '#fff', fontSize: 16 }}
                      onPress={() => props.navigation.navigate('kumbh', { token: token })}
                    >
                      Kumbh mela
                    </Text>
                  </View>
                </View>
              </View>

            </View>

          </View>
        </ScrollView>
        <View style={[styles.fixInfoBtnsDiv]}>
          <View style={styles.innerFlex}>
            <TouchableOpacity style={styles.btmNavFix}>
              <FontAwesome
                name={'home'}
                color={activeRoute === 'dashboard' ? '#db4242' : '#633549'}
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
                color={activeRoute === 'searchtemplelist' ? '#db4242' : '#633549'}
                size={24}
              />
              <Text
                style={[
                  styles.TextStyle,
                  activeRoute === 'searchtemplelist'
                    ? styles.textLightRed
                    : styles.textRed,
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
                color={activeRoute === 'searchpoojarilist' ? '#db4242' : '#633549'}
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
              onPress={() => handleBottomProfile()}>
              <FontAwesome
                name={'user'}
                color={activeRoute === 'accountsettings' ? '#db4242' : '#633549'}
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

      </DrawerLayout>

    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: '3%',
    marginTop: '3%',
  },
  nameStyle: {
    paddingTop: 8,
    color: 'black',
    fontSize: 16,
  },
  landLodImg2: {
    width: 25,
    height: 25,
    borderRadius: 6,
    marginRight: 5,
    // marginTop: 8,
  },
  imageStyle: {
    width: '100%',
    height: '50%',
    borderRadius: 20,
  },
  cityImg1: {
    width: '100%',
    height: '95%',
    opacity: 0.7,
    borderRadius: 10
  },
  templeImages: {
    width: '100%',
    height: '95%',
    opacity: 0.7,
    borderRadius: 10
  },
  descriptionStyle: {
    color: 'gray',
    fontSize: 13,
    paddingTop: '17%'
  },
  ratingImageStyle: {
    resizeMode: 'contain',
  },
  timeStyle: {
    fontSize: 13,
    color: 'black',
    bottom: 20,
    paddingLeft: 50,
  },
  deliveryOptionStyle: {
    fontSize: 14,
    color: 'black',
    bottom: 40,
  },
  imageContainer: {
    marginRight: 15,
    backgroundColor: '#633549',
    borderRadius: 20,
  },
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
    fontFamily: 'Montserrat-Regular',
  },
  blackText: {
    color: '#000000',
  },
  greyText: {
    fontSize: 16,
    color: '#777777',
  },
  incrsSize: {
    fontSize: 20,
  },
  textRedHdng: {
    color: '#633549',
    fontSize: 21,
    fontWeight: '600',

  },
  textLightRed: {
    color: '#db4242',
  },
  textRed: {
    color: '#633549',
  },
  slides: {
    borderRadius: 40,
  },
  slidesBrdrRds: {
    borderRadius: 80,
  },
  // mainBoxOuter: {
  //   flex: 1,
  // },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    zIndex: 9999,
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
  headerTitle: {
    fontSize: 24,
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
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 22,
  },
  subTitle2: {
    fontSize: 13,
    paddingLeft: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginHorizontal: '5%'
  },
  subTitle2Sp: {
    fontSize: 12.5,
    paddingLeft: 0,
    marginLeft: 0,
    fontWeight: '600',
  },
  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  fixInfoDiv: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 0,
  },
  fixSrchDiv: {
    backgroundColor: '#db4242',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  fixSrchDiv2: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: -60,
  },
  contentBox: {
    paddingHorizontal: 16,
    marginBottom: -40,
  },
  contentBoxSP: {
    paddingHorizontal: 16,
  },
  fetrPropryDiv: {
    backgroundColor: '#db4242',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: -50,
    zIndex: -1,
    paddingTop: 60,
    overflow: 'hidden',
    height: 300,
  },
  fetrPropryDiv3: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: -50,
    zIndex: -1,
    paddingTop: 60,
    overflow: 'hidden',
    height: 300,
  },
  fetrPropryDiv2: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: -1,
    marginTop: -40,
    paddingTop: 30,
    height: 280,
    overflow: 'hidden',
  },
  mt40: {
    marginTop: 40,
  },
  mt20: {
    marginTop: 20,
  },
  proprtyBudgetDiv: {
    backgroundColor: '#ffefe2',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 0,
    zIndex: -1,
  },
  proprtyBudgetDivFP: {
    backgroundColor: '#ffefe2',
    paddingHorizontal: 16,
    marginTop: 0,
    zIndex: -1,
  },
  budgetDiv: {
    paddingTop: 5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: -1,
    paddingTop: 60,
    overflow: 'hidden',
  },
  budgetDivSP: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: -1,
    paddingTop: 30,
    overflow: 'hidden',
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
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#ffffff',
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
    justifyContent: 'space-between',
    marginBottom: 5,
    textAlign: 'center',
  },
  textBlue: {
    color: '#0d568f',
  },
  textWhite: {
    color: 'white',
    paddingLeft: '7%'

  },
  textWhiteeee: {
    color: 'white',
    paddingLeft: '10%'
  },
  textWhitee: {
    color: 'black',
    textAlign: 'center',
  },
  textWhiteee: {
    color: '#db4242',
    textAlign: 'center',
    fontSize: 15,
  },
  ttextred: {
    color: '#db4242',
    textAlign: 'center',
  },
  textGrey: {
    color: '#676974',
  },
  textblack: {
    color: 'black',
    fontWeight: 'bold',
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
    marginRight: 10,
  },
  formLabel: {
    fontSize: 16,
    color: '#221e1f',
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: 10,
  },
  formControl: {
    color: '#221e1f',
    height: 45,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#f4f4f4',
    fontFamily: 'Montserrat-Regular',
  },
  formGroupIcon: {
    position: 'relative',
  },
  formControlIcon: {
    paddingLeft: 36,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
    width: 20,
    height: 20,
  },
  filtrIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 20,
    height: 20,
  },
  filtrButton: {
    padding: 10,
    width: 'auto',
    borderRadius: 7,
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
  srchTitle: {
    marginVertical: 10,
    backgroundColor: '#d2edf8',
    borderRadius: 30,
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 10,
  },
  mainHdng: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  mainHdngSP: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHdngFP: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  MainTitleDiv: {
    position: 'relative',
  },
  mainTitleText: {
    fontSize: 19,
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  mainTitleText2: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
  mainTitleText22: {
    fontSize: 22,
    color: '#633549',
    fontWeight: '500',
  },
  mediumTitle: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  mainTtlBrdr: {
    backgroundColor: '#e58989',
    position: 'absolute',
    width: 96,
    height: 5,
    left: 0,
    bottom: 1,
    opacity: 1,
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
  mt10: {
    marginTop: 10,
  },
  pb10: {
    paddingBottom: 10,
  },
  pb20: {
    paddingBottom: 20,
  },
  pb40: {
    paddingBottom: 40,
  },
  pt10: {
    paddingTop: 10,
  },
  pt20: {
    paddingTop: 20,
  },
  pt5: {
    paddingTop: 5,
    paddingLeft: 27,
  },
  pl12: {
    paddingLeft: 12,
  },
  pr5: {
    paddingRight: 5,
  },
  pr15: {
    paddingRight: 15,
  },
  pt8: {
    paddingTop: 8,
  },
  marginRight10: {
    marginRight: 25,
  },
  marginLeft25: {
    marginLeft: 32,
  },
  seeAll: {
    fontSize: 14,
    paddingTop: 0,
    fontFamily: 'Montserrat-Medium',
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
    overflow: 'hidden',
  },
  proprtyCardcol1: {
    flex: 1,
    marginLeft: 10,
    paddingBottom: 10,
    backgroundColor: '#633459',
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  proprtyCardcol1Sp: {
    flex: 1,
    marginLeft: 5,
    paddingBottom: 15,
    position: 'relative',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 4.5,

    shadowColor: '#171717',
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 4,
  },
  proprtyCardcol2: {
    flex: 1,
  },
  prptyImg: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  prptyFtrIcon: {
    paddingRight: 5,
    fontSize: 12.5,
  },
  prptyPrice: {
    fontSize: 14,
    fontWeight: '400',
  },
  prptyPriceSm: {
    fontSize: 15,
  },
  wishListIcon: {
    width: 17,
    height: 15,
  },
  gridTxtBg: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
    marginTop: -20,
  },
  proprtyCardItem1: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  proprtyCardCol1: {
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  proprtyDefault1: {
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
  proprtyCardLeft: {
    width: '100%',
  },
  proprtyCardRight: {
    position: 'absolute',
    Left: 50,
    bottom: 65,
    right: 0,
    left: 20,
  },
  proprtyCardRightFP: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#fff',
    opacity: 1,
    borderRadius: 5,
    paddingBottom: 2,
  },
  proprtyCardRightSP: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#fff',
    opacity: 1,
    borderRadius: 5,
    display: 'flex',
  },
  timeLapseText: {
    justifyContent: 'space-between',
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  timeLapseIcon: {
    marginRight: 150,
    paddingRight: 100,
  },
  spSliderBx: {
    overflow: 'hidden',
    height: 122,
    borderRadius: 15,
  },
  avSliderBorderRadius: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  prptyfeatrImg: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    opacity: 0.8
  },
  SpclPujaImg: {
    width: '50%',
    height: 200,
    borderRadius: 10,
    position: 'relative',
    borderRadius: 40,
  },
  SpclPujaImg2: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    position: 'relative',
    borderRadius: 40,
  },
  budgetBatch: {
    backgroundColor: '#ffefe2',
    padding: 5,
    fontSize: 12,
    borderRadius: 7,
    color: '#633549',
    marginRight: 2,
    lineHeight: 20,
    fontFamily: 'Montserrat-Medium',
  },
  blueBg: {
    backgroundColor: '#0f5590',
  },
  RedBg: {
    backgroundColor: '#db4242',
  },
  whiteTxt: {
    color: 'white',
  },
  undrBudgtImg: {
    width: '100%',
    height: 150,
    borderRadius: 20,
  },

  budgetMedia: {
    position: 'relative',
  },
  budgtPrice: {
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  budgtImgBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    height: 60,
    opacity: 0.9,
  },
  latestPropryDiv: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 0,
    position: 'relative',
  },
  latestPropryBg: {
    position: 'absolute',
    backgroundColor: '#eff6f7',
    height: 130,
    right: -10,
    left: 0,
  },
  lightBg: {
    backgroundColor: '#e8f6fb',
  },
  polularCityDiv: {
    paddingHorizontal: 16,
  },
  polrCityDiv: {
    width: '25%',
    position: 'relative',
    marginTop: 5,
    alignItems: 'center',
  },
  bgTransparent: {
    backgroundColor: '#000',
    width: '100%',
    borderRadius: 100,
    height: 80,
    width: 80,
    position: 'absolute',
    zIndex: 1,
    opacity: 0.3,
  },
  cityImg: {
    borderRadius: 100,
    height: 85,
    width: 85,
    maxWidth: '100%',
    paddingRight: 10,
  },
  cityHdng: {
    color: '#633549',
    fontSize: 14,
  },
  city: {
    color: '#633549',
    fontSize: 14,
    maxWidth: 30,
  },
  space15: {
    height: 15,
  },
  prpertyList: {
    height: 250,
    paddingHorizontal: 0,
    backgroundColor: '#ffefe2',
  },
  prpertyListSp: {
    height: 200,
    paddingHorizontal: 10,
  },
  locationIcon2: {
    position: 'relative',
    width: 12,
    height: 14,
    bottom: 15,
    left: 9,
  },
  arrowIcon: {
    width: 25,
    height: 12,
    position: 'absolute',
    marginLeft: 15,
  },
  cardpdng: {
    paddingLeft: 10,
  },
  cardpdngSp: {
    paddingLeft: 0,
  },
  bg63: {
    backgroundColor: '#633459',
  },
  bgdb42: {
    backgroundColor: '#db4242',
  },
  flatIconBxHdng: {
    fontWeight: '500',
    color: '#000',
    marginTop: 10,
    fontSize: 14,
  },
  flatOtrIconBx: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 3,
    width: '23%',
    height: 100,
  },
  bgflatOtrIconBx1: {
    backgroundColor: '#f2eeff',
  },
  bgflatOtrIconBx2: {
    backgroundColor: '#feeeee',
  },
  bgflatOtrIconBx3: {
    backgroundColor: '#fff8e8',
  },
  bgflatOtrIconBx4: {
    backgroundColor: '#ffede6',
  },
  bgflatOtrIconBx5: {
    backgroundColor: '#deffee',
  },
  bgflatOtrIconBx6: {
    backgroundColor: '#ececec',
  },
  bgflatOtrIconBx7: {
    backgroundColor: '#e0f9fe',
  },
  bgflatOtrIconBx8: {
    backgroundColor: '#fffee0',
  },
  flatIconBx: {
    backgroundColor: '#f2eeff',
    height: 250,
    width: 150,
  },
  flatIconImg1: {
    height: 30,
    width: 46,
    maxWidth: '100%',
    paddingRight: 10,
  },
  flatIconImg2: {
    height: 26,
    width: 48,
    maxWidth: '100%',
    paddingRight: 10,
  },
  flatIconImg3: {
    height: 38,
    width: 34,
    maxWidth: '100%',
    paddingRight: 10,
  },
  flatIconImg4: {
    height: 38,
    width: 57,
    maxWidth: '100%',
    paddingRight: 10,
  },
  row2mrgntp10: {
    marginTop: 8,
  },
  flatIconImg5: {
    height: 48,
    width: 57,
    maxWidth: '100%',
    paddingRight: 10,
  },
  flatIconImg6: {
    height: 37,
    width: 35,
    maxWidth: '100%',
    paddingRight: 10,
  },
  flatIconImg7: {
    height: 39,
    width: 32,
    maxWidth: '100%',
    paddingRight: 10,
  },
  flatIconImg8: {
    height: 42,
    width: 35,
    maxWidth: '100%',
    paddingRight: 10,
  },
  overflowvisible: {
    overflow: 'visible',
  },
  shadowSpBx: {},
  textAlignSet: {
    paddingHorizontal: 8,
    paddingTop: 3,
    paddingBottom: 7,
    justifyContent: 'space-evenly',
    display: 'flex',
    paddingRight: 10,
  },
});

const stylesSwiper = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Dashboard;
