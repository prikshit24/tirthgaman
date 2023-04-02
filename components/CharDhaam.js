import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Button,
    Alert,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CharDhaam = (props) => {

    const [token, setToken] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                setToken(token)
            } catch (error) {
            }
        })();
    }, [])

    const onTripClick = () => {
        if (props.token !== null && props.token !== '' && props.token !== undefined) {
            props.navigation.navigate('holyTour')
        } else {
            props.navigation.navigate('login')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <View>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#db4242', '#db4242']}
                    style={styles.mainHeader}>
                    <View style={styles.backMenuDiv}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => { props.navigation.navigate('dashboard') }}>
                            <Image source={require('../img/rightArrow1.jpg')} style={[styles.arrowBtn, styles.arrowBtnLight]} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerTitle}>Char Dhaam</Text>
                </LinearGradient>
            </View>
            <ScrollView contentContainerStyle={styles.outerContainer}>
                <View style={styles.mainBoxOuter}>
                    <View style={styles.mainBody}>

                        <Image source={require('../img/CharDham.jpg')} style={{ width: '100%', height: 130, marginBottom: 10 }} />

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="om" size={18} color="#db4242" />
                            <Text style={styles.heading}>POST</Text>
                        </View>

                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.mainHeading}>
                                Char Dhaam is a set of 4 pilgrimage hindu sites in India.
                            </Text>
                        </View>

                        <Text style={styles.text}>
                            It's situated in the Uttarakhand state, which is called the Devbhumi(Land of Gods) in India. The three main classes in the classic division of Indian society are the Brahmans, the warriors, and the commoners. The Brahmans, whatever their worldly avocations, claim to have by virtue of their birth the authority to teach the Veda, perform ritual sacrifices for others, and accept gifts and subsistence. The term alms is misleading; the dakshina offered at the end of a rite to a Brahman officiant is not a fee but an oblation through which the rite is made complete.
                        </Text>

                        <Text style={styles.text}>
                            It settles among the serene heights of the great Himalayas are 4 pilgrim destinations namely Yamunotri, Gangotri, Kedarnath and Badrinath. These collectively called as Char Dhaam. The Char Dhaam yatra starts from Yamunotri, then proceeding to Gangotri, and finally to Kedarnath and Badrinath.
                        </Text>

                        <View style={styles.bellImgContainer}>
                            <Image source={require('../img/bellImg.png')} style={{ width: 300, height: 300 }} />
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="om" size={18} color="#db4242" />
                            <Text style={styles.heading}>BENEFITS</Text>
                        </View>

                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.mainHeading}>
                                Each of these four sites is devoted to a specific IshtDev.
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: '#fff5ed',
                            padding: '4%',
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: '#f6e0ce'
                        }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Image source={require('../img/CrcleTick.png')} style={[styles.landLodImg2]} />
                                <Text style={styles.text}>
                                    <Text style={{ fontWeight: 'bold' }}>Yamunotri</Text> is dedicated to the Goddess Yamuna. It is believed that a bath in the waters of the Yamuna protects the devotee from untimely death.
                                </Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Image source={require('../img/CrcleTick.png')} style={[styles.landLodImg2]} />
                                <Text style={styles.text}>
                                    <Text style={{ fontWeight: 'bold' }}>Gangotri</Text> is dedicated to the Goddess Ganga. The name of River Ganga – been derived from the myth of the ancient King Bhagirath’s penance that succeeded in bringing her upon the earth from the heaven.
                                </Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Image source={require('../img/CrcleTick.png')} style={[styles.landLodImg2]} />
                                <Text style={styles.text}>
                                    <Text style={{ fontWeight: 'bold' }}>Kedarnath</Text> is dedicated to Lord Shiva and is also a part of the Panch Kedar. It is the northernmost Jyotirlinga and is close to the source of the holy River Mandakini.
                                </Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Image source={require('../img/CrcleTick.png')} style={[styles.landLodImg2]} />
                                <Text style={styles.text}>
                                    <Text style={{ fontWeight: 'bold' }}>Badrinath</Text> is dedicated to Lord Vishnu. It is situated on the bank of the River Alaknanda. According to legend, Lord Vishnu meditated here while his consort Lakshmi took the form of a berry (Badri) tree to offer him shades.
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.text}>
                            <Text style={{ fontWeight: 'bold' }}>How to reach Yamunotri</Text> : Yamunotri, the source of Yamuna river is the 1st stop in Char Dhaam yatra. Go via road(bus/taxi) from Dehradun or Haridwar to reach Janki Chatti. Trek 5 kms from here to reach yamunotri.
                        </Text>

                        <Text style={styles.text}>
                            <Text style={{ fontWeight: 'bold' }}>How to reach Gangotri</Text> : It's a well connected road from Haridwar to Gangotri. Book a taxi/cab.
                        </Text>

                        <Text style={styles.text}>
                            <Text style={{ fontWeight: 'bold' }}>How to reach Kedarnath</Text> : This temple is dedicated to Lord Shiva. It's one of the revered char dhaams, bus/cab transport services from Haridwar to reach Gauri Kund(starting point of trek to Kedarnath ji dham). Helicopter(Chopper) services also available to Kedarnath ji dham.
                        </Text>

                        <Text style={styles.text}>
                            <Text style={{ fontWeight: 'bold' }}>How to reach Badrinath</Text> : Badrinath is one of the most revered Char Dhaam, it's abode of Lord Vishnu. Roadways(Buses/Taxi) available from Haridwar and Hrishikesh to Badrinath.
                        </Text>

                        <View style={styles.btnContaoner}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => onTripClick()}
                            >
                                <Text
                                    style={{ color: '#fff', fontSize: 15 }}
                                >
                                    LET'S PLAN YOUR TRIP
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
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
    backBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#fff'
    },
    arrowBtnLight: {
        height: 19,
        width: 10,
    },
    headerTitle: {
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'Montserrat-Bold',
    },
    outerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#ffffff',
        position: 'relative',
        //minHeight: '100%',
        fontFamily: 'Montserrat-Regular',
    },
    mainBoxOuter: {
        flex: 1,
    },
    mainBody: {
        padding: '3%'
    },
    heading: {
        fontSize: 15,
        color: '#633549',
        fontWeight: '500',
        marginLeft: 10
    },
    mainHeading: {
        fontSize: 22,
        color: '#db4242',
        fontWeight: '500',
    },
    text: {
        color: '#000', fontSize: 15, marginVertical: 5, maxWidth: '95%'
    },
    bellImgContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: '100%',
        marginVertical: 15
    },
    landLodImg2: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
        marginTop: 8
        // marginTop: 8,
    },
    btnContaoner: {
        flexDirection: 'row', justifyContent: 'center', width: '100%', paddingVertical: '2%'
    },
    btn: {
        width: '70%',
        height: 50,
        borderRadius: 25,
        backgroundColor: '#db4242',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CharDhaam;