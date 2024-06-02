// navigation
import {
    createStackNavigator,
} from '@react-navigation/stack';
// constants
import { authNavigations } from '../../constants';
// screen
import AuthHomeScreen from '../../screens/auth/AuthHomeScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignupScreen from '../../screens/auth/SignupScreen';

export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
    [authNavigations.LOGIN]: undefined;
    [authNavigations.SIGNUP]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
    return (
        <Stack.Navigator 
            initialRouteName={authNavigations.AUTH_HOME}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                    shadowColor: '#383841',
                },
                headerTitleStyle: {
                    fontSize: 15,
                },
                headerTintColor: '#000',
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }}>
            <Stack.Screen
                name={authNavigations.AUTH_HOME}
                component={AuthHomeScreen}
                options={{
                    headerShown: false,
                    headerTitle: ' ',
                }} />
            <Stack.Screen
                name={authNavigations.LOGIN}
                component={LoginScreen}
                options={{
                    headerTitle: '로그인',
                }} />
            <Stack.Screen
                name={authNavigations.SIGNUP}
                component={SignupScreen}
                options={{
                    headerTitle: '회원가입',
                }} />
        </Stack.Navigator>
    );
}

export default AuthStackNavigator;
