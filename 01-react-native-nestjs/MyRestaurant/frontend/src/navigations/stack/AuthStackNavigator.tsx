// navigation
import {
    createStackNavigator,
} from '@react-navigation/stack';
// screen
import AuthHomeScreen from '../../screens/AuthHomeScreen';
import LoginScreen from '../../screens/LoginScreen';
// constants
import { authNavigations } from '../../constants';

export type AuthStackParamList = {
    [authNavigations.AUTH_HOME]: undefined;
    [authNavigations.LOGIN]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
    return (
        <Stack.Navigator initialRouteName={authNavigations.AUTH_HOME}>
            <Stack.Screen
                name={authNavigations.AUTH_HOME}
                component={AuthHomeScreen} />
            <Stack.Screen
                name={authNavigations.LOGIN}
                component={LoginScreen} />
        </Stack.Navigator>
    );
}

export default AuthStackNavigator;
