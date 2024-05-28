/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Button,
    TextInput,
} from 'react-native';

function App(): React.JSX.Element {
    switch (true) {
        case 1 === 1:
            break;
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Hello React Native
                </Text>
            </View>

            <View>
                <Button
                    title="Click me 🚀"
                    onPress={e => {
                        console.group('onPress()');
                        console.log('클릭함');
                        console.groupEnd();
                    }} />

                <TextInput />
                <TextInput />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 60,
        padding: 20,
        backgroundColor: '#ff1493',
    },

    title: {
        paddingVertical: 8,
        paddingRight: 20,
        color: '#fff',
        fontWeight: '700',
        textAlign: 'right',
    },
});

export default App;
