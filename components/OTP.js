import React from 'react';
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
} from 'react-native';
import { NativeRouter, Route, Link, useHistory } from "react-router-native";
import OTPTextView from 'react-native-otp-textinput';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
import UserApi from '../Axios/UserApi';

const OTP = (props) => {
  const history = useHistory();

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [otpData, setOtpData] = useState({
    userID: '', phone: '', role: '', otp: ''
  })

  useEffect(async () => {
    const Data = await AsyncStorage.getItem('otp_data');
    const otp_Data = JSON.parse(Data)
    console.log('OTP DATA ==>', otp_Data);
    setOtpData({ ...otpData, userID: otp_Data.userID, phone: otp_Data.phone, role: otp_Data.role });
  }, [])
  const handleClick = async () => {
    const data = {
      userID: otpData.userID,
      role: otpData.role,
      phone: String(otpData.phone),
      otp: otpData.otp
    }
    console.log('data', data)
    try {
      const res = await UserApi.post('signUp/validateOtp', data)
      console.log('RESPONSE ===>', res)
      if (res.data.status === 201) {
        props.navigation.navigate('login')
      }
    } catch (error) {
      console.log('ERROR from otp', error)
    }
  }

  const onReSend = async () => {
    try {
      const data = {
        userID: otpData.userID,
        phone: Number(otpData.phone),
        role: otpData.role
      }

      console.log('data for otp', data)

      const otpApiHit = await UserApi.post(`signUp/WithMobile`, data)

      if (otpApiHit.status === 200) {
        alert('OTP sent on your number!')
      } else {
        alert(otpApiHit.data.message)
      }

      await AsyncStorage.setItem('otp_data', JSON.stringify(data));
    } catch (error) {
      console.log('ERROR from otp', error)
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground style={styles.bgImage} source={require('../img/login_bg01.jpg')} >
        <View style={styles.circlePatt}></View>
        <View style={styles.overlay}></View>
        <View style={styles.circlePattDiv}>
          <View style={styles.circlePatt1}></View>
          <View style={styles.circlePatt2}></View>
          <View style={styles.circlePatt3}></View>
          <View style={styles.circlePatt4}></View>
        </View>
        <View style={styles.loginOuter}>
          <View style={styles.backMenuDiv}>
          </View>
          <View style={styles.loginCenterDiv}>
            <View style={styles.loginCenterDiv}>
              <View style={styles.loginTextDiv}>
                <Image source={require('../img/logo.png')} style={styles.mainLogo} />
                <Text style={styles.mainTitle}>OTP Verification</Text>
                <Text style={styles.subTitle}>Enter the code we've sent by text to your phone number +91 {otpData.phone}</Text>
              </View>
              <View style={styles.loginBoxOuter}>
                <View style={styles.space50}>
                  <View style={styles.formGroup}>
                    <OTPTextView
                      handleTextChange={(value) => { setOtpData({ ...otpData, otp: value }) }}
                      inputCount={6}
                      containerStyle={styles.textInputContainer}
                      textInputStyle={styles.roundedTextInput}
                      tintColor="#9a0000"
                      offTintColor="#e1e1e1"
                      defaultValue=""
                    />
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <TouchableOpacity style={styles.btnDefault} onPress={handleClick}>
                    <Text style={styles.TextStyle}>Verify OTP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.loginInfoDiv}>
              <Text style={styles.whtTextColor}>Didn't Received Any Code?</Text>
              {/* <Link underlayColor="#ffffff" style={styles.loginLink}> */}
              <Text style={styles.whtLink} onPress={() => onReSend()}>{' '}Resend Code</Text>
              {/* </Link> */}
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#000000',
    position: "relative",
    minHeight: '100%',
    fontFamily: 'Montserrat-Regular'
  },
  inner: {
    flex: 1
  },
  bgImage: {
    backgroundSize: "cover",
    alignItems: 'center',
    resizeMode: 'cover',
    paddingVertical: 40,
    paddingHorizontal: 24,
    position: 'relative',
    minHeight: '100%',
    zIndex: 1
  },
  circlePatt: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 24,
    borderColor: '#ffffff',
    opacity: 0.35,
    zIndex: 2
  },
  overlay: {
    backgroundColor: '#000000',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
    zIndex: 1
  },
  circlePattDiv: {
    position: 'absolute',
    left: -60,
    bottom: -70,
    width: 150,
    height: 150,
    opacity: 0.45,
    zIndex: 2
  },
  circlePatt1: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  circlePatt2: {
    position: 'absolute',
    left: 15,
    top: 15,
    width: 120,
    height: 120,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  circlePatt3: {
    position: 'absolute',
    left: 30,
    top: 30,
    width: 90,
    height: 90,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  circlePatt4: {
    position: 'absolute',
    left: 45,
    top: 45,
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  loginOuter: {
    position: 'relative',
    minWidth: '100%',
    zIndex: 2
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
  arrowText: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: 'Montserrat-Regular',
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
    width: 50,
    height: 45,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontFamily: 'Montserrat-SemiBold'
  },
  subTitle: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 22,
  },
  loginBoxOuter: {
    width: "100%",
    position: "relative",
  },
  space50: {
    marginVertical: 40,
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
    paddingVertical: 12,
    paddingHorizontal: 40,
    position: 'relative',
  },
  formGroup: {
    marginBottom: 24,
    minWidth: '100%',
  },
  formLabel: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: 'Montserrat-SemiBold'
  },
  formControl: {
    color: '#fbfbfb',
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
  textInputContainer: {
    Width: '100%',
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 2,
    color: '#fbfbfb',
  },
  btnDefault: {
    flexDirection: 'row',
    justifyContent: "center",
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
  },
  whtTextColor: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: 'Montserrat-Regular'
  },
  loginLink: {
    marginLeft: 6,
  },
  whtLink: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: 'Montserrat-SemiBold'
  },
});

export default OTP