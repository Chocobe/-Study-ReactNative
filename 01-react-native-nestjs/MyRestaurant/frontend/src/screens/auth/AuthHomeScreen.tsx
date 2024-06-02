import {
    useCallback,
} from 'react';
import {
    SafeAreaView,
    View,
    Image,
    StyleSheet,
    Dimensions,
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
        <SafeAreaView style={styles.container}>
            <View 
                style={styles.imageContainer}>
                <Image 
                    resizeMode="contain"
                    source={require('../../assets/my-restaurant-logo.png')}
                    style={styles.image} />
            </View>
            <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
    },

    imageContainer: {
        flex: 1.5,
        width: Dimensions.get('screen').width / 4 * 3,
    },
    image: {
        width: '100%',
        height: '100%',
    },

    buttonContainer: {
        flex: 1,
        gap: 10,
    },
});

export default AuthHomeScreen;
