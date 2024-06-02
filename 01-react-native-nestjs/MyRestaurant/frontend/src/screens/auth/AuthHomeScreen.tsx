import {
    useCallback,
} from 'react';
import {
    SafeAreaView,
    View,
} from 'react-native';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { authNavigations } from '../../constants';
import MilesButton from '../../components/MilesButton';

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
                <MilesButton
                    label="로그인 하기"
                    onPress={goToLogin} />
                <MilesButton
                    size="large"
                    label="회원가입 하기"
                    variant="outlined"
                    onPress={goToSignup} />
            </View>
        </SafeAreaView>
    );
}

export default AuthHomeScreen;
