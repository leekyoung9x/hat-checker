import React from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export default function DetailScreen({ route }) {
    const { title, htmlContent } = route.params; // Nhận HTML từ HomeScreen

    return (
        <View style={{ flex: 1 }}>
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={{ flex: 1, width: Dimensions.get('window').width }}
            />
        </View>
    );
}
