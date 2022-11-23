import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
    const { userInfo, isLoading, logout } = useContext(AuthContext);

    return (
        <View style={style.container}>
            <Spinner visible={isLoading} />
            <Text style={style.welcome}>Welcome {userInfo.fullname}</Text>
            <Button title='Logout' color="red" onPress={logout}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 18,
        marginBottom: 8,
    },
})

export default HomePage;