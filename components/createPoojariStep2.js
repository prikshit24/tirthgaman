import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { validateTempleInputs } from '../helperFunctions/Validations/validateTempleInputs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import MapViewComponent
  from './MapViewComponent';
const Step2 = props => {
  const [locationInfo, setLocationInfo] = useState({
    postalCode: '',
    street: '',
  });

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  const [authToken, setAuthToken] = useState('');
  //states for Country
  const [selectedCountry, setSelectedCountry] = useState('');

  //states for Stete
  const [states, setStates] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  //states for Cities
  const [cities, setCities] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [errors, setErrors] = useState({
    country: true, state: true, city: true
  })

  const [coordinate, setCoordinate] = useState({
    latitude: 21.7679,
    longitude: 78.8718,
    latitudeDelta: 20,
    longitudeDelta: 20,
  })

  useEffect(() => {
    console.log('111111111');
    const getApi = async () => {
      console.log('main api will rur after');
      const result = await axios.get(
        'https://www.universal-tutorial.com/api/getaccesstoken',
        {
          headers: {
            Accept: 'application/json',
            'api-token':
              'YR64WkFA6_SLERUs-IfgAFtAlroip7V1goa-tW5qAH5q0DtFbWChC9PnZDrSl5Jgjqw',
            'user-email': 'prikshit.duple@gmail.com',
          },
        },
      );
      console.log('main api result', result?.data?.auth_token);
      setAuthToken(result?.data?.auth_token);
    };
    getApi();
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        // getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            // getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setCities([]);
    setCitiesList([]);
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json

        const link = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${currentLatitude}&longitude=${currentLongitude}&localityLanguage=en`;
        fetch(link)
          .then(res => res.json())
          .then(data => {
            setSelectedCountry(data?.countryName);
            setSelectedState(data?.principalSubdivision);
            setSelectedCity(data?.city);
          });

        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text

        setCoordinate({
          ...coordinate, latitude: Number(currentLatitude), longitude: Number(currentLongitude)
        })

      },
      error => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        setLocationStatus('You are Here');
        //Will give you the location on location change
        // console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: false, maximumAge: 1000 },
    );
  };

  useEffect(() => {
    const getApi = async () => {
      console.log('State API Will Run After this');
      const result = await axios.get(
        `https://www.universal-tutorial.com/api/states/India`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json',
          },
        },
      );
      console.log('States API result', result.data);
      setStates(result.data);
    };
    getApi();
  }, [authToken]);

  useEffect(() => {
    let state = [];
    for (let item of states) state.push(item?.state_name);
    setStatesList(state);
  }, [states]);

  useEffect(() => {
    const getApi = async () => {
      const result = await axios.get(
        `https://www.universal-tutorial.com/api/cities/${selectedState}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json',
          },
        },
      );
      console.log('City API result', result.data);
      setCities(result.data);
    };
    getApi();
  }, [selectedState]);

  useEffect(() => {
    let city = [];
    for (let item of cities) city.push(item?.city_name);
    setCitiesList(city);
  }, [cities]);

  const step3 = async () => {
    const isCountry = validateTempleInputs(selectedCountry);
    const isState = validateTempleInputs(selectedState);
    const isCity = validateTempleInputs(selectedCity);
    // const isPostalCode = validatePostalCode(locationInfo.postalCode);
    // const isStreet = validateTempleInputs(locationInfo.street);

    setErrors({ ...errors, country: isCountry, state: isState, city: isCity })

    if (isCountry && isState && isCity) {
      try {
        await AsyncStorage.setItem('country', selectedCountry);
        await AsyncStorage.setItem('state', selectedState);
        await AsyncStorage.setItem('city', selectedCity);
        locationInfo.postalCode && await AsyncStorage.setItem('postalCode', locationInfo.postalCode);
        locationInfo.street && await AsyncStorage.setItem('street', locationInfo.street);
        await AsyncStorage.setItem('lng', String(coordinate.longitude));
        await AsyncStorage.setItem('lat', String(coordinate.latitude));
        props.navigation.navigate('createPoojariStep3');
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
              onPress={() => props.navigation.navigate('createPoojari')}>
              <Image
                source={require('../img/rightArrow1.jpg')}
                style={[styles.arrowBtn, styles.arrowBtnLight]}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Location</Text>
        </LinearGradient>
      </View>

      <ScrollView contentContainerStyle={styles.outerContainer}>
        <View style={styles.mainBoxOuter}>
          <View style={styles.mainBody}>
            <View style={[styles.spaceBetween]}>
              <View style={[styles.pt10]}>
                <View style={[styles.row, styles.pt10]}>
                  <View style={[styles.spaceBetween]}>
                    <View style={[styles.MainTitleDiv, styles.flatOtrIconBx]}>
                      <View style={[styles.spaceBetween]}></View>
                      <Text
                        style={[styles.mainTitleText2, styles.textEarthyRed]}>
                        Location
                      </Text>
                    </View>
                    <View style={[styles.MainTitleDiv, styles.widthAdjstable]}>
                      <View style={styles.innerFlex}>
                        <TouchableOpacity
                          style={styles.btnGradientDiv}
                          onPress={getOneTimeLocation}>
                          <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#633549', '#633549']}
                            style={[styles.btnDefaultScndry]}>
                            <Image
                              source={require('../img/location-white.png')}
                              style={[styles.CrntlctnIcn]}
                            />
                            <Text style={styles.ScndryBtnTextStyle}>
                              Use Current Location
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.btnFixContainer,
                styles.mtb40,
              ]}>
              <View style={styles.formOuter}>
                <View style={styles.formGroupNew}>
                  <Text style={styles.formLabelNew}>Country/Region* </Text>
                  <SelectDropdown
                    data={['India']}
                    defaultValue={selectedCountry}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                      setSelectedCountry('India');
                    }}
                    defaultButtonText={'Select'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                      return (
                        <FontAwesome
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          color={'#444'}
                          size={10}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                  />
                  {!errors.country && (
                    <Text style={{ color: 'red', fontSize: 13 }}>
                      Select a Country/Region
                    </Text>
                  )}
                </View>

                <View style={[styles.formCheckGroupDiv, styles.py7]}>
                  <View style={styles.formGroupNew}>
                    <Text style={styles.formLabelNew}> State* </Text>
                    <SelectDropdown
                      data={statesList}
                      defaultValue={selectedState}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setSelectedState(selectedItem);
                        setCities([]);
                        setCitiesList([]);
                        setSelectedCity('');
                      }}
                      defaultButtonText={
                        selectedState ? selectedState : 'Select'
                      }
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={10}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                    {!errors.state && (
                      <Text style={{ color: 'red', fontSize: 13 }}>
                        Select a State
                      </Text>
                    )}
                  </View>

                  <View style={styles.formGroupNew}>
                    <Text style={styles.formLabelNew}>City*</Text>
                    <SelectDropdown
                      data={citiesList}
                      defaultValue={selectedCity}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setSelectedCity(selectedItem);
                      }}
                      defaultButtonText={selectedCity ? selectedCity : 'Select'}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={10}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                    {!errors.city && (
                      <Text style={{ color: 'red', fontSize: 13 }}>
                        Select a City
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.formGroupDiv}>
                  <View style={styles.formGroupNew}>
                    <Text style={styles.formLabelNew}>Postal Code</Text>
                    <TextInput
                      style={styles.formControlNew}
                      value={locationInfo.postalCode}
                      onChangeText={value =>
                        setLocationInfo({ ...locationInfo, postalCode: value })
                      }
                      placeholder="Postal Code"
                      placeholderTextColor="#888"
                    />
                  </View>
                </View>
                <View style={styles.formGroupDiv}>
                  <View style={styles.formGroupNew}>
                    <Text style={styles.formLabelNew}>Street</Text>
                    <TextInput
                      style={styles.formControlNew}
                      value={locationInfo.street}
                      onChangeText={value =>
                        setLocationInfo({ ...locationInfo, street: value })
                      }
                      placeholder="Street"
                      placeholderTextColor="#888"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, height: 350, width: '100%', marginTop: '-20%' }} >
            <MapViewComponent coordinate={coordinate} setCoordinate={setCoordinate} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.fixBtnDiv}>
        <View style={styles.innerFlex}>
          <View style={styles.amtDiv}>
            <Text style={styles.amtTextLabel}>Step 2 of 7</Text>
          </View>
        </View>
        <View style={styles.innerFlex}>
          <TouchableOpacity style={styles.btnGradientDiv} onPress={step3}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#db4242', '#db4242']}
              style={[styles.btnDefault, styles.btnFull]}>
              <Text style={styles.TextStyle}> Continue </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    fontFamily: 'Montserrat-Regular',
  },
  mtb40: {
    marginTop: 20,
    marginBottom: 20,
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatOtrIconBx: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 0,
    width: '35%',
  },
  widthAdjstable: {
    width: '65%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  outrInr: {
    paddingHorizontal: 16,
    flex: 1,
  },
  textEarthyRed: {
    color: '#62354a',
  },
  blackText: {
    color: '#000000',
  },
  greyText: {
    fontSize: 16,
    color: '#777777',
  },
  mainBoxOuter: {
    flex: 1,
  },
  mainHeaderOuter: {
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: '#db4242',
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
  btnDefaultScndry: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#633549',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 10,
    position: 'relative',
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
  CrntlctnIcn: {
    marginRight: 8,
  },
  ScndryBtnTextStyle: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
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
    paddingHorizontal: 6,
    position: 'relative',
    paddingTop: 14,
    flex: 1,
    justifyContent: 'center',
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
    fontSize: 12,
    color: '#633549',
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
  sidebarTopCol: {},
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
    paddingHorizontal: 8,
    paddingVertical: 12,
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

  dropdown1BtnStyle: {
    width: '100%',
    height: 35,
    backgroundColor: '#FFF',
    borderRadius: 5,
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
  addBtn: {
    height: 50,
  },

  flx7: {
    flex: 0.75,
  },
  flx3: {
    flex: 0.35,
  },
  MainTitleDiv: {},
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
  backMenuDiv: {
    position: 'absolute',
    left: 16,
    top: 30,
  },
  backBtnDiv: {
    marginRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 35,
    height: 35,
    borderRadius: 100,
    textAlign: 'center',
  },
  arrowBtn: {
    height: 17,
    width: 8,
  },
  arrowBtn: {
    height: 17,
    width: 8,
  },
  arrowBtnLight: {
    height: 17,
    width: 8,
    marginLeft: 15,
  },
  checkBoxDiv: {
    flexDirection: 'row',
    paddingRight: 5,
    marginTop: 15,
    alignItems: 'center',
    flex: 0.35,
  },
  checkBoxTitle: {
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    alignItems: 'center',
  },
  checkBoxTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },

  py7: {
    paddingBottom: 7,
    paddingTop: 7,
  },
  formCheckGroupDiv: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export default Step2;
