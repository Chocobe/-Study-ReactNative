import {
    SafeAreaView,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import {
    useCallback,
    useRef,
} from 'react';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { authNavigations } from '../../constants';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import MilesInputField from '../../components/MilesInputField';
import MilesButton from '../../components/MilesButton';
import useForm from '../../hooks/useForm';
import { validateSignup } from '../../utils';
import useAuth from '../../hooks/queries/useAuth';

type SignupScreenProps = DrawerScreenProps<
    AuthStackParamList,
    typeof authNavigations.SIGNUP
>;

function SignupScreen(_props: SignupScreenProps) {
    const passwordRef = useRef<TextInput | null>(null);
    const passwordConfirmRef = useRef<TextInput | null>(null);

    const signupForm = useForm({
        initialValue: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validate: validateSignup,
    });

    const { 
        signupMutation,
        loginMutation,
    } = useAuth();

    const handleSubmit = useCallback(() => {
        const {
            email,
            password,
        } = signupForm.values;

        signupMutation.mutate({
            email,
            password,
        }, {
            onSuccess: () => {
                loginMutation.mutate({
                    email,
                    password,
                });
            },
        });
    }, [
        signupForm.values, 
        signupMutation, loginMutation,
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <MilesInputField
                    placeholder="이메일"
                    inputMode="email"
                    // 모바일 키보드의 `enter` 키 표기 설정 (next: 엔터 아이콘)
                    returnKeyType="next"
                    // `enter` 키 입력 시, 모바일 키보드 숨김 여부 (false: 숨기지 않음)
                    blurOnSubmit={false}
                    // `enter` 키 입력 시, callback 설정
                    onSubmitEditing={() => {
                        passwordRef.current?.focus();
                    }}
                    {...signupForm.getTextInputProps('email')} />
                <MilesInputField
                    ref={passwordRef}
                    placeholder="비밀번호"
                    secureTextEntry
                    // ios 에서 `secureTextEntry` 인 요소에 focus 되면 나타나는 `이상한 현상(?)` 방지 (oneTimeCode)
                    textContentType="oneTimeCode"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                        passwordConfirmRef.current?.focus();
                    }}
                    {...signupForm.getTextInputProps('password')} />
                <MilesInputField
                    ref={passwordConfirmRef}
                    placeholder="비밀번호 확인"
                    secureTextEntry
                    onSubmitEditing={handleSubmit}
                    {...signupForm.getTextInputProps('passwordConfirm')} />
            </View>

            <MilesButton
                label="회원가입"
                onPress={handleSubmit} />
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
