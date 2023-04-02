import React, { useState } from 'react';
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
    ActivityIndicator,
} from 'react-native';
import {
    otpValidate,
    signupValidateCPassword,
    signupValidateEmail,
    signupValidateFirst,
    signupValidateLast,
    signupValidatePassword,
} from '../helperFunctions/Validations/SignUpValidation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserApi from '../Axios/UserApi';
import OTPTextView from 'react-native-otp-textinput';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const RequiredData = (props) => {

    console.log('props from required data ==>>', props);

    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [passwordSecure, setPasswordSecure] = useState(true);
    const [loading, setLoading] = useState(false);
    const [signUpInFo, setSignUpInfo] = useState({
        role: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: 0,
        password: '',
        confirmPassword: '',
        otp: '',
    });
    const [errors, setErrors] = useState({
        isFirst: true,
        isLast: true,
        isEmail: true,
        isPassword: true,
        isCPassword: true,
        isOTP: true,
    });

    console.log('Check for error', errors);
    console.log('signUpInFo', signUpInFo);


    const handleClick = async () => {
        const isFirst = signupValidateFirst(signUpInFo.firstname);
        const isLast = signupValidateLast(signUpInFo.lastname);
        const isEmail = signupValidateEmail(signUpInFo.email);
        const isPassword = signupValidatePassword(signUpInFo.password);
        const isCPassword = signupValidateCPassword(signUpInFo);
        const isOTP = otpValidate(props.otp)
        setErrors({
            ...errors,
            isFirst: isFirst,
            isLast: isLast,
            isEmail: isEmail,
            isPassword: isPassword,
            isCPassword: isCPassword,
            isOTP: isOTP
        });
        console.log('error', errors);
        if (
            isFirst &&
            isLast &&
            isEmail &&
            isPassword &&
            isCPassword
        ) {
            const data = {
                role: props.data.role,
                firstname: signUpInFo.firstname,
                lastname: signUpInFo.lastname,
                email: signUpInFo.email,
                password: signUpInFo.password,
                confirmPassword: signUpInFo.confirmPassword,
                otp_id: props.otp_id
            }
            console.log('DATA', data)
            try {
                setLoading(true)
                const userResponse = await UserApi.post('signup/mobileSignUp', data);
                console.log('USER response in Signup =>', userResponse)
                if (userResponse?.data?.status === 200) {
                    const { id, role } = jwtDecode(userResponse?.data?.accessToken);
                    const res = await UserApi.post(`${role}/user-info`, { id });
                    console.log('res', res)
                    if (res.data?.user) {
                        await AsyncStorage.setItem(
                            'userDetails',
                            JSON.stringify(res?.data?.user),
                        );
                        await AsyncStorage.setItem(
                            'accessToken',
                            userResponse.data.accessToken,
                        );
                        alert("SignedUp & Logged in successfully !");
                        props.navigation.navigate('dashboard', { token: userResponse.data.accessToken });
                        setLoading(false)
                        setSignUpInfo('');
                        // setPhone('');
                        // setOTP('');
                    }
                } else {
                    alert(userResponse?.data?.message);
                    setLoading(false);
                }
            } catch (error) {
                console.log('OTP response error', error);
                alert(error.response?.data?.message);
                setLoading(false)
            }
        }
    };

    const onReSend = async () => {
        try {
            const data = {
                mobileNumber: Number(signUpInFo.phone),
                role: signUpInFo.role,
            };
            const otpApiHit = await UserApi.post(`signUp/VerfyMobile`, data);
            console.log('otp API hit ==>', otpApiHit);

            if (otpApiHit.data.status === 201) {
                alert("OTP Sent on your number");
            } else {
                alert(otpApiHit.data.message);
            }
            await AsyncStorage.setItem('otp_data', JSON.stringify(data));
        } catch (error) {
            console.log('ERROR from otp', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.outerContainer}>
            <StatusBar translucent backgroundColor="transparent" />
            <ImageBackground
                style={styles.bgImage}
                source={require('../img/login_bg01.jpg')}>
                <View style={styles.overlayColor}>
                    <View style={styles.loginOuter}>
                        <View style={styles.loginCenterDiv}>
                            <View style={styles.loginTextDiv}>
                                <Image
                                    source={require('../img/logo3.png')}
                                    style={styles.mainLogo}
                                />
                            </View>
                            <View style={styles.loginBoxOuter}>
                                <View style={styles.loginBoxInner}>
                                    <Text style={[styles.mainTitleSmall]}>Hello!</Text>
                                    <Text style={[styles.mainTitle2]}>Enter Details</Text>
                                    <View style={{ marginTop: '5%', marginRight: '4%' }}>
                                        <Text style={[styles.formLabel, styles.textEarthyRed]}>
                                            User Type : {props.data.role === 'poojari' ? 'pujari' : props.data.role}
                                        </Text>
                                    </View>
                                    <View style={[styles.signUpCatBtns]}>
                                        <View>
                                            <Text style={[styles.formLabel, styles.textEarthyRed]}>
                                                First Name
                                            </Text>
                                            <TextInput
                                                style={styles.formControl2}
                                                value={signUpInFo.firstname}
                                                onChangeText={value =>
                                                    setSignUpInfo({ ...signUpInFo, firstname: value })
                                                }
                                                placeholder="john"
                                                placeholderTextColor="#909090"
                                            />
                                            {!errors.isFirst && (
                                                <Text style={{ color: 'red', fontSize: 13 }}>
                                                    Enter First Name
                                                </Text>
                                            )}
                                        </View>
                                        <View>
                                            <Text style={[styles.formLabel, styles.textEarthyRed]}>
                                                Last Name
                                            </Text>
                                            <TextInput
                                                style={styles.formControl2}
                                                value={signUpInFo.lastname}
                                                onChangeText={value =>
                                                    setSignUpInfo({ ...signUpInFo, lastname: value })
                                                }
                                                placeholder="Doe"
                                                placeholderTextColor="#909090"
                                            />
                                            {!errors.isLast && (
                                                <Text style={{ color: 'red', fontSize: 13 }}>
                                                    Enter Last Name
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.formGroup}>
                                        <Text style={[styles.formLabel, styles.textEarthyRed]}>
                                            Email Address
                                        </Text>
                                        <TextInput
                                            style={styles.formControl}
                                            value={signUpInFo.email}
                                            onChangeText={value =>
                                                setSignUpInfo({ ...signUpInFo, email: value })
                                            }
                                            placeholder="john.doe@gmail.com"
                                            placeholderTextColor="#909090"
                                        />
                                        {!errors.isEmail && (
                                            <Text style={{ color: 'red', fontSize: 13 }}>
                                                Enter Valid Email
                                            </Text>
                                        )}
                                    </View>
                                    <View style={styles.formGroup}>
                                        <Text style={[styles.formLabel, styles.textEarthyRed]}>
                                            Phone Number
                                        </Text>
                                        <View style={styles.formGroupIcon}>
                                            <TextInput
                                                style={[styles.formControl, styles.formControlIcon]}
                                                placeholder={String(props.data.mobileNumber)}
                                                placeholderTextColor="#000"
                                                editable={false}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.formGroup}>
                                        <Text style={[styles.formLabel, styles.textEarthyRed]}>
                                            Password
                                        </Text>
                                        <View style={styles.formGroupIcon}>
                                            <TextInput
                                                style={[styles.formControl, styles.formControlIcon]}
                                                secureTextEntry={isPasswordSecure}
                                                value={signUpInFo.password}
                                                onChangeText={value =>
                                                    setSignUpInfo({ ...signUpInFo, password: value })
                                                }
                                                placeholder="Password"
                                                placeholderTextColor="#909090"
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setIsPasswordSecure(prev => !prev);
                                                }}>
                                                <FontAwesome
                                                    name={isPasswordSecure ? 'eye-slash' : 'eye'}
                                                    color={'#909090'}
                                                    size={20}
                                                    style={styles.showHideIcon}
                                                />
                                            </TouchableOpacity>
                                            {!errors.isPassword && (
                                                <Text style={{ color: 'red', fontSize: 13 }}>
                                                    Must be between 8-25 Characters and should have one
                                                    Capital Alphabet one Number and one Special Character
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.formGroup}>
                                        <Text
                                            style={[
                                                styles.formLabel,
                                                styles.textWhiteNo,
                                                styles.textEarthyRed,
                                            ]}>
                                            Confirm Password
                                        </Text>
                                        <View style={styles.formGroupIcon}>
                                            <TextInput
                                                style={[styles.formControl, styles.formControlIcon]}
                                                secureTextEntry={passwordSecure}
                                                value={signUpInFo.confirmPassword}
                                                onChangeText={value =>
                                                    setSignUpInfo({ ...signUpInFo, confirmPassword: value })
                                                }
                                                placeholder="Confirm Password"
                                                placeholderTextColor="#909090"
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setPasswordSecure(prev => !prev);
                                                }}>
                                                <FontAwesome
                                                    name={passwordSecure ? 'eye-slash' : 'eye'}
                                                    color={'#909090'}
                                                    size={20}
                                                    style={styles.showHideIcon}
                                                />
                                            </TouchableOpacity>
                                            {!errors.isCPassword && (
                                                <Text style={{ color: 'red', fontSize: 13 }}>
                                                    Confirm Password and Password are not same
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    {/* <View style={styles.formGroup}>
                                        <OTPTextView
                                            handleTextChange={value => {
                                                setSignUpInfo({ ...signUpInFo, otp: value });
                                            }}
                                            inputCount={6}
                                            containerStyle={styles.textInputContainer}
                                            textInputStyle={styles.roundedTextInput}
                                            tintColor="#9a0000"
                                            offTintColor="#e1e1e1"
                                            defaultValue=""
                                        />
                                    </View>
                                    {!errors.isOTP && (
                                        <Text style={{ color: 'red', fontSize: 13 }}>
                                            Enter Correct OTP
                                        </Text>
                                    )} */}
                                    <View style={styles.formGroup}>
                                        <TouchableOpacity
                                            style={styles.btnDefault}
                                            onPress={() => handleClick()}>
                                            <Text style={styles.TextStyle}>
                                                {loading ? (
                                                    <ActivityIndicator size="small" color="#fff" />
                                                ) : (
                                                    'Submit'
                                                )}{' '}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.loginInfoDiv} />
                        {/* <View style={styles.loginInfoDiv}>
                            <Text style={styles.whtTextColor}>Didn't Received Any Code?</Text>
                            <Text style={styles.whtLink} onPress={onReSend}>
                                {' '}
                                Resend Code
                            </Text>
                        </View> */}
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        position: 'relative',
        minHeight: '100%',
        fontFamily: 'Montserrat-Regular',
    },
    signUpCatBtns: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bgImage: {
        backgroundSize: 'cover',
        alignItems: 'center',
        resizeMode: 'contain',
        paddingVertical: 0,
        paddingHorizontal: 0,
        position: 'relative',
        zIndex: 1,
    },
    textEarthyRed: {
        color: '#62354a',
    },
    overlayColor: {
        backgroundColor: '#db424299',
        paddingVertical: 10,
        paddingHorizontal: 15,
        position: 'relative',
    },
    loginOuter: {
        position: 'relative',
        minWidth: '100%',
        zIndex: 2,
        marginBottom: 5,
        marginTop: 40,
    },
    loginCenterDiv: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    loginTextDiv: {
        position: 'relative',
        textAlign: 'center',
        alignItems: 'center',
    },
    mainLogo: {
        width: 225,
        height: 25,
        marginBottom: 15,
    },
    mainTitle2: {
        fontSize: 20,
        color: '#62354a',
        paddingVertical: 0,
        paddingHorizontal: 10,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 5,
        textAlign: 'center',
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 0,
    },
    mainTitleSmall: {
        fontSize: 12.5,
        lineHeight: 14,
        color: '#db4242',
        paddingHorizontal: 0,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        alignItems: 'center',
    },
    // loginBoxOuter: {
    //     width: '100%',
    //     position: 'relative',
    //     backgroundColor: '#fff',
    //     borderRadius: 15,
    //     paddingVertical: 2,
    //     paddingHorizontal: 15,
    //     marginTop: 0,
    //     paddingTop: 15,
    // },
    loginBoxOuter: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 20,
    },
    loginBoxInner: {
        marginHorizontal: '2%',
    },
    signUpCatBtns: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
    },
    formGroup: {
        marginBottom: 16,
        minWidth: '100%',
        position: 'relative',
    },
    formLabel: {
        fontSize: 14,
        color: '#221e1f',
        fontWeight: '600',
        paddingBottom: 2,
        textTransform: 'capitalize',
    },
    formControl: {
        color: '#221e1f',
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
        fontFamily: 'Montserrat-Regular',
        minWidth: '100%',
    },
    formControl2: {
        color: '#221e1f',
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 2,
        borderRadius: 5,
        backgroundColor: '#fff',
        fontFamily: 'Montserrat-Regular',
        minWidth: '48%',
    },
    formGroupIcon: {
        position: 'relative',
    },
    formControlIcon: {
        paddingRight: 36,
    },
    showHideIcon: {
        position: 'absolute',
        right: 10,
        bottom: 13,
    },
    btnDefault: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#db4242',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 40,
        position: 'relative',
        minWidth: 200,
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 2,
        color: '#000',
        height: 45,
        width: 45,
    },
    TextStyle: {
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    loginInfoDiv: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
        marginBottom: 2,
    },
    whtTextColor: {
        fontSize: 14,
        color: '#ffffff',
        fontFamily: 'Montserrat-Regular',
    },
    whtLink: {
        fontSize: 14,
        color: '#ffffff',
        fontFamily: 'Montserrat-SemiBold',
    },
});
export default RequiredData;
