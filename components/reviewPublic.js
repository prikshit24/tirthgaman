import React, { useState, useEffect } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL_APP } from '../Utils/Contstant';
import UserApi from '../Axios/UserApi';

const reviewPublic = (props) => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [poojariImage, setPoojariImage] = useState('')
    const getUserData = async () => {
        try {
            const gettingUserName = await AsyncStorage.getItem('name');
            const getPoojariImage = await AsyncStorage.getItem('Poojari Image');
            const gettingCountry = await AsyncStorage.getItem('country');
            const gettingState = await AsyncStorage.getItem('state');
            const gettingCity = await AsyncStorage.getItem('city');
            setName(gettingUserName);
            setPoojariImage(getPoojariImage)
            setCity(gettingCity)
            setState(gettingState)
            setCountry(gettingCountry)
        } catch (error) {
            console.log('read data error');
        }
    };
    useEffect(() => {
        getUserData();
    }, []);

    const [token, setToken] = useState('')
    const [_id, setID] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                // const userEmail = await AsyncStorage.getItem('email')
                const details = await AsyncStorage.getItem('userDetails')
                const userDetails = JSON.parse(details)
                setToken(accessToken);
                setID(userDetails._id);
                setEmail(userDetails.email);
                setPhone(userDetails.phone);
            } catch (error) {
                console.error('error', error)
            }

        })()
    }, [])


    const removeFormData = async () => {
        try {
            await AsyncStorage.removeItem('name');
            await AsyncStorage.removeItem('about');
            await AsyncStorage.removeItem('socialLinks');
            await AsyncStorage.removeItem('country');
            await AsyncStorage.removeItem('state');
            await AsyncStorage.removeItem('city');
            await AsyncStorage.removeItem('postalCode');
            await AsyncStorage.removeItem('street');
            await AsyncStorage.removeItem('lng');
            await AsyncStorage.removeItem('lat');
            await AsyncStorage.removeItem('itemList');
            await AsyncStorage.removeItem('itemListed');
            await AsyncStorage.removeItem('itemList');
            await AsyncStorage.removeItem('Cover Image');
            await AsyncStorage.removeItem('Poojari Image');
            await AsyncStorage.removeItem('videoTitle');
            await AsyncStorage.removeItem('videoLink');
            await AsyncStorage.removeItem('Pooja 1');
            await AsyncStorage.removeItem('Pooja 1 Image');
            await AsyncStorage.removeItem('Pooja 2');
            await AsyncStorage.removeItem('Pooja 2 Image');
            await AsyncStorage.removeItem('Pooja 3');
            await AsyncStorage.removeItem('Pooja 3 Image');
            await AsyncStorage.removeItem('associatedTemple');

            return true;
        } catch (exception) {
            return false;
        }
    };


    const submitCreatePoojariForm = async () => {
        try {
            //step 1
            const gettingUserName = await AsyncStorage.getItem('name');
            const gettingAboutName = await AsyncStorage.getItem('about');
            const socialLinks = await AsyncStorage.getItem('socialLinks')

            const links = JSON.parse(socialLinks)

            const socials = {
                facebook: links.facebook,
                twitter: links.twitter,
                linkedin: links.linkedin,
                whatsapp: links.whatsapp
            }

            //Step 2
            const gettingCountry = await AsyncStorage.getItem('country');
            const gettingState = await AsyncStorage.getItem('state');
            const gettingCity = await AsyncStorage.getItem('city');
            const gettingPostalCode = await AsyncStorage.getItem('postalCode');
            const gettingSteert = await AsyncStorage.getItem('street');
            const getLng = await AsyncStorage.getItem('lng');
            const getLat = await AsyncStorage.getItem('lat');

            const location = {
                city: gettingCity,
                street: gettingSteert,
                state: gettingState,
                postalCode: gettingPostalCode,
                country: gettingCountry
            }

            const mapsLatLng = {
                lat: getLat,
                lng: getLng
            }

            //Step 3
            const data = await AsyncStorage.getItem('itemList')
            const output = JSON.parse(data)
            const Data = await AsyncStorage.getItem('itemListed')
            const outputData = JSON.parse(Data)
            const poojariExperience = {
                highlights: output,
                Expertise: outputData
            }

            //step 4
            const getCoverImage = await AsyncStorage.getItem('Cover Image');
            const getPoojariImage = await AsyncStorage.getItem('Poojari Image');
            console.log('getCoverImage', getCoverImage)
            const poojariImages = {
                poojariImages: [getCoverImage],
                coverImages: [getPoojariImage],
            }

            //Step 5
            const getVideoTitle = await AsyncStorage.getItem('videoTitle');
            const getVideoLink = await AsyncStorage.getItem('videoLink');


            const poojariVideos = {
                title: getVideoTitle,
                video: getVideoLink
            }

            //Step 6
            const education = await AsyncStorage.getItem('itemList')
            const educationDetail = JSON.parse(education)

            const educationDetails = {
                details: educationDetail,
            }


            //Step 7
            const getPooja1 = await AsyncStorage.getItem('Pooja 1');
            const getPooja1Image = await AsyncStorage.getItem('Pooja 1 Image');
            const getPooja2 = await AsyncStorage.getItem('Pooja 2');
            const getPooja2Image = await AsyncStorage.getItem('Pooja 2 Image');
            const getPooja3 = await AsyncStorage.getItem('Pooja 3');
            const getPooja3Image = await AsyncStorage.getItem('Pooja 3 Image');

            const pooja1Output = JSON.parse(getPooja1)
            const pooja2Output = JSON.parse(getPooja2)
            const pooja3Output = JSON.parse(getPooja3)

            // const Image1 = JSON.parse(getPooja1Image);
            // const Image2 = JSON.parse(getPooja2Image);
            // const Image3 = JSON.parse(getPooja3Image);

            const poojaList = [
                {
                    title: pooja1Output?.title,
                    poojaImage: getPooja1Image,
                    poojaDescription: pooja1Output?.poojaDescription
                },
                {
                    title: pooja2Output?.title,
                    poojaImage: getPooja2Image,
                    poojaDescription: pooja2Output?.poojaDescription
                },
                {
                    title: pooja3Output?.title,
                    poojaImage: getPooja3,
                    poojaDescription: pooja3Output?.poojaDescription
                }
            ]
            //step 8
            const associatedTemple = await AsyncStorage.getItem('associatedTemple')

            const finalData = {
                id: _id,
                name: gettingUserName,
                about: gettingAboutName,
                socials: socials,
                location: location,
                poojariExperience: poojariExperience,
                poojariVideos: poojariVideos,
                poojariImages: poojariImages,
                poojaList: poojaList,
                mapsLatLng: mapsLatLng,
                educationDetails: educationDetails,
                associatedTemple: associatedTemple,
                createdBy: {
                    poojariEmail: email,
                    poojariPhone: phone
                },
            }
            console.log('finalData', finalData)

            const response = await UserApi.post('/poojari/add-details', finalData,
                {
                    headers: {
                        Authorization: `bearer ${token}`,
                        Accept: "application/json"
                    }
                }
            )
            console.log('response', response)

            if (response.data.status === 201) {
                alert(response.data.message)
                setTimeout(async () => {
                    await removeFormData()
                    props.navigation.navigate('searchpoojarilist')
                }, 3000);
            } else if (response.data.status === 409) {
                await removeFormData()
                alert('Pujari Already Created!')
                props.navigation.navigate('dashboard')
            } else {
                alert('Pujari not Created! try again')
                await removeFormData()
                props.navigation.navigate('createPoojari')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onCancleClick = async () => {
        await removeFormData()
        props.navigation.navigate('dashboard')
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
            <ScrollView style={{ marginHorizontal: '5%' }}>
                <View>
                    <Text style={[styles.mainTitleText2, styles.textEarthyRed]}>Excellent, congratulations on completing the listing, It is waiting to be reviewed for publication.</Text>
                    <Text style={[styles.mainTitleText22, styles.textEarthyRed]}>This is your listing</Text>
                </View>


                <View style={{ marginTop: '6%' }} >
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={{
                                uri: `${BASE_URL_APP}/files/${poojariImage}`,
                            }}
                            style={{ width: '100%', height: 250 }}
                        />
                    </View>
                    <Card style={{ backgroundColor: '#fff', padding: '5%', bottom: 40, marginHorizontal: '11%', width: '80%' }} >
                        <Text style={[styles.mainTitleText222, styles.textEarthyRed]} >{name}</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}  >
                                <Ionicons name={'location-outline'} color={'#808080'} size={20} />
                                <Text style={{ color: '#DB4242', textAlign: 'center', fontSize: 16, fontWeight: '500' }}>{city}, {state}, {country}</Text>
                            </View>
                        </View>

                    </Card>
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: '5%' }}>
                <TouchableOpacity onPress={() => onCancleClick()} >
                    <View style={{ backgroundColor: '#62354a', padding: '7%', borderRadius: 5 }} >
                        <Text style={[styles.mainTitleText2222, styles.textEarthywhite]} >Cancel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={submitCreatePoojariForm}  >
                    <View style={{ backgroundColor: '#db4242', padding: '5%', borderRadius: 5 }} >
                        <Text style={[styles.mainTitleText2222, styles.textEarthywhite]}>Publish Listing</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textEarthyRed: {
        color: '#62354a',
    },
    textEarthywhite: {
        color: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        color: "#ffffff",
        fontFamily: 'Montserrat-Bold'
    },
    mainTitleText2: {
        fontSize: 15,
        color: '#000',
        fontFamily: 'Montserrat-Bold',
        marginTop: '10%'
    },
    mainTitleText22: {
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
        marginTop: '4%'
    },
    mainTitleText222: {
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
        paddingRight: "30%"
    },
    mainTitleText2222: {
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    },
    mainHeaderOuter: {
        paddingTop: 20,
        paddingBottom: 5,
        backgroundColor: '#db4242',
    },
    paddingLeft: {
        paddingRight: '25%'
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
});
export default reviewPublic