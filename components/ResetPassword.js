import React, { useState } from 'react';
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
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { resetPassword } from '../Redux/Actions/UserAction';
import OTPTextView from 'react-native-otp-textinput';
import { otpValidate, signupValidatePassword, signupValidateCPassword } from '../helperFunctions/Validations/SignUpValidation';
import UserApi from '../Axios/UserApi';

const ResetPassword = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [resetPassword, setResetPassword] = useState({
    password: '',
    confirmPassword: '',
    OTP: 0
  })

  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({
    isPass: true, isCPass: true, isOTP: true
  })


  const handleClick = async () => {

    const isPassword = signupValidatePassword(resetPassword.password);
    const isCPassword = signupValidateCPassword(resetPassword);
    const isOTP = otpValidate(resetPassword.OTP);

    setErrors({ ...errors, isPass: isPassword, isCPass: isCPassword, isOTP: isOTP })

    if (isPassword && isCPassword && isOTP) {
      setLoading(true)
      try {
        let data = {
          password: resetPassword.password,
          confirmPassword: resetPassword.confirmPassword,
          otp: resetPassword.OTP
        }
        const response = await UserApi.post('/password/mobileresetpassword', data)
        console.log('Response reset', response)
        if (response?.data?.status === 201) {
          alert(response?.data?.message);
          setLoading(false)
          props.navigation.navigate('login');
        } else {
          alert(response?.data?.message);
          setLoading(false)
        }
      } catch (error) {
        console.log('error', error)
        setLoading(false)
        alert(error?.response?.data?.message)
      }
    }
  }

  const onResend = async () => {
      try {
        let data = {
          "mobileNumber": props.number
        }
        const response = await UserApi.post('/password/restOtpMobile', data)
        console.log('response', response)
        if (response?.data?.status === 200) {
          alert("An OTP sent on your number to reset password!");
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground style={styles.bgImage} source={require('../img/login_bg01.jpg')} >
        <View style={styles.overlayColor} >
          <View style={styles.loginOuter}>
            <View style={styles.loginCenterDiv}>
              <View style={styles.loginTextDiv}>
                <Image source={require('../img/logo3.png')} style={styles.mainLogo} />
              </View>
              <View style={styles.loginBoxOuter}>
                <View style={styles.loginBoxInner}>
                  <Text style={[styles.mainTitleSmall]}>
                    Welcome Back
                  </Text>
                  <Text style={[styles.mainTitle2, styles.textWhiteNo]}>Reset Password
                  </Text>
                  <View style={styles.formGroup}>
                    <Text style={[styles.formLabel, styles.textWhiteNo, styles.textEarthyRed]}>Password</Text>
                    <View style={styles.formGroupIcon}>
                      <TextInput
                        style={[styles.formControl, styles.formControlIcon]}
                        onChangeText={value =>
                          setResetPassword({ ...resetPassword, password: value })
                        }
                        value={resetPassword.password}
                        secureTextEntry={isPasswordSecure}
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
                      {!errors.isPass && (
                        <Text style={{ color: 'red', fontSize: 13 }}>
                          Must be between 8-25 Characters and should have one
                          Capital Alphabet one Number and one Special Character
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={[styles.formLabel, styles.textEarthyRed]}>Confirm Password</Text>
                    <View style={styles.formGroupIcon}>
                      <TextInput
                        style={[styles.formControl, styles.formControlIcon]}
                        onChangeText={value =>
                          setResetPassword({ ...resetPassword, confirmPassword: value })
                        }
                        value={resetPassword.confirmPassword}
                        secureTextEntry={passwordSecure}
                        placeholder="Password"
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
                      {!errors.isCPass && (
                        <Text style={{ color: 'red', fontSize: 13 }}>
                          Confirm Password and Password are not same
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
                        handleTextChange={(value) =>
                          setResetPassword({ ...resetPassword, OTP: value })
                        }
                        inputCount={6}
                        containerStyle={styles.textInputContainer}
                        textInputStyle={styles.roundedTextInput}
                        tintColor="#9a0000"
                        offTintColor="#e1e1e1"
                        defaultValue=""
                      />
                    </View>
                    {!errors.isOTP && (
                      <Text style={{ color: 'red', fontSize: 13 }}>
                        Enter Correct OTP
                      </Text>
                    )}
                  </View>
                  <View style={styles.formGroup}>
                    <TouchableOpacity style={styles.btnDefault} onPress={handleClick}>
                      <Text style={styles.TextStyle}>
                        {' '}
                        {loading ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          'Reset Password'
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.loginInfoDiv}>
              <Text style={styles.whtTextColor}>Didn't Received Any Code?</Text>
              {/* <Link underlayColor="#ffffff" style={styles.loginLink}> */}
              <Text style={styles.whtLink} onPress={onResend}>
                {' '}
                Resend Code
              </Text>
              {/* </Link> */}
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 2,
    color: '#000',
    height: 45,
    width: 45
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
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#000000',
    position: "relative",
    minHeight: '100%',
    fontFamily: 'Montserrat-Regular'
  },
  checkBoxDiv2: {
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'flex-start',
    marginLeft: 0,
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
    flex: 1
  },
  bgImage: {
    backgroundSize: "cover",
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
    color: ' #db4242',
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
    position: "relative",
    textAlign: "center",
    alignItems: 'center',
  },
  mainLogo: {
    width: 225,
    height: 25,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 21,
    color: "#221e1f",
    paddingVertical: 40,
    paddingHorizontal: 30,
    fontFamily: 'Montserrat-SemiBold'
  },
  mainTitle2: {
    fontSize: 20,
    color: "#62354a",
    paddingVertical: 1,
    paddingHorizontal: 50,
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
    color: "#db4242",
    paddingHorizontal: 0,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: "center",
    alignItems: 'center',
  },
  rentLogoTxt: {
    color: "#221e1f",
  },

  blueColor: {
    color: "#0d568f"
  },
  loginBoxOuter: {
    width: "100%",
    position: "relative",
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 25,
    paddingTop: 25,
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
    fontWeight: '600',
    paddingBottom: 5,
  },
  formLabel: {
    fontSize: 15,
    color: "#221e1f",
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
  btnDefault: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#db4242',
    borderRadius: 5,
    paddingVertical: 18,
    paddingHorizontal: 40,
    position: 'relative',
    minWidth: 200,
  },
  showHideIcon: {
    position: 'absolute',
    right: 8,
    top: -30,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  txtBold: {
    fontWeight: "bold",
  },
  fntMedium: {
    fontSize: 21,
  },
  TextStyle: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: 'Montserrat-SemiBold',
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
    paddingVertical: 10,
  },
  whtTextColor: {
    fontSize: 14,
    color: "#fff",
    fontFamily: 'Montserrat-Regular'
  },
  loginLink: {
    marginLeft: 6,
  },
  darkLink: {
    fontSize: 14,
    color: "#221e1f",
    fontFamily: 'Montserrat-SemiBold'
  },
  whtLink: {
    fontSize: 14,
    color: "#fff",
    fontFamily: 'Montserrat-SemiBold'
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
    color: "#221e1f",
  },
  phoneTextInputStyle: {
    backgroundColor: 'transparent',
    fontSize: 14,
    color: "#000000",
    fontFamily: 'Montserrat-Regular',
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  phoneCodeTextStyle: {
    fontSize: 14,
    color: "#000000",
    fontFamily: 'Montserrat-Regular',
    borderColor: '#000000',
    paddingHorizontal: 0,
    paddingVertical: 0,

  },
  phoneFlagButtonStyle: {
    fontSize: 14,
    color: "#000000",
    fontFamily: 'Montserrat-Regular',
    borderColor: '#000000',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  phoneCountryPickerButtonStyle: {
    fontSize: 14,
    color: "#000000",
    fontFamily: 'Montserrat-Regular',
    borderColor: '#000000',
  },
});

export default ResetPassword