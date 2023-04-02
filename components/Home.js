import React from 'react';
import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Image, ImageBackground, TouchableOpacity,
} from 'react-native';

const Home = (props) => {

  const isDarkMode = useColorScheme() === 'dark';
  const handleClick = () => {
    props.navigation.navigate("dashboard");
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>

      <ScrollView contentContainerStyle={styles.outerContainer}>
        <ImageBackground style={styles.bgImage} source={require('../img/splashbg3.jpg')} >

          <View style={styles.statusBar}>
            <StatusBar translucent backgroundColor="#db4242" />
          </View>
          <SafeAreaView style={styles.container}>
            <View style={styles.loginTextDiv}>
              <Image source={require('../img/logo2.png')} style={styles.mainLogotwo} />
            </View>

            <View style={styles.homeTxt}>
              <Text style={styles.mainTitle}>Explore <Text style={styles.boldTxt}> Famous Temple </Text> & <Text style={styles.boldTxt}> Popular Priest  </Text>
              </Text>
            </View>
            <View style={[styles.loginTextDiv, styles.crtMarginBottom]}>
              <Image source={require('../img/logo.png')} style={styles.mainLogo} />
            </View>
            <View style={[styles.formGroup, styles.btnCenter]}>
              <TouchableOpacity style={styles.btnDefault} onPress={handleClick}>
                <Text style={[styles.TextStyle, styles.txtBold, styles.fntMedium]}>
                  Get Started</Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    position: "relative",
    minHeight: '100%',
    fontFamily: 'Montserrat-Regular'
  },
  crtMarginBottom: {
    marginBottom: 100,
  },
  btnCenter: {
    alignItems: "center",
    textAlign: "center",
  },
  boldTxt: {
    fontWeight: "800",
    color: "#633549",
  },
  mainTitle: {
    fontSize: 18,
    color: "#633549",
    paddingVertical: 10,
    paddingHorizontal: 30,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: "center",
    fontWeight: '200',
  },
  homeTxt: {
    color: "#633549",
  },
  inner: {
    flex: 1
  },
  loginTextDiv: {
    position: "relative",
    textAlign: "center",
    alignItems: 'center',
    marginBottom: 15,
  },
  redColor: {
    backgroundColor: "#db4242"
  },
  bgImage: {
    backgroundSize: "cover",
    alignItems: 'center',
    resizeMode: 'cover',
    paddingTop: 0,
    paddingBottom: 30,
    paddingHorizontal: 20,
    position: 'relative',
    minHeight: '100%',
    zIndex: 1
  },
  loginOuter: {
    position: 'relative',
    minWidth: '100%',
    zIndex: 2
  },
  loginCenterDiv: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  mainLogotwo: {
    width: 230,
    height: 25,
    marginBottom: 0,
    marginTop: 100,
  },
  mainLogo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    marginTop: 0,
  },
  mainTitleSmall: {
    fontSize: 13.5,
    lineHeight: 25,
    color: "#633549",
    paddingHorizontal: 0,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: "center",
    alignItems: 'center',

  },
  rentLogoTxt: {
    color: "#221e1f",
  },
  loginBoxOuter: {
    width: "100%",
    position: "relative",
  },
  signUpCatBtns: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  roundBtnDiv: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  roundBtn: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 40,
    position: 'relative',
    borderRadius: 40,
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: 16,
    minWidth: '100%',
    position: 'relative',
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
  showHideIcon: {
    position: 'absolute',
    right: 8,
    top: 10,
    width: 24,
    height: 15,
  },
  btnDefault: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#db4242',
    borderRadius: 30,
    paddingVertical: 17,
    paddingHorizontal: 20,
    position: 'relative',
    width: 240,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  fntMedium: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
  txtBold: {
    fontFamily: 'Montserrat-Bold',
  },
  TextStyle: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: 'Montserrat-SemiBold',
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
  statusBar: {
    backgroundColor: '#db4242',
    height: 20,
    width: '100%',
  },
});

export default Home;
