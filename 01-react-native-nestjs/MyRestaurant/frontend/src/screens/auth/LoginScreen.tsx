import {
    SafeAreaView,
    View,
    StyleSheet,
} from 'react-native';
import {
    useCallback,
} from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants';
import MilesInputField from '../../components/MilesInputField';
import MilesButton from '../../components/MilesButton';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../utils';

type LoginScreenProps = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.LOGIN
>;

function LoginScreen(_props: LoginScreenProps) {
    const loginForm = useForm({
        initialValue: {
            email: '',
            password: '',
        },
        validate: validateLogin,
    });

    const handleSubmit = useCallback(() => {
        console.group('handleSubmit()');
        console.log('loginForm.values: ', loginForm.values);
        console.groupEnd();
    }, [loginForm.values]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <MilesInputField
                    placeholder="이메일"
                    inputMode="email"
                    // value={values.email}
                    // onChangeText={text => handleChangeText('email', text)}
                    // touched={touched.email}
                    // onBlur={() => handleBlur('email')}
                    // error="이메일을 입력해주세요." 
                    {...loginForm.getTextInputProps('email')} />
                <MilesInputField
                    placeholder="비밀번호"
                    // value={values.password}
                    // onChangeText={text => handleChangeText('password', text)}
                    // touched={touched.password}
                    // onBlur={() => handleBlur('password')}
                    // error="비밀번호를 입력해주세요."
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
