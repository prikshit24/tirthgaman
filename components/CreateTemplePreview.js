import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-shadow-cards';
import UserApi from '../Axios/UserApi';
import { BASE_URL_APP } from '../Utils/Contstant';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CreateTempleOreview = ({navigation}) => {

    const [token, setToken] = useState('')
    const [_id, setID] = useState('')
    const [email, setEmail] = useState('')

    const [templeName, setTempleName] = useState('')

    const [coverImage, setCoverImage] = useState('')

    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    console.log('templeName', templeName)
    const [created, setCreated] = useState(false)

    useEffect(() => {

        (async () => {
            try {
                const details = await AsyncStorage.getItem('userDetails')
                const userDetails = JSON.parse(details)
                const getTemple = await AsyncStorage.getItem('templeInfo')
                const templeInfo = JSON.parse(getTemple)
                setTempleName(templeInfo.title)
                console.log(templeInfo.title)
                const getState = await AsyncStorage.getItem('state');
                const getCountry = await AsyncStorage.getItem('country');
                const getCity = await AsyncStorage.getItem('city');
                setCity(getCity)
                setState(getState)
                setCountry(getCountry)
                const getCoverImage = await AsyncStorage.getItem('Cover Image');
                setCoverImage(getCoverImage)
                console.log('user details', userDetails)
                const accessToken = await AsyncStorage.getItem('accessToken');
                setToken(accessToken);
                setID(userDetails._id);
                setEmail(userDetails.email);
            } catch (error) {
                console.error('error', error)
            }
        })()
    }, [])
    const removeFormData = async () => {
        try {
            await AsyncStorage.removeItem('templeInfo');
            await AsyncStorage.removeItem('socialLinks');
            await AsyncStorage.removeItem('country');
            await AsyncStorage.removeItem('state');
            await AsyncStorage.removeItem('city');
            await AsyncStorage.removeItem('postalCode');
            await AsyncStorage.removeItem('street');
            await AsyncStorage.removeItem('lng');
            await AsyncStorage.removeItem('lat');
            await AsyncStorage.removeItem('facts');
            await AsyncStorage.removeItem('history');
            await AsyncStorage.removeItem('Cover Image');
            await AsyncStorage.removeItem('Temple Image');
            await AsyncStorage.removeItem('Aarti Image');
            await AsyncStorage.removeItem('Morning Start');
            await AsyncStorage.removeItem('Morning End');
            await AsyncStorage.removeItem('Evening Start');
            await AsyncStorage.removeItem('Evening End');
            await AsyncStorage.removeItem('videoTitle');
            await AsyncStorage.removeItem('videoLink');
            await AsyncStorage.removeItem('Pooja 1');
            await AsyncStorage.removeItem('Pooja 1 Image');
            await AsyncStorage.removeItem('Pooja 2');
            await AsyncStorage.removeItem('Pooja 2 Image');
            await AsyncStorage.removeItem('Pooja 3');
            await AsyncStorage.removeItem('Pooja 3 Image');
            await AsyncStorage.removeItem('associatedPoojari');

            return true;
        } catch (exception) {
            return false;
        }
    };

    const submitCreateTempleForm = async () => {

        if (token) {
            try {

                //step 1 data
                const getTemple = await AsyncStorage.getItem('templeInfo')
                const socialLinks = await AsyncStorage.getItem('socialLinks')

                const templeInfo = JSON.parse(getTemple)
                const links = JSON.parse(socialLinks)

                const socials = {
                    facebook: links.facebook,
                    twitter: links.twitter,
                    linkedin: links.linkedin,
                    whatsapp: links.whatsapp
                }

                //step 2
                const getCountry = await AsyncStorage.getItem('country');
                const getState = await AsyncStorage.getItem('state');
                const getCity = await AsyncStorage.getItem('city');
                const getPostalCode = await AsyncStorage.getItem('postalCode');
                const getStreet = await AsyncStorage.getItem('street');
                const getLng = await AsyncStorage.getItem('lng');
                const getLat = await AsyncStorage.getItem('lat');

                const location = {
                    city: getCity,
                    street: getStreet,
                    state: getState,
                    postalCode: getPostalCode,
                    country: getCountry
                }

                const mapsLatLng = {
                    lat: getLat,
                    lng: getLng
                }

                //step 3
                const factsData = await AsyncStorage.getItem('facts')
                const historyData = await AsyncStorage.getItem('history')

                const factsOutput = JSON.parse(factsData)
                const historyOutput = JSON.parse(historyData)

                const templeHistory = {
                    facts: factsOutput,
                    history: historyOutput
                }

                //step 4

                const getCoverImage = await AsyncStorage.getItem('Cover Image');
                const getTempleImage = await AsyncStorage.getItem('Temple Image');
                const getAartiImage = await AsyncStorage.getItem('Aarti Image');

                const templeImages = {
                    templePictures: [getCoverImage],
                    coverImages: [getTempleImage],
                    aaratiImages: [getAartiImage]
                }

                //step 5
                const getMorningStart = await AsyncStorage.getItem('Morning Start');
                const getMorningEnd = await AsyncStorage.getItem('Morning End');
                const getEveningStart = await AsyncStorage.getItem('Evening Start');
                const getEveningEnd = await AsyncStorage.getItem('Evening End');

                const aartiTimings = {
                    morningTiming: {
                        from: getMorningStart,
                        to: getMorningEnd
                    },
                    eveningTiming: {
                        from: getEveningStart,
                        to: getEveningEnd
                    }
                }

                //step 6

                const data = await AsyncStorage.getItem('video')
                const video = JSON.parse(data)

                //step 7
                const getPooja1 = await AsyncStorage.getItem('Pooja 1');
                const getPooja1Image = await AsyncStorage.getItem('Pooja 1 Image');
                const getPooja2 = await AsyncStorage.getItem('Pooja 2');
                const getPooja2Image = await AsyncStorage.getItem('Pooja 2 Image');
                const getPooja3 = await AsyncStorage.getItem('Pooja 3');
                const getPooja3Image = await AsyncStorage.getItem('Pooja 3 Image');

                const pooja1Output = JSON.parse(getPooja1)
                const pooja2Output = JSON.parse(getPooja2)
                const pooja3Output = JSON.parse(getPooja3)

                const poojas = [
                    {
                        title: pooja1Output.title,
                        poojaImage: getPooja1Image,
                        poojaDescription: pooja1Output.description
                    },
                    {
                        title: pooja2Output.title,
                        poojaImage: getPooja2Image,
                        poojaDescription: pooja2Output.description
                    },
                    {
                        title: pooja3Output.title,
                        poojaImage: getPooja3Image,
                        poojaDescription: pooja3Output.description
                    }
                ]

                //step 8

                const associatedPoojari = await AsyncStorage.getItem('associatedPoojari')


                const finalData = {
                    title: templeInfo.title,
                    description: templeInfo.description,
                    headPoojari: templeInfo.headPoojari,
                    trustName: templeInfo.trustName,
                    socials: socials,
                    location: location,
                    templeHistory: templeHistory,
                    templeImages: templeImages,
                    aartiTimings: aartiTimings,
                    poojas: poojas,
                    poojariAssociated: [associatedPoojari],
                    video: video,
                    mapsLatLng: mapsLatLng,
                    createdBy: {
                        creatorID: _id,
                        creatorEmail: email
                    }
                }

                console.log('FinalData', finalData)

                try {
                    const response = await UserApi.post('/temple/create', finalData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                Accept: "application/json"
                            }
                        }
                    )
                    console.log('response of Post request', response)

                    if (response.data.status === 201) {
                        alert(response.data.message)
                        await removeFormData()
                        navigation.navigate('searchtemplelist')
                    } else {
                        alert('Temple not Created! try again')
                        setTimeout(async () => {
                            await removeFormData()
                            navigation.navigate('details')
                        }, 3000);
                    }

                } catch (error) {
                    console.error('error', error)
                }
            } catch (error) {
                console.log('read data error', error);
            }

        }

    }

    const onCancleClick = async () => {
        await removeFormData()
        navigation.navigate('dashboard')
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.mainHeaderOuter}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#db4242', '#db4242']}
                    style={styles.mainHeader}>
                    <Text style={[styles.headerTitle]}>Congratulations</Text>
                </LinearGradient>
            </View>
            <ScrollView contentContainerStyle={styles.outerContainer}>
                <View style={styles.mainBoxOuter}>
                    <View style={styles.mainBody}>
                        <View style={[styles.btnFixContainer]}>
                            <View style={styles.formOuter}>
                                <View style={styles.formGroupDiv}>
                                    <View style={styles.formGroupNew}>
                                        <View style={[styles.flatOtrIconBx]}>
                                            <Text style={[styles.mainTitleText2, styles.textEarthyRed]}>Excellent, congratulations on completing the listing, It is waiting to be reviewed for publication. </Text>
                                        </View>
                                        <View style={[styles.flatOtrIconBx]}>
                                            <Text style={[styles.mainTitleText22, styles.textEarthyRed]}>This is your listing</Text>
                                        </View>
                                        <View style={{ marginTop: '6%' }} >
                                            <View style={{ alignItems: 'center' }}>
                                                <Image
                                                    source={{
                                                        uri: `${BASE_URL_APP}/files/${coverImage}`,
                                                    }}
                                                    style={{ width: '100%', height: 250 }}
                                                />
                                            </View>
                                            <Card style={{ backgroundColor: '#fff', padding: '5%', bottom: 40, marginHorizontal: '11%', width: '80%' }} >
                                                <Text style={[styles.mainTitleText222, styles.textEarthyRed, styles.paddingLeft]} >{templeName}</Text>
                                                <View>
                                                    <View style={{ flexDirection: 'row' }}  >
                                                        <Ionicons name={'location-outline'} color={'#808080'} size={20} />
                                                        <Text style={{ color: '#DB4242', textAlign: 'center', fontSize: 16, fontWeight: '500' }}>{city}, {state}, {country}</Text>
                                                    </View>
                                                </View>

                                            </Card>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: '5%' }}>
                <TouchableOpacity onPress={() => onCancleClick()}>
                    <View style={{ backgroundColor: '#62354a', padding: '7%', borderRadius: 5 }} >
                        <Text style={[styles.mainTitleText2222, styles.textEarthywhite]} >Cancel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => submitCreateTempleForm()}>
                    <View style={{ backgroundColor: '#db4242', padding: '5%', borderRadius: 5 }} >
                        <Text style={[styles.mainTitleText2222, styles.textEarthywhite]}>Publish Listing</Text>
                    </View>
                </TouchableOpacity>
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
    textEarthyRed: {
        color: '#62354a',
    },
    textEarthywhite: {
        color: '#fff',
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
    paddingLeft: {
        paddingRight: '30%'
    },
    spaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnFix: {
        flex: 1,
        marginHorizontal: 5,
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
    blackText: {
        color: "#000000",
    },
    textRed: {
        color: '#db4242',
    },
    greyText: {
        fontSize: 16,
        color: "#777777",
    },
    mainBoxOuter: {
        flex: 1,
    },
    pdt20: {
        paddingTop: 20,
    },
    mt20: {
        marginTop: 15,
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
        fontWeight: '700',
        color: '#62354a',
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
    mainTitleText: {
        fontSize: 19,
        color: '#000',
        fontFamily: 'Montserrat-Bold',
    },
    mainTitleText2: {
        fontSize: 15,
        color: '#000',
        fontFamily: 'Montserrat-Bold',
    },
    mainTitleText22: {
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
        marginTop: '4%'
    },
    mainTitleText222: {
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
    },
    mainTitleText2222: {
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
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
        paddingHorizontal: 15,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 8,
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
export default CreateTempleOreview