import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
  Alert
} from 'react-native';
import { Link } from 'react-router-native';
import LinearGradient from 'react-native-linear-gradient';
// import CheckBox from 'react-native-check-box';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  emailValidate,
  validatePassword,
} from '../helperFunctions/Validations/LoginValidation';
import jwtdecode from 'jwt-decode';
import UserApi from '../Axios/UserApi';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OTPTextView from 'react-native-otp-textinput';
import { otpValidate, signupValidatePhone } from '../helperFunctions/Validations/SignUpValidation';
// import Toast from 'react-native-root-toast';
// import api from '../ApiActions/DdConfig/ApiActions'

const Login = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = useState(0)
  const [otp, setOTP] = useState(0)
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // const [hitRender, setHitRender] = useState(false)

  const [errors, setErrors] = useState({
    email: true,
    password: true,
    phone: true,
    otp: true
  });

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const [loginOtp, setLoginOtp] = useState(false)

  const handleLoginClick = async () => {
    try {
      setLoading(true);
      const credentials = {
        email: email,
        password: password,
      };

      const isEmail = emailValidate(email);
      const isPassword = validatePassword(password);

      setErrors({ ...errors, email: isEmail, password: isPassword });
      if (isEmail && isPassword) {
        const result = await UserApi.post('/login', credentials);
        if (result.data.message === 'Invalid Credentials !') {
          alert(result.data.message);
          setLoading(false);
        } else {
          const { id, role } = jwtdecode(result.data.accessToken);
          try {
            const res = await UserApi.post(`${role}/user-info`, { id });
            if (res.data?.user) {
              await AsyncStorage.setItem(
                'userDetails',
                JSON.stringify(res?.data?.user),
              );
              // if (toggleCheckBox === true) {
              await AsyncStorage.setItem(
                'accessToken',
                result.data.accessToken,
              );
              // }
              setLoading(false);
              setEmail('');
              setPassword('');
              navigation.navigate('dashboard', { token: result.data.accessToken });
            }
          } catch (err) {
            setLoading(false);
            console.log('err', err);
          }
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log('err', err);
    }
  };

  const handleOtpLogin = async () => {

    const isPhone = signupValidatePhone(phone);
    const isOTP = otpValidate(otp);

    setErrors({ ...errors, phone: isPhone, otp: isOTP });

    if (isPhone && isOTP) {
      try {
        const result = await UserApi.get(`/login/loginWithMobileOtp/${phone}/${otp}`);
        console.log('Result', result)
        if (result?.data?.status === 200) {
          setLoading(true);
          const { id, role } = jwtdecode(result.data.accessToken);
          const res = await UserApi.post(`${role}/user-info`, { id });
          if (res.data?.user) {
            await AsyncStorage.setItem(
              'userDetails',
              JSON.stringify(res?.data?.user),
            );
            // if (toggleCheckBox === true) {
            await AsyncStorage.setItem(
              'accessToken',
              result.data.accessToken,
            );
            // }
            setLoading(false);
            setPhone('');
            setOTP(null);
            setLoginOtp(false)

            navigation.navigate('dashboard', { token: result.data.accessToken });
          }
        } else {
          alert(result?.data?.message);
          setLoading(false);
        }
      } catch (error) {
        if (error.response?.data?.status === 404) {
          alert('OTP not matched!')
        } else {
          alert(error.response?.data?.message);
        }
        console.log('ERROR', error)
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const details = await AsyncStorage.getItem('userDetails');
        setEmail('');
        setPassword('');
        setToggleCheckBox(false)
        setIsPasswordSecure(true)

        console.log('token', token)
        console.log('details', details)
      } catch (error) {
        console.error('error', error);
      }
    })();
  }, []);

  const loginOTP = () => {
    setLoginOtp(!loginOtp)
  }

  const generateOTP = async () => {

    const isPhone = signupValidatePhone(phone);

    setErrors({ ...errors, phone: isPhone });

    if (isPhone) {
      setOtpLoading(true);
      console.log('PHONE ==>', phone)
      try {
        const result = await UserApi.get(`/login/loginWithMobileOtp/${phone}`);
        console.log('Result', result)
        if (result?.data?.status === 201) {
          setOtpLoading(false);
          alert(result?.data?.message)
        }
      } catch (error) {
        console.log('ERROR', error)
        alert(error?.response?.data?.message);
        setOtpLoading(false);
      }
    }
  }

  const handleSignUpClick = () => {
    navigation.navigate('register');
  };

  const onSkip = () => {
    navigation.navigate('dashboard');
  }

  // useEffect(() => {
  //   // back handle exit app
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  //   return () => {
  //     BackHandler.remove('hardwareBackPress', handleBackButton);
  //   };
  // }, []);

  // handleBackButton = () => {
  //   Alert.alert(
  //     'Exit App',
  //     'Exiting the application?', [{
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel'
  //     }, {
  //       text: 'OK',
  //       onPress: () => BackHandler.exitApp()
  //     },], {
  //     cancelable: false
  //   }
  //   )
  //   return true;
  // }

  return (
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.bgImage}
        source={require('../img/login_bg01.jpg')}>
        <View style={styles.overlayColor}>
          <View style={styles.loginOuter}>
            <View style={styles.loginCenterDiv}>
              <View style={styles.loginTextDiv}>
                <Image
                  source={require('../img/logo3.png')}
                  style={styles.mainLogo}
                />
              </View>
              <View style={styles.loginBoxOuter}>
                <View style={styles.loginBoxInner}>
                  <Text style={[styles.mainTitleSmall]}>Welcome Back</Text>
                  <Text style={[styles.mainTitle2]}>Login to your account</Text>
                  {!loginOtp ?
                    <>
                      <View style={styles.formGroup}>
                        <Text style={[styles.formLabel, styles.textEarthyRed]}>
                          Email
                        </Text>
                        <TextInput
                          style={styles.formControl}
                          onChangeText={setEmail}
                          value={email}
                          placeholder="john.doe@gmail.com"
                          placeholderTextColor="#909090"
                        />
                        {!errors.email && (
                          <Text style={{ color: 'red', fontSize: 13 }}>
                            Enter Correct Email
                          </Text>
                        )}
                      </View>
                      <View style={styles.formGroup}>
                        <Text style={[styles.formLabel, styles.textEarthyRed]}>
                          Password
                        </Text>
                        <View style={styles.formGroupIcon}>
                          <TextInput
                            style={[styles.formControl, styles.formControlIcon]}
                            onChangeText={setPassword}
                            secureTextEntry={isPasswordSecure}
                            value={password}
                            placeholder="Password"
                            placeholderTextColor="#909090"
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setIsPasswordSecure(prev => !prev);
                            }}>
                            <FontAwesome
                              name={isPasswordSecure ? 'eye-slash' : 'eye'}
                              color={'#909090'}
                              size={20}
                              style={styles.showHideIcon}
                            />
                          </TouchableOpacity>
                          {!errors.password && (
                            <Text style={{ color: 'red', fontSize: 13 }}>
                              Must be between 8-25 Characters and should have one
                              Capital Alphabet one Number and one Special Character
                            </Text>
                          )}
                        </View>
                      </View>
                    </> : <>
                      <View style={styles.formGroup}>
                        <Text style={[styles.formLabel, styles.textEarthyRed]}>
                          Phone Number
                        </Text>
                        <View style={styles.formGroupIcon}>
                          <TextInput
                            style={[styles.formControl, styles.formControlIcon]}
                            value={phone}
                            onChangeText={value => setPhone(value)}
                            placeholder="Phone Number"
                            placeholderTextColor="#909090"
                            keyboardType='numeric'
                            maxLength={10}
                          />
                          {!errors.phone && (
                            <Text style={{ color: 'red', fontSize: 13 }}>
                              Enter Valid Phone Number
                            </Text>
                          )}
                        </View>
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={[styles.formLabel, styles.textEarthyRed]}>
                          OTP
                        </Text>
                        <View style={styles.formGroupIcon}>
                          <OTPTextView
                            handleTextChange={(value) => { setOTP(value) }}
                            inputCount={6}
                            containerStyle={styles.textInputContainer}
                            textInputStyle={styles.roundedTextInput}
                            tintColor="#9a0000"
                            offTintColor="#e1e1e1"
                            defaultValue=""
                          />
                        </View>
                        {!errors.otp && (
                          <Text style={{ color: 'red', fontSize: 13 }}>
                            Enter Correct OTP
                          </Text>
                        )}
                      </View>
                    </>
                  }
                  <View style={styles.signUpCatBtns}>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#fff', '#fff']}
                      style={styles.roundBtnDiv}>
                      <View style={styles.twoColumn2}>
                        {/* <CheckBox
                          style={styles.checkBoxDiv}
                          checkedCheckBoxColor='#00d792' uncheckedCheckBoxColor='#62354A' onClick={() => {
                            setToggleCheckBox(!toggleCheckBox)
                          }} isChecked={toggleCheckBox}
                        />
                        <Text
                          style={[
                            styles.ForgetYrPasswordformLabel,
                            styles.textRed,
                          ]}>
                          Remember Me
                        </Text> */}
                      </View>
                    </LinearGradient>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#fff', '#fff']}
                      style={styles.roundBtnDiv}>
                      <Link
                        to="/forgotPassword"
                        underlayColor="#ffffff"
                        style={styles.textRight}>
                        <Text
                          style={[
                            styles.ForgetYrPasswordformLabel,
                            styles.textRed,
                          ]}
                          onPress={() => navigation.navigate('forgotpassword')}>
                          Forgot your password?
                        </Text>
                      </Link>
                    </LinearGradient>
                  </View>

                  {/* <View style={{ flexDirection: 'row', marginTop: '4%', alignItems: 'center', marginTop: '4%' }} >
                    <CheckBox checkedCheckBoxColor='#62354A' uncheckedCheckBoxColor='#62354A' onClick={() => {
                      setToggleCheckBox(!toggleCheckBox)
                    }} isChecked={toggleCheckBox} />
                    <View style={{ marginRight: '3%' }} >
                      <Text
                        style={[
                          styles.ForgetYrPasswordformLabel,
                          styles.textRed,
                        ]}>
                        Remember Me
                      </Text>
                    </View>
                  </View> */}

                  <View style={styles.formGroup}>
                    <TouchableOpacity
                      style={styles.btnDefault}
                      onPress={!loginOtp ? () => handleLoginClick() : () => handleOtpLogin()}>
                      <Text style={styles.TextStyle}>
                        {' '}
                        {loading ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          'Login'
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {loginOtp && <View style={styles.formGroup}>
                    <TouchableOpacity
                      style={styles.btnDefault}
                      onPress={() => generateOTP()}
                      disabled={otpLoading}>
                      <Text style={styles.TextStyle}>
                        {' '}
                        {otpLoading ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          'Generate OTP'
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>}

                  <View style={styles.formGroup}>
                    {!loginOtp ?
                      <TouchableOpacity
                        style={styles.btnDefault}
                        onPress={() => loginOTP()}>
                        <Text style={styles.TextStyle}>
                          Login With Phone Number
                        </Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        style={styles.btnDefault}
                        onPress={() => loginOTP()}>
                        <Text style={styles.TextStyle}>
                          Login With Email
                        </Text>
                      </TouchableOpacity>
                    }
                  </View>

                </View>
              </View>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', width: '100%', maxHeight: 35, marginTop: 15 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#db4242',
                    borderRadius: 5,
                    // paddingVertical: 18,
                    // paddingHorizontal: 40,
                    position: 'relative',
                    width: 100,
                    borderWidth: 2,
                    borderColor: '#fff'
                  }}
                  onPress={() => onSkip()}>
                  <Text style={styles.TextStyle}>
                    Skip
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
            <View style={styles.loginInfoDiv}>
              <Text style={styles.whtTextColor}>Don't have an account?</Text>
              <Link
                to="register"
                underlayColor="#ffffff"
                style={styles.loginLink}>
                <Text
                  onPress={handleSignUpClick}
                  style={[styles.whtLink, styles.underLine]}>
                  Sign Up
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fbBtn: {},
  Ftrbadgicn: {
    width: 18,
    height: 14,
  },
  Ftrbadgicn2: {
    width: 12,
    height: 10,
  },
  Ftrbadgicn3: {
    width: 20,
    height: 16,
  },
  ftrIcnOtrBx: {
    backgroundColor: '#375797',
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 2,
    marginRight: 5,
  },
  badgeTxt: {
    color: '#fff',
    fontSize: 14,
  },
  badgeBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4267b2',
    paddingTop: 6.5,
    paddingBottom: 7,
    paddingRight: 0,
    color: '#fff',
    width: 100,
    borderRadius: 5,
    lineHeight: 0,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 2,
    color: '#000',
    height: 45,
    width: 45
  },
  badgeTxt2: {
    color: '#fff',
    fontSize: 14,
  },
  badgeBtn2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DA1F2',
    paddingTop: 4,
    paddingBottom: 6,
    paddingRight: 5,
    paddingLeft: 0,
    color: '#fff',
    width: 95,
    borderRadius: 5,
    lineHeight: 0,
    marginHorizontal: 6,
  },
  ftrIcnOtrBx2: {
    backgroundColor: '#1a95e2',
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginRight: 5,
  },
  badgeTxt3: {
    color: '#fff',
    fontSize: 14,
  },
  badgeBtn3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DB4437',
    paddingTop: 6.5,
    paddingBottom: 7,
    paddingRight: 0,
    color: '#fff',
    width: 96,
    borderRadius: 5,
    lineHeight: 0,
  },
  ftrIcnOtrBx3: {
    backgroundColor: '#be3a2e',
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 2,
    marginRight: 5,
  },
  twtrBtn: {
    backgroundColor: '#1da1f2',
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#fff',
    marginHorizontal: 10,
  },
  GogleBtn: {
    backgroundColor: '#db4437',
    paddingHorizontal: 10,
    color: '#fff',
  },
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    position: 'relative',
    minHeight: '100%',
    fontFamily: 'Montserrat-Regular',
  },
  checkBoxDiv: {
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'flex-start',
    marginLeft: -50,
    color: '#fff',
    // borderColor: '#707070',
    // borderWidth: 1
  },
  checkBoxTitle: {
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    alignItems: 'center',
  },
  twoColumn2: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  twoColumn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  signUpCatBtns: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25,
  },
  roundBtnDiv: {
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: -60,
    marginBottom: 50,
  },
  inner: {
    flex: 1,
  },
  bgImage: {
    backgroundSize: 'cover',
    alignItems: 'center',
    resizeMode: 'contain',
    paddingVertical: 0,
    paddingHorizontal: 0,
    position: 'relative',
    zIndex: 1,
  },
  textWhite: {
    color: '#fff',
  },
  textEarthyRed: {
    color: '#62354a',
  },
  textRed: {
    color: '#db4242',
  },
  overlayColor: {
    backgroundColor: '#db424299',
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'relative',
  },
  loginOuter: {
    position: 'relative',
    minWidth: '100%',
    zIndex: 2,
  },
  loginCenterDiv: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loginTextDiv: {
    position: 'relative',
    textAlign: 'center',
    alignItems: 'center',
  },
  mainLogo: {
    width: 225,
    height: 25,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 21,
    color: '#221e1f',
    paddingVertical: 40,
    paddingHorizontal: 30,
    fontFamily: 'Montserrat-SemiBold',
  },
  mainTitle2: {
    fontSize: 20,
    color: '#62354a',
    paddingVertical: 1,
    paddingHorizontal: 30,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 20,
    textAlign: 'center',
    position: 'relative',
    paddingTop: 5,
    paddingBottom: 5,
  },
  mainTtlBrdr: {
    backgroundColor: '#f8d9d9',
    position: 'absolute',
    width: 96,
    height: 5,
    left: 0,
    right: 0,
    bottom: 3,
    opacity: 1,
    zIndex: -1,
  },
  mainTitleSmall: {
    fontSize: 12.5,
    lineHeight: 14,
    color: '#db4242',
    paddingHorizontal: 0,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    alignItems: 'center',
  },
  rentLogoTxt: {
    color: '#221e1f',
  },

  blueColor: {
    color: '#0d568f',
  },
  loginBoxOuter: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
  },
  loginBoxInner: {
    marginHorizontal: '2%'
  },
  signUpCatBtns: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  roundBtn: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#680001',
    borderColor: '#680001',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 40,
    position: 'relative',
  },
  formGroup: {
    marginBottom: 16,
    minWidth: '100%',
    position: 'relative',
  },
  ForgetYrPasswordformLabel: {
    fontSize: 14,
    paddingBottom: 5,
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
  formGroupIcon: {
    position: 'relative',
  },
  formControlIcon: {
    paddingRight: 36,
  },
  showHideIcon: {
    position: 'absolute',
    right: 8,
    top: -30,
  },
  btnDefault: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#db4242',
    borderRadius: 5,
    paddingVertical: 18,
    paddingHorizontal: 40,
    position: 'relative',
    minWidth: 200,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  txtBold: {
    fontWeight: 'bold',
  },
  fntMedium: {
    fontSize: 21,
  },

  TextStyle: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center'
  },
  textRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginInfoDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  whtTextColor: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
  loginLink: {
    marginLeft: 6,
  },
  darkLink: {
    fontSize: 14,
    color: '#221e1f',
    fontFamily: 'Montserrat-SemiBold',
  },
  whtLink: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
  },

  phoneContainerStyle: {
    color: '#221e1f',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Regular',
    minWidth: '100%',
  },
  phoneTextContainerStyle: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    color: '#221e1f',
  },
  phoneTextInputStyle: {
    backgroundColor: 'transparent',
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  phoneCodeTextStyle: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    borderColor: '#000000',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  phoneFlagButtonStyle: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    borderColor: '#000000',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  phoneCountryPickerButtonStyle: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    borderColor: '#000000',
  },
});

export default Login;
