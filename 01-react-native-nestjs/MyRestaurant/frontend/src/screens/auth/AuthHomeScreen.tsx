import {
    useCallback,
} from 'react';
import {
    SafeAreaView,
    View,
    Button,
} from 'react-native';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { authNavigations } from '../../constants';

type AuthHomeScreenParams = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({ navigation }: AuthHomeScreenParams) {
    const goToLogin = useCallback(() => {
        navigation.navigate(authNavigations.LOGIN);
    }, [navigation]);

    const goToSignup = useCallback(() => {
        navigation.navigate(authNavigations.SIGNUP);
    }, [navigation]);

    return (
        <SafeAreaView>
            <View>
                <Button
                    title="로그인 화면으로 이동~"
                    onPress={goToLogin} />
                <Button
                    title="회원가입"
                    onPress={goToSignup} />
            </View>
        </SafeAreaView>
    );
}

export default AuthHomeScreen;
