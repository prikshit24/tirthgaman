import React, { useState } from 'react'
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
    FlatList,
} from 'react-native';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import somnath from '../img/somnath.jpeg';
import Nageshwar from '../img/nageshvara-jyotirlinga.jpg';
import Bhimashankar from '../img/bhimaShankar.jpg';
import Trimbakeshwar from '../img/Trimbakeshwar-Jyotirlinga.jpg';
import Grishneshwar from '../img/grishneshwar-temple-scaled.jpg';
import Vaidyanath from '../img/Vaidyanath.jpg';
import Mahakaleshwar from '../img/Mahakaleshwar.jpg';
import Omkareshwar from '../img/Omkareshwar.jpg';
import Kashi_Vishwanath from '../img/kashi_vishwanath_jyotirling.jpg';
import Kedarnath from '../img/kedarnath.jpg';
import Rameshwaram from '../img/rameshwaram.jpg';
import MalikaArjun from '../img/MalikaArjun.jpg';
import { useEffect } from 'react';

const jyotirlinga = [
    { img: somnath, name: 'Somnath', location: 'Gir Somnath In Gujarat' },
    { img: Nageshwar, name: 'Nageshwar', location: 'Daarukavanam In Gujarat' },
    { img: Bhimashankar, name: 'Bhimashankar', location: 'Pune In Maharashtra' },
    { img: Trimbakeshwar, name: 'Trimbakeshwar', location: 'Nashik In Maharashtra' },
    { img: Grishneshwar, name: 'Grishneshwar', location: 'Aurangabad In Maharashtra' },
    { img: Vaidyanath, name: 'Vaidyanath', location: 'Deoghar In Jharkhand' },
    { img: Mahakaleshwar, name: 'Mahakaleshwar', location: 'Ujjain In Madhya Pradesh' },
    { img: Omkareshwar, name: 'Omkareshwar', location: 'Khandwa In Madhya Pradesh' },
    { img: Kashi_Vishwanath, name: 'Kashi Vishwanath', location: 'Varanasi In Uttar Pradesh' },
    { img: Kedarnath, name: 'Kedarnath', location: 'Kedarnath In Uttarakhand' },
    { img: Rameshwaram, name: 'Rameshwaram', location: 'Rameswaram Island In Tamil Nadu' },
    { img: MalikaArjun, name: 'Mallikarjuna', location: 'Srisailam In Andhra Pradesh' },
]

const renderItemData = ({ item, index }) => {
    return (
        <View style={{ position: 'relative', marginTop: 10, shadowOffset: 5, shadowColor: '#707070' }}>
            <ImageBackground source={item.img} style={{ height: 150 }} />
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5%' }}>
                <Text style={{ color: '#633549', fontSize: 20 }}>{item.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name={'location-outline'} color={'#707070'} size={20} />
                    <Text style={{ color: '#db4242', fontSize: 18 }}>{item.location}</Text>
                </View>
            </View>
        </View>
    )
}



const Jyotirlinga = (props) => {

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
                    <Text style={styles.headerTitle}>12 Jyotirlinga</Text>
                </LinearGradient>
            </View>
            <ScrollView contentContainerStyle={styles.outerContainer}>
                <View style={styles.mainBoxOuter}>
                    <View style={styles.mainBody}>

                        <Image source={require('../img/jyotilingBG.jpg')} style={{ width: '100%', height: 140, marginBottom: 10, }} />

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="om" size={18} color="#db4242" />
                            <Text style={styles.heading}>POST</Text>
                        </View>

                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.mainHeading}>
                                There are 12 Jyotirlingas in India, which are temples of Lord Shiva.
                            </Text>
                        </View>

                        <Text style={styles.text}>
                            "Jyotirlinga" word comes from word "jyoti" which means light/radiance and "linga" means phallus. These are considered different manifestations of Shiva.
                        </Text>

                        <Text style={styles.text}>
                            Jyotirlinga is a manifestation of every different form of Lord Shiva and there are twelve such Shiva Jyotirlingas across India. Devotees of Lord Shiva consider visiting these Jyotirlingas to be very auspicious as every temple is known for its supreme powers of Shiva. You can find the 12 Jyotirling names and place list below:
                        </Text>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="om" size={18} color="#db4242" />
                            <Text style={styles.heading}>LIST OF 12 JYOTIRLINGAS</Text>
                        </View>

                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.mainHeading}>
                                Each of these four sites is devoted to a specific IshtDev.
                            </Text>
                        </View>

                        <FlatList
                            keyExtractor={item => item.id}
                            data={jyotirlinga}
                            renderItem={(item, index) => renderItemData(item, index)}
                        />

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

export default Jyotirlinga;