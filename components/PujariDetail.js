import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { emailValidate, nameValidate, phoneValidate } from '../helperFunctions/Validations/EnqueryFormValidate';
import { BASE_URL_APP } from '../Utils/Contstant';
import { Thumbnail } from 'react-native-thumbnail-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PujariDetail = (props) => {

  const { id } = props;

  const [checkbox, setCheckbox] = React.useState(false);
  const [poojariEnquiry, setPoojariEnquiry] = useState({
    name: '',
    email: "",
    phone: '',
    message: '',
    enquiryOf: 'poojari',
    userID: '',
  })

  const [errors, setErrors] = useState({
    email: true, name: true, phone: true
  })

  const [token, setToken] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const details = await AsyncStorage.getItem('userDetails')
        const userDetails = JSON.parse(details)
        const accessToken = await AsyncStorage.getItem('accessToken');
        setPoojariEnquiry({ ...poojariEnquiry, userID: userDetails._id });
        setToken(accessToken)
        setRole(userDetails.role)

      } catch (error) {
        console.error('error', error)
      }
    })()

  }, [])

  const [pujariDetailsData, setPujariDetailsData] = useState({})

  useEffect(() => {
    const getDetail = async (id) => {
      const result = await axios.get(`${BASE_URL_APP}/poojari?id=${id}`)
      if (result.data.status === 200) {
        setPujariDetailsData(result.data)
      }
    };
    getDetail(id)
  }, [])

  console.log('pujariDetailsData ======>>>>>', pujariDetailsData)

  const handleClick = () => {
    props.navigation.navigate("dashboard");
  }

  const enquiryClick = () => {
    if (checkbox) {
      const data = {
        name: poojariEnquiry.name,
        email: poojariEnquiry.email,
        phone: poojariEnquiry.phone,
        message: poojariEnquiry.message,
        enquiryOf: poojariEnquiry.enquiryOf,
        enquiryFor: pujariDetailsData?.poojariDetails?.poojariID,
        enquiryFrom: poojariEnquiry.userID,
      }

      const isName = nameValidate(poojariEnquiry.name)
      const isEmail = emailValidate(poojariEnquiry.email)
      const isPhone = phoneValidate(poojariEnquiry.phone)

      setErrors({ ...errors, email: isEmail, name: isName, phone: isPhone })

      try {
        if (isName && isEmail && isPhone) {
          const sendEnquiry = async () => {
            const response = await axios.post('https://api.tirthgaman.com/enquiry/create', data,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json"
                }
              }
            )
            console.log('response from create enquery', response)
            if (response.data.status === 201) {
              alert(response.data.message)
              setPoojariEnquiry('')
            } else if
              (response.data.status === 400) {
              alert(response.data.message)
            }
          }
          sendEnquiry()
        }
      } catch (error) {
      }
    } else {
      alert('Accept Terms of use')
    }
  }

  const bookAppointment = (id) => {
    // pujariDetailsData.poojariDetails.poojariID
    props.navigation.navigate('Appoinment', {
      id: id
    })
  }

  const poojaRequest = (id) => {
    // pujariDetailsData.poojariDetails.poojariID
    props.navigation.navigate('pujaRequest', {
      id: id
    })
  }

  const handleOpenLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch {
      throw new Error('URI cant open:' + url);
    }
  };
  console.log('pujariDetailsData?.basicInformation?.profilePicture', pujariDetailsData?.basicInformation?.profilePicture)

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.mainHeaderOuter}>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          colors={['#db4242', '#db4242']}
          style={styles.mainHeader}>
        </LinearGradient>
      </View>
      <ScrollView contentContainerStyle={styles.outerContainer}>
        <View style={styles.mainBoxOuter}>
          <View style={styles.tmplDtlBnrDiv}>
            <View style={styles.tmplDtlBnr}>
              <ImageBackground
                style={styles.inrHdr}
                source={
                  pujariDetailsData?.poojariDetails?.poojariImages?.coverImages
                    ?.length > 0
                    ? {
                      uri: `${BASE_URL_APP}/files/${pujariDetailsData?.poojariDetails?.poojariImages?.coverImages?.[0]}`,
                    }
                    : require('../img/templeDetailBanner.jpg')
                }></ImageBackground>
            </View>
            <View style={styles.backMenuDiv}>
              <TouchableOpacity style={styles.backBtnDiv} onPress={handleClick}>
                <Image source={require('../img/rightArrow1.jpg')} style={[styles.arrowBtn, styles.arrowBtnLight]} />
              </TouchableOpacity>
            </View>

          </View>
          <View style={[styles.proprtyPrfl, styles.centerBox, styles.BgLightBrown]}>
            <View style={styles.pujariProfileBx}>
              <View style={styles.pujariProfileInrBx}>
                <View style={styles.PpRoundBx}>
                  {pujariDetailsData?.basicInformation?.profilePicture === 'avatar.png' ?
                    <Image source={{ uri: "https://api.tirthgaman.com/files/avatar.png" }} style={{ height: 130, width: 130 }} />
                    :
                    <Image source={{
                      uri: `${BASE_URL_APP}/files/${pujariDetailsData?.basicInformation?.profilePicture}`,
                    }} style={{ height: 130, width: 130 }} />
                  }
                </View>
              </View>
            </View>
            <View style={{ marginTop: -70 }}>
              <Text style={[styles.PanditProfileName, styles.textEarthyRed]}>{pujariDetailsData?.poojariDetails?.name} </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <Image source={require('../img/locIcon.png')} />
              <Text style={{ color: '#707070', fontSize: 15 }}>
                {pujariDetailsData.poojariDetails?.location?.city},{pujariDetailsData.poojariDetails?.location?.country}
              </Text>
            </View>
          </View>
          <View style={[styles.proprtyPrfl, styles.outrInr, styles.darkBg]}>
            <View>
              <View>
                <View style={[styles.spaceBetween]}>
                  <View>
                    <View style={[styles.MainTitleDiv]}>
                      <Text style={[styles.tmplLoc, styles.textWhite, styles.PpcntctTxt]}>
                        <Image source={require('../img/phoneIcn.png')} style={[styles.PpcntctcallIcn, styles.pr5]} />  {pujariDetailsData.basicInformation?.phone}
                      </Text>
                    </View>
                    <View style={[styles.MainTitleDiv]}>
                      <Text style={[styles.tmplLoc, styles.textWhite, styles.PpcntctTxt]}>
                        <Image source={require('../img/mailIcn.png')} style={[styles.PpcntctMblIcn, styles.pr5]} /> {pujariDetailsData.basicInformation?.email}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.row]}>
                    <Text>
                      {pujariDetailsData?.poojariDetails?.socials?.facebook &&
                        <TouchableOpacity style={[styles.PanditprofilesclIcnOutr]} onPress={() => handleOpenLink(pujariDetailsData?.poojariDetails?.socials?.facebook)}>
                          <FontAwesome name={'facebook'} color={'#FFF'} size={20} />
                        </TouchableOpacity>
                      }
                    </Text>
                    <Text>
                      {pujariDetailsData?.poojariDetails?.socials?.twitter &&
                        <TouchableOpacity style={[styles.PanditprofilesclIcnOutr]} onPress={() => handleOpenLink(pujariDetailsData?.poojariDetails?.socials?.twitter)}>
                          <FontAwesome name={'twitter'} color={'#FFF'} size={20} />
                        </TouchableOpacity>
                      }
                    </Text>
                    <Text>
                      {pujariDetailsData?.poojariDetails?.socials?.linkedin &&
                        <TouchableOpacity style={[styles.PanditprofilesclIcnOutr]} onPress={() => handleOpenLink(pujariDetailsData?.poojariDetails?.socials?.linkedin)}>
                          <FontAwesome name={'linkedin'} color={'#FFF'} size={20} />
                        </TouchableOpacity>
                      }
                    </Text>
                    <Text>
                      {pujariDetailsData?.poojariDetails?.socials?.whatsapp &&
                        <TouchableOpacity style={[styles.PanditprofilesclIcnOutr]} onPress={() => handleOpenLink(pujariDetailsData?.poojariDetails?.socials?.whatsapp)}>
                          <FontAwesome name={'whatsapp'} color={'#FFF'} size={20} />
                        </TouchableOpacity>
                      }
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.space10]}></View>
          </View>
          <View style={[styles.proprtyBudgetDiv, styles.pt15]}>
            <View style={[styles.mainHdngNo, styles.spaceBetween, styles.outrInr]}>
              <View style={[styles.columnTwo]}>
                <View style={[styles.MainTitleDiv]}>
                  <Text style={styles.mainTitleText2}>Pujari Description</Text>
                </View>
                <Text style={[styles.parah, styles.textlightEarthyColor, styles.pt8, styles.fontWeight300]}>{pujariDetailsData.poojariDetails?.about}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.onlineAppBlk, styles.pt15, styles.pb15, styles.my20]} >
            <ImageBackground style={styles.adjstShpBgImg} source={require('../img/BoxShape.png')} >
            </ImageBackground>
            <View style={[styles.outrInr,]}>

              {pujariDetailsData?.poojariDetails?.poojariExperience?.highlights?.length > 0 &&
                <>
                  <View style={[styles.MainTitleDiv]}>
                    <Text style={[styles.mainTitleText2, styles.whiteClr,]}>Educational Qualifications</Text>
                  </View>
                  {pujariDetailsData.poojariDetails?.poojariExperience?.highlights?.map((data, i) => {
                    return (
                      <View key={i} style={[styles.row, styles.spaceBetween, styles.pt8]} >
                        <View style={[styles.row, styles.spaceBetween]} >
                          <View style={[styles.mr10, styles.downldIconBg]} ><Image source={require('../img/SqrBxTick.png')} style={[styles.downloadIcon]} /></View>
                          <Text style={[styles.whiteTxt, styles.subTitleA, styles.pr4, styles.pdrt100]} >{data}</Text>
                        </View>
                      </View>
                    )
                  })}
                </>}

              {pujariDetailsData?.poojariDetails?.poojariExperience?.Expertise?.length > 0 &&
                <>
                  <View style={[styles.MainTitleDiv]}>
                    <Text style={[styles.mainTitleText2, styles.whiteClr]}> Expertise  </Text>
                  </View>
                  {pujariDetailsData?.poojariDetails?.poojariExperience?.Expertise?.map((data, i) => {
                    return (
                      <View key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
                          <View style={[styles.mr10, styles.downldIconBg]} >
                            <Image source={require('../img/SqrBxTick.png')} />
                          </View>
                          <View style={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                            <Text style={{ color: '#fff', marginBottom: 2 }}>Year - {data.year}</Text>
                            <Text style={{
                              color: '#fff', fontSize: 15,
                              fontFamily: 'Montserrat',
                              lineHeight: 18,
                              fontWeight: '400',
                            }}>{data.detail}</Text>
                          </View>
                        </View>
                      </View>
                    )
                  })}
                </>
              }
            </View>
          </View>
          {pujariDetailsData.poojariDetails?.poojariSkills.length > 0 &&
            <>
              <View style={[styles.outrInr]}>
                <View style={[styles.flex]}>
                  <View style={[styles.row]}>
                    <View style={[styles.MainTitleDiv]}>
                      <Text style={[styles.mainTitleText2,]}>Pujari Skills </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ backgroundColor: '#ffefe2', marginTop: '3%', marginHorizontal: '5%', borderRadius: 10, padding: '4%' }}>
                {pujariDetailsData.poojariDetails?.poojariSkills?.map((data, i) => {
                  return (
                    <Text style={{ color: '#62354a', paddingLeft: '8%' }}>
                      {data}
                    </Text>
                  )
                })}
              </View>
            </>
          }
          <View style={[styles.paddingHorizontal]}>
            <View style={[styles.flex]}>
              <View style={[styles.row]}>
                <View style={[styles.MainTitleDiv]}>
                  <Text style={[styles.mainTitleText2,]}>Gallery</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.outrInr]}>
            <FlatList
              numColumns={3}
              keyExtractor={item => item.id}
              data={pujariDetailsData?.poojariDetails?.poojariImages?.poojariImages}
              renderItem={({ item }) => {
                return (
                  <Image style={[styles.SpclPujaImg, styles.flatOtrIconImgBx]} source={{
                    uri: `${BASE_URL_APP}/files/${item}`
                  }} />
                );
              }}
            />
          </View>
          {pujariDetailsData?.poojariDetails?.poojariVideos?.videoLink &&
            <View style={{ paddingBottom: 20 }}>
              <View style={styles.fetrPropryDiv2}>
                <View style={[styles.mainHdng, styles.spaceBetween]}>
                  <View style={[styles.columnTwo]}>
                    <View style={[styles.MainTitleDiv, styles.mt30]}>
                      <Text style={[styles.mainTitleText2,]}>Video</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.space28}></View>
                <View style={[styles.slide2, styles.slidesBrdrRds]} >
                  <View style={styles.proprtyCardItem1} backgroundColor={'#ffffff'}>
                    <View style={[styles.proprtyCardCol1]}>
                      <View style={styles.spaceBetween}>
                        <View style={[styles.proprtyCardLeft]}>
                          <LinearGradient
                            start={{ x: 0, y: 1 }} end={{ x: 0, y: 1 }}
                            colors={['#fff', '#fff']}
                            style={[styles.linearGradient]}>

                            <FlatList
                              numColumns={2}
                              keyExtractor={item => item.id}
                              data={pujariDetailsData?.poojariDetails?.poojariVideos}
                              renderItem={({ item }) => {
                                return (
                                  <Thumbnail url={item.videoLink} />
                                );
                              }}
                            />
                          </LinearGradient>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

              </View>
            </View>
          }
          {role === 'user' &&
            <View style={{ backgroundColor: "#E8E8E8", marginHorizontal: '5%', borderRadius: 10, marginTop: '4%' }}>
              <Text style={{
                textAlign: 'center', fontSize: 18,
                color: '#62354a',
                fontFamily: 'Montserrat-SemiBold',
                marginTop: '4%'
              }}>Enquiry Now</Text>
              <View style={styles.mainBoxOuter}>
                <View style={[styles.mainBody]}>
                  <View style={[styles.btnFixContainer]}>
                    <View style={styles.formOuter}>
                      <TextInput
                        style={styles.formControlNew}
                        value={poojariEnquiry.name}
                        onChangeText={value => setPoojariEnquiry({ ...poojariEnquiry, name: value })}
                        placeholder="Name *"
                        placeholderTextColor="#636162"
                      />
                      {!errors.name && <Text style={{ color: 'red', fontSize: 13 }}>Enter Name</Text>}
                      <TextInput
                        style={styles.formControlNew}
                        value={poojariEnquiry.email}
                        onChangeText={value => setPoojariEnquiry({ ...poojariEnquiry, email: value })}
                        placeholder="Email*"
                        placeholderTextColor="#636162"
                      />
                      {!errors.email && <Text style={{ color: 'red', fontSize: 13 }}>Enter Correct Email</Text>}
                      <TextInput
                        style={styles.formControlNew}
                        value={poojariEnquiry.phone}
                        onChangeText={value => setPoojariEnquiry({ ...poojariEnquiry, phone: value })}
                        placeholder="Phone*"
                        placeholderTextColor="#636162"
                        maxLength={10}
                        keyboardType='numeric'
                      />
                      {!errors.phone && <Text style={{ color: 'red', fontSize: 13 }}>Enter Correct Phone Number</Text>}
                      <TextInput
                        style={styles.formControlNew}
                        value={poojariEnquiry.message}
                        onChangeText={value => setPoojariEnquiry({ ...poojariEnquiry, message: value })}
                        placeholder="Message"
                        placeholderTextColor="#636162"
                        multiline
                      />
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '4%' }}  >
                        <CheckBox checkedCheckBoxColor='#62354A' uncheckedCheckBoxColor='#62354A' onClick={() => {
                          setCheckbox(!checkbox)
                        }} isChecked={checkbox} />
                        <View style={{ marginRight: '3%' }}  >
                          <Text style={styles.checkBoxTitle}>By submitting this form I agree to Terms of Use.</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.btnFix} onPress={() => enquiryClick()}>
                      <View style={styles.formBtn}>
                        <Text style={[styles.btnComn, styles.darkBtn, styles.btnComnLg, styles.wdth40, styles.capitalize]}>Enquiry Now</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          }
        </View>
      </ScrollView>
      {role === 'user' &&
        <View style={[styles.fixInfoBtnsDivMenu]}>
          <View style={[styles.spaceBetween]}>
            <TouchableOpacity style={styles.btnFix}>
              <Text style={[styles.btnComn, styles.btnComnLg]} onPress={() => poojaRequest(pujariDetailsData?.poojariDetails?.poojariID)} >Puja request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFix}>
              <Text style={[styles.btnComn, styles.darkBtn, styles.btnComnLg]} onPress={() => bookAppointment(pujariDetailsData?.poojariDetails?.poojariID)}>Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
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
  bglastImg: {
    position: 'absolute',
    left: 10,
    bottom: -30,
    width: '100%',
    height: '30%',
    zIndex: -99,
  },
  Bxwidth30: {
    width: '30%',
  },
  Bxwidth40: {
    width: '40%',
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  fetrPropryDiv2: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: -50,
    zIndex: -1,
    paddingTop: 30,
    overflow: 'hidden',
    height: 300,
  },
  BgLightBrown: {
    backgroundColor: '#ffefe2',
  },
  PanditProfileName: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  verifiedIcon: {
    width: 18,
    height: 18,
  },
  verifiedtextGreen: {
    color: '#4ad295',
  },
  marginTopMinus: {
    marginTop: -80,
  },
  PpRoundBx: {
    borderRadius: 70,
    overflow: 'hidden',
    width: 140,
    height: 140,
    position: 'relative',
    top: -80,
    borderColor: '#fff',
    borderWidth: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradientpp: {
    borderRadius: 20,
    width: 362,
  },
  linearGradientFt: {
    borderRadius: 20,
  },
  ftrBgPtrnImg: {
  },
  featuredTempleBxNw: {
    borderRadius: 20,
    overflow: 'visible',
  },
  ppfeaturedTempleBx: {
    borderRadius: 20,
    paddingVertical: 5,
    overflow: 'visible',
    marginTop: 30,
  },
  ftrTempleDiv2: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: -50,
    zIndex: -1,
    paddingTop: 30,
    overflow: 'hidden',
    height: 270,
  },
  templeCardRight: {
    position: 'absolute',
    Left: 60,
    top: 80,
    bottom: 15,
    paddingLeft: 15,
  },
  templefeatrImg: {
    marginTop: 0,
    width: 362,
    height: 150,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  templeCardItem1: {
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
  prptyfeatrImg: {
    width: '100%',
    height: 100,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  overflowvisible: {
    overflow: 'visible',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proprtyCardLeft: {
    width: '100%',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  formCheckGroupDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  checkBoxTitle: {
    color: '#62354a',
    marginLeft: 5,
  },
  formControlNew: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000',
    marginTop: 15,
  },
  messageInput: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000',
    marginTop: 15,
    height: '27%'

  },
  inrBoxRV: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  RvwRtngBx: {
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  RvwBx: {
    display: 'flex',
    justifyContent: "center",
  },
  RvwBxTxt: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  // End of Write a Review //
  fontWeight300: {
    fontWeight: '300',
  },
  fontWeight400: {
    fontWeight: '400',
  },
  fontWeight500: {
    fontWeight: '500',
  },
  fontWeight600: {
    fontWeight: '600',
  },
  fontWeight700: {
    fontWeight: '700',
  },
  flatOtrIconImgBx: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 3,
    width: '100%',
    resizeMode: 'cover'
  },
  flatOtrIconBx: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 3,
    width: '31.5%',
    height: 100,
    overflow: 'hidden',
  },
  ppbgflatOtrIconBx1: {
    backgroundColor: '#fff8e8',
  },
  ppbgflatOtrIconBx2: {
    backgroundColor: '#feeeee',
  },
  ppbgflatOtrIconBx3: {
    backgroundColor: '#ececec',
  },
  flatIconBxHdng: {
    fontWeight: '500',
    color: '#000',
    marginTop: 10,
    fontSize: 14,
  },
  flatIconImg1: {
    width: 25,
    height: 40,
  },
  ppflatIconImg1: {
    width: 42,
    height: 42,
  },
  flatIconImg2: {
    width: 38,
    height: 40,
  },
  ppflatIconImg3: {
    width: 65,
    height: 45,
  },
  spHdngImg: {
    textAlign: 'right',
    position: 'relative',
    width: '60%',
  },
  PpHdngImgCss: {
    width: 45,
    height: 30,
    position: 'absolute',
    right: 0,
    top: -4,
  },
  cardpdngSp: {
    paddingLeft: 10,
    position: 'relative',
  },
  subTitle2Sp: {
    fontSize: 12,
    fontWeight: '600',
  },
  arrowIconSp: {
    width: 19,
    height: 10,
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
  },
  factFeatrBlk: {
    marginTop: 35,
  },
  prpertyListSp: {
    height: 200,
    paddingHorizontal: 0,
  },
  proprtyCardCol: {
    marginHorizontal: -12,
    position: 'relative',
  },
  proprtyCardcol1Sp: {
    flex: 1,
    marginLeft: 5,
    paddingBottom: 15,
    position: 'relative',

    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 4.5,

    shadowColor: '#171717',
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 4,
  },
  spSliderBx: {
    overflow: 'hidden',
    height: 122,
    borderRadius: 15,
  },
  SpclPujaImg: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  SpclPujaImg2: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    position: 'relative',
    borderRadius: 40,
  },
  proprtyCardRightFP: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#db4242',
    opacity: 1,
    borderRadius: 5,
    display: 'flex',
    paddingBottom: 3.5,
  },
  proprtyCardRightVdo: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#fff',
    opacity: 1,
    borderRadius: 5,
    display: 'flex',
    paddingBottom: 3.5,
  },
  timeLapseText: {
    justifyContent: 'space-between',
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 12,
    paddingBottom: 4,
  },
  ratingBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 12,
    marginVertical: 12,
    borderRadius: 8,
  },
  ratingBoxRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 12,
    borderRadius: 8,
  },
  ratingBoxwidth: {
    width: '80%',
  },
  ratingBoxOuter: {
    paddingHorizontal: 16,
  },
  ratingSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#62354a',
    position: 'relative',
  },
  adinalMargnBtm: {
    marginBottom: 22,
    marginTop: -15,
  },
  ratingAvgCol: {
    paddingLeft: 0,
  },
  ratingMainBox: {
    alignItems: 'center',
  },
  ratingMainText: {
    fontSize: 40,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
  },
  ratingMainTextLG: {
    fontSize: 20,
    color: '#919090',
  },
  rateIcon: {
    marginRight: 5,
    width: 30,
    height: 30,
  },
  ratingIconsDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  ratingAvgList: {
    marginTop: -6,
  },
  ratingAvgItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingAvgIconDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
    width: 44,
  },
  ratingAvgIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  resizeRatingAvgIcn: {
    width: 14,
    height: 14,
    marginRight: 2,
  },
  ratingAvgText: {
    width: '66%',
    paddingHorizontal: 6,
    paddingVertical: 2,
    display: 'flex',
  },
  PsratingAvgOverlayFullLn: {
    position: 'relative',
    backgroundColor: '#eee',
    left: 16,
    right: 16,
    top: -0,
    bottom: 0,
    paddingVertical: 2.5,
    zIndex: -1,
  },
  PsratingAvgOverlay: {
    position: 'absolute',
    backgroundColor: '#000',
    left: 0,
    top: 0,
    bottom: 0,
    height: 5,
  },
  SkilPrcntg: {
    fontWeight: '600',
    color: '#000',
  },
  pdngRoundShape: {
    paddingVertical: 8,
    position: 'absolute',
    top: -7,
    bottom: 0,
    height: 2,
    borderRadius: 20,
  },
  ratingAvgOverlayFullLn: {
    position: 'relative',
    backgroundColor: '#eee',
    left: 75,
    right: 0,
    top: -1.2,
    bottom: 0,
    borderRadius: 10,
    paddingVertical: 3,
    zIndex: -1,
  },
  ratingAvgOverlay: {
    position: 'absolute',
    backgroundColor: '#000',
    left: 80,
    top: 0,
    bottom: 0,
    height: 5,
    borderRadius: 10,
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
    top: 16,
  },
  backBtnDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 35,
    height: 35,
    borderRadius: 35,
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
  mainTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontFamily: 'Montserrat-SemiBold'
  },
  subTitle: {
    fontSize: 16,
    color: "#ffffff",
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 22,
  },
  subTitleA: {
    fontSize: 15,
    color: "#ffffff",
    fontFamily: 'Montserrat',
    textAlign: 'left',
    marginVertical: 10,
    lineHeight: 18,
    fontWeight: '400',
  },
  subTitle2: {
    fontSize: 9.5,
    paddingLeft: 3,
    fontFamily: 'Montserrat-SemiBold',
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
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  fetrPropryDiv: {
    backgroundColor: '#d2edf8',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: -50,
    zIndex: -1,
    paddingTop: 60,
    paddingBottom: 40,
  },
  proprtyBudgetDiv: {
    backgroundColor: '#fff',
    paddingVertical: 0,
    marginTop: 0,
    zIndex: -1,
  },
  budgetDiv: {
    paddingTop: 5,
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
    color: "#9a0000",
  },
  shipTextGrey: {
    color: "#b8b9ba",
  },
  shipTextDark: {
    color: "#33373a",
  },
  formTitleDiv: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 1,
  },
  PsfixInfoBtnsDiv: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    marginLeft: -5,
    marginRight: -5,
  },
  fixInfoBtnsDiv: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 5,
    paddingTop: 10,
    marginLeft: -5,
    marginRight: -5,
  },
  fixInfoBtnsDivMenu: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
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
  formBtn: {
    marginTop: 15,
  },
  qtnIcn: {
    position: 'absolute',
    right: 40,
    top: 25,
    width: 60,
    height: 55,
  },
  OmIcnBx: {
    paddingLeft: 30,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  PsbtnFix: {
    flex: 1,
  },
  SkilTitle: {
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
  },
  btnFix: {
    flex: 1,
    marginHorizontal: 5,
  },
  srchFilterDiv: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
  },
  innerFlex: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 3,
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
  btnTransparent: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#9a0000',
  },
  TextStyle: {
    fontSize: 14,
    color: "#ffffff",
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  btmNavFix: {
    minWidth: '100%',
    justifyContent: "center",
    alignItems: 'center',
  },
  btnIcon: {
    width: 30,
    height: 30,
    textAlign: 'center',
    justifyContent: "space-between",
    marginBottom: 5,
  },
  textBlue: {
    color: '#0d568f',
  },
  textGrey: {
    color: '#676974',
  },
  textDark: {
    color: '#221e1f',
  },
  textlightEarthyColor: {
    color: '#694c5c',
  },
  textWhite: {
    color: '#ffffff',
  },
  textRed: {
    color: '#db4242',
  },
  textBlack: {
    color: '#000',
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
  formGroup: {
    marginBottom: 0,
    minWidth: '84%',
    position: 'relative',
    marginRight: 10,
  },
  formLabel: {
    fontSize: 16,
    color: "#221e1f",
    fontFamily: 'Montserrat-SemiBold',
    paddingBottom: 10,
  },
  formControl: {
    color: '#221e1f',
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
    fontFamily: 'Montserrat-Regular',
  },
  formGroupIcon: {
    position: 'relative',
  },
  formControlIcon: {
    paddingLeft: 36,
  },
  showHideIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
    width: 16,
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
  proprtyPrfl: {
    paddingVertical: 16,
  },
  mainHdng: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 10,
  },
  MainTitleDiv: {

  },
  mainTitleText: {
    fontSize: 19,
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  mainTitleText2: {
    fontSize: 18,
    color: '#62354a',
    fontFamily: 'Montserrat-SemiBold',
    paddingTop: '5%'
  },
  textEarthyRed: {
    color: '#62354a',
    textAlign: 'center',
    marginTop: 3
  },
  mainTitleText3: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
    marginVertical: 8,
  },
  tmplLoc: {
    marginTop: 8,
    color: '#707070'
  },
  parahLndTxt2: {
    fontSize: 12.5,
  },
  TrstSftyTxt: {
    fontSize: 12,
    fontWeight: '600',
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
    zIndex: -1,
  },
  mainTtlBrdrLight: {
    backgroundColor: '#e26868',
    position: 'absolute',
    width: 96,
    height: 5,
    left: 0,
    bottom: 3,
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
  m0: {
    margin: 0,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  py7: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  py15: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  pdL4: {
    paddingLeft: 4,
  },
  pdL8: {
    paddingLeft: 8,
  },
  pt15: {
    paddingTop: 15,
  },
  my20: {
    marginBottom: 20,
    marginTop: 20,
  },
  pt10: {
    paddingTop: 10,
  },
  pt15: {
    paddingTop: 15,
  },
  pb10: {
    paddingBottom: 10,
  },
  pb15: {
    paddingBottom: 15,
  },
  pb5: {
    paddingBottom: 5,
  },
  pb20: {
    paddingBottom: 20,
  },
  pt5: {
    paddingTop: 5,
  },
  pr5: {
    paddingRight: 5,
  },
  pr4: {
  },
  ml15: {
    marginLeft: 8,
  },
  pdX16: {
    paddingHorizontal: 16,
  },
  pdrt100: {
    paddingRight: 90,
  },
  mr10: {
    marginRight: 10,
  },
  mr16: {
    marginRight: 16,
  },
  pr15: {
    paddingRight: 15,
  },
  pt8: {
    paddingTop: 8,
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
    justifyContent: "space-between",
    alignItems: 'center',
  },
  proprtyCardcol1: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
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
    paddingRight: 3,
    fontSize: 12.5,

  },
  prptyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
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
  ftrTmpleSlide1: {

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
    overflow: 'hidden',
  },
  proprtyCardCol1: {
    marginHorizontal: -12,
    position: 'relative',
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
    width: '30%',
    paddingLeft: 10,
    paddingRight: 30,
  },
  VdoprptyfeatrImg: {
    width: 362,
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  prptyfeatrImg: {
    width: 362,
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  budgetBatch: {
    marginTop: 15,
    backgroundColor: '#e8f5fb',
    padding: 7,
    fontSize: 12.5,
    borderRadius: 7,
    color: '#000',
    marginRight: 7,
    lineHeight: 25,
    fontFamily: 'Montserrat-Medium',
  },
  blueBg: {
    backgroundColor: '#0f5590',
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
  darkBg: {
    backgroundColor: '#62354a',
  },
  redBg: {
    backgroundColor: '#db4242',
  },
  lightBg: {
    backgroundColor: '#e8f6fb',
  },
  lightBg2: {
    backgroundColor: '#d2edf8',
  },
  lightBlueBg: {
    backgroundColor: '#64a2d2',
  },
  polularCityDiv: {
    paddingHorizontal: 16,
  },
  polrCityDiv: {
    width: '25%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
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
    height: 80,
    width: 80,
    maxWidth: '100%',
    paddingRight: 10,
  },
  cityHdng: {
    position: 'absolute',
    color: '#fff',
    textAlign: 'center',
    zIndex: 2,
    fontSize: 14,

  },
  space15: {
    height: 15,
  },
  space10: {
    height: 10,
  },
  tmplDtlBnr: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  inrHdr: {
    height: 240,
  },
  mainHeaderOuter: {
    position: 'relative',
  },

  tmplDtlSharing: {
    position: 'absolute',
    right: 0,
    bottom: 15,

  },
  tmplBtnRow: {
    width: 30,
    height: 28,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginRight: 8,
    textAlign: 'center',
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
  },

  hdrtmplBtn: {
    textAlign: 'center',
    width: 20,
    height: 20,
  },
  lkIcn: {
    width: 18,
    height: 15,
  },
  ShrIcn: {
    width: 18,
    height: 20,
  },
  flex: {
    flex: 1,
  },
  outrInr: {
    paddingHorizontal: 16,
    flex: 1,
    marginBottom: 12
  },
  reportView: {
    flexDirection: 'row',

  },
  reportPrTxt: {
    fontSize: 14,
    color: '#221e1f',
    paddingLeft: 7,
    fontFamily: 'Montserrat-SemiBold'

  },
  mainTitlInr: {
    backgroundColor: '#ffefe2',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: '#221e1f',
    fontFamily: 'Montserrat-SemiBold',

  },
  monthlyHdng: {
    fontSize: 11,
  },
  smallHdng: {
    fontSize: 11,
    paddingRight: 5,
    marginTop: -10,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  featrIcons: {
    width: 40,
    height: 40,
    backgroundColor: '#e8f6fb',
    borderRadius: 5,
    marginRight: 2,
    textAlign: 'center',
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    paddingTop: 10,
  },
  landLodImg: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 15,
  },
  landLodImg2: {
    width: 16,
    height: 16,
    borderRadius: 6,
    marginRight: 2,
    marginTop: 1,
  },
  landLoadUsrNw: {

  },
  adjstShpBgImg: {
    paddingTop: 16,
    resizeMode: 'cover',
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    height: 150,
    zIndex: -1,
  },
  onlineAppBlk: {
    backgroundColor: '#db4242',
  },
  downldIconBg: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 5,
  },
  whiteClr: {
    color: 'white',
  },
  underLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',

  },
  factFeatrBg: {
    marginTop: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 1,
    borderRadius: 8,
    elevation: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  fctIconBg: {
    flexDirection: 'row',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 1,
    borderRadius: 8,
    elevation: 6,
    marginRight: 10,
  },
  factCol: {
    flex: 0.4,
    alignItems: 'center',
  },
  amenitsIconBg: {
    paddingRight: 6,
  },
  amenitsCol: {
    flex: 0.46,
    alignItems: 'center',
  },
  width60: {
    width: '62%',
  },
  ht250: {
    height: 150,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  ht250Pdh0: {
    paddingHorizontal: 0,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapImgRsz: {
    width: 180,
    height: 160,
  },
  qttionMrkIcn: {
    height: 20,
    widht: 5,
  },
  QtnHdngtxt: {
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 13,
  },
  qttionMrkTxt: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 10,
  },
  landLoadUsrData: {
    width: '100%',
  },
  showmoreBtn: {
    backgroundColor: '#db4242',
    marginLeft: 5,
    padding: 1,
    color: '#fff',
    borderRadius: 4,
    paddingHorizontal: 5,
    fontSize: 12,
  },
  PpcntctcallIcn: {
    width: 17,
    height: 17,
  },
  PpcntctMblIcn: {
    width: 22,
    height: 22,
  },
  FbPpsocialIcon: {
    width: 11,
    height: 18,
  },
  PpsocialIcon: {
    width: 15,
    height: 15,
  },
  PpcntctTxt: {
    fontSize: 16,
  },
  PanditprofilesclIcnOutr: {
    flexDirection: 'row',
    width: 32,
    height: 32,
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 4,
    marginRight: 10,
  },

  sclIcnOutr: {
    flexDirection: 'row',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 5,
    marginRight: 16,
    backgroundColor: '#ffefe2',
  },
  proptyGallryOutr: {


  },

  proptyGalyImg: {
    height: 100,
    width: 110,
    borderRadius: 7,
    marginVertical: 10,
    marginRight: 12,
    position: "relative",

  },
  viewMorTxtOutr: {
    position: "absolute",
    top: 10,
    backgroundColor: 'rgba(15,87,145,0.4)',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 5,
    height: 100,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#ffffff',
  },
  viewMrTxt: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    textTransform: 'uppercase',
    fontSize: 11,
  },
  largeHdng: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  BxColor: {
    backgroundColor: '#ffefe2',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    textAlign: 'center',
    borderRadius: 7,
    color: '#fff',
  },
  txtAlignStng2: {
    alignItems: 'flex-end',
  },
  BxColorRedEarthy: {
    backgroundColor: '#ffefe2',
  },
  btnComn: {
    backgroundColor: '#db4242',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 7,
    color: '#fff',
  },
  btnComnLg: {
    fontSize: 13,
    textTransform: 'uppercase',
    paddingHorizontal: 8,
    paddingVertical: 13,
  },
  darkBtn: {
    backgroundColor: '#62354a',
    color: '#ffffff',
  },
  grenBtn: {
    backgroundColor: '#49c740',
    color: '#ffffff'
  },
  virtulImg: {
    width: '100%',
    marginTop: 10,
  },

});

const stylesSwiper = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  fixSrchDiv2No: {
    marginBottom: 50
  }
})

export default PujariDetail