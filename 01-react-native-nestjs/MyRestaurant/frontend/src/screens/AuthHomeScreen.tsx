import {
    useCallback,
} from 'react';
import {
    SafeAreaView,
    View,
    Button,
} from 'react-native';
import { AuthStackParamList } from '../navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { authNavigations } from '../constants';

type AuthHomeScreenParams = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({ navigation }: AuthHomeScreenParams) {
    const onPress = useCallback(() => {
        navigation.navigate(authNavigations.LOGIN);
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
