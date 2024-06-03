import {
    SafeAreaView,
    View,
    StyleSheet,
} from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { authNavigations } from '../../constants';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import MilesInputField from '../../components/MilesInputField';
import MilesButton from '../../components/MilesButton';
import useForm from '../../hooks/useForm';
import { validateSignup } from '../../utils';

type SignupScreenProps = DrawerScreenProps<
    AuthStackParamList,
    typeof authNavigations.SIGNUP
>;

function SignupScreen(_props: SignupScreenProps) {
    const signupForm = useForm({
        initialValue: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validate: validateSignup,
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <MilesInputField
                    placeholder="이메일"
                    inputMode="email"
                    {...signupForm.getTextInputProps('email')} />
                <MilesInputField
                    placeholder="비밀번호"
                    secureTextEntry
                    {...signupForm.getTextInputProps('password')} />
                <MilesInputField
                    placeholder="비밀번호 확인"
                    secureTextEntry
                    {...signupForm.getTextInputProps('passwordConfirm')} />
            </View>

            <MilesButton
                label="회원가입" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    inputContainer: {
        gap: 20,
        marginBottom: 30,
    },
});

export default SignupScreen;
