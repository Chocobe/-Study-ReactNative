import {
    SafeAreaView,
    View,
    Text,
} from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { authNavigations } from '../../constants';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';

type SignupScreenProps = DrawerScreenProps<
    AuthStackParamList,
    typeof authNavigations.SIGNUP
>;

function SignupScreen(_props: SignupScreenProps) {
    return (
        <SafeAreaView>
            <View>
                <Text>
                    Signup Screen
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default SignupScreen;
