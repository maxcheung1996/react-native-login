import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const SplashScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#06bcee" }}>
            <ActivityIndicator  animating={true} color={MD2Colors.red800} />
        </View>
    )
}

export default SplashScreen;