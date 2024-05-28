import {
    useCallback,
} from 'react';
import {
    SafeAreaView,
    View,
    Button,
} from 'react-native';
import {

} from '@react-navigation/native';

function AuthHomeScreen({ navigation }: any) {
    const onPress = useCallback(() => {
        navigation.navigate('Login');
    }, [navigation]);

    return (
        <SafeAreaView>
            <View>
                <Button
                    title="로그인 화면으로 이동~"
                    onPress={onPress} />
            </View>
        </SafeAreaView>
    );
}

export default AuthHomeScreen;
