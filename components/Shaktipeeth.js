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
    FlatList,
} from 'react-native';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const shaktipeeth = [
    { place: 'KanchiPuram, Kamatchi temple', body: 'Ottiyana (Ornament covering stomach)', shakti: 'Kamakshi', bhairav: 'Kala Bhairav' },
    { place: 'KanchiPuram, Kamatchi temple', body: 'Hand', shakti: 'Indrakshi / Nagapooshani', bhairav: 'Rakshaseshwar / Naayanar' },
    { place: 'Shivaharkaray Naina, Sukkur Station, Karachi, Pakistan', body: 'Eyes', shakti: 'Shakti Mahishmardini', bhairav: 'Krodhish' },
    { place: 'Sugandha, Gournadi, Barisal town, Bangladesh, on the banks of Sonda river', body: 'Nose', shakti: 'Shakti Sunanda', bhairav: 'Trayambak' },
    { place: 'Amarnath temple, Kashmir, India', body: 'Throat', shakti: 'Shakti Mahamaya', bhairav: 'Trisandhyeshwar' },
    { place: 'Jwalamukhi, Kangra, near Pathankot, H.P.', body: 'Tongue', shakti: 'Shakti Siddhida (Ambika)', bhairav: 'Unmatta Bhairav' },
    { place: 'Ambaji temple, Anart, Gujarat, India', body: 'Heart', shakti: 'Ambaji', bhairav: '' },
    { place: 'Pashupatinath Temple at Gujyeshwari Temple, Nepal', body: 'Both Knees', shakti: 'Mahashira', bhairav: 'Kapali' },
    { place: 'Manas, under Tibet at the feet of Mount Kailash in Lake Mansarovar', body: 'Right Hand', shakti: 'Dakshayani', bhairav: 'Amar' },
    { place: 'Biraja in Utkal present Orissa, India', body: 'Navel', shakti: 'Girija/Viraja/Biraja', bhairav: 'Jagannath' },
    { place: 'Gandaki, Pokhara, Nepal, on the banks of Gandaki river', body: 'Temple', shakti: 'Gandaki Chandi', bhairav: 'Chakrapani' },
    { place: 'Bahula, on the banks of Ajay river, Ketugram, Katwa, Bardhaman, West Bengal', body: 'Left Arm', shakti: 'Goddess Bahula', bhairav: 'Bhiruk' },
    { place: 'Ujaani, Guskara Station, Bardhaman, West Bengal', body: 'Right Wrist', shakti: 'Mangal Chandika', bhairav: 'Kapilambar' },
    { place: 'Tripura Sundari temple, Udaipur, Tripura', body: 'Right Leg', shakti: 'Tripura Sundari', bhairav: 'Tripuresh' },
    { place: 'The famous Chandranath Temple, Sitakunda station, Chuttagong, Bangladesh', body: 'Right Arm', shakti: 'Bhawani', bhairav: 'Chandrashekhar' },
    { place: 'Bhramari Devi, Salbari village under Boda division of Jalpaiguri district, West Bengal', body: 'Left Leg', shakti: 'Bhraamari', bhairav: 'Ambar' },
    { place: 'Kamgiri, Kamakhya, Guwahati, Assam', body: 'Genital Organ', shakti: 'Kamakhya', bhairav: 'Umanand' },
    { place: 'Yoga adya, Khirgram under Bardhaman district, West Bengal', body: 'Great Toe (Right)', shakti: 'Jugaadya', bhairav: 'Ksheer Khandak' },
    { place: 'Kalipeeth temple,Kalighat, Kolkata), West Bengal', body: 'Right Toes', shakti: 'Kalika', bhairav: 'Nakuleshwar' },
    { place: 'Alopi devi mandir, Prayag, Sangam, Allahabad, Uttar Pradesh', body: 'Finger (Hand)', shakti: 'Madhaveswari', bhairav: 'Bhava' },
    { place: 'Nartiang Durga Temple, Jayanti hills, Meghalaya', body: 'Left Thigh', shakti: 'Jayanti', bhairav: 'Kramadishwar' },
    { place: 'Kireet at Kireetkona village, Lalbag Court Road station, Murshidabad, West Bengal', body: 'Crown', shakti: 'Vimla', bhairav: 'Sanwart' }, //22
    { place: 'Varanasi at Manikarnika Ghat on banks of Ganga at Kashi, Uttar Pradesh', body: 'Earring', shakti: 'Vishalakshi & Manikarni', bhairav: 'Kalbhairav' },
    { place: 'Bhadrakali temple, Kanyashram, Kanyakumari, Tamil Nadu', body: 'Back', shakti: 'Sarvani', bhairav: 'Nimish' },
    { place: 'Kurukshetra town or Thanesar ancient Sthaneshwar, at Haryana', body: 'Ankle Bone', shakti: 'Savitri', bhairav: 'Bhadra KaliSthanu' },
    { place: 'Manibandh, at Gayatri hills, Pushkar, Ajmer, Rajasthan', body: 'Two Bracelets', shakti: 'Gayatri', bhairav: 'Sarvanand' },
    { place: 'Shri Shail, Jainpur village, near Gotatikar, Sylhet town, Bangladesh', body: 'Neck', shakti: 'Mahalaxmi', bhairav: 'Sambaranand' },
    { place: 'Devi locally known as Kankaleshwari, Kankalitala, on the banks of Kopai river, Bolpur station of district Birbhum, West Bengal', body: 'Bone', shakti: 'Devgarbha', bhairav: 'Ruru' },
    { place: 'Kalmadhav on the banks of Shon river, Amarkantak, Madhya Pradesh', body: 'Buttock (Left)', shakti: 'Kali', bhairav: 'Asitang' },
    { place: 'Shondesh, at the source point of Narmada river in Amarkantak, Madhya Pradesh', body: 'Buttock (Right)', shakti: 'Narmada', bhairav: 'Bhadrasen' },
    { place: 'Ramgiri, at Chitrakuta , Jhansi Manikpur road, Uttar Pradesh', body: 'Right Breast', shakti: 'Shivani', bhairav: 'Chanda' },
    { place: 'Vrindavan, near new bus stand on Bhuteshwar road within Bhuteshwar Mahadev Temple, Vrindavan, Uttar Pradesh, India', body: 'Ringlets of Hair', shakti: 'Uma', bhairav: 'Bhutesh' },
    { place: 'Shuchi, in a Shiva temple at Shuchitirtham, Kanyakumari, Trivandrum road, Tamil Nadu', body: 'Teeth (Upper Jaw)', shakti: 'Narayani', bhairav: 'Sanhar' },
    { place: 'Panchsagar place, near Haridwar, Uttarakhand', body: 'Teeth (Lower Jaw)', shakti: 'Varahi', bhairav: 'Maharudra' },
    { place: 'Bhavanipur union, at Karatoyatat, Sherpur upazila, Bogra District, Bangladesh', body: 'Left Anklet (Ornament)', shakti: 'Arpana', bhairav: 'Vaman' },
    { place: 'Shri Parvat, near Ladakh, Kashmir. Another belief at Srisailam in Shriparvat hills under Karnool district, Andhra Pradesh', body: 'Right Anklet (Ornament)', shakti: 'Shrisundari', bhairav: 'Sundaranand' },
    { place: 'Vibhash, at Tamluk, Purba Medinipur, West Bengal', body: 'Left Ankle', shakti: 'Kapalini (Bhimarupa)', bhairav: 'Sarvanand' },
    { place: 'Prabhas, Veraval station near Somnath temple in Junagadh, Gujarat', body: 'Stomach', shakti: 'Chandrabhaga', bhairav: 'Vakratund' },
    { place: 'Bhairavparvat, at Bhairav hills on the banks of Shipra river, Ujjaini town, Madhya Pradesh', body: 'Upper Lips', shakti: 'Avanti', bhairav: 'Lambkarna' },
    { place: 'Goddess Saptashrungi (Goddess with 18 arms), at Vani in Nasik, Maharashtra', body: 'Chin (Two Parts)', shakti: 'Bhramari', bhairav: 'Vikritaksh' },
    { place: 'Sarvashail or Godavaritir, at Kotilingeswar temple, Rajamundry, Andhra Pradesh', body: 'Cheeks', shakti: 'Rakini or Vishweshwari', bhairav: 'Vatsnabh or Dandpani' },
    { place: 'Viirat, near Bharatpur, Rajasthan', body: 'Left Feet Fingers', shakti: 'Ambika', bhairav: 'Amriteshwar' },
    { place: 'Anandamayee Temple. Ratnavali, Khanakul-Krishnanagar, Hooghly, West Bengal', body: 'Right Shoulder', shakti: 'Kumari', bhairav: 'Shiva' },
    { place: 'Mithila, Janakpur Railway station on the border of India-Nepal', body: 'Left Shoulder', shakti: 'Uma', bhairav: 'Mahodar' },
    { place: 'Nalhati, known as "Nalateshwari Temple" near Nalhati station, Birbhum district, West Bengal', body: 'Tubular Bones of the Feet', shakti: 'Kalika Devi', bhairav: 'Yogesh' },
    { place: 'Karnat, Kangra, Himachal pradesh', body: 'Both Ears', shakti: 'Jayadurga', bhairav: 'Abhiru' },
    { place: 'Bakreshwar, Suri Town, Birbhum, West Bengal', body: 'Portion between the eyebrows	', shakti: 'Mahishmardini', bhairav: 'Vakranath' },
    { place: 'Jessoreswari, situated at Ishwaripur, Shyamnagar, district Satkhira, Bangladesh.', body: 'Palms of Hands & Feet', shakti: 'Jashoreshwari', bhairav: 'Chanda' },
    { place: 'Attahas village, Dakshindihi, Bardhaman, near the Katwa Rail Station, West Bengal', body: 'Lips', shakti: 'Phullara', bhairav: 'Vishvesh' },
    { place: 'Sainthia, locally Known as "Nandikeshwari" temple. Sainthia Town, Birbhum district, West Bengal', body: 'Necklace', shakti: 'Nandini', bhairav: 'Nandikeshwar' },
    { place: "Hingula (Hinglaj) Devi's mind or brain fell here. At southern Baluchistan, Karachi, Pakistan.", body: 'Bramharandhra (Part of the head)', shakti: 'Kottari', bhairav: 'Bhimlochan' },
    { place: 'Danteshwari ( Kuldevi Of Baster State ), Dantewada Baster, Jagdalpur tehsil, Chhattisgarh	', body: 'Daant (Teeth)', shakti: 'Danteshwari', bhairav: 'Kapalbhairv' },
]

