import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { validateTempleInputs } from '../helperFunctions/Validations/validateTempleInputs';
import { BASE_URL_APP } from '../Utils/Contstant';

const Step4 = (props) => {

  const [coverImage, setCoverImage] = useState({})
  const [poojariImage, setpoojariImage] = useState({})

  const [errors, setErrors] = useState({
    coverImage: true, poojariImage: true
  })


  const setToastMsg = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const uploadFile = async (image) => {
    const data = new FormData();
    data.append('file', {
      name: image.fileName,
      type: image.type,
      uri:
        Platform.OS === 'ios'
          ? photo.uri.replace('file://', '')
          : image.uri,
    });

    const res = await fetch(`${BASE_URL_APP}/uploads/single`, {
      method: 'POST',
      body: data,
    });
    const result = await res.json();
    return result?.data;
  };

  const uploadCoverImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Cancelled image Selection')
        setCoverImage({})
      } else if (response.errorCode == 'permission') {
        setToastMsg('permission not satisfied')
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage)
      } else if (response.assets[0].fileSize > 10485760) {
        alert('Maxium image size exceeded', 'Please choose image under 10MB', [{ text: 'OK' }])
      } else {
        setCoverImage(response.assets[0])
      }
    })
  }

  const uploadPoojariImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Cancelled image Selection')
        setpoojariImage({})
      } else if (response.errorCode == 'permission') {
        setToastMsg('permission not satisfied')
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage)
      } else if (response.assets[0].fileSize > 10485760) {
        alert('Maxium image size exceeded', 'Please choose image under 10MB', [{ text: 'OK' }])
      } else {
        setpoojariImage(response.assets[0])
      }
    })
  }

  const uploadAartiImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Cancelled image Selection')
        setAartiImage({})
      } else if (response.errorCode == 'permission') {
        setToastMsg('permission not satisfied')
      } else if (response.errorCode == 'others') {
        setToastMsg(response.errorMessage)
      } else if (response.assets[0].fileSize > 10485760) {
        alert('Maxium image size exceeded', 'Please choose image under 10MB', [{ text: 'OK' }])
      } else {
        setAartiImage(response.assets[0])
      }
    })
  }

  const step5 = async () => {
console.log('calling')
    let cImage = '';
    let pImage = '';

    const isCover = validateTempleInputs(coverImage?.fileName)
    const isPoojari = validateTempleInputs(poojariImage?.fileName)

    if (isCover) {
      cImage = await uploadFile(coverImage);
    }

    if (isPoojari) {
      pImage = await uploadFile(poojariImage);
    }

    console.log('cImage', cImage)

    setErrors({ ...errors, coverImage: isCover, poojariImage: isPoojari })

    if (isCover && isPoojari) {
      try {
        await AsyncStorage.setItem("Cover Image", cImage);
        await AsyncStorage.setItem("Poojari Image", pImage);
        props.navigation.navigate("createPoojariStep5");
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.mainHeaderOuter}>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          colors={['#db4242', '#db4242']}
          style={styles.mainHeader}>
          <View style={styles.backMenuDiv}>
            <TouchableOpacity style={styles.backBtnDiv} onPress={() => props.navigation.navigate("createPoojariStep3")}>
              <Image source={require('../img/rightArrow1.jpg')} style={[styles.arrowBtn, styles.arrowBtnLight]} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}> Gallery </Text>
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.outerContainer}>
        <View style={styles.mainBoxOuter}>
          <View style={styles.mainBody}>
            <View style={[styles.centerBoxNo, styles.btnFixContainer]}>
              <View style={styles.formOuter}>
                <View style={[styles.outrInr, styles.pt10,]}>
                  <View style={[styles.row, styles.pt10,]} >
                    <View style={[styles.spaceBetween]}>
                      <View style={[styles.MainTitleDiv, styles.flatOtrIconBx]}>
                        <Text style={[styles.mainTitleText2, styles.textEarthyRed]}> Gallery </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.formGroupDiv}>
                  <View style={styles.formGroupNew}>
                    <View style={[styles.MainTitleDiv]}>
                      <Text style={[styles.mainTitleText2, styles.textEarthyRed]}>Cover Images* </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.formGroupDiv}>
                  <View style={[styles.formGroupNew,]}>
                    <TouchableOpacity onPress={() => uploadCoverImage()}>
                      <View style={styles.uploadIdDiv}>
                        {coverImage.base64 ?
                          <Image source={{ uri: 'data:image/png;base64,' + coverImage.base64 }} style={{ height: 120, width: 120 }} />
                          :
                          <>
                            <Image source={require('../img/fileupload.png')} style={styles.uploadIdIcon} />
                            <Text style={styles.textRed}> Upload a file </Text>
                            <Text style={styles.uploadIdTitle2}> PNG, JPG, GIF up to 10MB</Text>
                          </>
                        }
                      </View>
                    </TouchableOpacity>
                    {!errors.coverImage && (
                      <Text style={{ color: 'red', fontSize: 13 }}>
                        Upload a Cover Image
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.formOuter}>
                <View style={styles.formGroupDiv}>
                  <View style={styles.formGroupNew}>
                    <View style={[styles.MainTitleDiv]}>
                      <Text style={[styles.mainTitleText2, styles.textEarthyRed]}>Picture of the Pujari*</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.formGroupDiv}>
                  <View style={[styles.formGroupNew,]}>
                    <TouchableOpacity onPress={() => uploadPoojariImage()}>
                      <View style={styles.uploadIdDiv}>
                        {poojariImage.base64 ?
                          <Image source={{ uri: 'data:image/png;base64,' + poojariImage.base64 }} style={{ height: 120, width: 120 }} />
                          :
                          <>
                            <Image source={require('../img/fileupload.png')} style={styles.uploadIdIcon} />
                            <Text style={styles.textRed}> Upload a file </Text>
                            <Text style={styles.uploadIdTitle2}> PNG, JPG, GIF up to 10MB</Text>
                          </>
                        }
                      </View>
                    </TouchableOpacity>
                    {!errors.poojariImage && (
                      <Text style={{ color: 'red', fontSize: 13 }}>
                        Upload Image of Pujari
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.fixBtnDiv}>
        <View style={styles.innerFlex}>
          <View style={styles.amtDiv}>
            <Text style={styles.amtTextLabel}>Step 4 of 8</Text>
          </View>
        </View>
        <View style={styles.innerFlex}>
          <TouchableOpacity style={styles.btnGradientDiv} onPress={() => step5()}>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
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
    justifyContent: "center",
    backgroundColor: '#ffffff',
    position: "relative",
    fontFamily: 'Montserrat-Regular',
  },
  textRed: {
    color: '#db4242',
  },
  blackText: {
    color: "#000000",
  },
  textEarthyRed: {
    color: '#62354a',
  },
  greyText: {
    fontSize: 16,
    color: "#777777",
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
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 16,
  },
  customTabCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
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
    color: "#ffffff",
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
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 5,
  },
  formGroupNew: {
    paddingHorizontal: 6,
    position: 'relative',
    paddingTop: 14,
    flex: 1,
    justifyContent: "center",
  },
  formGroupSimple: {
    alignItems: 'flex-start',
    paddingTop: 0,
  },
  formLabelNew: {
    fontSize: 15,
    color: "#444",
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
    paddingBottom: 10,

  },
  formLabelNew2: {
    fontSize: 12,
    color: "#444",
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
    height: 52,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    fontFamily: 'Montserrat-Regular',
    minWidth: '100%',
    shadowOpacity: 0,
    borderRadius: 8,
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
    justifyContent: "flex-start",
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
    color: "#434450",
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
    justifyContent: "center",
    alignItems: 'center',
  },
  innerFlex: {
    flex: 1,
    justifyContent: "center",
  },
  amtTextLabel: {
    fontSize: 16,
    color: "#000000",
    fontFamily: 'Montserrat-SemiBold',
  },
  amtText: {
    fontSize: 16,
    color: "#990000",
    fontFamily: 'Montserrat-Bold',
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

  dropdown1BtnStyle: {
    width: "100%",
    height: 55,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  dropdown1BtnTxtStyle: { color: "#999", textAlign: "left", fontSize: 15, },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#444",
    textAlign: "left", paddingLeft: 10, fontSize: 16,
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
  MainTitleDiv: {
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
    opacity: 0.90,
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
  },
  checkBoxTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold'
  },

  py7: {
    paddingBottom: 7,
    paddingTop: 7,
  },
  uploadIdDiv: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  uploadIdIcon: {
    width: 38,
    height: 38,
  },
  uploadIdTitle: {
    fontSize: 16,
    color: "#000",
    fontFamily: 'Montserrat-Regular',
    marginTop: 20,
    textAlign: 'center',
  },
  uploadIdTitle2: {
    fontSize: 14,
    color: "#666",
    fontFamily: 'Montserrat-Regular',
    marginTop: 12,
  },

});

export default Step4