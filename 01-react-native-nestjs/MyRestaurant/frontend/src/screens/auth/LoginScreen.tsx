import {
    SafeAreaView,
    View,
    StyleSheet,
} from 'react-native';
import {
    useState,
    useCallback,
} from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants';
import MilesInputField from '../../components/MilesInputField';

type LoginScreenProps = StackScreenProps<
    AuthStackParamList,
    typeof authNavigations.LOGIN
>;

function LoginScreen(_props: LoginScreenProps) {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const handleChangeText = useCallback((
        name: keyof typeof values,
        text: string
    ) => {
        setValues(values => ({
            ...values,
            [name]: text,
        }));
    }, []);

    const handleBlur = useCallback((
        name: keyof typeof touched
    ) => {
        setTouched(touched => ({
            ...touched,
            [name]: true,
        }));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <MilesInputField
                    placeholder="이메일"
                    inputMode="email"
                    value={values.email}
                    onChangeText={text => handleChangeText('email', text)}
                    touched={touched.email}
                    onBlur={() => handleBlur('email')}
                    error="이메일을 입력해주세요." />
                <MilesInputField
                    placeholder="비밀번호"
                    value={values.password}
                    onChangeText={text => handleChangeText('password', text)}
                    touched={touched.password}
                    onBlur={() => handleBlur('password')}
                    error="비밀번호를 입력해주세요."
                    secureTextEntry />
            </View>
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
        gap: 20,
    },
});

export default LoginScreen;