const renderItemData = ({ item, index }) => {
    return (
        <View style={styles.containerWrapper}>
            <View style={styles.header}>
                <Text style={styles.tableText}>#{index + 1}</Text>
            </View>
            <View style={[styles.formGroupDiv]}>
                <View style={styles.formGroupNew}>
                    <Text style={styles.tableTextHeading}>Place:</Text>
                    <Text style={styles.tableText}>
                        {item.place}
                    </Text>
                </View>
                <View style={styles.formGroupNew}>
                    <Text style={styles.tableTextHeading}>Body Part/Ornament :</Text>
                    <Text style={styles.tableText}>
                        {item.body}
                    </Text>
                </View>
                <View style={styles.formGroupNew}>
                    <Text style={styles.tableTextHeading}>Shakti</Text>
                    <Text style={styles.tableText}>
                        {item.shakti}
                    </Text>
                </View>
                <View style={styles.formGroupNew}>
                    <Text style={styles.tableTextHeading}>Bhairav</Text>
                    <Text style={styles.tableText}>
                        {item.bhairav}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const Shaktipeeth = (props) => {



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
                    <Text style={styles.headerTitle}>52 ShaktiPeeth</Text>
                </LinearGradient>
            </View>
            <ScrollView contentContainerStyle={styles.outerContainer}>
                <View style={styles.mainBoxOuter}>
                    <View style={styles.mainBody}>

                        <Image source={require('../img/shaktiBg.jpg')} style={{ width: '100%', height: 130, marginBottom: 10 }} />

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="om" size={18} color="#db4242" />
                            <Text style={styles.heading}>POST</Text>
                        </View>

                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.mainHeading}>
                                52 shaktipeeths of Maa Parvati
                            </Text>
                        </View>

                        <Text style={styles.text}>
                            The Shakti peethas are places of worship of Goddess. Goddess Sati is the incarnation of Maa Parvati, the kindly goddess of harmony, marital felicity and longeivty, with Durga, goddess of strength and valour, and with mahakali, goddess of destruction of the evil.
                        </Text>

                        <Text style={styles.text}>
                            All shakti peetha are accompanied by Lord Bhairava(a manifestation of Lord Shiva)
                        </Text>

                        {/* <View style={styles.bellImgContainer}>
                            <Image source={require('../img/bellImg.png')} style={{ width: 300, height: 300 }} />
                        </View> */}

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name="om" size={18} color="#db4242" />
                            <Text style={styles.heading}>LIST OF 52 SHAKTIPEETHS</Text>
                        </View>

                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.mainHeading}>
                                52 Shaktipeeths
                            </Text>
                        </View>

                        <FlatList
                            keyExtractor={item => item.id}
                            data={shaktipeeth}
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
    containerWrapper: {
        backgroundColor: '#fff5ed',
        padding: '4%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#f6e0ce',
        marginVertical: 5
    },
    header: {
        borderBottomColor: '#f6e0ce',
        paddingbottom: '4%',
        borderBottomWidth: 2
    },
    formGroupNew: {
        marginVertical: 5
    },
    tableText: {
        color: '#000',
    },
    tableTextHeading: {
        color: '#000',
        fontWeight: 'bold',
    },
    btnContaoner: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: '2%'
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

export default Shaktipeeth;