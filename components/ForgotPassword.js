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
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import UserApi from '../Axios/UserApi';
import { signupValidatePhone } from '../helperFunctions/Validations/SignUpValidation';
import { forgotPassword } from '../Redux/Actions/UserAction';

const ForgotPassword = ({ navigation }) => {

  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    isPhone: true
  })

  const handleClick = async () => {
    const isPhone = signupValidatePhone(phone);
    setError({ ...error, isPhone: isPhone });
    if (isPhone) {
      setLoading(true)
      try {
        let data = {
          "mobileNumber": Number(phone)
        }
        const response = await UserApi.post('/password/restOtpMobile', data)
        console.log('response', response)
        if (response?.data?.status === 200) {
          alert("An OTP sent on your number to reset password!");
          setLoading(false);
          navigation.navigate('ResetPassword', {
            number: Number(phone)
          });
        } else {
          alert(response.data.message)
          // setPhone('')
          setLoading(false);
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
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
                <View>
                  <Text style={[styles.mainTitleSmall]}>
                    Forgot Password
                  </Text>
                  <Text style={[styles.mainTitle2]}>Request new password
                  </Text>
                  <View style={styles.formGroup}>
                    <Text style={[styles.formLabel, styles.textEarthyRed]}>Phone</Text>
                    <TextInput
                      style={styles.formControl}
                      onChangeText={value => setPhone(value)}
                      value={phone}
                      placeholder="98989..."
                      placeholderTextColor="#909090"
                      keyboardType='numeric'
                      maxLength={10}
                    />
                    {!error.isPhone && (
                      <Text style={{ color: 'red', fontSize: 13 }}>
                        Enter Valid Phone Number
                      </Text>
                    )}
                  </View>
                  <View style={styles.formGroup}>
                    <TouchableOpacity style={styles.btnDefault} disabled={loading} onPress={handleClick}>
                      <Text style={styles.TextStyle}>
                        {' '}
                        {loading ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          'Submit'
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.loginInfoDiv}>
              <Text style={styles.whtTextColor}>Go to the</Text>
              <Link to="login" underlayColor="#ffffff" style={styles.loginLink}>
                <Text
                  onPress={() => navigation.navigate('login')}
                  style={styles.whtLink}>
                  Log in
                </Text>
              </Link>
              <Text style={styles.whtTextColor}> page</Text>
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
  whtLink: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
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
  textEarthyRed: {
    color: '#62354a',
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
  mainTitle2: {
    fontSize: 20,
    color: "#62354a",
    paddingVertical: 1,
    paddingHorizontal: 30,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
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
  TextStyle: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: 'Montserrat-SemiBold',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    userForgotPassword: data => dispatch(forgotPassword(data)),
  };
};
export default connect(null, mapDispatchToProps)(ForgotPassword);