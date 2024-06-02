import {
    View,
    Text,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants';
import { useEffect } from 'react';

type LoginScreenProps = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.LOGIN
>;

function LoginScreen({ navigation }: LoginScreenProps) {
    useEffect(() => {
        console.group('Login Screen');
        console.log('navigation: ', navigation);
        console.groupEnd();
    }, [navigation]);

    return (
        <View>
            <Text>
                로그인 스크린
            </Text>
        </View>
    );
}

export default LoginScreen;
