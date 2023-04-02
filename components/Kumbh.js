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

const Kumbh = (props) => {

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
                    <Text style={styles.headerTitle}>Maha Kumbh</Text>
                </LinearGradient>
            </View>
            <ScrollView contentContainerStyle={styles.outerContainer}>
                <View style={styles.mainBoxOuter}>
                    <View style={styles.mainBody}>

                        <Image source={require('../img/kumbhBG.jpg')} style={{ width: '100%', height: 130, marginBottom: 10 }} />

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="om" size={18} color="#db4242" />
                            <Text style={styles.heading}>POST</Text>
                        </View>

                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.mainHeading}>
                                Maha Kumbh
                            </Text>
                        </View>

                        <Text style={styles.text}>
                            Legend has it that in the mythological times, during a waging war between the demigods and demons for the possession of elixir of eternal life, a few drops of it had fallen on to four places that are today known as Prayag, Haridwar, Ujjain, and Nasik. It is believed that these drops gave mystical powers to these places. It is to make oneself gain on those powers that Kumbh Mela has been celebrated in each of the four places since long as one can remember.
                        </Text>

                        <Text style={styles.textHeading}>
                            Kumbh Mela at Allahabad
                        </Text>

                        <Text style={styles.text}>
                            when Jupiter is in Aries or Taurus and Sun and Moon are in Capricorn during the Hindu month of Magha (January-February).
                        </Text>

                        <Text style={styles.textHeading}>
                            Kumbh Mela at Haridwar
                        </Text>

                        <Text style={styles.text}>
                            when Jupiter is in Aquarius and Sun is in Aries during the Hindu month of Chaitra (March-April).
                        </Text>

                        <Text style={styles.textHeading}>
                            Kumbh Mela at Ujjain
                        </Text>

                        <Text style={styles.text}>
                            when Jupiter is in Leo and Sun is in Aries, or when all three are in Libra during the Hindu month of Vaisakha (April-May).
                        </Text>

                        <Text style={styles.textHeading}>
                            Kumbh Mela at Nasik
                        </Text>

                        <Text style={styles.text}>
                            when Sun and Jupiter are in Leo during the Hindu month of Bhadraprada (August-September).
                        </Text>

                        <Text style={styles.text}>
                            The next Maha Kumbh Mela is set to be held in the city of Allahabad (Prayag) in the year 2025.
                        </Text>

                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.mainHeading}>
                                Maha Kumbh:
                            </Text>
                        </View>

                        <Image source={require('../img/KumbhMelaOne.jpg')} style={styles.kumbhImages} />

                        <Image source={require('../img/KumbhMelaTwo.jpg')} style={styles.kumbhImages} />

                        <Image source={require('../img/KumbhMelaThree.jpg')} style={styles.kumbhImages} />

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
    textHeading: {
        color: '#000', fontSize: 17, marginVertical: 5, fontWeight: 'bold'
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
    kumbhImages: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 10
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

export default Kumbh;