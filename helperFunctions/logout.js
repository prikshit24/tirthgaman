import AsyncStorage from "@react-native-async-storage/async-storage";

export const onLogout = async (navigate) => {
    try {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('userDetails');
        await AsyncStorage.clear();
        navigate('login');
        return true;
    } catch (exception) {
        return false;
    }
};