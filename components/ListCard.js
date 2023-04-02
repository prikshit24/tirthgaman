import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BASE_URL_APP } from '../Utils/Contstant'

const ListCard = (props) => {

    const { imagePath, name, location } = props;

    return (
        // <TouchableOpacity onPress={() => onCardClick(id)}>
        <View
            style={styles.proprtyCardItem}
            backgroundColor={'#ffffff'}>
            <View style={styles.proprtyCardCol}>
                <View style={styles.proprtyCardRow}>
                    <View style={[styles.proprtyCardLeft]}>
                        <View>
                            <Image
                                source={{
                                    uri: `${BASE_URL_APP}/files/${imagePath}`,
                                }}
                                style={[styles.prptyImg]}
                            />
                        </View>
                    </View>
                    <View style={[styles.proprtyCardRight]}>
                        <Text style={[styles.mediumTitle, styles.pt8]}>
                            {name}
                        </Text>
                        <Text
                            style={[styles.locatnTextBig, styles.py7]}>
                            <Image
                                source={require('../img/locIcon.png')}
                            />
                            <Text
                                style={[
                                    styles.subTitle2,
                                    styles.greyText1,
                                ]}>
                                {location}
                            </Text>
                        </Text>
                        <Image
                            source={require('../img/arrowRight.png')}
                            style={[styles.arwRght]}
                        />
                    </View>
                </View>
            </View>
        </View>
        // </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    proprtyCardItem: {
        marginTop: 24,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    proprtyCardCol: {
        marginHorizontal: -12,
        position: 'relative',
    },
    proprtyCardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    proprtyCardLeft: {
        flex: 0.2,
        paddingLeft: 10,
        paddingRight: 30,
    },
    prptyImg: {
        width: 120,
        height: 120,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60,
    },
    proprtyCardRight: {
        flex: 0.7,
        paddingRight: 30,
        paddingLeft: 25,
        position: 'relative',
    },
    mediumTitle: {
        fontSize: 16,
        color: '#633549',
        fontFamily: 'Montserrat-SemiBold',
        width: '100%',
    },
    pt8: {
        paddingTop: 8,
    },
    subTitle2: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: '#db4242',
    },
    locatnTextBig: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    py7: {
        paddingBottom: 7,
        paddingTop: 7,
    },
    greyText1: {
        color: '#777777',
    },
    arwRght: {
        position: 'absolute',
        right: 30,
        bottom: 10,
    },
})

export default ListCard