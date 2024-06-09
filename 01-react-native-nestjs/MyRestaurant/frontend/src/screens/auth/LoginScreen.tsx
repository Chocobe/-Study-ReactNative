import {
    SafeAreaView,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import {
    useRef,
    useCallback,
} from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants';
import MilesInputField from '../../components/MilesInputField';
import MilesButton from '../../components/MilesButton';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../utils';
import useAuth from '../../hooks/queries/useAuth';

type LoginScreenProps = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.LOGIN
>;

function LoginScreen(_props: LoginScreenProps) {
    const passwordRef = useRef<TextInput | null>(null);

    const loginForm = useForm({
        initialValue: {
            email: '',
            password: '',
        },
        validate: validateLogin,
    });

    const { loginMutation } = useAuth();

    const handleSubmit = useCallback(() => {
        loginMutation.mutate(loginForm.values);
    }, [loginForm.values, loginMutation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <MilesInputField
                    placeholder="이메일"
                    inputMode="email"
                    autoFocus
                    // value={values.email}
                    // onChangeText={text => handleChangeText('email', text)}
                    // touched={touched.email}
                    // onBlur={() => handleBlur('email')}
                    // error="이메일을 입력해주세요." 
                    blurOnSubmit={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        passwordRef.current?.focus();
                    }}
                    {...loginForm.getTextInputProps('email')} />
                <MilesInputField
                    ref={passwordRef}
                    placeholder="비밀번호"
                    // value={values.password}
                    // onChangeText={text => handleChangeText('password', text)}
                    // touched={touched.password}
                    // onBlur={() => handleBlur('password')}
                    // error="비밀번호를 입력해주세요."
                    textContentType="oneTimeCode"
                    returnKeyType="join"
                    onSubmitEditing={handleSubmit}
                    {...loginForm.getTextInputProps('password')}
                    secureTextEntry />
            </View>
            <MilesButton
                label="로그인"
                variant="filled"
                size="large"
                onPress={handleSubmit} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // container
    container: {
        flex: 1,
        margin: 30,
    },
    // inputContainer
    inputContainer: {
        marginBottom: 30,
        gap: 20,
    },
});

export default LoginScreen;
