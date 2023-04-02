import React, { useState } from 'react';
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
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Link } from 'react-router-native';
import CheckBox from 'react-native-check-box';
import RadioField from './RadioField';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Redux/Actions/UserAction';
import {
  signupValidateCPassword,
  signupValidateEmail,
  signupValidateFirst,
  signupValidateLast,
  signupValidatePassword,
  signupValidatePhone,
  signupValidateRole,
} from '../helperFunctions/Validations/SignUpValidation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserApi from '../Axios/UserApi';
import jwtdecode from 'jwt-decode';

const Register = ({ navigation }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false)

  const [signUpInFo, setSignUpInfo] = useState({
    role: 'temple',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    isRole: true,
    isFirst: true,
    isLast: true,
    isEmail: true,
    isPassword: true,
    isCPassword: true,
    isPhone: true,
  });

  const [withPhone, setWithPhone] = useState(false)

  const handleClick = async () => {
    const isRole = signupValidateRole(signUpInFo.role);
    const isFirst = signupValidateFirst(signUpInFo.firstname);
    const isLast = signupValidateLast(signUpInFo.lastname);
    const isEmail = signupValidateEmail(signUpInFo.email);
    const isPassword = signupValidatePassword(signUpInFo.password);
    const isCPassword = signupValidateCPassword(signUpInFo);
    const isPhone = signupValidatePhone(signUpInFo.phone);

    setErrors({
      ...errors,
      isRole: isRole,
      isFirst: isFirst,
      isLast: isLast,
      isEmail: isEmail,
      isPassword: isPassword,
      isCPassword: isCPassword,
      isPhone: isPhone,
    });
    console.log('error', errors);
    if (
      isRole &&
      isFirst &&
      isLast &&
      isEmail &&
      isPassword &&
      isCPassword &&
      isPhone
    ) {
      if (toggleCheckBox) {
        try {
          setLoading(true)
          const userResponse = await registerUser(signUpInFo)(dispatch);
          console.log('USER response in Signup =>', userResponse)
          if (userResponse?.data?.status === 201) {

            try {
              const data = {
                userID: userResponse?.data?.userID,
                phone: Number(signUpInFo.phone),
                role: signUpInFo.role
              }

              // console.log('data for otp', data)

              const otpApiHit = await UserApi.post(`signUp/WithMobile`, data)

              if (otpApiHit.status === 200) {
                await AsyncStorage.setItem('otp_data', JSON.stringify(data));
                setLoading(false)
                navigation.navigate('otp')
              } else {
                alert(otpApiHit.data.message)
              }

              console.log('OTP API HIT Response ==>', otpApiHit)

            } catch (error) {
              console.log('ERROR from otp', error)
            }


            // await AsyncStorage.setItem('signUP_userID', userResponse?.data?.userID);
            // await AsyncStorage.setItem('signUP_userPhone', signUpInFo.phone);
            // await AsyncStorage.setItem('signUP_userRole', signUpInFo.role);
            // navigation.navigate('otp');
          } else {
            alert(userResponse?.data?.message);
            setLoading(false)
            setSignUpInfo('');
          }
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
      } else {
        alert('Accept Terms of use and our Privacy Policy');
      }
    }
  };

  const handleOpenLink = async url => {
    try {
      await Linking.openURL('https://tirthgaman.com/privacy-policy');
    } catch {
      throw new Error("URI can't open:" + 'https://tirthgaman.com/privacy-policy');
    }
  };


  const handleOpenLinkTerms = async url => {
    try {
      await Linking.openURL('https://tirthgaman.com/terms-and-conditions');
    } catch {
      throw new Error("URI can't open:" + 'https://tirthgaman.com/terms-and-conditions');
    }
  };

  const hadleWithPhone = () => {
    setWithPhone(!withPhone)
  }

  const handleSendOTP = async () => {
    const isRole = signupValidateRole(signUpInFo.role);
    const isPhone = signupValidatePhone(signUpInFo.phone);

    setErrors({ ...errors, isRole: isRole, isPhone: isPhone })
    console.log('ERRORS', errors)

    if (isRole && isPhone) {
      if (toggleCheckBox) {
        setOtpLoading(true)
        try {
          const data = {
            mobileNumber: Number(signUpInFo.phone),
            role: signUpInFo.role
          }
          const otpApiHit = await UserApi.post(`signUp/VerfyMobile`, data)
          console.log('otp API hit ==>', otpApiHit);

          if (otpApiHit.data.status === 201) {
            await AsyncStorage.setItem('otp_data', JSON.stringify(data));
            setOtpLoading(false)
            navigation.navigate('otpRegister', { data: data })
          } else if (otpApiHit.data.status === 401) {
            alert('This Number is registered with some other ID!')
            setOtpLoading(false)
          } else {
            alert(otpApiHit.data.message)
            setOtpLoading(false)
          }
        } catch (error) {
          console.log('ERROR', error);
          setOtpLoading(false)
        }
      } else {
        alert('Accept Terms of use and our Privacy Policy');
      }
    }
  }

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
                  <Text style={[styles.mainTitleSmall]}>Hello!</Text>
                  <Text style={[styles.mainTitle2]}>
                    Sign Up to Get Started
                  </Text>
                  <View style={{ marginTop: '5%', marginRight: '4%' }}>
                    <RadioField
                      selected={selected}
                      options={['Temple', 'Pujari', 'User']}
                      onChangeSelect={(opt, i) => {
                        setSelected(i);
                        if (i === 0) {
                          setSignUpInfo({ ...signUpInFo, role: 'temple' });
                        } else if (i === 1) {
                          setSignUpInfo({ ...signUpInFo, role: 'poojari' });
                        } else {
                          setSignUpInfo({ ...signUpInFo, role: 'user' });
                        }
                      }}
                    />
                  </View>
                  {!withPhone && <View style={[styles.signUpCatBtns]}>
                    <View>
                      <Text style={[styles.formLabel, styles.textEarthyRed]}>
                        First Name
                      </Text>
                      <TextInput
                        style={styles.formControl2}
                        value={signUpInFo.firstname}
                        onChangeText={value =>
                          setSignUpInfo({ ...signUpInFo, firstname: value })
                        }
                        placeholder="john"
                        placeholderTextColor="#909090"
                      />
                      {!errors.isFirst && (
                        <Text style={{ color: 'red', fontSize: 13 }}>
                          Enter First Name
                        </Text>
                      )}
                    </View>
                    <View>
                      <Text style={[styles.formLabel, styles.textEarthyRed]}>
                        Last Name
                      </Text>
                      <TextInput
                        style={styles.formControl2}
                        value={signUpInFo.lastname}
                        onChangeText={value =>
                          setSignUpInfo({ ...signUpInFo, lastname: value })
                        }
                        placeholder="Doe"
                        placeholderTextColor="#909090"
                      />
                      {!errors.isLast && (
                        <Text style={{ color: 'red', fontSize: 13 }}>
                          Enter Last Name
                        </Text>
                      )}
                    </View>
                  </View>}
                  {!withPhone && <View style={styles.formGroup}>
                    <Text style={[styles.formLabel, styles.textEarthyRed]}>
                      Email Address
                    </Text>
                    <TextInput
                      style={styles.formControl}
                      value={signUpInFo.email}
                      onChangeText={value =>
                        setSignUpInfo({ ...signUpInFo, email: value })
                      }
                      placeholder="john.doe@gmail.com"
                      placeholderTextColor="#909090"
                    />
                    {!errors.isEmail && (
                      <Text style={{ color: 'red', fontSize: 13 }}>
                        Enter Valid Email
                      </Text>
                    )}
                  </View>}
                  <View style={styles.formGroup}>
                    <Text style={[styles.formLabel, styles.textEarthyRed]}>
                      Phone Number
                    </Text>
                    <View style={styles.formGroupIcon}>
                      <TextInput
                        style={[styles.formControl, styles.formControlIcon]}
                        value={signUpInFo.phone}
                        onChangeText={value =>
                          setSignUpInfo({ ...signUpInFo, phone: value })
                        }
                        placeholder="Phone Number"
                        placeholderTextColor="#909090"
                        keyboardType='numeric'
                        maxLength={10}
                      />
                      {!errors.isPhone && (
                        <Text style={{ color: 'red', fontSize: 13 }}>
                          Enter Valid Phone Number
                        </Text>
                      )}
                      <Image
                        source={require('../img/showIcon.png')}
                        style={styles.showHideIcon}
                      />
                    </View>
                  </View>
                  {!withPhone &&
                    <View style={styles.formGroup}>
                      <Text style={[styles.formLabel, styles.textEarthyRed]}>
                        Password
                      </Text>
                      <View style={styles.formGroupIcon}>
                        <TextInput
                          style={[styles.formControl, styles.formControlIcon]}
                          secureTextEntry={isPasswordSecure}
                          value={signUpInFo.password}
                          onChangeText={value =>
                            setSignUpInfo({ ...signUpInFo, password: value })
                          }
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
                        {!errors.isPassword && (
                          <Text style={{ color: 'red', fontSize: 13 }}>
                            Must be between 8-25 Characters and should have one
                            Capital Alphabet one Number and one Special Character
                          </Text>
                        )}
                      </View>
                    </View>
                  }
                  {!withPhone &&
                    <View style={styles.formGroup}>
                      <Text
                        style={[
                          styles.formLabel,
                          styles.textWhiteNo,
                          styles.textEarthyRed,
                        ]}>
                        Confirm Password
                      </Text>
                      <View style={styles.formGroupIcon}>
                        <TextInput
                          style={[styles.formControl, styles.formControlIcon]}
                          secureTextEntry={passwordSecure}
                          value={signUpInFo.confirmPassword}
                          onChangeText={value =>
                            setSignUpInfo({ ...signUpInFo, confirmPassword: value })
                          }
                          placeholder="Confirm Password"
                          placeholderTextColor="#909090"
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setPasswordSecure(prev => !prev);
                          }}>
                          <FontAwesome
                            name={passwordSecure ? 'eye-slash' : 'eye'}
                            color={'#909090'}
                            size={20}
                            style={styles.showHideIcon}
                          />
                        </TouchableOpacity>
                        {!errors.isCPassword && (
                          <Text style={{ color: 'red', fontSize: 13 }}>
                            Confirm Password and Password are not same
                          </Text>
                        )}
                      </View>
                    </View>
                  }
                  <View style={styles.formGroupSbmtBtn}>
                    <View style={styles.twoColumn2}>
                      <CheckBox
                        // disabled={false}
                        // value={toggleCheckBox}
                        style={styles.checkBoxDiv2}
                        // onValueChange={newValue => setToggleCheckBox(newValue)}
                        // style={styles.checkBoxDiv}
                        checkedCheckBoxColor='#00d792' uncheckedCheckBoxColor='#62354A' onClick={() => {
                          setToggleCheckBox(!toggleCheckBox)
                        }} isChecked={toggleCheckBox}
                      />
                      <Text style={{ color: 'black', fontWeight: '600' }} >
                        I accept our <Text style={[styles.IAcceptformLabel, styles.textRed]} onPress={handleOpenLinkTerms} >Terms of use </Text>
                        {' '}and our <Text onPress={handleOpenLink} style={[styles.IAcceptformLabel, styles.textRed]}>Privacy policy</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.formGroup}>
                    {!withPhone ?
                      <TouchableOpacity
                        style={styles.btnDefault}
                        onPress={() => handleClick()}>
                        <Text style={styles.TextStyle}>
                          {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            'Submit'
                          )}
                        </Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        style={styles.btnDefault}
                        onPress={() => handleSendOTP()}
                        disabled={otpLoading}>
                        <Text style={styles.TextStyle}>
                          {otpLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            'Generate OTP'
                          )} </Text>
                      </TouchableOpacity>
                    }
                  </View>
                  <View style={styles.formGroup}>
                    {!withPhone ?
                      <TouchableOpacity
                        style={styles.btnDefault}
                        onPress={() => hadleWithPhone()}>
                        <Text style={styles.TextStyle}> Sign up with Phone Number </Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        style={styles.btnDefault}
                        onPress={() => hadleWithPhone()}>
                        <Text style={styles.TextStyle}> Sign up with Details </Text>
                      </TouchableOpacity>
                    }
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.loginInfoDiv}>
              <Text style={styles.whtTextColor}>Already have an account?</Text>
              <Link to="login" underlayColor="#ffffff" style={styles.loginLink}>
                <Text
                  onPress={() => navigation.navigate('login')}
                  style={styles.whtLink}>
                  Log in
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
  checkBoxDiv: {
    flexDirection: 'row',
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  ClickCheckBox: {
    borderRadius: 100,
  },
  checkBoxTitle: {
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    alignItems: 'center',
  },
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
    marginTop: 12,
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
  checkBoxDiv2: {
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'flex-start',
    marginLeft: '-2%',
    color: '#fff',
  },
  checkBoxDiv: {
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'flex-start',
    marginLeft: -50,
    color: '#fff',
  },
  checkBoxTitle: {
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    alignItems: 'center',
  },
  twoColumn2: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
    marginLeft: '2%'
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
    marginBottom: 5,
    marginTop: 40,
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
    marginBottom: 15,
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
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 5,
    textAlign: 'center',
    position: 'relative',
    paddingTop: 5,
    paddingBottom: 0,
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
  // loginBoxOuter: {
  //   width: '100%',
  //   position: 'relative',
  //   backgroundColor: '#fff',
  //   borderRadius: 15,
  //   paddingVertical: 2,
  //   paddingHorizontal: 15,
  //   marginTop: 0,
  //   paddingTop: 15,
  // },
  loginBoxOuter: {
    width: '100%',
    // position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
    // paddingHorizontal: "1%",
    // marginTop: 25,
    // paddingTop: 25,
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
  formGroupFlxRw: {
    marginBottom: -10,
    marginTop: -2,
    position: 'relative',
    flexDirection: 'row',
    minWidth: '50%',
  },
  formGroupNo2: {
    position: 'relative',
    flexDirection: 'row',
  },
  formGroup: {
    marginBottom: 16,
    minWidth: '100%',
    position: 'relative',
  },
  formGroupSbmtBtn: {
    marginBottom: 5,
    marginTop: -10,
    minWidth: '100%',
    position: 'relative',
  },
  ForgetYrPasswordformLabel: {
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 5,
  },
  IAcceptformLabel: {
    fontSize: 13.8,
    fontWeight: '600',
  },
  formLabel: {
    fontSize: 14,
    color: '#221e1f',
    fontWeight: '600',
    paddingBottom: 2,
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
  formControl2: {
    color: '#221e1f',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 2,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Regular',
    minWidth: '48%',
  },
  formGroupIcon: {
    position: 'relative',
  },
  formControlIcon: {
    paddingRight: 36,
  },
  showHideIcon: {
    position: 'absolute',
    right: 10,
    bottom: 13
  },
  btnDefault: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#db4242',
    borderRadius: 5,
    paddingVertical: 15,
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
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
    marginBottom: 2,
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
export default Register;
