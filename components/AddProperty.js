import React from 'react';
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
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const AddProperty = (props) => {

  const handleClick = () => {
    drawer.current.closeDrawer();
    props.navigation.navigate("dashboard");
  }
  const handleClick2 = () => {
    //   props.navigation.navigate("searchlist");
  }
  const addProperty = () => {
    props.navigation.navigate("addproperty");
  }
  const handleClick3 = () => {
    // props.navigation.navigate("searchgrid");
  }
  const handleClick4 = () => {
    props.navigation.navigate("propertyhome");
  }

  const handleClick6 = () => {
    // props.navigation.navigate("propertydetail");
  }
  const addCategory = () => {
    props.navigation.navigate("addcategory");
  }



  const drawer = React.useRef(null);
  const [drawerPosition, setDrawerPosition] = React.useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };

  const navigationView = () => (
    <View style={[styles.navigationContainer]}>
      <View style={[styles.sidebarTopCol]}>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          colors={['#0e558d', '#084677']}
          style={styles.sidebarProOuter}>
          <View style={styles.sidebarProMediaDiv}>
            <View style={styles.sidebarProMedia}>
              <Image source={require('../img/mainUser.png')} style={[styles.sidebarProImg]} />
            </View>
          </View>
          <View >
            <Text style={styles.headerTitle}>John Doe</Text>
          </View>
          <ImageBackground style={styles.sidebarProPatt} source={require('../img/sidebarPatt.png')} ></ImageBackground>
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.navigationMainContainer}>
        <View style={[styles.sidebarMainCol]}>
          <View style={styles.sidebarLinksList}>
            <TouchableOpacity style={styles.sidebarLinkCol} onPress={handleClick}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  colors={['#0e558d', '#084677']}
                  style={[styles.sidebarLinkIcon]}>
                  <Image source={require('../img/dashboardIcon.png')} style={[styles.sidebarLinkImg]} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Dashboard</Text>
              </View>
              <Image source={require('../img/arrowIcon.png')} style={[styles.sidebarLinkArrow]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarLinkCol} onPress={handleClick4}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  colors={['#0e558d', '#084677']}
                  style={[styles.sidebarLinkIcon]}>
                  <Image source={require('../img/addShipmentIcon.png')} style={[styles.sidebarLinkImg]} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Property Home</Text>
              </View>
              <Image source={require('../img/arrowIcon.png')} style={[styles.sidebarLinkArrow]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarLinkCol} onPress={handleClick6}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  colors={['#0e558d', '#084677']}
                  style={[styles.sidebarLinkIcon]}>
                  <Image source={require('../img/addShipmentIcon.png')} style={[styles.sidebarLinkImg]} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Property Detail</Text>
              </View>
              <Image source={require('../img/arrowIcon.png')} style={[styles.sidebarLinkArrow]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarLinkCol} onPress={handleClick2}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  colors={['#0e558d', '#084677']}
                  style={[styles.sidebarLinkIcon]}>
                  <Image source={require('../img/addShipmentIcon.png')} style={[styles.sidebarLinkImg]} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Property Search List</Text>
              </View>
              <Image source={require('../img/arrowIcon.png')} style={[styles.sidebarLinkArrow]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarLinkCol} onPress={handleClick3}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  colors={['#0e558d', '#084677']}
                  style={[styles.sidebarLinkIcon]}>
                  <Image source={require('../img/addShipmentIcon.png')} style={[styles.sidebarLinkImg]} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Property Search Grid</Text>
              </View>
              <Image source={require('../img/arrowIcon.png')} style={[styles.sidebarLinkArrow]} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarLinkCol} onPress={addProperty}>
              <View style={[styles.sidebarLinkLeft]}>
                <LinearGradient
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  colors={['#0e558d', '#084677']}
                  style={[styles.sidebarLinkIcon]}>
                  <Image source={require('../img/addShipmentIcon.png')} style={[styles.sidebarLinkImg]} />
                </LinearGradient>
                <Text style={styles.sidebarLinkText}>Add Property</Text>
              </View>
              <Image source={require('../img/arrowIcon.png')} style={[styles.sidebarLinkArrow]} />
            </TouchableOpacity>



          </View>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.mainHeaderOuter}>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            colors={['#0e558d', '#084677']}
            style={styles.mainHeader}>
            <View style={styles.backMenuDiv}>
              <TouchableOpacity style={styles.backBtnDiv} onPress={() => drawer.current.openDrawer()}>
                <Image source={require('../img/menuIcon.png')} style={[styles.arrowBtn, styles.sideMenuIcon]} />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>Add Property</Text>
          </LinearGradient>
        </View>
        <ScrollView contentContainerStyle={styles.outerContainer}>
          <View style={styles.mainBoxOuter}>
            <View style={[styles.mainBody]}>
              <View style={[styles.addPrtyBg]}>
                <TouchableOpacity style={[styles.addPrtyInr]} >
                  <View style={[styles.addPrtyCol]}>
                    <Image source={require('../img/villa-icon.png')} style={[styles.addPrtyIcon]} />
                  </View>
                  <View>
                    <Text style={[styles.addPrtyHdng]}>SINGLE UNIT</Text>
                    <Text style={[styles.addPrtyParah]}>House, basement, condo, main floor, shared, etc.</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[styles.addPrtyBg, styles.appPrtyDarkCol]}>
                <TouchableOpacity style={[styles.addPrtyInr]} >
                  <View style={[styles.addPrtyCol]}>
                    <Image source={require('../img/appartment-icon.png')} style={[styles.addPrtyIcon]} />
                  </View>
                  <View>
                    <Text style={[styles.addPrtyHdng, styles.whtColor]}>MULTIPLE UNITS </Text>
                    <Text style={[styles.addPrtyParah, styles.whtColor]}>House, basement, condo, main floor, shared, etc.</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.fixBtnDiv}>
          <View style={styles.innerFlex}>
            <TouchableOpacity style={styles.btnGradientDiv} onPress={addCategory}>
              <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#0e558d', '#084677']}
                style={[styles.btnDefault, styles.btnFull]}>
                <Text style={styles.TextStyle}>Next</Text>
              </LinearGradient>
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
    justifyContent: "center",
    //alignItems: 'center',
    backgroundColor: '#ffffff',
    position: "relative",
    //minHeight: '100%',
    fontFamily: 'Montserrat-Regular',
  },
  blackText: {
    color: "#000000",
  },
  greyText: {
    fontSize: 16,
    color: "#777777",
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
    color: "#ffffff",
    fontFamily: 'Montserrat-Regular',
  },
  headerTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontFamily: 'Montserrat-Bold'
  },
  mainBody: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flex: 1,
    position: 'relative',
  },
  btnFixContainer: {
    paddingBottom: 60,
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
  btnFull: {
    minWidth: '100%',
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
  whtTextColor: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: 'Montserrat-Regular'
  },
  whtColor: {
    color: '#ffffff'
  },
  whtTextBoldColor: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: 'Montserrat-Bold'
  },
  loginLink: {
    marginLeft: 6,
  },
  whtLink: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: 'Montserrat-SemiBold'
  },

  fixBtnDiv: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
  },


  navigationContainer: {
    flex: 1,
    minHeight: '100%',
  },
  navigationMainContainer: {
  },
  sidebarTopCol: {

  },
  sidebarProOuter: {
    position: 'relative',
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  sidebarProPatt: {
    position: 'absolute',
    backgroundSize: "cover",
    alignItems: 'center',
    resizeMode: 'cover',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    opacity: .34,
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
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sidebarLinkLeft: {
    flexDirection: 'row',
    justifyContent: "space-between",
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
  addPrtyBg: {
    backgroundColor: '#eff6f7',
    textAlign: 'center',
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    paddingTop: 30,
    paddingLeft: 25,
    paddingBottom: 30,
    paddingRight: 15,
    borderRadius: 7,
  },

  appPrtyDarkCol: {
    backgroundColor: '#0d568f',

  },
  addPrtyCol: {
    backgroundColor: "white",
    width: 130,
    height: 130,
    justifyContent: "center",
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    elevation: 7,
    marginBottom: 20,
    borderBottomEndRadius: 30,
    borderTopEndRadius: 10,
    borderRightEndRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,

  },
  addPrtyIcon: {
    //marginBottom:20,

  },
  addPrtyHdng: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#221e1f',
    paddingBottom: 10,
  },
  addPrtyParah: {
    fontSize: 15,
    lineHeight: 22,
    paddingRight: 10,
  },
});

export default AddProperty