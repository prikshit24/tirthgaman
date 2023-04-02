import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL_APP } from '../Utils/Contstant';

const Step7 = (props) => {

    const [pooja1Image, setPooja1Image] = useState({})
    const [pooja1, setPooja1] = useState({
        title: '', poojaDescription: ''
    })

    const [pooja2Image, setPooja2Image] = useState({})
    const [pooja2, setPooja2] = useState({
        title: '', poojaDescription: ''
    })

    const [pooja3Image, setPooja3Image] = useState({})
    const [pooja3, setPooja3] = useState({
        title: '', poojaDescription: ''
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

    const uploadPooja1Image = () => {
        let options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                setToastMsg('Cancelled image Selection')
                setPooja1Image({})
            } else if (response.errorCode == 'permission') {
                setToastMsg('permission not satisfied')
            } else if (response.errorCode == 'others') {
                setToastMsg(response.errorMessage)
            } else if (response.assets[0].fileSize > 10485760) {
                alert('Maxium image size exceeded', 'Please choose image under 10MB', [{ text: 'OK' }])
            } else {
                setPooja1Image(response.assets[0])
            }
        })
    }

    const uploadPooja2Image = () => {
        let options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                setToastMsg('Cancelled image Selection')
                setPooja2Image({})
            } else if (response.errorCode == 'permission') {
                setToastMsg('permission not satisfied')
            } else if (response.errorCode == 'others') {
                setToastMsg(response.errorMessage)
            } else if (response.assets[0].fileSize > 10485760) {
                alert('Maxium image size exceeded', 'Please choose image under 10MB', [{ text: 'OK' }])
            } else {
                setPooja2Image(response.assets[0])
            }
        })
    }

    const uploadPooja3Image = () => {
        let options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: true
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                setToastMsg('Cancelled image Selection')
                setPooja3Image({})
            } else if (response.errorCode == 'permission') {
                setToastMsg('permission not satisfied')
            } else if (response.errorCode == 'others') {
                setToastMsg(response.errorMessage)
            } else if (response.assets[0].fileSize > 10485760) {
                alert('Maxium image size exceeded', 'Please choose image under 10MB', [{ text: 'OK' }])
            } else {
                setPooja3Image(response.assets[0])
            }
        })
    }

    const step8 = async () => {

        let image1 = '';
        let image2 = '';
        let image3 = '';

        if (pooja1Image?.base64 !== undefined) {
            image1 = await uploadFile(pooja1Image)
        }

        if (pooja2Image?.base64 !== undefined) {
            image2 = await uploadFile(pooja2Image)
        }

        if (pooja3Image?.base64 !== undefined) {
            image3 = await uploadFile(pooja3Image)
        }

        try {
            const pooja1Input = JSON.stringify(pooja1);
            const pooja2Input = JSON.stringify(pooja2);
            const pooja3Input = JSON.stringify(pooja3);

            pooja1 && await AsyncStorage.setItem("Pooja 1", pooja1Input)
            pooja1Image.fileName && await AsyncStorage.setItem("Pooja 1 Image", image1);
            pooja2 && await AsyncStorage.setItem("Pooja 2", pooja2Input)
            pooja2Image.fileName && await AsyncStorage.setItem("Pooja 2 Image", image2);
            pooja3 && await AsyncStorage.setItem("Pooja 3", pooja3Input)
            pooja3Image.fileName && await AsyncStorage.setItem("Pooja 3 Image", image3);
            props.navigation.navigate("createPoojariStep8");
        } catch (error) {
            console.log('error', error)
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
                        <TouchableOpacity style={styles.backBtnDiv} onPress={() => props.navigation.navigate("createPoojariStep6")}>
                            <Image source={require('../img/rightArrow1.jpg')} style={[styles.arrowBtn, styles.arrowBtnLight]} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.headerTitle]}>Pujari Details</Text>
                </LinearGradient>
            </View>
            <ScrollView contentContainerStyle={styles.outerContainer}>
                <View style={styles.mainBoxOuter}>
                    <View style={styles.mainBody}>
                        <View style={[styles.centerBoxNo, styles.btnFixContainer]}>
                            <View style={styles.formOuter}>
                                <View style={styles.formGroupDiv}>
                                    <View style={styles.formGroupNew}>
                                        <View style={[styles.MainTitleDiv, styles.flatOtrIconBx]}>
                                            <Text style={[styles.mainTitleText2, styles.textEarthyRed]}> Puja 1 </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.formGroupDiv}>
                                    <View style={[styles.formGroupNew]}>
                                        <Text style={[styles.formLabelNew, styles.textEarthyRed]}>Puja Title</Text>
                                        <TextInput
                                            style={styles.formControlNew}
                                            value={pooja1.title}
                                            onChangeText={value => setPooja1({ ...pooja1, title: value })}
                                            placeholderTextColor="#888"
                                            placeholder='Title1' />
                                    </View>
                                </View>
                                <View style={styles.formGroupDiv}>
                                    <View style={[styles.formGroupNew,]}>
                                        <Text style={styles.formLabelNew}> Puja Image </Text>
                                        <TouchableOpacity onPress={() => uploadPooja1Image()}>
                                            <View style={styles.uploadIdDiv}>
                                                {pooja1Image.base64 ?
                                                    <Image source={{ uri: 'data:image/png;base64,' + pooja1Image.base64 }} style={{ height: 100, width: 100 }} />
                                                    :
                                                    <>
                                                        <Image source={require('../img/fileupload.png')} style={styles.uploadIdIcon} />
                                                        <Text style={styles.textRed}> Upload a file </Text>
                                                        <Text style={[styles.uploadIdTitle2]}> PNG, JPG, GIF up to 10MB</Text>
                                                    </>
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.formGroupDiv}>
                                    <View style={styles.formGroupNew}>
                                        <Text style={styles.formLabelNew}>Puja Description</Text>
                                        <View style={styles.textAreaContainer}>
                                            <TextInput
                                                style={styles.textArea}
                                                value={pooja1.poojaDescription}
                                                onChangeText={value => setPooja1({ ...pooja1, poojaDescription: value })}
                                                placeholderTextColor="#888"
                                                placeholder='Puja Description1'
                                                underlineColorAndroid="transparent"
                                                numberOfLines={6}
                                                multiline={true}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.formOuter, styles.pdt20]}>
                                <View style={styles.formGroupDiv}>
                                    <View style={styles.formGroupNew}>
                                        <View style={[styles.MainTitleDiv, styles.flatOtrIconBx]}>
                                            <Text style={[styles.mainTitleText2, styles.textEarthyRed]}> Puja 2 </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.formGroupDiv}>
                                    <View style={[styles.formGroupNew]}>
                                        <Text style={styles.formLabelNew}>Puja Title</Text>
                                        <TextInput
                                            style={styles.formControlNew}
                                            value={pooja2.title}
                                            onChangeText={value => setPooja2({ ...pooja2, title: value })}
                                            placeholderTextColor="#888"
                                            placeholder='Title2'
                                        />
                                    </View>
                                </View>
                                <View style={styles.formGroupDiv}>
                                    <View style={[styles.formGroupNew,]}>
                                        <Text style={styles.formLabelNew}>Puja Image</Text>
                                        <TouchableOpacity onPress={() => uploadPooja2Image()}>
                                            <View style={styles.uploadIdDiv}>
                                                {pooja2Image.base64 ?
                                                    <Image source={{ uri: 'data:image/png;base64,' + pooja2Image.base64 }} style={{ height: 100, width: 100 }} />
                                                    :
                                                    <>
                                                        <Image source={require('../img/fileupload.png')} style={styles.uploadIdIcon} />
                                                        <Text style={styles.textRed}> Upload a file </Text>
                                                        <Text style={[styles.uploadIdTitle2]}> PNG, JPG, GIF up to 10MB</Text>
                                                    </>
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.formGroupDiv}>
                                    <View style={styles.formGroupNew}>
                                        <Text style={styles.formLabelNew}> Puja Description </Text>
                                        <View style={styles.textAreaContainer}>
                                            <TextInput
                                                style={styles.textArea}
                                                value={pooja2.poojaDescription}
                                                onChangeText={value => setPooja2({ ...pooja2, poojaDescription: value })}
                                                placeholderTextColor="#888"
                                                placeholder='Puja Description2'
                                                underlineColorAndroid="transparent"
                                                numberOfLines={6}
                                                multiline={true}
                                            />
                                        </View>
                                    </View>
                                </View>

                            </View>

                            <View style={[styles.formOuter, styles.pdt20]}>
                                <View style={styles.formGroupDiv}>
                                    <View style={styles.formGroupNew}>
                                        <View style={[styles.MainTitleDiv, styles.flatOtrIconBx]}>
                                            <Text style={[styles.mainTitleText2, styles.textEarthyRed]}> Other Puja </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.formGroupDiv}>
                                    <View style={[styles.formGroupNew]}>
                                        <Text style={styles.formLabelNew}>Puja Title</Text>
                                        <TextInput
                                            style={styles.formControlNew}
                                            value={pooja3.title}
                                            onChangeText={value => setPooja3({ ...pooja3, title: value })}
                                            placeholderTextColor="#888"
                                            placeholder='Title3'
                                        />
                                    </View>
                                </View>
                                <View style={styles.formGroupDiv}>
                                    <View style={[styles.formGroupNew,]}>
                                        <Text style={styles.formLabelNew}>Puja Image</Text>
                                        <TouchableOpacity onPress={() => uploadPooja3Image()}>
                                            <View style={styles.uploadIdDiv}>
                                                {pooja3Image.base64 ?
                                                    <Image source={{ uri: 'data:image/png;base64,' + pooja3Image.base64 }} style={{ height: 100, width: 100 }} />
                                                    :
                                                    <>
                                                        <Image source={require('../img/fileupload.png')} style={styles.uploadIdIcon} />
                                                        <Text style={styles.textRed}> Upload a file </Text>
                                                        <Text style={[styles.uploadIdTitle2]}> PNG, JPG, GIF up to 10MB</Text>
                                                    </>
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.formGroupDiv}>
                                    <View style={styles.formGroupNew}>
                                        <Text style={styles.formLabelNew}> Puja Description </Text>
                                        <View style={styles.textAreaContainer}>
                                            <TextInput
                                                style={styles.textArea}
                                                value={pooja3.poojaDescription}
                                                onChangeText={value => setPooja3({ ...pooja2, poojaDescription: value })}
                                                placeholderTextColor="#888"
                                                placeholder='Puja Description3'
                                                underlineColorAndroid="transparent"
                                                numberOfLines={6}
                                                multiline={true}
                                            />
                                        </View>
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
                        <Text style={styles.amtTextLabel}>Step 7 of 8</Text>
                    </View>
                </View>
                <View style={styles.innerFlex}>
                    <TouchableOpacity style={styles.btnGradientDiv} onPress={step8}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={['#db4242', '#db4242']}
                            style={[styles.btnDefault, styles.btnFull]}>
                            <Text style={styles.TextStyle}>Continue</Text>
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
        //alignItems: 'center',
        backgroundColor: '#ffffff',
        position: "relative",
        //minHeight: '100%',
        fontFamily: 'Montserrat-Regular',
    },
    textEarthyRed: {
        color: '#62354a',
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

export default Step7