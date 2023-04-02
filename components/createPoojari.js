import React, { useState, useEffect } from 'react';
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
    DrawerLayoutAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { validateTempleInputs } from '../helperFunctions/Validations/validateTempleInputs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerLayout } from 'react-native-gesture-handler';

const createPoojari = (props) => {
    const [propertyInfo, setPropertyInfo] = useState({
        name: '',
        about: ''
    })

    const [socialLinks, setSocialLinks] = useState({
        facebook: '', twitter: '', linkedin: '', whatsapp: ''
    })

    const [errors, setErrors] = useState({
        title: true, description: true
    })

    const step2 = async () => {
        const isName = validateTempleInputs(propertyInfo.name)
        const isabout = validateTempleInputs(propertyInfo.about)

        setErrors({ ...errors, title: isName, description: isabout })

        if (isName && isabout) {
            try {
                const social = JSON.stringify(socialLinks)
                await AsyncStorage.setItem("name", propertyInfo.name)
                await AsyncStorage.setItem("about", propertyInfo.about)
                await AsyncStorage.setItem('socialLinks', social)
                props.navigation.navigate("createPoojariStep2")
            } catch (err) {
                console.log('err', err)
            }
        }
    }

    const handleClick = () => {
        drawer.current.closeDrawer();
        props.navigation.navigate("dashboard");
    }
    const locationClick = () => {
        props.navigation.navigate("location");
    }
    const detailsClick = () => {
        props.navigation.navigate("details");
    }

    const handleClick2 = () => {
        // props.navigation.navigate("searchlist");
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
    const handleClick5 = () => {
        // props.navigation.navigate("propertylist");
    }
    const handleClick6 = () => {
        props.navigation.navigate("propertydetail");
    }
    const addShipmentClick = () => {
        props.navigation.navigate("location");
    }
    const shipmentsClick = () => {
        props.navigation.navigate("shipments");
    }
    const paymentCardsClick = () => {
        props.navigation.navigate("paymentcards");
    }
    const profileClick = () => {
        props.navigation.navigate("editprofile");
    }
    const notificationsClick = () => {
        props.navigation.navigate("notifications");
    }
    const logoutClick = () => {
        props.navigation.navigate("/");
    }

    const drawer = React.useRef(null);
    const [drawerPosition, setDrawerPosition] = React.useState("left");

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
                    <View style={styles.sidebarProTitleDiv}>
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
                                    colors={['#db4242', '#db4242']}
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
                                    colors={['#db4242', '#db4242']}
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
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <DrawerLayout
                ref={drawer}
                drawerWidth={300}
                drawerPosition={DrawerLayout.positions.Left}
                drawerType="front"
                drawerBackgroundColor="#fff"
                renderNavigationView={navigationView}>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={styles.mainHeaderOuter}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        colors={['#db4242', '#db4242']}
                        style={styles.mainHeader}>
                        <View style={styles.backMenuDiv}>
                            <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 25, width: 25, borderRadius: 13, backgroundColor: '#fff' }} onPress={() => { props.navigation.navigate('dashboard') }}>
                                <Image source={require('../img/rightArrow1.jpg')} style={[styles.arrowBtn, styles.arrowBtnLight]} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.headerTitle]}>Pujari Information</Text>
                    </LinearGradient>
                </View>
                <ScrollView contentContainerStyle={styles.outerContainer}>
                    <View style={styles.mainBoxOuter}>
                        <View style={styles.mainBody}>
                            <View style={[styles.btnFixContainer]}>
                                <View style={styles.formOuter}>
                                    <View style={[styles.MainTitleDiv]}>
                                        <Text style={[styles.mainTitleText2, styles.textEarthyRed]}>Pujari Details</Text>
                                    </View>
                                    <View style={[styles.formGroupDiv, styles.mt20]}>
                                        <View style={styles.formGroupNew}>
                                            <Text style={styles.formLabelNew}> Pujari Name*</Text>
                                            <TextInput
                                                style={styles.formControlNew}
                                                value={propertyInfo.name}
                                                onChangeText={value => setPropertyInfo({ ...propertyInfo, name: value })}
                                                placeholderTextColor="#888"
                                            />
                                            {!errors.title && (
                                                <Text style={{ color: 'red', fontSize: 13 }}>
                                                    Enter Name
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.formGroupDiv}>
                                        <View style={styles.formGroupNew}>
                                            <Text style={styles.formLabelNew}>About Pujari*</Text>
                                            <View style={styles.textAreaContainer}>
                                                <TextInput
                                                    style={styles.textArea}
                                                    value={propertyInfo.about}
                                                    onChangeText={value => setPropertyInfo({ ...propertyInfo, about: value })}
                                                    placeholder=""
                                                    placeholderTextColor="#fbfbfb"
                                                    underlineColorAndroid="transparent"
                                                    multiline={true}
                                                    autoCorrect
                                                />
                                            </View>
                                            {!errors.description && (
                                                <Text style={{ color: 'red', fontSize: 13 }}>
                                                    Write something about Pujari
                                                </Text>
                                            )}
                                        </View>
                                    </View>

                                    <View style={[styles.MainTitleDiv]}>
                                        <View style={{ marginVertical: 20 }}>
                                            <Text style={[styles.mainTitleText2, styles.textEarthyRed]}>Social Links</Text>
                                        </View>
                                    </View>

                                    <View style={styles.formGroupDiv}>
                                        <View style={styles.formGroupNew}>
                                            <Text style={styles.formLabelNew}>Facebook</Text>
                                            <TextInput
                                                style={styles.formControlNew}
                                                value={socialLinks.facebook}
                                                onChangeText={value => setSocialLinks({ ...socialLinks, facebook: value })}
                                                placeholderTextColor="#888"
                                                placeholder='https://facebook.com/'
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.formGroupDiv}>
                                        <View style={styles.formGroupNew}>
                                            <Text style={styles.formLabelNew}>Twitter</Text>
                                            <TextInput
                                                style={styles.formControlNew}
                                                value={socialLinks.twitter}
                                                onChangeText={value => setSocialLinks({ ...socialLinks, twitter: value })}
                                                placeholderTextColor="#888"
                                                placeholder='https://twitter.com/'
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.formGroupDiv}>
                                        <View style={styles.formGroupNew}>
                                            <Text style={styles.formLabelNew}>Linkedin</Text>
                                            <TextInput
                                                style={styles.formControlNew}
                                                value={socialLinks.linkedin}
                                                onChangeText={value => setSocialLinks({ ...socialLinks, linkedin: value })}
                                                placeholderTextColor="#888"
                                                placeholder='https://linkedin.com/'
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.formGroupDiv}>
                                        <View style={styles.formGroupNew}>
                                            <Text style={styles.formLabelNew}>Whatsapp</Text>
                                            <TextInput
                                                style={styles.formControlNew}
                                                value={socialLinks.whatsapp}
                                                onChangeText={value => setSocialLinks({ ...socialLinks, whatsapp: value })}
                                                placeholderTextColor="#888"
                                                placeholder='https://whatsapp.com/'
                                            />
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.posRltv]}>
                    <ImageBackground style={[styles.bglastImg]} source={require('../img/02bottom_pattern.png')}>
                    </ImageBackground>
                </View>
                <View style={styles.fixBtnDiv}>
                    <View style={styles.innerFlex}>
                        <View style={styles.amtDiv}>
                            <Text style={styles.amtTextLabel}>Step 1 of 7</Text>
                        </View>
                    </View>
                    <View style={styles.innerFlex}>
                        <TouchableOpacity style={styles.btnGradientDiv} onPress={step2}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={['#db4242', '#db4242']}
                                style={[styles.btnDefault, styles.btnFull]}>
                                <Text style={styles.TextStyle}> Continue </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerLayout>
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
    posRltv: {
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
    mt20: {
        marginTop: 30,
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
        paddingHorizontal: 2,
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
        color: "#633549",
        fontFamily: 'Montserrat-Regular',
        textAlign: 'left',
        paddingBottom: 10,
        fontWeight: '700',
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
        height: 38,
        borderWidth: 1,
        borderColor: '#cccccc',
        paddingBottom: 10,
        paddingTop: 10,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-Regular',
        minWidth: '100%',
        shadowOpacity: 0,
        borderRadius: 5,
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
    MainTitleDiv: {
    },
    mainTitlInr: {
        color: '#221e1f',
        fontFamily: 'Montserrat-SemiBold',
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
    mainTitleText3: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Montserrat-SemiBold',
        marginVertical: 8,
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

    green: {
        color: 'green',

    }

});

export default createPoojari